import Link from "next/link";
import Dropdown from "./NavAccordion";
import { getServerAuthSession } from "~/server/auth";

export default async function Nav (){
  const session = await getServerAuthSession();
  
  return (
    <div>
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="font-bold text-slate-800 text-3xl pl-5 py-2 pr-30">
              PetPal 🐾
            </div>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            {/* <ul className="font-medium flex flex-col p-4 md:p-0 mr-3 mt-2 justify-items-center md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
              {userId && <Link href="/swipe" className="flex items-center p-3 py-2 font-bold text-gray-900 bg-white hover:bg-gray-100 hover:dark:bg-teal-600 hover:text-white rounded-full">SWIPE</Link>}
              </li>
              <li>
                <Link href='/aboutus' className="flex items-center p-3 py-2 font-bold text-gray-900 bg-white hover:bg-gray-100 hover:dark:bg-teal-600 hover:text-white rounded-full">ABOUT US</Link>
              </li>
              <li>
                {userId && <Dropdown/>}
                {!userId && (<div className="flex items-center p-3 py-2 font-extrabold text-amber-900 bg-white hover:bg-gray-100 hover:dark:bg-teal-600 rounded-full">
                  <SignInButton>LOGIN</SignInButton>
                </div>)}
              </li>
            </ul> */}
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
