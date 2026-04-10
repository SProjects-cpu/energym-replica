import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GenericPage from '@/components/GenericPage';

export default function DynamicCollection({ params }) {
  return (
    <>
      <Header />
      <main>
        <GenericPage params={params} type="Collection" />
      </main>
      <Footer />
    </>
  );
}
