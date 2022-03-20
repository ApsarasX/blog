import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { ArchiveBlogPost, Props } from '@theme/BlogArchivePage';
import { translate } from '@docusaurus/Translate';
import { Divider, PageHeader, Radio, Timeline } from 'antd';
import dayjs from 'dayjs';
import styles from './styles.module.css';

type YearProp = {
  year: string;
  posts: ArchiveBlogPost[];
};

function Year({ year, posts }: YearProp) {
  return (
    <>
      <Divider>{year}</Divider>
      <Timeline>
        {posts.map(post => (
          <Timeline.Item key={post.metadata.date} color="gray">
            {dayjs(post.metadata.date).format('MM-DD')}
            &emsp;
            <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
}

function YearsSection({
  years,
  total,
  setOrder
}: {
  years: YearProp[];
  total: number;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
}) {
  return (
    <section className="margin-vert--lg">
      <div className="container">
        <PageHeader
          className={styles.pageHeader}
          title="归档"
          subTitle={`当前共计${total}篇博客，继续加油 🎉🎉🎉`}
          extra={
            <Radio.Group defaultValue="newest" onChange={e => setOrder(e.target.value)}>
              <Radio.Button value="newest">最新发布</Radio.Button>
              <Radio.Button value="oldest">最旧发布</Radio.Button>
            </Radio.Group>
          }
        />
        <div className="row">
          {years.map((_props, idx) => (
            <div key={idx} className="col col--12 margin-vert--sm">
              <Year {..._props} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Order = 'newest' | 'oldest';

function listPostsByYears(
  blogPosts: readonly ArchiveBlogPost[],
  order: Order = 'newest'
): YearProp[] {
  let postsByYear: Map<string, ArchiveBlogPost[]>;

  if (order === 'newest') {
    postsByYear = blogPosts.reduce((posts, post) => {
      const year = post.metadata.date.split('-')[0]!;
      const yearPosts = posts.get(year) ?? [];
      return posts.set(year, [...yearPosts, post]);
    }, new Map<string, ArchiveBlogPost[]>());
  } else {
    postsByYear = blogPosts.reduceRight((posts, post) => {
      const year = post.metadata.date.split('-')[0]!;
      const yearPosts = posts.get(year) ?? [];
      return posts.set(year, [post, ...yearPosts]);
    }, new Map<string, ArchiveBlogPost[]>());
  }
  return Array.from(postsByYear, ([year, posts]) => ({
    year,
    posts
  }));
}

export default function BlogArchive({ archive }: Props): JSX.Element {
  const title = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
    description: 'The page & hero title of the blog archive page'
  });
  const description = translate({
    id: 'theme.blog.archive.description',
    message: 'Archive',
    description: 'The page & hero description of the blog archive page'
  });
  const [order, setOrder] = useState<Order>('newest');
  const years = listPostsByYears(archive.blogPosts, order);
  return (
    <Layout title={title} description={description}>
      <main>
        {years.length > 0 && (
          <YearsSection years={years} total={archive.blogPosts.length} setOrder={setOrder} />
        )}
      </main>
    </Layout>
  );
}
