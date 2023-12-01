
import { auth } from "@clerk/nextjs";
import { api } from "~/trpc/server";

import ProfilePage from "../_components/ProfilePage";
import Buttons from "../_components/Buttons";

export default async function Swipe(){
  const user =  auth();
  if (!user.userId) {
    // Handle the case when userId is null
    return <div>User not authenticated</div>;
  }
  
  const profile = await api.profile.getProfileById.query({userId: user.userId});
  console.log("profile in profilepage", profile)


  return (
    <div>
      <ProfilePage/>
      <Buttons {...profile}/>
    </div>
  )
}