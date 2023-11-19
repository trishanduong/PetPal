//Create The UploadThing Components
import { generateComponents } from "@uploadthing/react";
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

//useUploadThing hook: 
//function to start uploading, an isUploading state, and the permittedFileInfo which gives information about is allowed by the endpoint
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "~/app/api/uploadthing/core";
 
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();


