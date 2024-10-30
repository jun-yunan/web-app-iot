import React from 'react';
import { Nav } from './nav';
import Logo from './logo';
import Account from './account';
import MenuMobile from './menu-mobile';

// type Props = {}

const Header = () => {
  return (
    <div className="flex items-center justify-around bg-[#324539] shadow-2xl">
      <div className="lg:hidden block">
        <MenuMobile />
      </div>
      <Logo />
      <div className="hidden lg:block">
        <Nav />
      </div>
      <Account />
    </div>
  );
};

export default Header;
