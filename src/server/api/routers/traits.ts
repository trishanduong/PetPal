import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import type { Traits } from '@prisma/client';

function isTrait(obj: Traits){
    return obj && typeof obj === 'object' && 'species' in obj; 
  }
  
export const traitsRouter = createTRPCRouter({
  //get traits
  getTraitsById: publicProcedure
    .input(z.object({
      traitsId: z.string(),
    }))
    .query(async({ctx, input})=>{
      //console.log('input traitsId')
      const traits = await ctx.db.traits.findUnique({
        where: {
          id: input.traitsId,
        }
      });

      if (!traits || !isTrait(traits)) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Traits not found',
        });
      }
  
      //console.log('traits in router', traits)
      return traits;
    })
});
