'use client';

import Link from "next/link";

import Dropdown from "./NavDropdown";
import type { Session } from "next-auth";

import useRoutes from "~/server/helpers/useRoute";
import MobileItem from "./MobileItem";

interface MobileNavProps {
  session: Session,
}

const MobileNav:React.FC<MobileNavProps> = ({
  session,
}) => {
  const routes = useRoutes();

  return (
    <div className="fixed bg-white w-full z-50 lg:hidden">
      <nav>
        <div>
        <Link href="/">
          <div className="p-2 font-bold text-slate-800 text-3xl text-center">
            PetPal 🐾
          </div>
        </Link>
        <div className="flex fixed justify-around items-center w-full bg-white lg:hidden" >
            {session && (routes.map((item) => (
                <MobileItem
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  icon={item.icon}
                  active={item.active}
                  />
                )
              ))}
              {session && <Dropdown/>}
          </div>
        </div>
      </nav>
    </div>
  )
}


export default MobileNav;