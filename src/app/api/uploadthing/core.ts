
import { createUploadthing, type FileRouter } from "uploadthing/next";
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
  profilePicture: f(["image"])
    .middleware(async() => {
      const userId = await getSession();
      return { userId };
    })
    .onUploadComplete(({metadata, file}) => {
      return { uploadedBy: metadata.userId, url: file.url}
    }),
    // my bug is that the files i keep uploaing are tooo big !
  // Define as many FileRoutes as you like, each with a unique routeSlug  { maxFileSize: "4MB" } }
  imageUploader: f(["image"])
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const userId = await getSession();
      //console.log('req', req)
      return { userId };
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

//JPEGS are not accepted. png is? ? ? ?? ??