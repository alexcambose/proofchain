/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Proofchain',
  tagline:
    'Proofchain leverages blockchain technology to facilitate efficient communication and data exchange between global supply chains, providing customers with proof of product provenance and ownership.',
  url: 'https://proofchain.alexcambose.ro',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'alexcambose', // Usually your GitHub org/user name.
  projectName: 'proofchain', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: '',
      logo: {
        alt: 'Proofchain Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/alexcambose/proofchain',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/alexcambose/proofchain',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/proofchainEvm',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/alexcambose/proofchain',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Proofchain.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ro'],
  },
};
