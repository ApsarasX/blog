import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { Menu } from 'antd';
import { TagsOutlined, UnorderedListOutlined } from '@ant-design/icons';
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
      <Menu>
        <Menu.Item icon={<UnorderedListOutlined />}>
          <Link isNavLink to="/blog/archives" className={styles.sidebarItemLink}>
            归档
          </Link>
        </Menu.Item>
        <Menu.Item icon={<TagsOutlined />}>
          <Link isNavLink to="/blog/tags" className={styles.sidebarItemLink}>
            标签
          </Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}
