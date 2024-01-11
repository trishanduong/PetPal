'use client';
import clsx from "clsx";

import { useSession } from "next-auth/react";
import { format } from "date-fns";
import type { FullMessageType } from "~/utils/types";
import Avatar from "~/app/_components/Avatar";
import Image from "next/image";


interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox:React.FC<MessageBoxProps> = ({
   data,
   isLast,
}) => {
  const session = useSession();
  // const hi = session.data?.user.id
  const isOwn = session?.data?.user.id === data?.sender.userId;
  // filtering through data.seen and removing sener user fro m the people hwo saw the mesasge (from seeing their own message), map over filtered array, and return name of each user that has seen the message
  const seenList = (data.seenBy || [])
    .filter((user)=>{ user.userId !== data.sender.userId})
    .map((user)=> user.name)
    .join(', ');
  // console.log(seenList)
  
  const container = clsx(`
    flex gap-3 p-4`,
    isOwn && "justify-end")

  const avatar = clsx(isOwn && "order-2")
  const body = clsx(`flex flex-col gap-2`, 
    isOwn && "items-end"
  )
  const message = clsx(`text-sm w-fit overflow-hidden`,
    isOwn ? "bg-sky-500 text-white" : 'bg-gray-100',
    data.image ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  )
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body} >
        <div className="flex items-center gap-1">
           <div className="text-sm text-gray-500">
              {data.sender.name}
            </div> 
            <div className="text-xs text-gray-400">
              {format(new Date(data.createdAt), 'p')}
            </div>
        </div>
        <div className={message}>
          {data.image ? (
            <Image alt="Image" height={288} width={288} src={data.image} className="object-cover cursor-pointer hover:scale-110 transition translate" />
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div 
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBox;