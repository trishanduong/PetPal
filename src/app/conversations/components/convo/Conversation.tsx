'use client'

import useConversation from "~/server/helpers/useConversation";

import EmptyState from "~/app/_components/EmptyState";
import clsx from "clsx";

const Conversation: React.FC = () => {
  const { isOpen } = useConversation();

  return (
    <div className={
      clsx( isOpen ? 'block' : 'hidden')
    }>
      {/* <EmptyState /> */}
    </div>
  )
}

export default Conversation;
