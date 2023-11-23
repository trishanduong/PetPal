import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
// import type { DogProfile } from "@prisma/client";
import type { Traits } from '@prisma/client';


function isTrait(obj: Traits){
  return obj && typeof obj === 'object' && 'species' in obj; // Add more checks as necessary
}


export const profileRouter = createTRPCRouter({
  //Create a new profile (sign up)
  create: privateProcedure
    .input(z.object({
      name: z.string().min(1),
      age:z.number(),
      bio:z.string().max(255),
      sex: z.string(),
      profilePic: z.string(),
      
    }))
    .mutation(async ({ctx, input})=>{
      const {name, sex, age, bio, profilePic} = input;
      const {userId} = ctx.clerk.auth;
      
      console.log('profile router:', userId);
      
      if(typeof userId !== "string") throw new TRPCError({
        code:"INTERNAL_SERVER_ERROR",
        message: "No user"
      });

      const profile = await ctx.db.dogProfile.create({
        data: {
         name,
         age,
         bio,
         sex,
         profilePic,
         userId,
        }
      });
      
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return profile;
    }),

  //Update or change the profile pic
  updateProfilePic: privateProcedure
    .input(z.object({
      profilePic: z.string(),
    }))
    .mutation(async({ctx, input})=>{
      const {profilePic} = input;
      const {userId} = ctx;
      
      if(typeof userId !== "string") throw new TRPCError({
        code:"INTERNAL_SERVER_ERROR",
        message: "No user"
      });

      const profile = await ctx.db.dogProfile.update({
        where: {
          userId: userId, // Assuming 'id' is the field name for user ID
        },
        data: {
          profilePic},
      })

      return profile;
    }),
  
  //Get dog profile using userId
  getProfileById: publicProcedure
    .input(z.object({
      userId: z.string(),
    }))
    .query(async({ctx, input})=>{
      //console.log('query', input.userId)
      const profile = await ctx.db.dogProfile.findUnique({
        where: {
          userId: input.userId,
        }
      })
      
      if (!profile) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Profile not found',
        });
      }

      return profile;
    }),
});