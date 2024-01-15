/* Chatroom Message Form */

'use client'
import { api } from "~/trpc/react";

import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";

import { CldUploadButton } from "next-cloudinary";
import type { CldUploadWidgetResults } from "next-cloudinary";

import useConversation from "~/server/helpers/useConversation";

import MessageInput from "./MessageInput";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import clsx from "clsx";
import { useState } from "react";


const Form: React.FC = () => {
  const [ messagePic, setMessagePic ] = useState(false);
  const create = api.conversation.createMessage.useMutation(); 
  const { conversationId } = useConversation();
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      image:'',
      message: ''
    }
  });
  

  const onSubmit: SubmitHandler<FieldValues> = async(data) => {
    const { message, image } = data;
    console.log(data);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    await create.mutateAsync({ image, conversationId, message })
  };

  const handleUpload = (result: CldUploadWidgetResults) => {
    if (result?.info && typeof result.info !== 'string' && result.info.secure_url){
      const url = result?.info?.secure_url;
      console.log('uplaoded photo');
      setMessagePic(true); 
      setValue('image', url);
    };
  } 


  return (
    <div className="">
      <div className="py-4 px-4 bg-amber-50 border-t flex items-center gap-2 lg:gap-4 w-full z-90" >
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="ym3gagri"
        >
          <HiPhoto size={28} className="text-sky-500" />
        </CldUploadButton>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3 lg:gap-4 w-full">
          <MessageInput id="message" register={register} errors={errors} required placeholder="Write a message" />
          <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
            <HiPaperAirplane size={18} className="text-white"/>
          </button>
        </form>
      </div>
      {/* Temporary Image Upload */}
      <div className={clsx(`hidden`,
          messagePic && "block bg-amber-50 border-t border-b",
        )}>
      </div>
    </div>
  )
}

export default Form;