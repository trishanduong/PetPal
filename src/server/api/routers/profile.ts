import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  //Create a new profile (sign up)
  create: privateProcedure
    .input(z.object({
      name: z.string().min(1),
      age:z.number(),
      bio:z.string().max(255),
      sex: z.string(),
      profilePic: z.string(),
      location: z.string(),
    }))
    .mutation(async ({ctx, input})=>{
      const {name, sex, age, bio, profilePic, location} = input;
      const userId = ctx.clerk;
      console.log('router', userId)
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
         city: location,
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
          userId: userId,
        },
        data: {
          profilePic},
      })

      return profile;
    }),
    
  updateProfile: privateProcedure
    .input(z.object({
      name: z.string(), 
      age: z.number(), 
      bio: z.string().max(255), 
      sex: z.string(),  
      location: z.string(),
      userId: z.string(),
    }))
    .mutation(async({ctx, input})=>{
      if(typeof input.age === 'string') Number(input.age);
      
      const profile = await ctx.db.dogProfile.update({
        where: {
          userId: input.userId,
        },
        data: {
          name: input.name,
          age: input.age,
          bio: input.bio,
          sex: input.sex,
          city: input.location,
        },
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

      //console.log('profile in profile router', profile)
      if (!profile) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Profile not found',
        });
      }

      return profile;
    }),
    getRandomProfile: publicProcedure
    .input(z.object({
      excludeUserId: z.string(),
    }))
    .query(async({ctx, input})=>{
      const totalUsers = await ctx.db.dogProfile.count({
        where: {
          userId: {
            not: input.excludeUserId,
          }
        }
      });
      //console.log('totalUsers', totalUsers);
      const randomIndex = Math.floor(Math.random() * totalUsers);
      const randomUser = await ctx.db.dogProfile.findMany({
        take: 1,
        skip: randomIndex,
        where: {
          userId: {
            not: input.excludeUserId
          }
        }
      });
      console.log('user', randomUser);
      return randomUser[0];
    }),
});