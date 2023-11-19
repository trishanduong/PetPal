'use client'

import { useUser } from '@clerk/nextjs';
import { api } from '~/trpc/react';

import {useForm, type SubmitHandler} from 'react-hook-form';

export enum SexEnum {
  female = "female",
  male = "male",
  other = "other",
};


export type FormInputs = {
  name: string,
  age: number,
  bio: string,
  sex: SexEnum,
  profilePic: string,
};

export function ProfileForm() {
  const {
    register,
    handleSubmit,
  } = useForm<FormInputs>();

  const user = useUser();
  if(!user) return null;
  const profile = api.profile.create.useMutation();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    await profile.mutateAsync({...data})
  }


  return (
    <div>
      <div className="font-bold text-xl mb-2">Introduce your fur baby!</div>
      
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-64 h-64 rounded-full border-2 border-gray-300 border-dashed cursor-pointer bg-amber-50 dark:hover:bg-amber-800 dark:bg-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:hover:border-amber-500 dark:hover:bg-amber-600">
          <div className="flex flex-col items-center justify-center">
              <p className="mb-2 text-sm text-amber-500 dark:text-amber-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-amber-500 dark:text-amber-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div> 

      
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <div className='flex flex-wrap -mx-3 mb-6'>
          <label>Profile Picture</label>
          <input type="file" title=" " {...register("profilePic")} className="block w-full text-smrounded-lg cursor-pointer color-transparent" aria-describedby="user_avatar_help" id="user_avatar" />
                <label>{`Whats your dog's name?`}</label>
                <input {...register("name",{ required: true })} />
              </div>
          <div className='w-full md:w-1/2 px-2 mb-6 md:mb-0'>
            <label>Age:</label>
            <input type="number" {...register("age", { required: true, valueAsNumber: true })} />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label>Sex: </label>
            <select {...register("sex")}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          <label>Write a short bio on why your dog is the perfect playmate!</label>
          <textarea {...register("bio", { required: true, maxLength:255})} />
          
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
          </div>
          <input type="submit" className='bg-slate-700 text-white'/>
          </form>
    </div>
  </div>
  )
}