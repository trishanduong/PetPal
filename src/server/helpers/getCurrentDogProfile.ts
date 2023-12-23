
import { db } from "../db";

import { getServerAuthSession } from "../auth";

const getCurrentDogProfile = async () => {
  const session = await getServerAuthSession();

  if(!session?.user?.id) return null;
  
  try {
    const currentUser = await db.dogProfile.findUnique({
      where: {
        userId: session.user.id,
      }
    });
    console.log('current user in func', currentUser)
    if(!currentUser){
      console.log('No current user')
      return null;
    };

    return currentUser;
  } catch (error){
    console.log(error, 'INVALID SESSION');
    return null
  }
}

export default getCurrentDogProfile;