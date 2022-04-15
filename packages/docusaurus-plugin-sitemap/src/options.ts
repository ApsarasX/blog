import { Joi } from '@docusaurus/utils-validation';
import { EnumChangefreq } from 'sitemap';
import type { Options, PluginOptions } from '@docusaurus/plugin-sitemap';
import type { OptionValidationContext } from '@docusaurus/types';

export const DEFAULT_OPTIONS: PluginOptions = {
  id: '',
  changefreq: EnumChangefreq.WEEKLY,
  priority: 0.5,
  ignorePatterns: []
};

const PluginOptionSchema = Joi.object({
  cacheTime: Joi.forbidden().messages({
    'any.unknown':
      'Option `cacheTime` in sitemap config is deprecated. Please remove it.'
  }),
  changefreq: Joi.string()
    .valid(...Object.values(EnumChangefreq))
    .default(DEFAULT_OPTIONS.changefreq),
  priority: Joi.number().min(0).max(1).default(DEFAULT_OPTIONS.priority),
  ignorePatterns: Joi.array()
    .items(Joi.string())
    .default(DEFAULT_OPTIONS.ignorePatterns),
  trailingSlash: Joi.forbidden().messages({
    'any.unknown':
      'Please use the new Docusaurus global trailingSlash config instead, and the sitemaps plugin will use it.'
  })
});

export function validateOptions({
  validate,
  options
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  const validatedOptions = validate(PluginOptionSchema, options);
  return validatedOptions;
}