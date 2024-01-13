import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

import type { Match } from "@prisma/client";

export const matchesRouter = createTRPCRouter({
  handleSwipeRight: privateProcedure
    .input(z.object({
      swipingDogId: z.string(),
      swipedDogId: z.string()
    }))
    .mutation(async ({ctx, input})=>{
      const { swipingDogId, swipedDogId } = input;

      try {
        const existingMatch = await ctx.db.match.findFirst({
          where: {
            OR: [
              { dog1Id: swipingDogId, dog2Id: swipedDogId },
              { dog1Id: swipedDogId, dog2Id: swipingDogId },
            ],
          },
        });

        if (!existingMatch) {
          // No existing match or potential match found - create a new potential match
          const newPotentialMatch: Match = await ctx.db.match.create({
            data: {
              dog1Id: swipingDogId, 
              dog2Id: swipedDogId, 
            },
          });
          console.log('created potential match: ', newPotentialMatch);
      
          return newPotentialMatch;
        } else {
          //if we have a mutual match, create conversation between users
          const newConversation = await ctx.db.conversation.create({
              data: {
                  isGroup: false,
                  matchConversation: {
                      create: {
                        matchId: existingMatch.id,
                      },
                  },
                  users: {
                      connect: [
                          { id: swipingDogId }, 
                          { id: swipedDogId} 
                      ],
                  },
                },
            });

          console.log('newConversation', newConversation);

          return {
            existingMatch,
            newConversation,
          };
        }

      } catch (error) {
        console.log(error, 'ERROR IN HANDLE RIGHT SWIPE')
      }
    }),

    handleSwipeLeft: privateProcedure
      .input(z.object({
        swipingDogId: z.string(),
        swipedDogId: z.string(),
      }))
      .mutation(async({ctx, input})=>{
        const { swipingDogId, swipedDogId } = input;

        const deletedMatches = await ctx.db.match.deleteMany({
            where: {
                OR: [
                    { dog1Id: swipingDogId, dog2Id: swipedDogId },
                    { dog1Id: swipedDogId, dog2Id: swipingDogId },
                ],
            },
        });

        console.log('no match.');

        return { count: deletedMatches.count };
      })

});

