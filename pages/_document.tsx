import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v14-pagesRouter';
import { Head, Html, Main, NextScript } from 'next/document';

import { AUTHOR_GITHUB_URL, DEPLOY_URL, SITE_TITLE } from '~/shared/model/constants';
import { muiTheme } from '~/shared/model/mui-theme';
import { roboto } from '~/shared/model/next-fonts';

import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter';
import type { DocumentContext, DocumentProps } from 'next/document';
import type { JSX } from 'react';

const metaDescription = `eCommerce app by ${AUTHOR_GITHUB_URL}`;
const metadata = [
  { name: 'description', content: metaDescription },
  { name: 'og:title', content: SITE_TITLE },
  { name: 'og:description', content: metaDescription },
  { name: 'og:type', content: 'website' },
  { name: 'og:image', content: `${DEPLOY_URL}/opengraph-image.png` },
];

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps): JSX.Element {
  return (
    <Html
      lang="en"
      className={roboto.className}
    >
      <Head>
        <meta
          name="theme-color"
          content={muiTheme.palette.primary.main}
        />

        {['shortcut icon', 'icon', 'apple-touch-icon'].map((rel) => (
          <link
            key={rel}
            rel={rel}
            type="image/png"
            href="/opengraph-image.png"
          />
        ))}

        <meta
          name="emotion-insertion-point"
          content=""
        />

        {metadata.map(({ content, name }) => (
          <meta
            content={content}
            name={name}
            key={name}
          />
        ))}

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
