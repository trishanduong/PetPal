/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/legacy/image";
import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";
import type { RouterOutputs } from "~/trpc/shared";
import PostBox from "./Post";
import type { Post } from "@prisma/client";
import getUserId from "~/server/helpers/getUserId";

type ProfileWithUser = RouterOutputs["profile"]["getProfileById"]
type TraitProps = {
  trait: string;
  value: TraitValue;
};

type TraitValue = number | string

const Trait:React.FC<TraitProps>= ({trait, value}) => {
  
    return (
     <div>
       <div aria-label={trait} className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2 drop-shadow-sm">
        #{typeof value === 'number'? value + ' pounds' : value}
       </div>
     </div>
    )
   };
   

const ProfileHeader = async (props: ProfileWithUser) => {
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
        <div className="pt-3 text-amber-900 text-8xl font-bold">{name.toLowerCase()}</div>
        <div className="text-amber-800"> {age} years old <span className="text-yellow-600">✦</span> {city}</div>
        <div className="w-full">
          <div className="font-semibold">Bio: </div>
          <div>{`${bio}`}</div>
          <div className="font-semibold">About me:</div>
          <div className="flex">
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
  
  const {id} = props;

  const posts: Post[] = await api.post.getPostsByUser.query({dogProfileId: id});

  return (
    <div>
      <ProfileHeader {...props}/>
      {/* {
        posts.map((post: Post) => 
        <PostBox key={post.id} post={post}/>
        )
      } */}
    </div>
  )
}