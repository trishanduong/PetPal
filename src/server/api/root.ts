import { postRouter } from "~/server/api/routers/post";
import { profileRouter } from "./routers/profile";
import { createTRPCRouter } from "~/server/api/trpc";
import { traitsRouter } from "./routers/traits";
import { promptRouter } from "./routers/prompt";
import { followRouter } from "./routers/follows";
import { conversationRouter } from "./routers/conversations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  profile: profileRouter,
  traits: traitsRouter,
  prompt: promptRouter,
  follows: followRouter,
  conversation: conversationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
