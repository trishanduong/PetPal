
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import getCurrentDogProfile from "~/server/helpers/getCurrentDogProfile";

export const conversationRouter = createTRPCRouter({
//  get multiple conversations based off id
  getConversations: privateProcedure
    .query(async({ctx})=>{
      const currentDog = await getCurrentDogProfile();
      if(!currentDog) throw new TRPCError({code: "BAD_REQUEST", message:"Current dog not found"});
      
      const conversations = await ctx.db.conversation.findMany({
        where: {
          users: {
            some: {
              userId: currentDog.userId,
            }
          }
        },
        include: {
            users: true, 
            messages: {
              include: {
                sender: true,
                seenBy: true,
              }
            },
        },
        orderBy: {
            lastMessageAt: 'desc',
        },
      });

      console.log('conversations', conversations);

      return conversations;
    }),
  });