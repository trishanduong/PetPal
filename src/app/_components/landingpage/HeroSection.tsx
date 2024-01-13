
import Image from "next/legacy/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const HeroSection = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="lg:flex lg:bg-yellow-400 lg:w-full lg:h-screen">
      <div className="w-full flex items-center justify-center lg:w-2/5">
        <div className="hidden lg:absolute lg:flex lg:items-center lg:justify-center lg:bg-teal-500 lg:rounded-full lg:h-150 lg:w-100 lg:overflow-hidden"> 
          <Image src="https://utfs.io/f/afc3607d-2be4-41d0-b6f8-f58dcf324f90-1jx1rj.png" alt="mockup" layout="fill"
                  objectFit="cover" className="z-0 relative opacity-50"/>
          <Image src="https://utfs.io/f/972933f9-6b52-4432-a174-79bf54337e03-80z7de.png" width="450" height="450" alt="Happy dogs" className="z-10"/>
          </div>
      </div>
      <div className="hidden w-screen flex-col flex-grow justify-center items-center lg:w-3/5 lg:flex lg:flex-col lg:justify-center lg:items-start lg:p-10">
        <h1 className="lg:text-7xl font-extrabold p-3 mb-5 text-amber-950 animate-text bg-gradient-to-r from-amber-900 via-amber-600 to-orange-800 bg-clip-text text-transparent" >The ultimate doggy playdate app.</h1>
        <p className="text-2xl mb-8 pl-8 text-amber-900">Help your dog find their soul playmate!</p>
        {session && (
          <div className="pl-8">
            <Link href="/form" className="px-6 py-3 bg-yellow-800 font-medium text-white rounded-lg tracking-normal hover:bg-amber-950 shadow-md">
            Setup profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
  