
import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";

import ProfilePage from "../_components/ProfilePage";
import Buttons from "../_components/Buttons";

export default async function Swipe(){
  //current user
  const user =  auth();
  if (!user.userId) {
    return <div>User not authenticated</div>;
  }
  
  //Get the profile of this random user: 
  const profile = await api.profile.getRandomProfile.query();
  //const profile = await api.profile.getProfileById.query({userId: user.userId});
  console.log("profile in swipe", profile)


  return (
    <div>
      <ProfilePage {...profile}/>
      <Buttons {...profile}/>
    </div>
  )
}