/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const followRouter = createTRPCRouter({
  //update 'following' of dog profile:
  updateFollowing: privateProcedure
    .input(z.object({
      currentUserId: z.bigint(),
      likedId: z.bigint(),
    }))
    .mutation(async({ctx, input})=>{
      await ctx.db.follows.create({
        data: {
          followingId: input.likedId,
          followedById: input.currentUserId,
        }
      });
    }),
});