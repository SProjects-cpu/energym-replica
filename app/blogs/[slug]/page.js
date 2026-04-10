import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GenericPage from '@/components/GenericPage';

export default function DynamicBlog({ params }) {
  return (
    <>
      <Header />
      <main>
        <GenericPage params={params} type="Blog" />
      </main>
      <Footer />
    </>
  );
}
