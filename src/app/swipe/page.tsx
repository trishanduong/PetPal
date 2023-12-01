
import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";

import ProfilePage from "../_components/ProfilePage";
import Buttons from "../_components/Buttons";

export default async function Swipe(){
  //current user
  const user =  auth();
  const currentUserId = user.userId;
  if (!currentUserId) {
    throw new Error('No user')
  }
  
  //Get the profile of this random user: 
  const profile = await api.profile.getRandomProfile.query({excludeUserId: currentUserId});
  if(!profile) throw new Error('No profile');

  //const profile = await api.profile.getProfileById.query({userId: user.userId});
  //console.log("profile in swipe", profile)
  
  
  return (
    <div>
      <ProfilePage {...profile}/>
      <Buttons currentUserId={currentUserId} profileId={profile.id}/>
    </div>
  )
}