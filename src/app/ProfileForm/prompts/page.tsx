'use client'

import { api } from "~/trpc/react";
import {useForm, type SubmitHandler} from 'react-hook-form';
import { UploadButton } from "~/utils/uploadthing";

type Data = {
  image: string,
  answer: string,
};
// {answer: 'I love playing tug!', image: 'https://utfs.io/f/743c3da0-ed1c-4afa-80f0-f661b43fa494-1xb5fd.jpeg'}
type FormInputs = Record<string, Data>;

const Prompts = () => {
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const {data: promptsQuery, isLoading, error} = api.prompt.getAllPrompts.useQuery();
  const allPosts = api.post.createPosts.useMutation();
  
  if(isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>;
  

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    await allPosts.mutateAsync(data)
  };
  

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        {promptsQuery?.map((prompt) => (
            <div key={prompt.id} className="flex flex-col">
              <label htmlFor={`prompt_${prompt.id}`}>{prompt.prompt}</label>
              <input
                {...register(`${prompt.id}.answer`)}
                id={`prompt_${prompt.id}`}
                />
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  //console.log("Files: ", res); 
                  console.log('url of file', res[0]?.url);
                  setValue(`${prompt.id}.image`, res[0]?.url)
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
            </div>
        ))}
        <input type="submit" className='bg-slate-700 text-white'/>
      </form>
    </div>
  )
}

export default Prompts;