import type { EnumChangefreq } from 'sitemap';

export type Options = {
  changefreq?: EnumChangefreq;
  priority?: number;
  ignore?: RegExp[];
};
