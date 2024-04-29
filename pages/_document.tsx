import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v14-pagesRouter';
import { Head, Html, Main, NextScript } from 'next/document';

import { roboto, theme } from '~/_app/model/theme';
import { authorGithubUrl, deployUrl, siteTitle } from '~/shared/model/constants';

import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter';
import type { DocumentContext, DocumentProps } from 'next/document';
import type { ReactNode } from 'react';

const description = `eCommerce app by ${authorGithubUrl}`;
const metadata = [
  { name: 'description', content: description },
  { name: 'og:title', content: siteTitle },
  { name: 'og:description', content: description },
  { name: 'og:type', content: 'website' },
  { name: 'og:image', content: `${deployUrl}/opengraph-image.png` },
];

function createIconLinkTags(relList: string[]): ReactNode {
  return relList.map((rel) => (
    <link
      key={rel}
      rel={rel}
      type="image/png"
      href="/opengraph-image.png"
    />
  ));
}

function createMetaTags(metaDataList: { name: string; content: string }[]): ReactNode {
  return metaDataList.map(({ content, name }) => (
    <meta
      content={content}
      name={name}
      key={name}
    />
  ));
}

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps): ReactNode {
  return (
    <Html
      lang="en"
      className={roboto.className}
    >
      <Head>
        <meta
          name="theme-color"
          content={theme.palette.primary.main}
        />
        {createIconLinkTags(['shortcut icon', 'icon', 'apple-touch-icon'])}
        <meta
          name="emotion-insertion-point"
          content=""
        />
        {createMetaTags(metadata)}
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<Awaited<ReturnType<typeof documentGetInitialProps>>> => {
  const finalProps = await documentGetInitialProps(ctx);

  return finalProps;
};
