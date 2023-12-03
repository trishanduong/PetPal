'use client'
import { api } from "~/trpc/react";
import type { FC } from "react";
import { useRouter } from 'next/navigation';

import {useForm, type SubmitHandler, Controller} from 'react-hook-form';

import { UploadButton } from "~/utils/uploadthing";
import type { Prompt, Post} from "@prisma/client";
import Image from "next/image";

type PromptQueryProps = {
    promptsQuery: {
        id: bigint;
        prompt: string;
    }[];
};
type EditFunFactsForm = {
    postId: string,
    dogProfileId: string,
    image: string,
    answer: string,
    promptId: string
};
  
type FormInputs = Record<string, EditFunFactsForm>;

const EditFunFactsForm: FC<PromptQueryProps> = ({promptsQuery}) => {
   
    const router = useRouter();
    const {
      handleSubmit,
      setValue,
      control
    } = useForm();
    const update = api.post.updatePosts.useMutation();
    const {data: updatePosts, isLoading, error} = api.post.getPostsForEdit.useQuery();

    if(!updatePosts) return <div>No image</div>
    if(isLoading) return <div>Loading...</div>
    if (error) return <div>An error occurred: {error.message}</div>;

    const getDefaultValue = (prompt: bigint, field: keyof Post): string | bigint | Date => {
      const foundPost = updatePosts.find(post => post.promptId.toString() === prompt.toString());
      if (!foundPost) {
        throw new Error(`Post with promptId ${prompt} not found.`);
      };
      //Retain Id information
      setValue(`${prompt}.dogProfileId`, foundPost.dogProfileId?.toString());
      setValue(`${prompt}.promptId`, foundPost.promptId.toString());
      setValue(`${prompt}.postId`, foundPost.id.toString());
      //Keep old image information if they don't update it. 
      const value = foundPost[field];
      if(field === "image") setValue(`${prompt}.image`, foundPost[field]);
      if (value === null) {
        throw new Error(`Field ${field} is null for post with promptId ${prompt}.`);
      };
      
      return value
    }

    const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
        const transformedData = Object.entries(data).map(([promptId, postData]) => ({
          ...postData,
          promptId: promptId 
        }));
        const updated = await update.mutateAsync(transformedData);
        console.log('updated data', updated);
        router.push('/profile')
    };

  return (
    <div className="mt-5 flex justify-start">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <div className="flex flex-wrap">
        {promptsQuery.map((prompt: Prompt) => (
            <div key={prompt.id} className="flex flex-col m-5 p-3 rounded-md bg-yellow-500">
              <label htmlFor={`prompt_${prompt.id}`}>{prompt.prompt}</label>
              <Controller 
                control={control}
                name={`${prompt.id}.answer`}
                defaultValue={getDefaultValue(prompt.id, "answer")}
                render={({field})=>{
                  return <input
                      type="text"
                      {...field}
                      id={`prompt_${prompt.id}`}
                      className='block w-full rounded-md border-0 px-2.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                    />
                }}
              />
              <div className="flex">
                <Image src={typeof getDefaultValue(prompt.id, "image") !== 'bigint' ? getDefaultValue(prompt.id, "image").toString() : ''} width={250} height={300} alt="lol" className="rounded-lg p-1"></Image>
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        setValue(`${prompt.id}.image`, res[0]?.url);
                        }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                        }}
                    className="py-4"
                />
              </div>
            </div>
        ))}
        </div>
        <div className="flex justify-center">
          <input type="submit" 
            value="SAVE" 
            className="bg-stone-500 text-white font-bold uppercase text-sm px-5 py-3 rounded-full shadow hover:bg-stone-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-2/4"/>
        </div>
      </form>
    </div>
  )
}

export default EditFunFactsForm;
