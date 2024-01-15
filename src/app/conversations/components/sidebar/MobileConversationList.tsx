'use client'

import { useEffect, useMemo, useState } from "react";
import useConversation from "~/server/helpers/useConversation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { MdOutlineGroupAdd } from "react-icons/md"
import type { FullConversationType } from "~/utils/types";

import ConversationBox from "./ConversationBox";
import { pusherClient } from "~/utils/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: FullConversationType[];
}

const MobileConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  const session = useSession();
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  
  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(()=>{
    return session.data?.user.id;
  }, [ session.data?.user.id ]);

  useEffect(() => {
    if(!pusherKey){
      return;
    };

    //Attach our new conversation to the items
    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        //Check if the conversation we want to add already exists
        if(find(current), {
          id: conversation.id,
        }){
          return current;
        }

        return [ conversation, ...current ]
      })
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current)=> current.map((currentConversation) => {
        if(currentConversation.id === conversation.id){
          return {
            ...currentConversation, 
            messages: conversation.messages,
          }
        };

        return currentConversation;
      }))
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current)=> current.filter((convo) => convo.id !== conversation.id));

      if(conversationId === conversation.id) {
        router.push('/conversations')
      }
    }
 
    pusherClient.subscribe(pusherKey);
    pusherClient.bind('conversation:new', newHandler);
    // pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      // pusherClient.unbind('conversation:update', updateHandler); 
      pusherClient.unbind('conversation:remove', removeHandler);

    }
  }, [ pusherKey, conversationId, router ]);

  return ( 
    <>
      <div className='pt-12'>
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="
              text-2xl
              font-bold
              text-neutral-800
            ">Messages
            </div>
            <div 
              className="
                rounded-full
                p-2
                bg-gray-100
                text-gray-600
                cursor-pointer
                hover:opacity-75
                transition
              "
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId === item.id}
            />
            ))}
        </div>
      </div>
    </>
  )
}

export default MobileConversationList; 
