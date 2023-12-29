'use client';

import clsx from "clsx";

import useConversation from "~/server/helpers/useConversation";
import EmptyState from "../_components/EmptyState";

const Home = () => {
    const { isOpen } = useConversation();

  return (
    <div className={
        clsx(
          'lg:pl-80 h-screen lg:block',
          isOpen ? 'block' : 'hidden'
        )
      }
    >
      <EmptyState />
    </div>
  )
};

export default Home;