/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { translate } from '@docusaurus/Translate';

export default function BlogSidebar(): JSX.Element | null {
  return (
    <nav
      className={clsx(styles.sidebar, 'thin-scrollbar')}
      aria-label={translate({
        id: 'theme.blog.sidebar.navAriaLabel',
        message: 'Blog recent posts navigation',
        description: 'The ARIA label for recent posts in the blog sidebar'
      })}
    >
      {/* <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>
        {sidebar.title}
      </div> */}
      <ul className={styles.sidebarItemList}>
        <li className={styles.sidebarItem}>
          <Link isNavLink to="/blog/archives" className={styles.sidebarItemLink}>
            归档
          </Link>
        </li>
        <li className={styles.sidebarItem}>
          <Link isNavLink to="/blog/tags" className={styles.sidebarItemLink}>
            标签
          </Link>
        </li>
      </ul>
    </nav>
  );
}
