'use client'

import { useUser } from '@clerk/nextjs';
import { api } from '~/trpc/react';
import {useForm, SubmitHandler} from 'react-hook-form'

// export function SubmitButton() {
 
//   return (
//     <button type="submit" className='bg-slate-700 text-white'>
//       Add
//     </button>
//   )
// }
enum SexEnum {
  female = "female",
  male = "male",
  other = "other",
};

type Inputs = {
  name: string
  bio: string
  sex: SexEnum
};

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    // const profile = api.post.hello.useQuery({text: "Trisha"});
    // console.log('profile', profile.data)

    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        {/* <label>Upload your most charming picture!</label>
        <input type="image"></input> */}
        <label>{`Whats your dog's name?`}</label>
        <input {...register("name",{ required: true })} />
        
        <label>Age</label>
        <input type="number" {...register("bio", { required: true })} />
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