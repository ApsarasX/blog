import React from 'react';
import { Giscus } from '@giscus/react';

export default function GiscusComment() {
  return (
    <div className="giscus-wrapper docusaurus-mt-lg">
      <Giscus
        repo="ApsarasX/blog"
        repoId="R_kgDOHBaFAQ"
        category="Comments"
        categoryId="DIC_kwDOHBaFAc4COKaB"
        mapping="og:title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="zh-CN"
      />
    </div>
  );
}
