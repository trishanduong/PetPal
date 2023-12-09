
import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { api } from '~/trpc/server';
import { getServerAuthSession } from "~/server/auth";

const f = createUploadthing();

const getSession = async () => {
  const session = await getServerAuthSession();
  console.log('uploadthing session', session);
  const userId = session?.user.id;
  console.log('userId', userId);
  if(!userId) throw new Error("Unauthorized");
  return userId;
};

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = 'hi'
 
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;