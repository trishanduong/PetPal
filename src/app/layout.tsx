import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";

import Nav from "./_components/navigation/DesktopNavigation";
import Footer from "./_components/Footer";
import Navigation from "./_components/navigation/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PetPals",
  description: "A web application for dog owners to set up playdates!",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)}/>
            <Navigation>
            {children}
            </Navigation>
            <Footer/>
          </TRPCReactProvider>
        </body>
      </html>
  );
}
