import { createNextRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "./core";
 
// Export routes for Next App Router
console.log(ourFileRouter);

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});