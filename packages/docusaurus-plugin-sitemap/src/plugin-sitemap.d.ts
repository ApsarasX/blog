import type { EnumChangefreq } from 'sitemap';

export type PluginOptions = {
  id: string;
  /** @see https://www.sitemaps.org/protocol.html#xmlTagDefinitions */
  changefreq: EnumChangefreq;
  /** @see https://www.sitemaps.org/protocol.html#xmlTagDefinitions */
  priority: number;
  /**
   * A list of glob patterns; matching route paths will be filtered from the
   * sitemap. Note that you may need to include the base URL in here.
   */
  ignorePatterns: string[];
};

export type Options = Partial<PluginOptions>;
