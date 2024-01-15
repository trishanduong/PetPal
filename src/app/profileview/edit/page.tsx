/* Update name, age, bio, sex, location, userId, profilePic of DogProfile */

'use client'

import { api } from '~/trpc/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {useForm, type SubmitHandler, Controller} from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';

import ProfileCard from '~/app/_components/ProfileCard';
import EditContents from '~/app/_components/editform/EditContents';
import LoadingModal from '~/app/_components/LoadingModal';


export type FormInputs = {
  userId: string,
  profilePic:string,
  name: string,
  age: number,
  bio: string,
  sex: string,
  location: string,
};


export default function EditProfile(){
  const router = useRouter();
  const { handleSubmit, control, watch, setValue } = useForm<FormInputs>();
  const updateProfile = api.profile.updateProfile.useMutation();
   
  const {data: profile, isLoading, error} = api.profile.getProfileById.useQuery({type: 'personal'});
  if(isLoading) return <LoadingModal />;
  if (error) return <div>An error occurred: {error.message}</div>;
  const userId = profile?.userId;
  if(!userId) throw new Error("Unauthorized");

  const image = watch('profilePic');

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const { name, age, bio, sex, location, profilePic } = data;
    console.log('data in edit', data);
    await updateProfile.mutateAsync({ name, age, bio, sex, location, userId, profilePic });
    router.push('/profileview')
  }

  const handleUpload = (result) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    setValue('profilePic', result.info.secure_url, { 
      shouldValidate: true 
    });
  }

    return (
        <div>
          <EditContents/>
          <div className='flex flex-col md:flex-row justify-around mt-2 pt-15 px-4 '>
              <div className="w-full flex flex-col md:w-4/6 bg-yellow-500 p-3 rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col flex-grow gap-2'>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                      width="64"
                      height="64" 
                      className="rounded-full" 
                      src={image ?? profile.profilePic ?? '/images/placeholder.jpg'}
                      alt="Avatar"
                  />
                  <CldUploadButton 
                      options={{ maxFiles: 1 }} 
                      onUpload={handleUpload} 
                      uploadPreset="ym3gagri"
                    >
                      <button
                        className='bg-amber-800 text-slate-300 p-3 rounded-md'
                        disabled={isLoading}
                        type="button" >
                        Update Profile Picture
                      </button>
                    </CldUploadButton>
                  </div>
                  <label>Name: </label>
                  <Controller
                    control={control}
                    name="name"
                    defaultValue={profile?.name} // Set default value
                    render={({ field }) => (
                      <input {...field} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900' />
                    )}
                  />
              
                  <div className="flex justify-between">
                    <div className='flex flex-col'>
                      <label>Age:</label>
                      <Controller
                        control={control}
                        name="age"
                        defaultValue={profile?.age} 
                        render={({ field }) => (
                          <input type="number" {...field} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900' />
                        )}
                        />
                    </div>
                  

                  <div className="flex justify-between">
                    <div className='flex flex-col'>
                      <label>City, State:</label>
                      <Controller
                        control={control}
                        name="location"
                        defaultValue={profile.city ?? ' '} 
                        render={({ field }) => (
                          <input placeholder="Ex. Los Angeles, CA" type="text" {...field} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900' />
                        )}
                        />
                    </div>
                  </div>
                    <div className='flex pl-2 flex-col'>
                    <label>Sex: </label>
                    <Controller
                    control={control}
                    name="sex"
                    defaultValue={profile.sex} // Set default value
                    render={({ field }) => (
                      <select {...field} className='block w-full rounded-md border-0 px-1 py-2.5 text-gray-900'>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    )}
                    />
                    </div>
                  </div>
      
                  <label>Bio: </label>
                  <Controller
                    control={control}
                    name="bio"
                    defaultValue={profile?.bio} // Set default value
                    render={({ field }) => (
                      <textarea {...field} className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900' />
                    )}
                  />

                  <div className="flex justify-center">
                    <input type="submit" value="SAVE" className="bg-stone-500 text-white font-bold uppercase text-sm px-5 py-3 rounded-full shadow hover:bg-stone-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"/>
                  </div>
                </form>
          </div>
          <div className="w-full md:w-auto md:flex-none md:ml-4 ">
              {!isLoading && (
                <ProfileCard 
                    profilePic={profile.profilePic}
                    name={profile.name}
                    age={profile.age}
                    bio={profile.bio}
                    city={profile.city}
                />
              )}
          </div>
          </div>
      </div>
      )
}