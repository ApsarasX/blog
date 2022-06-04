import React from 'react';
import clsx from 'clsx';
import { ConfigProvider, Menu } from 'antd';
import { TagsOutlined, UnorderedListOutlined } from '@ant-design/icons';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './styles.module.css';

const items = [
  {
    label: (
      <Link isNavLink to="/blog/archives" className={styles.sidebarItemLink}>
        归档
      </Link>
    ),
    key: 'archives',
    icon: <UnorderedListOutlined />
  },
  {
    label: (
      <Link isNavLink to="/blog/tags" className={styles.sidebarItemLink}>
        标签
      </Link>
    ),
    key: 'tags',
    icon: <TagsOutlined />
  }
];

export default function BlogSidebar(): JSX.Element | null {
  const { colorMode } = useColorMode();
  return (
    <nav
      className={clsx(styles.sidebar, 'thin-scrollbar')}
      aria-label={translate({
        id: 'theme.blog.sidebar.navAriaLabel',
        message: 'Blog recent posts navigation',
        description: 'The ARIA label for recent posts in the blog sidebar'
      })}
    >
      <ConfigProvider prefixCls={colorMode === 'dark' ? 'ant-dark' : 'ant'}>
        <Menu items={items} />
      </ConfigProvider>
    </nav>
  );
}
