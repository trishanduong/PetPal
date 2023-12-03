import Image from "next/image";
import Link from "next/link";

function HeroSection() {
    return (
        <div className="flex bg-yellow-500 w-full h-[85vh]">
            <div className="w-2/5 flex items-center justify-center">
              <div className="absolute flex items-center justify-center bg-teal-500 rounded-full h-150 w-100 overflow-hidden"> 
                <Image 
                    src="https://utfs.io/f/afc3607d-2be4-41d0-b6f8-f58dcf324f90-1jx1rj.png" alt="mockup" layout="fill"
                    objectFit="cover" className="z-0 relative opacity-50"/>
                <Image 
                    src="https://utfs.io/f/972933f9-6b52-4432-a174-79bf54337e03-80z7de.png" width="450" height="450" alt="Happy dogs" className="z-10"/>
              </div>
            </div>
            <div className="w-3/5 flex flex-col justify-center items-start p-10">
              <div className="absolute left-[86%] top-[23%]">
                <Image src="https://utfs.io/f/dbbcd43d-f539-4e6b-bae0-6a9cd371ac10-rpaq28.png" layout="responsive" width={150} height={150} alt="emphasis lines" className="rotate-45 fade-in-out"></Image>
              </div>
              <div className="absolute left-[0%] top-[23%]">
                <Image src="https://utfs.io/f/dbbcd43d-f539-4e6b-bae0-6a9cd371ac10-rpaq28.png" layout="responsive" width={150} height={150} alt="emphasis lines" className="-rotate-45 fade-in-out"></Image>
              </div>
                <h1 className="text-7xl font-extrabold p-3 mb-5 text-amber-950 animate-text bg-gradient-to-r from-amber-900 via-amber-600 to-orange-800 bg-clip-text text-transparent" >The ultimate doggy playdate app.</h1>
                <p className="text-2xl mb-8 pl-8 text-amber-900">Help your dog find their soul playmate!</p>
                <Link href="/aboutus" className="px-6 py-3 bg-yellow-800 text-white rounded-lg hover:bg-amber-950 shadow-md">
                    Get Started
                </Link>
            </div>
            
        </div>
    );
}

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-amber-200 w-screen">
      <HeroSection></HeroSection>
    </main>
  );
}