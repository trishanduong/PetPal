
import { getServerAuthSession } from "~/server/auth";
import DesktopNav from "./DesktopNavigation";
import MobileNav from "./MobileNavigation";


async function Navigation({children}:{
  children: React.ReactNode;
}){

  const session = await getServerAuthSession();
  
  return ( 
    <div className="w-full">
      <DesktopNav session={session!}/>
      <MobileNav session={session!}/>
      {/* <DesktopSidebar currentUser={currentUser!}/> */}
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}

export default Navigation; 