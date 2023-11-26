import type { Post } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

const DataSchema = z.object({
  image: z.string(),
  answer: z.string().optional(),
});
  
const FormInputsSchema = z.record(DataSchema);

export const postRouter = createTRPCRouter({
  createPosts: privateProcedure
    .input(FormInputsSchema)
    .mutation((({ctx, input})=>{
      console.log('input', input)
      // const post = await ctx.db.post.createMany({
      //   promptId: input.promptId,
      //   image: input.image,
      //   answer: input.answer,
      // })
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
