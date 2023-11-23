import { api } from "~/trpc/server";
import type { Post } from "@prisma/client";
import Image from "next/image";

// type PostProps = Post;

const PostBox: React.FC<Post>= (props) => {
    // console.log('post from postbox', props);
    const {promptId, image, answer} = props.post;
    // console.log('image', image)
    return (
      <div className="rounded-lg bg-amber-400 w-full h-full p-3 mt-6">
        <div>
          <span className="text-3xl py-2">✦ {`Prompt`}</span>
          <div>{answer}</div>
          <Image src={`${image}`} alt={`${answer}`} width='100' height='100'></Image>
        </div>
      </div>)
  };

  export default PostBox;