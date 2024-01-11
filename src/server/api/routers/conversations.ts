
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import getCurrentDogProfile from "~/server/helpers/getCurrentDogProfile";

export const conversationRouter = createTRPCRouter({
  //Create Message
  createMessage: privateProcedure
    .input(z.object({
      message: z.string(),
      image: z.string().optional(),
      conversationId: z.string(),
    }))
    .mutation(async({ctx, input})=>{
      try {
        const user = await getCurrentDogProfile();
        if(!user) throw new TRPCError({ code: "BAD_REQUEST", message: "No Dog Profile found" })
        const newMessage = await ctx.db.message.create({
          data: {
            body: input.message,
            image: input.image,
            conversation: {
              connect: {
                id: input.conversationId,
              }
            },
            sender: {
              connect: {
                id: user?.id
              }
            },
            seenBy: {
              connect: {
                id: user?.id,
              }
            }
          },
          include: {
            seenBy: true,
            sender: true,
          }
        });
        console.log(newMessage);

        const updatedConversation = await ctx.db.conversation.update({
          where: {
            id: input.conversationId,
          },
          data: {
            lastMessageAt: new Date(),
            messages: {
              connect: {
                id: newMessage.id,
              }
            }
          },
          include: {
            users: true,
            messages: {
              include: {
                seenBy: true,
              }
            } 
          }
        });
        return newMessage;
      } catch(error) {
        console.log(error, 'ERROR_MESSAGES');
      }
    }),
  //Get Messages
  getMessages: privateProcedure 
    .input(z.object({
      conversationId: z.string(),
    }))
    .query(async({ctx, input})=>{
      try {
        const messages = await ctx.db.message.findMany({
          where: {
            conversationId: input.conversationId,
          },
          include: {
            sender: true,
            seenBy: true, 
          },
          orderBy: {
            createdAt: 'asc'
          }
        });
    
        return messages;
      } catch (error){
        return [];
      }
    }),
  //Get multiple conversations based off ID
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
  getConversationById: privateProcedure
    .input(z.object({
      conversationId: z.string(),
    }))
    .query(async({ctx, input})=>{
      try {
        const currentUser = await getCurrentDogProfile();
        if(!currentUser) return null;
        const conversation = await ctx.db.conversation.findUnique({
          where: {
            id: input.conversationId,
          },
          include: {
            users: true,
          }
        })
        return conversation; 
        
      } catch (error){
        return null;
      }
    })
});