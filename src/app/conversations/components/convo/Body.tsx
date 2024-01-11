'use client'
import { useEffect, useRef, useState } from "react";

import useConversation from "~/server/helpers/useConversation";
import type { FullMessageType } from "~/utils/types";

import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessages: FullMessageType[], 
};

const Body: React.FC<BodyProps> = ({
  initialMessages
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();
//   useEffect(()=>{
//     axios.post(`/api/conversations/${conversationId}/seen`)
//   }, [conversationId]);
  
  return (
    <div className="flex-1 overflow-y-auto bg-amber-100">
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