'use client'

import { useUser } from '@clerk/nextjs';
import { api } from '~/trpc/react';

import {useForm, type SubmitHandler} from 'react-hook-form';
import { UploadButton } from "~/utils/uploadthing";

import { useState} from 'react';

import { useRouter } from 'next/navigation';
import FormProgressBar from '../_components/FormProgressBar';
enum SexEnum {
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

export default function ProfileForm() {

  const router = useRouter();
 
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<FormInputs>();

  const user = useUser();
  if(!user) return null;
  const profile = api.profile.create.useMutation();
  
  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    await profile.mutateAsync({...data});
    router.push('/ProfilePage');
  }

  return (
    <div className='mt-5'>
      <FormProgressBar percent={30}/>
      <div className="font-bold text-xl mb-2">Introduce your fur baby!</div>
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <label>Upload a charming profile picture:</label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // console.log("Files: ", res); console.log('url of file', res[0]?.url);
                // alert("Upload Completed");
                if(res[0]?.url !== undefined) setValue('profilePic', res[0]?.url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />

            <label>{`Whats your dog's name?`}</label>
            <input {...register("name",{ required: true })}  className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600' />
            
            <div className="flex justify-between">
              <div className='flex flex-col'>
                <label>Age:</label>
                <input type="number" {...register("age", { required: true, valueAsNumber: true })} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6' />
              </div>
              <div className='flex flex-col'>
              <label>Sex: </label>
              <select {...register("sex")} className='block w-full rounded-md border-0 px-1 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              </div>
            </div>

            <label>Write a short bio on why your dog is the perfect playmate!</label>
            <textarea {...register("bio", { required: true, maxLength:255})} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'/>
          
            <div className="flex justify-center">
              <input type="submit" value="Next" className="bg-stone-500 text-white font-bold uppercase text-sm px-5 py-3 rounded-full shadow hover:bg-stone-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-2/4"/>
            </div>

          </form>
    </div>
  </div>
  )
}

