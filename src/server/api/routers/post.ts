import type { Post } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

const data = z.object({
  postId: z.string().optional(),
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

  updatePosts: privateProcedure
    .input(z.array(data))
    .mutation((({ctx, input}) => {
      console.log('input', input);

      const updates = input.map(async (postData)=> {
        if(!postData.postId) throw new Error('No post data');
        await ctx.db.post.update({
          where: { 
            id: BigInt(postData.postId),
            promptId: BigInt(postData.promptId),
          },
          data: {
            image: postData.image,
            answer: postData.answer,
          },
        });
      })

      return updates;
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
    }),

  //Get posts
  getPostsForEdit: privateProcedure
    .query(async({ ctx }) => {
      const userId = ctx.clerk;
      if (userId === null) {
        // Handle the null case, maybe return an error or empty array
        return undefined;
      }

      const dogProfile = await ctx.db.dogProfile.findUnique({
        where: {
          userId,
        }
      });
      const posts: Post[] = await ctx.db.post.findMany({
        where: {
          dogProfileId: dogProfile?.id,
        }
      })
      // console.log('posts in post router', posts)
      return posts;
    })
});
