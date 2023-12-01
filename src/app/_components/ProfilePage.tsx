/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";
import type { RouterOutputs } from "~/trpc/shared";
import PostBox from "./Post";
import type { Post } from "@prisma/client";

type ProfileWithUser = RouterOutputs["profile"]["getProfileById"]
type TraitProps = {
  trait: string;
  value: TraitValue;
};

type TraitValue = number | string

const Trait:React.FC<TraitProps>= ({trait, value}) => {
  
    return (
     <div>
       {/* <div className="bg-amber-500 rounded-full text-center">American Bully</div> */}
       <div aria-label={trait} className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2 drop-shadow-sm">
        #{typeof value === 'number'? value + ' pounds' : value}
       </div>
     </div>
    )
   };
   

const ProfileHeader = async (props: ProfileWithUser) => {
  const {profilePic, name, age, bio, traitsId} = props;
  
  if(!traitsId) return <div>Error</div>
  // console.log('hi this is props', props)
  const traits = await api.traits.getTraitsById.query({traitsId: traitsId})
  console.log('traits', traits)
  const tag = Object.entries(traits)

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
            {tag.map(([trait, value], index)=> {
              if(!value || trait==='id' || trait === 'dogProfileId' || typeof value==='bigint' || trait === 'energyLevel') return
              return <Trait key={index} trait={trait} value={value}/>}
            )}
          </div>
        </div>
    </div>
  )
};


export default async function ProfilePage(){
  const user =  auth();
  if (!user.userId) {
    // Handle the case when userId is null
    return <div>User not authenticated</div>;
  }
  
  const profile = await api.profile.getProfileById.query({userId: user.userId});
  console.log("profile in profilepage", profile)
  const {id} = profile;

  const posts: Post[] = await api.post.getPostsByUser.query({dogProfileId: id});

  return (
    <div>
      <ProfileHeader {...profile}/>
      {
        posts.map((post: Post) => 
        <PostBox key={post.id} post={post}/>
        )
      }
    </div>
  )
}