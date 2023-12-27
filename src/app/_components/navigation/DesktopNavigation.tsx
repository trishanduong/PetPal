import Link from "next/link";

import Dropdown from "./NavDropdown";
import type { Session } from "next-auth";
import { RiAccountCircleFill } from "react-icons/ri";

interface DesktopNavProps {
  session: Session,
}

const DesktopNav:React.FC<DesktopNavProps> = ({
  session,
}) => {
  
  return (
    <div className="hidden lg:block lg:w-full lg:bg-white lg:overflow-y-auto lg:z-40">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="font-bold text-slate-800 text-3xl pl-5 py-2 pr-30">
              PetPal 🐾
            </div>
          </Link>
          <div className="w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mr-3 mt-2 justify-items-center md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                {session && <Link href="/swipe" className="flex items-center p-3 py-2 font-bold text-gray-900 bg-white hover:bg-gray-100 hover:dark:bg-teal-600 hover:text-white rounded-full">SWIPE</Link>}
              </li>
              <li>
                <Link href='/aboutus' className="flex items-center p-3 py-2 font-bold text-gray-900 bg-white hover:bg-gray-100 hover:dark:bg-teal-600 hover:text-white rounded-full">ABOUT US</Link>
              </li>
              <li>
                {session && (<Link
                  href="/profileview"
                  className="flex items-center p-2 font-extrabold text-amber-900 bg-white hover:bg-gray-100 hover:dark:bg-teal-600 rounded-full"
                >
                  <RiAccountCircleFill size={28} />
                </Link>)}
              </li>
              <li>
                {!session && (
                  <Link
                    href={"/auth"}
                    className="flex items-center p-3 py-2 font-extrabold text-amber-900 bg-white hover:bg-gray-100 hover:dark:bg-teal-600 rounded-full"
                  >
                    LOGIN
                  </Link>
                  )
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}


export default DesktopNav;