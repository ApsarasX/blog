import React from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Typography } from 'antd';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames
} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import SearchMetadata from '@theme/SearchMetadata';
import WeeklyLayout from '@site/src/theme/WeeklyLayout';
import type { Props } from '@theme/BlogListPage';

import styles from './styles.module.css';

function BlogListPageMetadata(props: Props): JSX.Element {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle }
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): JSX.Element {
  const { items } = props;
  return (
    <WeeklyLayout>
      <div>
        <h1 className={styles.pageTitle}>全部WebAssebmy周刊</h1>
        {items.map(({ content: BlogPostContent }) => {
          return (
            <div
              key={BlogPostContent.metadata.permalink}
              className={styles.row}
            >
              <Link
                to={BlogPostContent.metadata.permalink}
                component={Typography.Link}
                // @ts-ignore
                underline
              >
                {BlogPostContent.metadata.title.split('-')[1]}
              </Link>
              &emsp;
              <span>
                {dayjs(BlogPostContent.metadata.date).format('YYYY-MM-DD')}
              </span>
            </div>
          );
        })}
        <div className={styles.row}>
          <Typography.Link href="https://wasmweekly.news" underline>
            第1-166期请查看原发布网站
          </Typography.Link>
        </div>
      </div>
    </WeeklyLayout>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
