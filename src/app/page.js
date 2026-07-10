import BestSellingDesigns from "./components/Bestsellingdesigns";
import CustomerReviews from "./components/Customerreviews";
import FeaturedCollection from "./components/Featuredcollection";
import Footer from "./components/Footer2";
import Hero from "./components/Hero";
import LifestyleShowcase from "./components/Lifestyleshowcase";
import LuxuryJewellery from "./components/Luxuryjewellery";
import NewArrivals from "./components/Newarrivals";
import SignatureGem from "./components/Signaturegem";


export default function Home() {
  return (
    <>

      <main>
        <Hero />
        <NewArrivals />
        <SignatureGem />
        <BestSellingDesigns />
        <FeaturedCollection />
        <LuxuryJewellery />
        <CustomerReviews />
        <LifestyleShowcase />

        {/* Collection Section */}

        {/* Categories */}

        {/* Best Sellers */}

        {/* About */}

        {/* Testimonials */}

        {/* Instagram */}
         <Footer />
      </main>

      
    </>
  );
}