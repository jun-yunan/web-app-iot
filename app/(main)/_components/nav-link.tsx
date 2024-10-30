import Link from 'next/link';
import React from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ children, href }: Props) => {
  return (
    <Link
      href={href}
      className="py-1 px-4 hover:bg-gray-200 hover:text-slate-800 rounded-md transition-all duration-500 cursor-pointer"
    >
      {children}
    </Link>
  );
};

export default NavLink;
