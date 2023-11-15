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
    {/* <div className="bg-amber-500 rounded-full text-center">American Bully</div> */}
    <div className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2">American bully</div>
    <div className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2">No children</div>
    <div className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2">Medium</div>
    <div className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-amber-700 mr-2 mb-2">90 pounds</div>
  </div>
 )
};

const Posts = () => {
  return (
    <div className="rounded-lg bg-amber-400 w-1/2 h-full p-3 mt-6">
      <div>
        <span className="text-3xl py-2">✦ {`Prompt`}</span>
        <div className="rounded-lg bg-slate-900 h-96">
      </div>
      </div>
    </div>
  )
}

const Buttons = () => {
 return (
  <div className="px-6 py-4">
    <ul className="flex">
        <li className="mr-6">
          <button className="bg-amber-50 hover:bg-amber-300 text-3xl font-bold py-2 px-3 rounded-full">
            ❌
          </button> 
        </li>
        <li className="mr-6">
          <button className="font-xl bg-amber-50 hover:bg-amber-300 text-3xl font-bold py-2 px-3 rounded-full mr-2">
            💗
          </button>
        </li>
      </ul>
  </div>
 )
};

const Body = () => {

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center p-3">
        <div className="h-44 w-44 rounded-full bg-amber-800"></div>
        <div className="flex flex-col items-center">
          <div className="pt-3 text-amber-900 text-8xl font-bold">ASTRO</div>
          <div className="text-amber-700"> 3 years old | 5 miles away</div>
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
      <Posts/>
      <Posts/>
      <Buttons/>
    </main>
  );
}