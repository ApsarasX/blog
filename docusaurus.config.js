// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

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
          showReadingTime: false,
          archiveBasePath: '/archives'
        },
        theme: {
          customCss: [
            require.resolve('./src/css/theme.css'),
            require.resolve('./src/css/antd.css')
          ]
        },
        gtag: {
          trackingID: 'G-E5FYELPVPE',
          anonymizeIP: false
        }
      })
    ]
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
        disableSwitch: false
      },
      navbar: {
        title: 'ApsarasX',
        items: [
          { to: '/blog', label: '博客', position: 'left' },
          { to: '/docs', label: '教程', position: 'left' },
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    }),
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN']
  }
};

if (process.env.NODE_ENV === 'production') {
  config.scripts = [
    'https://hm.baidu.com/hm.js?ccbb69e1130be9536c50dc89f8796539'
  ];
}

module.exports = config;
