
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { api } from '~/trpc/react';

const f = createUploadthing();

import { auth } from "@clerk/nextjs";
// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(() => {
      // This code runs on your server before upload
      const {userId} = auth();
 
      // If you throw, the user will not be able to upload
      if (!userId) throw new Error("Unauthorized");
      console.log('made it to the middleware')
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId };
    })
    .onUploadComplete(({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;