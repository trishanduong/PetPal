import { SignInButton } from "@clerk/nextjs"
import Image from "next/image"

export default function Page(){


  return (
    <div className="my-1">
      <div className="relative h-screen w-full">
      <Image
        src="https://utfs.io/f/308777e1-8967-43fd-b6ad-0f2297d99d00-fumv8n.jpeg" 
        alt="Descriptive text for the image"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority 
        className="border-black"
      />
      <div className="absolute top-0 right-0 h-full flex items-center justify-end p-10">
        <div className="pr-10">
          <h1 className="text-5xl shadow-2xl font-extrabold text-white md:text-5xl lg:text-6xl"><span className="underline underline-offset-3 decoration-8 decoration-yellow-400 dark:decoration-yellow-600">Our Story</span></h1>
          <p className="text-4xl pt-4 font-bold w-64">We strive to make finding up doggy playdates easy! 🐾</p>        
        </div>
      </div>
    </div>
    
    <div className="flex items-center justify-end space-x-reverse space-x-4"> 
      <div className="flex-shrink px-5">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight mr-3 text-gray-900 md:text-5xl lg:text-6xl dark:text-amber-900 p-4 underline underline-offset-3 decoration-8 decoration-teal-400 dark:decoration-teal-600">Our Mission</h1>
        <p className="text-xl px-4 text-amber-800">
            {`Hey there! At PetPals, we're all about making dogs' tails wag and their owners smile. Our mission? Simple. We're here to help you find awesome playmates for your furry best friend.`}
        </p>
        <p className="text-xl mt-2 px-4 text-amber-800">
            {`We think every dog deserves fun playdates, loads of new sniff buddies, and loads of happy adventures. Our app is super easy to use because we want you to spend less time planning and more time playing. We're more than just an app – we're a community where dog lovers can connect, share, and create lasting memories with their lifelong pals.`}
          </p>
      </div>
      <div className="flex-shrink-0">
        <Image
          src="https://utfs.io/f/4b075ffb-b46d-4e92-9cd8-4d39f304f31f-tu5fy1.png" 
          alt="Descriptive text for the image"
          width={500} 
          height={300} 
          layout="intrinsic" 
          className="rounded-md mt-4"
        />
      </div>
    </div>
    
      <div id="about" className="bg-amber-300 mt-4">
        <div className="flex items-center">
          <div className="flex-1"> 
            <Image
              src="https://utfs.io/f/8d6a3de9-cef8-492c-a764-4743b8019eac-qyngwr.png"
              alt="Descriptive text for the image"
              width={500}
              height={300}
              layout="responsive"/>
          </div>
          <div className="flex-1 px-4">
            <h1 className="text-4xl font-extrabold leading-none tracking-tight mr-3 text-amber-900 md:text-5xl lg:text-6xl p-4 underline underline-offset-3 decoration-8 decoration-teal-400 dark:decoration-teal-600">Our Vision</h1>
            <p className="text-xl px-4 text-amber-800">
              {`Imagine a place where your dog is never short of friends and playtime is just a tap away. That's the future we're building at [App Name]. We're dreaming big – a world where every dog owner can find the perfect play pal for their pooch, right in their neighborhood.`}
            </p>
            <p className="text-xl px-4 text-amber-800 mt-4">
              {`We're not stopping at playdates; we're thinking of all kinds of cool doggie events and resources too. Our vision is a happy, friendly, tail-wagging community where dogs live their best lives, full of play, cuddles, and new friends. Let's make every day a doggy playday!`}
            </p>   
          </div>
      </div>
    </div>
    
    <div className="relative flex w-full">
    <div
        className="w-full h-full" 
        style={{
          backgroundImage: `url('https://utfs.io/f/afc3607d-2be4-41d0-b6f8-f58dcf324f90-1jx1rj.png')`,
          backgroundRepeat: 'repeat' 
        }}>
          <div className="flex justify-center">
            <SignInButton>
              <div className="items-center bg-amber-800 text-amber-300 hover:bg-teal-900 hover:text-teal-550 font-extrabold text-4xl my-10 p-3 border border-amber-400 rounded-md shadow-md w-50%">
                ☞ Join our community
              </div>
            </SignInButton>
          </div>
        </div>
    </div>

  </div>
  )
}