/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const promptRouter = createTRPCRouter({
  getPrompt: publicProcedure
    .input(z.object({
      promptId: z.bigint(),
    }))
    .query(async({ctx, input})=>{
      
      const prompt = await ctx.db.prompt.findUnique({
        where: {
          id: input.promptId,
        },
      });

      if(!prompt || prompt === null) throw new TRPCError({
        code:"BAD_REQUEST",
        message: "No prompt found"
      });

    return prompt;
  }),
  //Prompts for the POSTS form ('/prompts')
  getAllPrompts: publicProcedure
    .query(async({ctx})=>{
      const prompts = await ctx.db.prompt.findMany({});
      //console.log('prompts', prompts);
      return prompts;
    })
});