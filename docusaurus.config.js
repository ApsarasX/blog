// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ApsarasX',
  url: 'https://ApsarasX.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          blogTitle: '博客',
          blogDescription: '博客',
          showReadingTime: false,
          archiveBasePath: '/archives'
        },
        theme: {
          customCss: [
            require.resolve('./src/styles/theme.css'),
            require.resolve('./src/styles/antd-override.css')
          ]
        },
        gtag: {
          trackingID: 'G-E5FYELPVPE',
          anonymizeIP: false
        },
        sitemap: {
          ignorePatterns: ['/blog/archives', '/blog/tags/**', '/search']
        }
      })
    ]
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      ({
        id: 'weekly',
        routeBasePath: 'weekly',
        path: 'weekly',
        showReadingTime: false,
        blogTitle: 'WebAssembly周刊',
        blogDescription: 'WebAssembly周刊',
        blogSidebarTitle: '全部周刊',
        blogSidebarCount: 'ALL',
        archiveBasePath: null,
        blogPostComponent: '@site/src/theme/WeeklyPostPage',
        blogListComponent: '@site/src/theme/WeeklyListPage'
      })
    ]
  ],
  themes: [
    '@docusaurus/theme-live-codeblock',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: ['/blog', '/weekly'],
        docsDir: 'docs',
        blogDir: ['blog', 'weekly'],
        language: ['en', 'zh']
      }
    ]
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true
      },
      navbar: {
        title: 'ApsarasX',
        items: [
          { to: '/blog', label: '博客', position: 'left' },
          { to: '/docs', label: '教程', position: 'left' },
          { to: '/weekly', label: 'WebAssembly周刊', position: 'left' },
          {
            href: 'https://github.com/ApsarasX',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '教程',
            items: [
              {
                label: 'LLVM 入门笔记',
                to: '/docs/'
              }
            ]
          },
          {
            title: '社交媒体',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/ApsarasX'
              }
            ]
          },
          {
            title: '友情链接',
            items: [
              {
                label: 'fynch3r',
                href: 'https://fynch3r.github.io'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ApsarasX Built with Docusaurus.`
      },
      prism: {
        additionalLanguages: ['java', 'latex'],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
          }
        ]
      }
    }),
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN']
  }
};

async function createConfig() {
  const lightTheme = (await import('./src/utils/prismLight.mjs')).default;
  const darkTheme = (await import('./src/utils/prismDark.mjs')).default;
  // @ts-expect-error: we know it exists, right
  config.themeConfig.prism.theme = lightTheme;
  // @ts-expect-error: we know it exists, right
  config.themeConfig.prism.darkTheme = darkTheme;
  // add baidu analytics
  if (process.env.NODE_ENV === 'production') {
    config.scripts = [
      'https://hm.baidu.com/hm.js?ccbb69e1130be9536c50dc89f8796539'
    ];
  }
  return config;
}

module.exports = createConfig;
