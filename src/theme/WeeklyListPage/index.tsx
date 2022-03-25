import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import WeeklyLayout from '@site/src/theme/WeeklyLayout';
import type { Props } from '@theme/BlogListPage';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { normalizeFormattedDate } from '@site/src/utils/date';
import styles from './styles.module.css';

export default function BlogListPage(props: Props): JSX.Element {
  const { metadata, items } = props;
  const {
    siteConfig: { title: siteTitle }
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  return (
    <WeeklyLayout
      title={title}
      description={blogDescription}
      wrapperClassName={ThemeClassNames.wrapper.blogPages}
      pageClassName={ThemeClassNames.page.blogListPage}
      searchMetadata={{
        // assign unique search tag to exclude this page from search results!
        tag: 'blog_posts_list'
      }}
    >
      <div>
        <h1 className={styles.pageTitle}>全部WebAssebmy周刊</h1>
        {items.map(({ content: BlogPostContent }) => {
          return (
            <div
              key={BlogPostContent.metadata.permalink}
              className={styles.row}
            >
              <Link to={BlogPostContent.metadata.permalink}>
                {BlogPostContent.metadata.title.split('-')[1]}
              </Link>
              &emsp;
              <span>
                {normalizeFormattedDate(BlogPostContent.metadata.formattedDate)}
              </span>
            </div>
          );
        })}
      </div>
    </WeeklyLayout>
  );
}
