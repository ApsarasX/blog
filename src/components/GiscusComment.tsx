import React from 'react';
import { Giscus } from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

interface GiscusCommentProps {
  title: string;
}

export default function GiscusComment({ title }: GiscusCommentProps) {
  const { colorMode } = useColorMode();
  return (
    <div className="giscus-wrapper docusaurus-mt-lg">
      <Giscus
        repo="ApsarasX/blog"
        repoId="R_kgDOHBaFAQ"
        category="Comments"
        categoryId="DIC_kwDOHBaFAc4COKaB"
        mapping="specific"
        term={title}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode}
        lang="zh-CN"
      />
    </div>
  );
}
