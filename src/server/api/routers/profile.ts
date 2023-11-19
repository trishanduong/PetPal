import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";


export const profileRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({
      name: z.string().min(1),
      age:z.number(),
      bio:z.string().max(255),
      sex: z.string(),
    }))
    .mutation(async ({ctx, input})=>{
      const {name, sex, age, bio} = input;
      const {userId} = ctx;

      if(typeof userId !== "string") throw new TRPCError({
        code:"INTERNAL_SERVER_ERROR",
        message: "No user"
      });
 
    
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const profile = await ctx.db.dogProfile.create({
        data: {
         name,
         age,
         bio,
         sex,
         userId,
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return profile;
    })
});
