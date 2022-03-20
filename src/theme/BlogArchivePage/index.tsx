import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import type { ArchiveBlogPost, Props } from '@theme/BlogArchivePage';
import { translate } from '@docusaurus/Translate';
import { Divider, PageHeader, Timeline } from 'antd';
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

function YearsSection({ years, total }: { years: YearProp[]; total: number }) {
  return (
    <section className="margin-vert--lg">
      <div className="container">
        <PageHeader
          className={styles.pageHeader}
          title="归档"
          subTitle={`当前共计${total}篇博客，继续加油 🎉🎉🎉`}
        />
        {/* <Alert message={`当前共计${total}篇博客，继续加油 🎉🎉🎉`} type="success" /> */}
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

function listPostsByYears(blogPosts: readonly ArchiveBlogPost[]): YearProp[] {
  const postsByYear = blogPosts.reduceRight((posts, post) => {
    const year = post.metadata.date.split('-')[0]!;
    const yearPosts = posts.get(year) ?? [];
    return posts.set(year, [post, ...yearPosts]);
  }, new Map<string, ArchiveBlogPost[]>());

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
  const years = listPostsByYears(archive.blogPosts);
  return (
    <Layout title={title} description={description}>
      <main>
        {years.length > 0 && <YearsSection years={years} total={archive.blogPosts.length} />}
      </main>
    </Layout>
  );
}
