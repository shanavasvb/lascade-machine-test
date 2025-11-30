import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/hero/hero";
import PlacesGrid from "@/components/places/PlacesGrid";
import AppPromo from "@/components/apppromo/Apppromo";
import TravelGuides from "@/components/guides/TravelGuide";
import Footer from "@/components/footer/footer";
import BrandStrip from "@/components/brands/BrandStrip";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <BrandStrip />
      <PlacesGrid />
      <AppPromo />
      <TravelGuides />
      <Footer />
    </main>
  );
}
