'use client'
import { useSession } from "next-auth/react";
import type { FullConversationType } from "~/utils/types";
import type { DogProfile } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | { users: DogProfile[] }) => {
  const session = useSession();
  // console.log('conversation in useOtherUser', conversation)
  const otherUser = conversation.users.filter((user) => user.userId !== session.data?.user.id);

  // console.log('other user in useOtherUser', otherUser)
  return otherUser[0];
};

export default useOtherUser;