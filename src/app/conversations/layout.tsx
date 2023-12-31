import useOtherUser from "~/server/helpers/useOtherUsers";
import SideBar from "./components/Sidebar";
import ConversationList from "./components/sidebar/ConversationList";

import { api } from "~/trpc/server"

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const conversations = await api.conversation.getConversations.query();
  console.log('conversations: ', conversations)
  
  return (
    <SideBar>
      <div className="h-full">
        <ConversationList 
          initialItems={conversations}
        />
        {children}
      </div>
    </SideBar>
  )
}