
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { api } from '~/trpc/server';

const f = createUploadthing();

import { auth } from "@clerk/nextjs";
// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

const getId = async (userId: string) => {
  const profile = await api.profile.getProfileById.query({userId});
  const {id} = profile;
  return id.toString();
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const {userId} = auth();
      if(!userId) throw new Error("Unauthorized");

      const dogProfileId = await getId(userId);
      console.log('made it to the middleware')
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { dogProfileId, userId };
    })
    .onUploadComplete(({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, url: file.url, dogProfileId: metadata.dogProfileId};
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;