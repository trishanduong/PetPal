
import Image from "next/legacy/image";
import Link from "next/link";

const MobileHeroSection = () => {

    return (
      <div className="bg-yellow-400 mt-32 p-3 lg:hidden">
        <h1 className="text-6xl text-center font-extrabold p-3 mb-5 text-amber-950 animate-text bg-gradient-to-r from-amber-900 via-amber-500 to-orange-800 bg-clip-text text-transparent" >
          The ultimate doggy playdate app.
        </h1>
        <p className="text-2xl mb-8 pl-8 text-white italic text-wrap text-center">Help your dog find their soul playmate!</p>
        <div className="flex justify-around">
          <Link href="/aboutus" className="p-3 bg-yellow-800 text-white rounded-lg hover:bg-amber-950 shadow-md">
            Get Started
          </Link>
        </div>
      </div>
    )
  };

export default MobileHeroSection;
  