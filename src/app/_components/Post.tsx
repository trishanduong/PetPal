import { api } from "~/trpc/server";
import type { Post, Prompt } from "@prisma/client";
import Image from "next/image";

type PostBoxProps = {
  key: bigint,
  post: Post
};

const PostBox = async(props: PostBoxProps) => {
    const post: Post = props.post;
    const {promptId, image, answer} = post;

    const promptObject: Prompt = await api.prompt.getPrompt.query({promptId});
    const {prompt} = promptObject;

    return (
      <>
      <div className="rounded-lg bg-amber-400 w-full h-full p-3 mt-6 shadow-md">
        <div>
          <span className="text-3xl py-2">✦ {prompt}</span>
          <div>{answer}</div>
          <div style={{ position: 'relative', height: '400px' }}>
            <Image className="rounded-md" src={`${image}`} alt={`${answer}`} fill={true} style={{
              objectFit: 'cover'
            }} >
            </Image>
          </div>
        </div>
      </div>
      </>
    )
  };

  export default PostBox;