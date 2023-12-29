/* Find all users excluding our own users; */

import { getServerAuthSession } from "../auth";
import { db } from "../db";

const getUsers = async () => {
  const session = await getServerAuthSession();

  if(!session?.user){
    return [];
  }

  try {
    const users = await db.user.findMany({
      where: {
        NOT: {
          email: session.user.email,
        }
      }
    });

    return users
  } catch (error){
    return [];
  }
}

export default getUsers;