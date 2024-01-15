
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import getCurrentDogProfile from "~/server/helpers/getCurrentDogProfile";
import { pusherServer } from "~/utils/pusher";

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

        // Channel we are sending the message a new key, is called conversationId. Every user listening to ConversationId channel gets that update. 
        await pusherServer.trigger(input.conversationId, 'messages:new', newMessage);
        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
        //Update lastMessage for all users in the conversation 
        updatedConversation.users.map(async(user) => {
          await pusherServer.trigger(user.userId, 'conversation:update', {
            id: input.conversationId,
            messages: [lastMessage]
          });
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

      // console.log('conversations', conversations);
      
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
    }),

  //Delete Messages (current conversation) - unmatching other dog profile
  deleteMessage: privateProcedure 
    .input(z.object({
      conversationId: z.string(),
    }))
    .mutation(async({ctx, input})=>{
      const { conversationId } = input;
      console.log('made into router'); 
      try {
        console.log('made it into the try block')

         //Find existing conversation 
        const existingConversation = await ctx.db.conversation.findUnique({
          where: {
            id: conversationId,
          },
          include: {
            users: true,
          }
        });
        console.log('EXISTING CONVERSATION: ', existingConversation); //yes
        if(!existingConversation){
          throw new TRPCError( {code:"BAD_REQUEST" })
        };

        // Find MatchConversation linked to the Conversation
        
        const matchConversation = await ctx.db.matchConversation.findUnique({ 
          where: { 
            conversationId: conversationId
          } 
        });

        console.log('matchConversation', matchConversation); //match conversation is null;
        if (matchConversation) {
          // Delete MatchConversation
          const deleted = await ctx.db.matchConversation.delete({
            where: { id: matchConversation.id },
          });

          console.log("we deleted matchConversation", deleted);
        }

        const deleteConversation = await ctx.db.conversation.delete({
          where: {
            id: conversationId,
          }
        });
        console.log('DELETE CONVERSATION MODEL', deleteConversation);

        existingConversation.users.forEach((user) => {
          if(!user.id){
            void pusherServer.trigger(user.id, 'conversation:remove', existingConversation); 
          }
        });

      } catch (error) {
        console.log(error, "ERROR_CONVERSATION_DELETE");
        throw new TRPCError({code: "INTERNAL_SERVER_ERROR"})
      }
    }),

    updateSeen: privateProcedure
      .input(z.object({
        conversationId: z.string(),
      }))
      .mutation(async({ ctx, input })=>{ 
        const { conversationId } = input;
        try {
          //Get current dog profile
          const currentDog = await getCurrentDogProfile();
          if(!currentDog) throw new TRPCError({ code:"BAD_REQUEST", message:"No current dog profile found" })
          //Find the conversation 
          const currentConversation = await ctx.db.conversation.findUnique({
            where: {
              id: conversationId,
            },
            include: {
              messages: {
                include: {
                  seenBy: true, 
                }
              },
              users: true,
            }
          });

          if(!currentConversation) throw new TRPCError({ code: "BAD_REQUEST", message: "CurrentConversation not found."});
          //Find the last message
          const lastMessage = currentConversation.messages[currentConversation.messages.length - 1];
          if(!lastMessage) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "LastMessage not found."})

          //Update the seen of the last message:
          const updatedMessage = await ctx.db.message.update({
            where: {
              id: conversationId,
            },
            include: {
              sender: true,
              seenBy: true,
            },
            data: {
              seenBy: {
                connect: {
                  id: currentDog?.id
                }
              }
            }
          });

          // await pusherServer.trigger(currentDog.id, 'conversation:update', {
          //   id: conversationId,
          //   messages: [ updatedMessage ]
          // });

          // If user has already seen the message, no need to go further
          if (lastMessage.seenIds.indexOf(currentDog?.id) !== -1) {
            return;
          };

          // await pusherServer.trigger(conversationId, 'message:update', updatedMessage);

        } catch (error) {
          console.log(error, 'ERROR IN updateSeen');
        }
      })
});