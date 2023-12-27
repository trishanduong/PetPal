
import { api } from "~/trpc/server";
import Link from "next/link";
import { TRPCClientError } from "@trpc/client";

import getUserId from "~/server/helpers/getUserId";

import ProfilePage from "../_components/ProfilePage";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";


export default async function Page(){
  const userId = await getUserId();

   if (!userId) {
    throw new Error('No user, this is auth()')
  }
  
  const profile = await api.profile.getProfileById.query({userId});

  if(!profile || profile === null) throw new TRPCClientError("No profile found.")
  
  return (
    <div className="max-h-full">
      <div className="flex justify-end p-5">
        <a href="/api/auth/signout"
            className="px-4 py-2 text-sm text-amber-700 hover:bg-gray-100 dark:text-amber-500 dark:hover:bg-amber-300 dark:hover:text-white"
          >
          <div className="flex items-center gap-3">
            <HiArrowLeftOnRectangle size={28}/> Logout
          </div>
        </a>
      </div>
      <div className="fixed inset-x-0 bottom-0 px-4 py-4">
        <Link href="/profileview/edit" className="flex justify-center w-48 px-3 py-3 bg-yellow-800 text-white rounded-lg hover:bg-amber-950 shadow-md font-medium">
        EDIT PROFILE
        </Link>
      </div>
      <div className="flex justify-around">
        <ProfilePage {...profile}/>
      </div>
    </div>
  )
}