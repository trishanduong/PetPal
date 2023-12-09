'use client'

import { api } from "~/trpc/react";
import {useForm, type SubmitHandler} from 'react-hook-form';
import { UploadButton } from "~/utils/uploadthing";
import type { Prompt } from "@prisma/client";
import FormProgressBar from "~/app/_components/FormProgressBar";

import { useRouter } from 'next/navigation';

type Data = {
  dogProfileId: string,
  image: string,
  answer: string,
  promptId: string,
};
type FormInputs = Record<string, Data>;


const Prompts = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const allPosts = api.post.createPosts.useMutation();
  const {data: promptsQuery, isLoading, error} = api.prompt.getAllPrompts.useQuery();
  
  if(isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>;
  
  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    const transformedData = Object.entries(data).map(([promptId, postData]) => ({
        ...postData,
        promptId: promptId 
      }));

    console.log(transformedData)
    await allPosts.mutateAsync(transformedData);
    router.push('/profile')
  };
  

  return (
    <div className="mt-5">
      <FormProgressBar percent={95}/>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        {promptsQuery?.map((prompt: Prompt) => (
            <div key={prompt.id} className="flex flex-col">
              <label htmlFor={`prompt_${prompt.id}`}>{prompt.prompt}</label>
              <input
                {...register(`${prompt.id}.answer`)}
                id={`prompt_${prompt.id}`}
                className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                />
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
            </div>
        ))}

        <div className="flex justify-center">
            <input type="submit" value="See your profile!" className="bg-stone-500 text-white font-bold uppercase text-sm px-5 py-3 rounded-full shadow hover:bg-stone-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-2/4"/>
        </div>

      </form>
    </div>
  )
}


export default Prompts;