import type { Post } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import getUserId from "~/server/helpers/getUserId";

const data = z.object({
  postId: z.string().optional(),
  // dogProfileId: z.string(),
  image: z.string(),
  answer: z.string().optional(),
  promptId: z.string(),
});
  
export const postRouter = createTRPCRouter({
  createPosts: privateProcedure
    .input(z.array(data))
    .mutation((async ({ctx, input})=>{
      const userId = await getUserId();
      const dogProfile = await ctx.db.dogProfile.findUnique({
        where: {
          userId,
        }
      })
      const dogProfileId = dogProfile?.id;
      if(!dogProfileId) throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR"
      });

      await ctx.db.post.createMany({
        data: input.map(postData => ({
          promptId: postData.promptId,
          dogProfileId,
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
            id: postData.postId,
            promptId: postData.promptId,
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
    .input(z.object({ dogProfileId: z.string() }))
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
      const userId = await getUserId();
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
