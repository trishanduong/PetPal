'use client'
import {useForm, type SubmitHandler} from 'react-hook-form';
import { useAuth } from "@clerk/nextjs";
import { api } from '~/trpc/react';

import { useRouter } from 'next/navigation';

import FormProgressBar from '~/app/_components/FormProgressBar';

type FormInputs = {
  species: string,
  children: string,
  neutered: string,
  weight: number,
  size: string,
  energyLevel: number,
};


export default function TraitsForm () {
  const router = useRouter();
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
    router.push('/ProfileForm/prompts')
  };

  return (
    <div className='mt-5'>
      <FormProgressBar percent={60}/>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <label>What is your breed?</label>
        <input type="text" {...register('species',{ required: true })} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ' />
        
        <label>On a scale of 1 to 5, what is your energy level?</label>
        <input type="number" {...register('energyLevel', { required: true, valueAsNumber: true })} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'/>
        
        <div className="flex justify-between">
          <div className='flex flex-col'>
            <label>Weight: </label>
            <input type="number" {...register('weight', { required: true, valueAsNumber: true })} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'/>
          </div>
        
          <div className='flex flex-col'>
            <label>Any children?</label>
            <select {...register('children', {required: true})} className='block w-full rounded-md border-0 px-1 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'>
                <option value="has children">Has children</option>
                <option value="no children">No children</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label>Neutered?</label>
            <select {...register('neutered', {required: true})} className='block w-full rounded-md border-0 px-1.5 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'>
                <option value="neutered">Neutered</option>
                <option value="no neutered">Not neutered</option>
            </select>
          </div>
        </div>
        
        <label>Size: </label>
        <select {...register('size')} className='block w-full rounded-md border-0 px-1 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'>
            <option value="small">SMALL: 2 to 22 lbs</option>
            <option value="medium">MEDIUM: 24 to 57 lbs</option>
            <option value="large">LARGE: 59 to 99 lbs</option>
            <option value="xlarge">XLARGE: 100+ lbs</option>
        </select>
        <div className="flex justify-center">
          <input type="submit" value="Next" className="bg-stone-500 text-white font-bold uppercase text-sm px-5 py-3 rounded-full shadow hover:bg-stone-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-2/4"/>
        </div>
      </form>
    </div>
   )
}
