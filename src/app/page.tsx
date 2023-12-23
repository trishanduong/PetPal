import Testimonial from "./_components/landingpage/Testimonial";
import HeroSection from "./_components/landingpage/HeroSection";
import MiddleContent from "./_components/landingpage/MiddleContent";

import MobileHeroSection from "./_components/landingpage/MobileHeroSection";

export default async function Home() {

  return (
    <main className="flex top-0 min-h-screen flex-col items-center w-screen">
      <HeroSection />
      <MobileHeroSection />
      <MiddleContent />
      <Testimonial/>
    </main>
  );
}