import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

import type { Traits } from '@prisma/client';

function isTrait(obj: Traits){
    return obj && typeof obj === 'object' && 'species' in obj; 
  }

export const traitsRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({
      species: z.string(),
      size: z.string(),
      weight: z.number(),
      children: z.string(),
      neutered: z.string(),
      energyLevel: z.number(),
      dogProfileId: z.bigint(),
    }))
    .mutation(async({ctx, input})=>{

      const traits = await ctx.db.traits.create({
        data: {
          species: input.species,
          size: input.size,
          weight: input.weight,
          children: input.children,
          neutered: input.neutered,
          energyLevel: input.energyLevel,
          dogProfileId: input.dogProfileId,
        }
      });
      return traits;
    }),

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
