/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "~/trpc/server";

import type { Post } from "@prisma/client";
import type { RouterOutputs } from "~/trpc/shared";

import Image from "next/legacy/image";
import PostBox from "./Post";
import getUserId from "~/server/helpers/getUserId";

type ProfileWithUser = RouterOutputs["profile"]["getProfileById"]
type TraitProps = {
  trait: string;
  value: TraitValue;
};

type TraitValue = number | string

const Trait:React.FC<TraitProps>= ({trait, value}) => {
  
    return (
     <div className="pt-2">
       <div aria-label={trait} className="inline-block text-xl bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2 drop-shadow-sm">
        #{typeof value === 'number'? value + ' pounds' : value}
       </div>
     </div>
    )
   };
   

const ProfileHeader = async (props: ProfileWithUser) => {
  if(!props) throw new Error("Invalid props")
  const {profilePic, name, age, bio, traitsId, city} = props;
  
  if(!traitsId) return <div>Error</div>
  const traits = await api.traits.getTraitsById.query({traitsId: traitsId})

  const tag = Object.entries(traits)

  return (
    <div className="flex flex-col items-center mt-5">
      <div className="relative mb-3 w-96 h-96 rounded-full shadow-lg overflow-hidden drop-shadow-md"> 
          <Image
            src={`${profilePic}`}
            alt={`${name}'s profile picture`}
            layout="fill"
            objectFit="cover" 
            className="rounded-full border-4 border-slate-50" 
          />
        </div>
        <div className="pt-3 text-amber-900 text-8xl font-bold text-center">{name.toLowerCase()}</div>
        <div className="text-amber-800 text-2xl"> {age} years old <span className="text-yellow-600">✦</span> {city}</div>
        <div className="w-full">
          <div className="font-semibold text-3xl">BIO: </div>
          <div className="text-2xl">{`${bio}`}</div>
          <div className="font-semibold text-3xl pt-7">ABOUT ME:</div>
          <div className="flex flex-wrap">
            {tag.map(([trait, value], index)=> {
              if(!value || trait==='id' || trait === 'dogProfileId' || typeof value==='bigint' || trait === 'energyLevel') return
              return <Trait key={index} trait={trait} value={value}/>}
            )}
          </div>
        </div>
    </div>
  )
};


export default async function ProfilePage(props: ProfileWithUser){
  const userId =  await getUserId();
  if (!userId) {
    // Handle the case when userId is null
    return <div>User not authenticated</div>;
  }
  //console.log(props, 'in profilepage')
  
  const id = props?.id;
  if(props === null || id === undefined) throw new Error("No props")
  const posts: Post[] = await api.post.getPostsByUser.query({dogProfileId: id});
  
  return (
    <div>
      <ProfileHeader {...props}/>
      {
        posts.map((post: Post) => 
        <PostBox key={post.id} post={post}/>
        )
      }
    </div>
  )
}