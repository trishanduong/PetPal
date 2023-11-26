'use client'
import {useForm, type SubmitHandler} from 'react-hook-form';

import { useAuth } from "@clerk/nextjs";
import { api } from '~/trpc/react';
import type { DogProfile } from '@prisma/client';

type FormInputs = {
  species: string,
  children: string,
  neutered: string,
  weight: number,
  size: string,
  energyLevel: number,
};


export const TraitsForm = () => {
  const {
    register,
    handleSubmit,
   } = useForm<FormInputs>();

  const {userId} = useAuth();
  if (!userId) {
     return <div>User not authenticated</div>;
  }
  const traits = api.traits.create.useMutation();
  const {data: profile, isLoading, error} = api.profile.getProfileById.useQuery({userId})

  
  if(isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const {id} = profile;
  if(!id) throw new Error("No dog profile id")
  
  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    await traits.mutateAsync({...data, dogProfileId: id});
  };

  return (
    <div className='mt-3'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <label>What is your breed?</label>
        <input type="text" {...register('species',{ required: true })} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />

        <label>Weight</label>
        <div className='mt-2'>
        <input type="number" {...register('weight', { required: true, valueAsNumber: true })} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>
        </div>

        <label>On a scale of 1 to 5, what is your energy level?</label>
        <input type="number" {...register('energyLevel', { required: true, valueAsNumber: true })} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'/>

        <label>Any children?</label>
        <select {...register('children', {required: true})} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'>
            <option value="has children">Has children</option>
            <option value="no children">No children</option>
        </select>


        <label>Neutered?</label>
        <select {...register('neutered', {required: true})} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6' >
            <option value="neutered">Neutered</option>
            <option value="no neutered">Not neutered</option>
        </select>

        <label>Size: </label>
        <select {...register('size')} className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'>
            <option value="small">SMALL: 2 to 22 lbs</option>
            <option value="medium">MEDIUM: 24 to 57 lbs</option>
            <option value="large">LARGE: 59 to 99 lbs</option>
            <option value="xlarge">XLARGE: 100+ lbs</option>
        </select>

        <input type="submit" className='bg-slate-700 text-white'/>
      </form>
    </div>
   )
}

export default TraitsForm;