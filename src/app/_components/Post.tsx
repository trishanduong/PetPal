import { api } from "~/trpc/server";
import type { Post, Prompt } from "@prisma/client";
import Image from "next/legacy/image";

type PostBoxProps = {
  key: string,
  post: Post
};

const PostBox = async(props: PostBoxProps) => {
    const post: Post = props.post;
    const {promptId, image, answer} = post;

    const promptObject: Prompt = await api.prompt.getPrompt.query({promptId});
    const {prompt} = promptObject;

    return (
      <>
      <div className="rounded-lg bg-amber-300 w-full p-3 mt-6 shadow-md mb-6">
        <div>
          <span className="text-3xl py-2 font-bold text-orange-950">✦ {prompt}</span>
          <div className="text-center text-2xl text-orange-800 font-medium py-2 ">{answer}</div>
          <div style={{ position: 'relative', height: 'fit-content'}}>
            <Image className="rounded-md" src={`${image}`} alt={`${answer}`} layout="responsive" width={300} height={300} style={{
              objectFit: 'cover',
              width: '100%', 
              height: '100%',
            }} >
            </Image>
          </div>
        </div>
      </div>
      </>
    )
  };

  export default PostBox;