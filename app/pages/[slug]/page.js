import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GenericPage from '@/components/GenericPage';

export default async function DynamicPage({ params }) {
  const resolvedParams = await params;
  return (
    <>
      <Header />
      <main>
        <GenericPage slug={resolvedParams?.slug} type="Page" />
      </main>
      <Footer />
    </>
  );
}
