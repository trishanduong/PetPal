'use client'

import { api } from "~/trpc/react";
import {useForm, type SubmitHandler} from 'react-hook-form';
import { OurUploadDropzone } from "~/app/_components/UploadDrop";

const Prompts = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const {data: promptsQuery, isLoading, error} = api.prompt.getAllPrompts.useQuery();
  if(isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>;


  return(
    <div>
      <form>
        {promptsQuery?.map((prompt) => (
            <div key={prompt.id} className="flex flex-col">
              <label htmlFor={`prompt_${prompt.id}`}>{prompt.prompt}</label>
              <input
                {...register(`prompt_${prompt.id}`)}
                id={`prompt_${prompt.id}`}
                />
              <OurUploadDropzone/>
            </div>
        ))}
      </form>
    </div>
  )
}

export default Prompts;