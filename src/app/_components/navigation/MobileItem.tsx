

import Link from "next/link";

interface MobileItemProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  href: string,
  onClick?: () => void;
  active?: boolean;
};


const MobileItem: React.FC<MobileItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
}) => {
    
  const handleClick = () => {
    if(onClick ) return onClick();
  };

  return (
    <div>
      <Link href={href} className="group p-3 flex text-sm leading-6 font-semibold w-full justify-center border-t-slate-100 text-gray-500 hover:text-black hover:bg-gray-100">
          <Icon className="h-6 w-6 shrink-0" />
          <span className="sr-only">
            {label}
          </span>
      </Link>
    </div>
  )
}

export default MobileItem;