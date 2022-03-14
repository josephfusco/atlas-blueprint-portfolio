import { getNextStaticProps, is404 } from '@faustjs/next';
import Head from 'next/head';
import { client } from 'client';
import { Header, ContentWrapper, Footer, Main } from 'components';

export function PageComponent({ page }) {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Head>
        <title>
          {page?.title()} - {generalSettings?.title}
        </title>
      </Head>
      <Header title={page?.title()} image={page?.featuredImage?.node} />

      <Main className="container">
        <ContentWrapper content={page?.content()} />
      </Main>

      <Footer />
    </>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();

  return <PageComponent page={page} />;
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
