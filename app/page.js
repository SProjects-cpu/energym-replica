import Header from '@/components/Header';
import AnnouncementBar from '@/components/AnnouncementBar';
import HeroSection from '@/components/HeroSection';
import FeaturedIn from '@/components/FeaturedIn';
import ProductHero from '@/components/ProductHero';
import StatsSection from '@/components/StatsSection';
import ExperienceToggle from '@/components/ExperienceToggle';
import TextImageSection from '@/components/TextImageSection';
import NewsSection from '@/components/NewsSection';
import SolutionsSection from '@/components/SolutionsSection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';

export default function Home() {
  return (
    <>
      <ScrollAnimations />
      <AnnouncementBar />
      <Header />

      <main>
        {/* 1. Full-screen hero with video */}
        <HeroSection />

        {/* 2. Featured-in with description + logos */}
        <FeaturedIn />

        {/* 3. Product Hero — For Gyms */}
        <ProductHero
          subtitle="RE:GEN STUDIO SMART-BIKE"
          title="For Gyms"
          bgImage="/images/product-gym.jpg"
          primaryBtn={{ label: 'Enquire now', href: '#' }}
          secondaryBtn={{ label: 'Learn more', href: '#' }}
          usps={['Reduce your energy costs', 'Reduce your carbon footprint', 'Increase member retention']}
        />

        {/* 4. Product Hero — For Home */}
        <ProductHero
          subtitle="RE:GEN SMART-BIKE + OHM"
          title="For Home"
          bgImage="/images/product-home.jpg"
          variant="fade"
          primaryBtn={{ label: 'Shop Now', href: '#' }}
          secondaryBtn={{ label: 'Discover More', href: '#' }}
        >
          <div className="countdown-bar">
            <span className="countdown-bar__text">Capture your clean energy</span>
            <span className="countdown-bar__text">90Wh OHM battery</span>
            <a href="#" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '1.2rem' }}>
              Secure yours now for £100
            </a>
          </div>
        </ProductHero>

        {/* 5. Product Hero — For Offices */}
        <ProductHero
          subtitle="The future of sustainable workplaces"
          title="For Offices"
          bgImage="/images/product-office.jpg"
          primaryBtn={{ label: 'Enquire Now', href: '#' }}
          secondaryBtn={{ label: 'Learn More', href: '#' }}
          usps={['Re:focus productivity', 'Re:energise your team', 'Re:cycle human power']}
        />

        {/* 6. Stats — Human Power: ON */}
        <StatsSection />

        {/* 7. Experience Toggle (Home/Gym) */}
        <ExperienceToggle />

        {/* 8. Text + Image — Tech platform */}
        <TextImageSection />

        {/* 9. News / Blog articles */}
        <NewsSection />

        {/* 10. Solutions grid */}
        <SolutionsSection />

        {/* 11. Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
