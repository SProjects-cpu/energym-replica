import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GenericPage from '@/components/GenericPage';

export default function DynamicPage({ params }) {
  return (
    <>
      <Header />
      <main>
        <GenericPage params={params} type="Page" />
      </main>
      <Footer />
    </>
  );
}
