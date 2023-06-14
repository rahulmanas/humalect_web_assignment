import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&display=optional"
            rel="stylesheet"
          />
          <link href="/fonts/ProximaNova/stylesheet.css" rel="stylesheet" />
          <link
            rel="icon"
            href="https://uploads-ssl.webflow.com/62a05f04f6ddb811f3b8c583/62a226f9cb357b11aa5198a1_Humalect%20256x256%20webclip.png"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
