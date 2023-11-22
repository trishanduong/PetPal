import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { db } from "~/server/db";
import { appRouter } from "~/server/api/root";

// data is there when page loads (loading state will never be hit)
export const generateSSGHelper = () => createServerSideHelpers({
      router: appRouter,
      ctx: {db },
      transformer: superjson, // optional - adds superjson serialization
  });