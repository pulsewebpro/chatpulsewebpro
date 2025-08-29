import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0b0f14" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
