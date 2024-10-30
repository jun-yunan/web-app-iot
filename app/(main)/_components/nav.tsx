'use client';

import * as React from 'react';
import NavLink from './nav-link';

export function Nav() {
  return (
    <div className="flex items-center gap-x-6 font-medium text-base text-gray-50">
      <NavLink href="">HOW IT WORKS</NavLink>
      <NavLink href="">CONTACT</NavLink>
      <NavLink href="">ABOUT</NavLink>
    </div>
  );
}
