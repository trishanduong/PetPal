import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";
import type { RouterOutputs } from "~/trpc/shared";

type ProfileWithUser = RouterOutputs["profile"]["getProfileById"]

const Trait = ({trait}) => {
    return (
     <div>
       {/* <div className="bg-amber-500 rounded-full text-center">American Bully</div> */}
       <div className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2">#{typeof trait === 'number'? trait + ' pounds' : trait}</div>
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

const ProfileHeader = async (props: ProfileWithUser) => {
  const {profilePic, name, age, bio, traitsId} = props;
  const traits = Object.values(await api.profile.getTraitsById.query({traitsId: traitsId}));
  //console.log('traits in page', traits)

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="relative mb-3 w-96 h-96 rounded-full shadow-lg overflow-hidden drop-shadow-md"> {/* Adjust the w-24 h-24 to the size you want */}
          <Image
            src={`${profilePic}`}
            alt={`${name}'s profile picture`}
            layout="fill"
            objectFit="cover" // This will cover the area of the div, and the image will be cropped if not a square
            className="rounded-full border-4 border-slate-50" // This will ensure the image itself is also rounded if the parent div is rounded
          />
        </div>
        <div className="pt-3 text-amber-900 text-8xl font-bold">{name}</div>
        <div className="text-amber-800"> {age} years old | 5 miles away</div>
        <div className="w-full">
          <div className="font-semibold">Bio: </div>
          <div>{`${bio}`}</div>
          <div className="font-semibold">About me:</div>
          <div className="flex">
            {traits.map((trait, index) => <Trait trait={trait} key={index}/>)}
          </div>
        </div>
    </div>
  )
};

export default async function ProfilePage(){
  const user =  auth();

  const profile = await api.profile.getProfileById.query({userId: user.userId})

  return (
    <div>
        <ProfileHeader {...profile}/>
        {/* <Posts/>
        <Posts/>
        <Posts/>
        <Buttons/> */}
    </div>
  )
}