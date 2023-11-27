import type { Post } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

const data = z.object({
  dogProfileId: z.string(),
  image: z.string(),
  answer: z.string().optional(),
  promptId: z.string(),
});
  
export const postRouter = createTRPCRouter({
  createPosts: privateProcedure
    .input(z.array(data))
    .mutation((async ({ctx, input})=>{
      console.log('input', input)
      await ctx.db.post.createMany({
        data: input.map(postData => ({
          promptId: BigInt(postData.promptId),
          dogProfileId: BigInt(postData.dogProfileId),
          image: postData.image,
          answer: postData.answer,
        })),
      });
      
      return;
    })),
  getPostsByUser: publicProcedure
    .input(z.object({ dogProfileId: z.bigint() }))
    .query(async({ctx, input }) => {
      const posts: Post[] = await ctx.db.post.findMany({
        where: {
          dogProfileId: input.dogProfileId,
        }
      })
      return posts;
    })
});
