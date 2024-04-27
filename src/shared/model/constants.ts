export const authorGithubUrl = 'https://github.com/EternalRival';

export const siteTitle = 'eCommerce App';

const deployUrl = 'https://eternalrival.github.com';

const description = `eCommerce app by ${authorGithubUrl}`;
const ogImage = `${deployUrl}/opengraph-image.png`;

export const metadata = [
  {
    name: 'description',
    content: description,
  },
  {
    name: 'og:title',
    content: siteTitle,
  },
  {
    name: 'og:description',
    content: description,
  },
  {
    name: 'og:type',
    content: 'website',
  },
  {
    name: 'og:image',
    content: ogImage,
  },
];
