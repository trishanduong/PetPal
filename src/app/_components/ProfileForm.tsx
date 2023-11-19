'use client'

import { useUser } from '@clerk/nextjs';
import { api } from '~/trpc/react';
import { useState } from 'react';
import {useForm, type SubmitHandler} from 'react-hook-form';
import { UploadButton } from "~/utils/uploadthing";

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
  const [url, setUrl] = useState('');

  const {
    register,
    handleSubmit,
  } = useForm<FormInputs>();

  const user = useUser();
  if(!user) return null;
  const profile = api.profile.create.useMutation();

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    await profile.mutateAsync({...data, profilePic: url})
  }


  return (
    <div>
      <div className="font-bold text-xl mb-2">Introduce your fur baby!</div>
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <label>Profile Picture</label>
            <UploadButton
              {...register("profilePic")}
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // console.log("Files: ", res); console.log('url of file', res[0]?.url);
                alert("Upload Completed");
                if(res[0]?.url !== undefined) setUrl(res[0]?.url);
                console.log('url data was added to form')
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />

          {/* <input type="file" {...register("profilePic")} /> */}
            <label>{`Whats your dog's name?`}</label>
            <input {...register("name",{ required: true })} />

            <label>Age:</label>
            <input type="number" {...register("age", { required: true, valueAsNumber: true })} />
  
            <label>Sex: </label>
            <select {...register("sex")}>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>

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