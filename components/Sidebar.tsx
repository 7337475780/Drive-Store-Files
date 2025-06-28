"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();
  return (
    <aside className="sidebar remove-scrollbar">
      <Link href="/">
        <Image
          src="/assets/images/favicon.png"
          width={120}
          height={30}
          alt="logo"
          className="hidden h-auto lg:block"
        />

        <Image
          src="/assets/images/favicon.png"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="sidebar-nav h5">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full ">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "shad-active"
                )}
              >
                <Image
                  className={cn(
                    "nav-icon filter",
                    pathname === url && "nav-icon-active"
                  )}
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/assets/images/illustration.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />
      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="subtitle-2 capitalize">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
