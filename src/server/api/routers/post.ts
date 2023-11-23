import type { Post } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getPostsByUser: publicProcedure
    .input(z.object({ dogProfileId: z.bigint() }))
    .query(async({ctx, input }) => {
      const posts: Post[] = await ctx.db.post.findMany({
        where: {
          dogProfileId: input.dogProfileId,
        }
      })
      return {
        posts,
      };
    })
});
