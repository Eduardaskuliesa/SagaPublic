/* eslint-disable react/react-in-jsx-scope */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Dispatch, SetStateAction,
} from 'react';
import { animatePageOut } from '../animations/PageTransition';

type Props = {
  href: string,
  label?: string,
  className?: string,
  children?:React.ReactNode,
  onClick?: Dispatch<SetStateAction<boolean>>,
  onMouseEnter?: (event:React.MouseEvent, action: string) => void,
  onMouseLeave?: (event:React.MouseEvent, action: string) => void,
};

const NavLink = ({
  href,
  className = '',
  label,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,

}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    animatePageOut(href, router);
    if (onClick !== undefined) {
      onClick(false);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (onMouseEnter) {
      onMouseEnter(e, 'dot');
    }
  };
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (onMouseLeave) {
      onMouseLeave(e, 'dot');
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="cursor-pointer" onClick={pathname === href ? undefined : handleClick}>
      <li className={`list-none ${className} ${href === pathname ? 'activeLink' : ''}`}>
        {label}
        {children}
      </li>
    </div>
  );
};

export default NavLink;
