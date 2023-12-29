/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* Hook for dynamically changing active status 
   depending on current route or if conversation Id is open */

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from 'react-icons/hi';
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2';

import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathname = usePathname();
  //  const { conversationId } = useConversation();
   
  const routes = useMemo(() => [
    { 
    label: 'Chat', 
    href: '/conversations', 
    icon: HiChat,
    active: pathname === '/conversations'
    },
    { 
    label: 'Swipe', 
    href: '/swipe', 
    icon: HiUsers, 
    active: pathname === '/swipe'
    },
    {
      label: 'Logout', 
      onClick: () => signOut(),
      href: '#',
      icon: HiArrowLeftOnRectangle, 
    }
  ], [pathname]);

  return routes;
};
   
export default useRoutes;