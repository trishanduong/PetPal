import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getName: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ctx})=>{
      await ctx.db.post.create({user})
    })
});
