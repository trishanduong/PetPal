'use client'

import type { FC } from "react";
import { api } from "~/trpc/react";
import { useRouter } from 'next/navigation';

//Props: profileId of the user we are rejecting/accepted
type ButtonProps = {
  profileId: string,
  currentUserId: string,
};

const Buttons: FC<ButtonProps>= ({profileId, currentUserId}) => {
  //get the current user:
    const router = useRouter();
    const { data: profile, isLoading, error } = api.profile.getProfileById.useQuery({ userId: currentUserId });
    // const update = api.follows.addFollowing.useMutation();
    const createConvo = api.match.handleSwipeRight.useMutation();

    
   if(isLoading) return <div>Loading...</div>;
   if (error) return <div>An error occurred: {error.message}</div>;
   const id = profile?.id;
   if(!id) throw new Error('No id');

    //if they press heart button, send them to "yes"
    const handlePlaydate = async () => {
      //update 'following'
      await createConvo.mutateAsync({swipingDogId: id, swipedDogId: profileId});
      console.log('add to playdate')
    }
    //if they press x button, send them to "no",
    const handleReject = () => {
      router.push('/swipe');
      console.log('redirected')
    }

    return (
      <div className="fixed inset-x-0 bottom-0 flex justify-between px-4 py-4 lg:px-32">
        <button onClick={handleReject} className="bg-amber-50 hover:bg-amber-500 text-3xl font-bold px-8 py-3 rounded-full drop-shadow-lg">
          ❌
        </button>
        <button onClick={handlePlaydate} className="bg-amber-50 hover:bg-amber-500 text-3xl font-bold px-8 py-3 rounded-full drop-shadow-md">
          💗
        </button>
      </div>
    );
   };

   export default Buttons;
  