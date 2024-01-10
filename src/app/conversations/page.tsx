
import { api } from "~/trpc/server";

import Conversation from "./components/convo/Conversation";
import ConversationList from "./components/sidebar/ConversationList";

export default async function Home() {
  const conversations = await api.conversation.getConversations.query();

  console.log('conversations in home: ', conversations)

  return (
    <div className="flex w-ful h-screen">
      <div className="lg:w-1/5 bg-amber-300 border-r border-amber-400">
        <ConversationList initialItems={conversations}/>
      </div>
      <div className='lg:w-4/5'>
        <div className="bg-amber-100 h-screen">
          <Conversation />
        </div>
      </div>
    </div>
  )
};
