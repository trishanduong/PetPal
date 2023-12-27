import { useSession } from "next-auth/react";
import { useMemo } from "react";
import type { FullConversationType } from "~/utils/types";
import type { DogProfile, User } from "@prisma/client";
import getCurrentDogProfile from "./getCurrentDogProfile";

const useOtherUser = (conversation: FullConversationType | { users: DogProfile[] }) => {
  const session = useSession();
  console.log('conversation in useOtherUser', conversation)

  const otherUser = useMemo(async() => {
    // const currentUserEmail = session.data?.user?.email;
    // const currentDog = await getCurrentDogProfile();

    // const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);
    const otherUser = conversation.users.filter((user) => user.userId !== session.data?.user.id);

    return otherUser[0];
  }, [session.data?.user, conversation.users]);

  return otherUser;
};

export default useOtherUser;