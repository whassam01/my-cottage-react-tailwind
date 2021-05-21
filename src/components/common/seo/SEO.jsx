import React from "react";
import Helmet from "react-helmet";

function SEO({ pageProps }) {
  return (
    <Helmet>
      <title>{pageProps.title}</title>
      <link rel="icon" type="image/png" href={pageProps.thumbnail} sizes="16x16" />
      <meta property="og:title" name="title" content={pageProps.title} data-react-helmet="true" />
      <meta property="og:icon" name="icon" content={pageProps.thumbnail} data-react-helmet="true" />
      <meta property="og:url" name="url" content={pageProps.url} data-react-helmet="true" />
      <meta property="og:image" name="image" content={pageProps.image} data-react-helmet="true" />
      <meta
        property="og:description"
        name="description"
        content="Order from local businesses through Cottage"
        data-react-helmet="true"
      />
    </Helmet>
  );
}

export default SEO;
