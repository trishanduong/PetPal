/* Chatbox body that holds all the messages */
'use client'

import { useEffect, useRef, useState } from "react";

import useConversation from "~/server/helpers/useConversation";
import type { FullMessageType } from "~/utils/types";

import MessageBox from "./MessageBox";
import { pusherClient } from "~/utils/pusher";
import { find } from "lodash";
import { api } from "~/trpc/react";

interface BodyProps {
  initialMessages: FullMessageType[], 
};

const Body: React.FC<BodyProps> = ({
  initialMessages
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
  const updateMessage = api.conversation.updateSeen.useMutation();
  //Update seen
  useEffect(() => {
    // const updateSeenAsync = async () => {
    //   try {
    //     await updateMessage.mutateAsync({ conversationId });
    //   } catch (error) {
    //     console.error("Failed to update message:", error);
    //   }
    // };
  
    // void updateSeenAsync();
  }, [conversationId, updateMessage]);
  

  //Real Time Message Updates via Pusher
  useEffect(()=>{
     pusherClient.subscribe(conversationId); 
     bottomRef?.current?.scrollIntoView();

     //This message handler will receive the messege from Pusher
     const messageHandler = (message: FullMessageType) => {
        //Get access to the current list of messages and compare the current list of messages to the find query (that searches if there is any message in our current array which has an id of this new message that is coming in). Makes sure we don't make duplicate messages when doing this function  
        setMessages((current) => {
            if(find(current, { id: message.id })){
              return current;
            };

            return [ ... current, message ]
        });
        console.log('messages after setMessages', messages)
        bottomRef.current?.scrollIntoView();
     };  

     const updateMessageHandler = (newMessage: FullMessageType ) => {
        setMessages((current)=> current.map((currentMessage) => {
            // If we find the message we're looking at, update the latest message to new message
            if(currentMessage.id === newMessage.id){
              return newMessage; 
            }

            return currentMessage;
        }))
     };

     pusherClient.bind('messages:new', messageHandler);
     pusherClient.bind('message:update', updateMessageHandler);

     return (() => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
     })
  }, [conversationId, messages]);
  
  
  
  return (
    <div className="lg:flex-1 overflow-y-auto bg-amber-100">
      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  )
}

export default Body;