import Image from "next/image";

function HeroSection() {
    return (
        <div className="flex bg-yellow-500 h-[85vh]">
            <div className="w-2/5 flex items-center justify-center">
              <div className="flex items-center justify-center bg-amber-200 rounded-full h-150 w-100"> 
                <Image src="https://utfs.io/f/972933f9-6b52-4432-a174-79bf54337e03-80z7de.png" width="450" height="450" alt="mockup" />
              </div>
              <div className="absolute left-[20%] top-[30%] fade-in-out hover:animate-bounce">
                <p className="text-4xl">❤️</p>
              </div>
              <div className="absolute left-[10%] top-[45%] fade-in-out hover:animate-bounce">
                <p className="text-4xl">❤️</p>
              </div>
              <div className="absolute left-[29%] top-[40%] fade-in-out hover:animate-bounce">
                <p className="text-4xl">❤️</p>
              </div>
            </div>
            <div className="w-3/5 flex flex-col justify-center items-start p-10">
                <h1 className="text-7xl font-extrabold p-3 mb-5 text-amber-950 animate-text bg-gradient-to-r from-amber-900 via-amber-600 to-orange-800 bg-clip-text text-transparent" >The ultimate doggy playdate app.</h1>
                <p className="text-2xl mb-8 p-3 text-amber-900">Help your dog find their soul playmate!</p>
                <button className="px-6 py-3 bg-yellow-800 text-white rounded-lg hover:bg-amber-950 shadow-md">
                    Get Started
                </button>
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