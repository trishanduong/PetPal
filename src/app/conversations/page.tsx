
import { api } from "~/trpc/server";

import Conversation from "./components/convo/Conversation";
import ConversationList from "./components/sidebar/ConversationList";
import MobileConversationList from "./components/sidebar/MobileConversationList";

export default async function Home() {
  const conversations = await api.conversation.getConversations.query();

  // console.log('conversations in home: ', conversations)

  return (
    <div className="flex w-ful h-screen">
      {/* For larger screens */}
      <div className="hidden lg:flex lg:w-full">
        <div className="lg:w-1/5 bg-amber-300 border-r border-amber-400">
          <ConversationList initialItems={conversations} />
        </div>
        <div className='lg:w-4/5'>
          <div className="bg-amber-100 h-screen p-10 font-bold text-2xl text-amber-800">
            Select a conversation.
          </div>
        </div>
      </div>
      {/* Mobile screen */}
      <div className="w-full bg-amber-300 border-r border-amber-400 lg:hidden">
        <MobileConversationList initialItems={conversations} />
      </div>
    </div>
  )
};
