import { api } from "~/trpc/server";

import ConversationList from "../components/sidebar/ConversationList";
import Header from "../components/convo/Header";
// import Body from "./components/Body";
// import Form from "./components/Form";

import EmptyState from "~/app/_components/EmptyState";
import Form from "../components/convo/Form";

interface IParams {
  conversationId: string,
}

const conversationId = async ({params} : {params: IParams}) => {
   const conversations = await api.conversation.getConversations.query();
   const conversation = await api.conversation.getConversationById.query({conversationId: params.conversationId});

  //  const messages = await getMessages(params.conversationId);

     if(!conversation || !conversations) {
      return (
        <div className="lg:pl-80 h-full ">
          <div className="h-full flex flex-col">
            <EmptyState />
          </div>
        </div>
      )
     }
    
    return (
      <div className="flex w-ful h-screen">
        <div className="lg:w-1/5 bg-amber-300 border-r border-amber-400">
          <ConversationList initialItems={conversations}/>
        </div>
        <div className='lg:w-4/5'>
          <div className="bg-amber-100 h-screen">
            <Header conversation={conversation} />
            <Form  />
          </div>
        </div>
      </div>
    )
}

export default conversationId;