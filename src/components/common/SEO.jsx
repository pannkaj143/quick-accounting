import Head from "next/head";

const SITE_URL = "https://www.quick-accounting.co.uk";
const SITE_NAME = "Quick Accounting Ltd";
const DEFAULT_OG_IMAGE = "/assets/imgs/logo/site-logo-white.png";

export default function SEO({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}) {
  const canonical = `${SITE_URL}${path}`;
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" type="image/x-icon" href="/assets/imgs/logo/favicon.png" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Head>
  );
}
