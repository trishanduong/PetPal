import { getServerAuthSession } from "../auth";
import { TRPCError } from "@trpc/server";

const getUserId = async () => {
    const session = await getServerAuthSession();
    const userId = session?.user.id;
    console.log('userId', userId);
    if(!userId) throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not found."
    });

    return userId;
  };

export default getUserId;