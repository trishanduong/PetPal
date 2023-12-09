/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import getUserId from "~/server/helpers/getUserId";

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
    }))
    .mutation(async({ctx, input})=>{
      const userId = await getUserId();
      const dogProfile = await ctx.db.dogProfile.findUnique({
        where: {
          userId,
        }
      });
      console.log('dogProfileId', dogProfile?.id);
      const dogProfileId = dogProfile?.id;
      if(!dogProfileId) throw new TRPCError({
        code: "NOT_FOUND",
        message: "No dogProfileId found."
      })

      const traits = await ctx.db.traits.create({
        data: {
          species: input.species,
          size: input.size,
          weight: input.weight,
          children: input.children,
          neutered: input.neutered,
          energyLevel: input.energyLevel,
          dogProfileId: BigInt(dogProfileId),
        }
      });
      const traitsId = traits.id;
      
      await ctx.db.dogProfile.update({
        where: {
          id: dogProfileId,
        },
        data: {
          traitsId: traitsId,
        },
      });
      console.log('update dog profile traits', dogProfile);
      return traits;
    }),

  updateTraits: privateProcedure
    .input(z.object({
      species: z.string(),
      size: z.string(),
      weight: z.number(),
      children: z.string(),
      neutered: z.string(),
      energyLevel: z.number(),
      traitsId: z.string(),
    }))
    .mutation(async({ctx, input})=>{
      //energy and weight type 
      if(typeof input.weight !== 'number') Number(input.weight);
      if(typeof input.energyLevel !== 'number') Number(input.energyLevel);
      
      const traits = await ctx.db.traits.update({
        where: {
          id: input.traitsId,
        },
        data: {
          species: input.species,
          size: input.size,
          weight: input.weight,
          children: input.children,
          neutered: input.neutered,
          energyLevel: input.energyLevel,
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
