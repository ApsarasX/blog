import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type { Props } from '@theme/BlogSidebar';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function BlogSidebar({ sidebar }: Props): JSX.Element | null {
  if (sidebar.items.length === 0) {
    return null;
  }
  return (
    <nav
      className={clsx(styles.sidebar, 'thin-scrollbar')}
      aria-label={translate({
        id: 'theme.blog.sidebar.navAriaLabel',
        message: 'Blog recent posts navigation',
        description: 'The ARIA label for recent posts in the blog sidebar'
      })}
    >
      <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
        {sidebar.title}
      </div>
      <ul className={styles.sidebarItemList}>
        {sidebar.items.map(item => (
          <li key={item.permalink} className={styles.sidebarItem}>
            <Link
              isNavLink
              to={item.permalink}
              className={styles.sidebarItemLink}
              activeClassName={styles.sidebarItemLinkActive}
            >
              {item.title.split('-')[1]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
