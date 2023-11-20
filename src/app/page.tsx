import { api } from "~/trpc/server";
import { ProfileCard } from "./_components/ProfileCard";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const hi = auth();
  console.log('hi', hi)

  return (
    <main className="flex min-h-screen flex-col items-center bg-amber-200">
      {/* <ProfileForm/> */}
      <div></div>
      <ProfileCard></ProfileCard>
    </main>
  );
}