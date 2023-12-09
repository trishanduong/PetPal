
import Image from "next/legacy/image";
import Link from "next/link";

function Hola(){
  

  return (
    <div className="relative flex w-full bg-teal-500">
    <div
        className="w-full h-full" 
        style={{
          backgroundImage: `url('https://utfs.io/f/afc3607d-2be4-41d0-b6f8-f58dcf324f90-1jx1rj.png')`,
          backgroundRepeat: 'repeat',
          opacity: 70,
        }}>
          <div className="flex items-center justify-end space-x-reverse space-x-4"> 
            <div className="flex-shrink px-5 bg-amber-300 p-3 m-4 mb-3 rounded-3xl">
              <h1 className="text-center font-extrabold leading-none tracking-tight mr-3 text-yellow-900 md:text-2xl lg:text-3xl dark:text-teal-900 p-4">Where Dogs Find Their Best Pals.</h1>
              <p className="text-xl px-4 text-amber-800">
                  {`Where Dogs Find Their Best Pals.`}
              </p>
            </div>
            <div className="flex-shrink-0 my-4">
              <Image
                src="https://utfs.io/f/4b075ffb-b46d-4e92-9cd8-4d39f304f31f-tu5fy1.png" 
                alt="Descriptive text for the image"
                width={500} 
                height={300} 
                layout="intrinsic" 
                className="rounded-md my-4"
              />
            </div>
          </div>
        </div>
    </div>
  )
}
function Testimonial(){

  return (
    <div className="flex flex-col p-8 bg-yellow-400">
      <svg className="w-10 h-10 mx-auto mb-3 text-amber-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fillRule="inherit" viewBox="0 0 18 14">
         <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
      </svg>
      <blockquote className="self-center ">
        <p className="text-2xl italic font-bold text-center text-gray-900 dark:text-teal-800">{`"Petpals is just awesome. My dogs have never been more happy and social! Perfect choice to for you spend less time planning and more time for them to play."`}</p>
      </blockquote>
      <div className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
        <Image className="w-6 h-6 rounded-full" height={24} width={24} src="https://utfs.io/f/c4fa08ea-9589-4d9d-861e-758b50b65731-8lwivt.jpg" alt="profile picture" />
        <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
          <p className="pe-3 font-medium text-teal-600">Steven Quach</p>
          <p className="ps-3 text-sm text-amber-900">Pet Owner</p>
        </div>
      </div>
    </div>
  )
}
function HeroSection() {
    return (
        <div className="flex bg-yellow-400 w-full h-[85vh]">
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

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-amber-200 w-screen">
      <HeroSection></HeroSection>
      <Hola/>
      <Testimonial/>
    </main>
  );
}