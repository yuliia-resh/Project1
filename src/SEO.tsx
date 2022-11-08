import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  description: string;
  imgUrl: string;
  url: string;
};

export default function SEO(props: Props) {
  const { title, description, imgUrl, url } = props;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imgUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgUrl} />
    </Helmet>
  );
}
