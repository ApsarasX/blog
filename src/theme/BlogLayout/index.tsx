import React from 'react';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import type { Props } from '@theme/BlogLayout';

export default function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--md">
        <div className="row">
          {hasSidebar && (
            <aside className="col col--2">
              <BlogSidebar sidebar={sidebar} />
            </aside>
          )}
          <main
            className="col col--8"
            itemScope
            itemType="http://schema.org/Blog"
          >
            {children}
          </main>
          {toc && <div className="col col--2">{toc}</div>}
        </div>
      </div>
    </Layout>
  );
}
