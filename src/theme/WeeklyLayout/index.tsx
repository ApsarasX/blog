import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import type { Props } from '@theme/BlogLayout';
import WeeklySidebar from '@site/src/theme/WeeklySidebar';

export default function BlogLayout(props: Props): JSX.Element {
  const { sidebar, toc, children, ...layoutProps } = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;
  return (
    <Layout {...layoutProps}>
      <div className="container margin-vert--md">
        <div className="row">
          {hasSidebar && (
            <aside className="col col--2">
              <WeeklySidebar sidebar={sidebar} />
            </aside>
          )}
          <main
            className={clsx('col', {
              'col--8': hasSidebar,
              'col--6 col--offset-3': !hasSidebar
            })}
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
