
import { auth} from "@clerk/nextjs";
import { api } from "~/trpc/server";

import ProfilePage from "../_components/ProfilePage";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import getUserId from "~/server/helpers/getUserId";

export default async function Page(){
  const userId = await getUserId();

   if (!userId) {
    throw new Error('No user, this is auth()')
  }
  
  const profile = await api.profile.getProfileById.query({userId});
  console.log("profile in swipe", profile)
  
  
  return (
    <div className="max-h-full">
      <div className="fixed inset-x-0 bottom-0 px-4 py-4">
        <Link href="/profileview/edit" className="flex justify-center w-48 px-3 py-3 bg-yellow-800 text-white rounded-lg hover:bg-amber-950 shadow-md font-medium">
        EDIT PROFILE</Link>
      </div>
      <div className="flex justify-around">
        <ProfilePage {...profile}/>
      </div>
    </div>
  )
}