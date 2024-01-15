import Testimonial from "./_components/landingpage/Testimonial";
import HeroSection from "./_components/landingpage/HeroSection";
import MobileHeroSection from "./_components/landingpage/MobileHeroSection";
import EndingContent from "./_components/landingpage/EndingContent";
import MiddleContent from "./_components/landingpage/Middle";

export default function Home() {

  return (
    <main className="flex top-0 min-h-screen flex-col items-center w-screen">
      <HeroSection />
      <MobileHeroSection />
      <MiddleContent />
      <Testimonial/>
      <EndingContent />
    </main>
  );
}