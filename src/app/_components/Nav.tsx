import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Nav(){
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
            <ul className="font-medium flex flex-col p-4 md:p-0 mr-4 mt-2 justify-items-center md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <Link href="/swipe">Profile</Link>
              </li>
              <li>
                <Link href="/form">Form</Link>
              </li>
              <li>
                <UserButton/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
