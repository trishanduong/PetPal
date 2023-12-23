
import clsx from "clsx";
import Link from "next/link";
import type { IconType } from "react-icons";

interface DesktopItemProps {
  label: string;
  icon: IconType;
  href: string,
  onClick?: () => void;
  active?: boolean;
};


const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}) => {
  const handleClick = () => {
    if(onClick) return onClick();
  };

  return (
    <div>
      <li onClick={handleClick}>
        <Link href={href} className={clsx(`
          group
          flex
          gap-x-3
          rounded-md
          p-3
          text-sm
          leading-6
          font-semibold
          text-gray-500
          hover:bg-gray-100
          hover:text-black
        `,
        active && 'bg-gray-100 text-black'
        )}>
          <Icon className="h-6 w-6 shrink-0" />
          <span className="sr-only">
            {label}
          </span>
        </Link>
      </li>
    </div>
  )
}

export default DesktopItem;