import Image from "next/image";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";


import { UserButton } from "@clerk/nextjs";

const Nav = () => {

  return (
    <div className="flex w-full h-18 bg-slate-200">
      <div className="flex justify-end p-3">
        <div className="font-bold">PetPal</div>
        {/* <UserButton afterSignOutUrl="/"/> */}
      </div>
    </div>
  )
}

const Traits = () => {
 return (
  <div>
    <div className="bg-amber-500 rounded-full text-center">American Bully</div>
  </div>
 )
};

const Body = () => {

  return (
    <div className="w-full bg-amber-300">
      <div className="flex flex-col items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-amber-800"></div>
        <div className="flex flex-col items-center">
          <div className="pt-3 text-amber-900 text-2xl font-bold">ASTRO</div>
          <div> 3 years old | 5 miles away</div>
        </div>
        <div>
          <div className="font-semibold">Bio: </div>
          <div>{`I'm just a chunky boy that likes sunbathing and walks at the park! `}</div>
          <div className="font-semibold">About me:</div>
          <div>
            <Traits/>
          </div>
          <div className="font-semibold">My favorite toy is: </div>
          <div>Jollyegg</div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center bg-amber-200">
      <Nav/>
      <Body/>
    </main>
  );
}