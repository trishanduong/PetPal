import Image from "next/image";
const Traits = () => {
    return (
     <div>
       {/* <div className="bg-amber-500 rounded-full text-center">American Bully</div> */}
       <div className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2">American bully</div>
       <div className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2">No children</div>
       <div className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2">Medium</div>
       <div className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2">90 pounds</div>
     </div>
    )
   };
   
   const Posts = () => {
     return (
       <div className="rounded-lg bg-amber-400 w-full h-full p-3 mt-6">
         <div>
           <span className="text-3xl py-2">✦ {`Prompt`}</span>
           <div className="rounded-lg bg-slate-900 h-96">
         </div>
         </div>
       </div>
     )
   }
   
   const Buttons = () => {
    return (
     <div className="px-6 py-4">
       <ul className="flex">
           <li className="mr-6">
             <button className="bg-amber-50 hover:bg-amber-300 text-3xl font-bold py-2 px-3 rounded-full">
               ❌
             </button> 
           </li>
           <li className="mr-6">
             <button className="font-xl bg-amber-50 hover:bg-amber-300 text-3xl font-bold py-2 px-3 rounded-full mr-2">
               💗
             </button>
           </li>
         </ul>
     </div>
    )
   };
   
   const Body = () => {
   
     return (
       <div className="w-full">
         <div className="flex flex-col items-center justify-center p-4">
           <div>
             <div className="font-semibold">Bio: </div>
             <div>{`I'm just a chunky boy that likes sunbathing and walks at the park! `}</div>
             <div className="font-semibold">About me:</div>
             <div>
               <Traits/>
             </div>
           </div>
         </div>
       </div>
     )
   };

const ProfileHeader = () => {
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="relative mb-3 w-96 h-96 rounded-full shadow-lg overflow-hidden drop-shadow-md"> {/* Adjust the w-24 h-24 to the size you want */}
          <Image
            src="https://utfs.io/f/29867864-0d39-4367-a5be-9c1fbdf08d5d-1xbwre.jpeg"
            alt="Profile image"
            layout="fill"
            objectFit="cover" // This will cover the area of the div, and the image will be cropped if not a square
            className="rounded-full border-4 border-amber-300" // This will ensure the image itself is also rounded if the parent div is rounded
          />
        </div>
        <div className="pt-3 text-amber-900 text-8xl font-bold">ASTRO</div>
        <div className="text-amber-800"> 3 years old | 5 miles away</div>
    </div>
  )
};

export default function ProfilePage(){
  return (
    <div>
        <ProfileHeader/>
        <Body/>
        {/* <Posts/>
        <Posts/>
        <Posts/>
        <Buttons/> */}
    </div>
  )
}