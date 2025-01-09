'use client';

import React from "react";
import Link from "next/link";
import { NavbarItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }: NavLinkProps) => {
    const pathname = usePathname();

  return (
    <NavbarItem isActive={pathname === href} as={Link} href={href}>
      {label}
    </NavbarItem>
  );
};

export default NavLink;
