import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({
      name: z.string().min(1),
      age:z.number(),
      bio:z.string().max(255),
      sex: z.string(),
    }))
    .mutation(async ({input, ctx})=>{

      const {userId} = ctx;
      if(typeof userId !== "string") throw new TRPCError({
        code:"INTERNAL_SERVER_ERROR",
        message: "No user"
      });

      
      const profile = await ctx.db.dogProfile.create({
        data: {
          ...input,
          userId,
        }
      });

      console.log('profile', profile)
      return profile;
    })
});
