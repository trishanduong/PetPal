
import getCurrentDogProfile from "~/server/helpers/getCurrentDogProfile";
import DesktopSidebar from "./sidebar/DesktopSidebar";

async function SideBar({children}:{
  children: React.ReactNode;
}){

  const currentUser = await getCurrentDogProfile();
  // console.log('current user', currentUser);

  return (
    <div>
      <DesktopSidebar currentUser={currentUser!}/>
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  )
}


  
export default SideBar; 