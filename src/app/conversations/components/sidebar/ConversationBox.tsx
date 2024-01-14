'use client'

import clsx from "clsx"; 

import { useCallback, useMemo } from 'react'; 
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

// import type { Conversation, Message, User} from "@prisma/client";
import { format, compareDesc } from "date-fns";

import type { FullConversationType } from "~/utils/types";
import useOtherUser from "~/server/helpers/useOtherUsers";
import Avatar from "~/app/_components/Avatar";

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean,
};

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected
}) => {

    const session = useSession();
    const router = useRouter();
    const otherUser = useOtherUser(data);

    const handleClick = useCallback(() => {
      router.push(`/conversations/${data.id}`);
    }, [data, router]);
  
    const lastMessage = useMemo(() => {
      const messages = data.messages || [];
      if (messages.length === 0) {
        return null;
      };
      console.log('MESSAGES: ', messages) //.filter((message)=>{message.createdAt()})
      const sortedMessages = messages.sort((a, b) => 
      compareDesc(a.createdAt, b.createdAt)
      );

      return sortedMessages[0];
    }, [data.messages]);
    console.log('lastMessage', lastMessage);

    const userId = useMemo(() => session.data?.user?.id,
    [session.data?.user?.id]);
    
    const hasSeen = useMemo(() => {
      if (!lastMessage) {
        return false;
      }
  
      const seenArray = lastMessage.seenBy || [];
  
      if (!userId) {
        return false;
      }
  
      return seenArray
        .filter((user) => user.userId === userId).length !== 0;
    }, [lastMessage, userId]);
  
    const lastMessageText = useMemo(() => {
      if (lastMessage?.image) {
        return 'Sent an image';
      }
      
      if (lastMessage?.body) {
        return lastMessage?.body
      };
  
      return 'Started a conversation';
    }, [lastMessage]);

    if(!otherUser) return null;

    return ( 
        <div
          onClick={handleClick}
          className={clsx(`
            w-full 
            relative 
            flex 
            items-center 
            space-x-3 
            p-3 
            hover:bg-amber-100
            rounded-lg
            transition
            cursor-pointer
            `,
            selected ? 'bg-amber-200' : 'bg-white'
          )}
        >
          <Avatar user={otherUser} />
          <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <div className="flex justify-between items-center mb-1">
                <p className="text-md font-medium text-gray-900">
                  {data.name ?? otherUser.name}
                </p>
                {lastMessage?.createdAt && (
                  <p 
                    className="
                      text-xs 
                      text-gray-400 
                      font-light
                    "
                  >
                    {format(new Date(lastMessage.createdAt), 'p')}
                  </p>
                )}
              </div>
              <p 
                className={clsx(`
                  truncate 
                  text-sm
                  `,
                  hasSeen ? 'text-gray-500' : 'text-black font-medium'
                )}>
                  {lastMessageText}
                </p>
            </div>
          </div>
        </div>
      );
    }

export default ConversationBox;