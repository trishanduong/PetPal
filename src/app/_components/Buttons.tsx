'use client'

import type { RouterOutputs } from "~/trpc/shared";

type ProfileWithUser = RouterOutputs["profile"]["getProfileById"]

export default function Buttons (props: ProfileWithUser) {
    
    //if they press heart button, send them to "yes"
    //if they press x button, send them to "no",
  
    
    return (
      <div className="fixed inset-x-0 bottom-0 flex justify-between px-4 py-4 lg:px-32">
        <button className="bg-amber-50 hover:bg-amber-500 text-3xl font-bold px-8 py-3 rounded-full drop-shadow-lg">
          ❌
        </button>
        <button className="bg-amber-50 hover:bg-amber-500 text-3xl font-bold px-8 py-3 rounded-full drop-shadow-md">
          💗
        </button>
      </div>
    );
   };
  