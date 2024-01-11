'use client';

import type { Conversation, DogProfile } from "@prisma/client";

import { useMemo } from "react";
import Link from "next/link";
import useOtherUser from "~/server/helpers/useOtherUsers";

import Avatar from "~/app/_components/Avatar";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
  conversation: Conversation & {
    users: DogProfile[],
  }
}

const Header: React.FC<HeaderProps> = ({
  conversation
}) => {
  const otherUser = useOtherUser(conversation);
  const statusText = useMemo(()=>{
    if(conversation.isGroup) {
      return `${conversation.users.length} members`
    };

    return 'Active'
  }, [conversation]);

  if(!otherUser){
    return null;
  }

  return (
    <div className="bg-amber-50 w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link href='/conversations' className="lg:hidden block text-sky-600 transition cursor-pointer">
          <HiChevronLeft size={32}/>
        </Link>
        <Avatar user={otherUser}/>
        <div className="flex flex-col ">
          <div>
            {conversation.name ?? otherUser.name}
          </div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div> 
        </div>
      </div>
      <HiEllipsisHorizontal size={32} className="text-sky-500 cursor-pointer hover:text-sky-600 transition " />
    </div>
  )
};

export default Header;