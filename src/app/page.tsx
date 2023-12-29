import Testimonial from "./_components/landingpage/Testimonial";
import HeroSection from "./_components/landingpage/HeroSection";
import MiddleContent from "./_components/landingpage/MiddleContent";

import MobileHeroSection from "./_components/landingpage/MobileHeroSection";
import { getServerAuthSession } from "~/server/auth";


export default function Home() {
  const session = getServerAuthSession();
  console.log(session)
  return (
    <main className="flex top-0 min-h-screen flex-col items-center w-screen">
      <HeroSection />
      <MobileHeroSection />
      <MiddleContent />
      <Testimonial/>
    </main>
  );
}