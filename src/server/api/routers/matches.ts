/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

import type { Match } from "@prisma/client";

import getCurrentDogProfile from "~/server/helpers/getCurrentDogProfile";

export const matchesRouter = createTRPCRouter({
  handleSwipeRight: privateProcedure
    .input(z.object({
      swipingDogId: z.string(),
      swipedDogId: z.string()
    }))
    .mutation(async ({ctx, input})=>{
      const { swipingDogId, swipedDogId } = input;

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
        
            return newPotentialMatch;
          } else {
              
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
              console.log('newConversation', newConversation)

            // This might mean doing nothing, updating the existing record, or even creating a conversation if it's now a mutual match
            return existingMatch;
          }
    })
});

