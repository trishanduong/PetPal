'use client'

import { useUser } from '@clerk/nextjs';
import { api } from '~/trpc/react';

import {useForm, type SubmitHandler} from 'react-hook-form';

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
};



export function ProfileForm() {
  const {
    register,
    handleSubmit,
  } = useForm<FormInputs>();

  const user = useUser();
  if(!user) return null;
  const profile = api.profile.create.useMutation();

  const onSubmit = async (data: FormInputs) => {
    const {age} = data;
    console.log('age:',typeof age)
    // console.log(data);
    await profile.mutateAsync({...data})
  }


  return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        {/* <label>Upload your most charming picture!</label>
        <input type="image"></input> */}
        <label>{`Whats your dog's name?`}</label>
        <input {...register("name",{ required: true })} />
        
        <label>Age</label>
        <input type="number" {...register("age", { required: true, valueAsNumber: true })} />

        <label>Write a short bio on why your dog is the perfect playmate!</label>
        <textarea {...register("bio", { required: true, maxLength:255})} />

        <label>Gender Selection</label>
        <select {...register("sex")}>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <input type="submit" className='bg-slate-700 text-white'/>
      </form>
  )
}