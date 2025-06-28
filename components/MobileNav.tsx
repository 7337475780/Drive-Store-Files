"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signOutUser } from "@/lib/actions/user.actions";
import FileUploader from "./FileUploader";
interface Props {
  $id: string;
  fullName: string;
  avatar: string;
  accountId: string;
  email: string;
}
const MobileNav = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="mobile-header">
      <Image
        src="/assets/images/favicon.png"
        alt="logo"
        width={80}
        height={80}
        className="h-auto"
      />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Search"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetHeader>
            <SheetTitle>
              <div className="header-user">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="header-user-avatar"
                />
                <div className="sm:hidden lg:block">
                  <p className="subtitle-2 capitalize">{fullName}</p>
                  <p className="caption">{email}</p>
                </div>
              </div>
              <Separator className="mb-4 bg-light-200/20" />
            </SheetTitle>

            <nav className="mobile-nav h5">
              <ul className="mobile-nav-list">
                {navItems.map(({ url, name, icon }) => (
                  <Link key={name} href={url} className="lg:w-full ">
                    <li
                      className={cn(
                        "mobile-nav-item h5",
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
                      <p>{name}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
            <Separator className="my-5 bg-light-200/20" />

            <div className="flex flex-col justify-between gap-5 pb-5">
              <FileUploader
                accountId={accountId}
                className="w-full"
                ownerId={ownerId}
              />
              <Button
                type="submit"
                className="flex-center h5 cursor-pointer mobile-sign-out-btn"
                onClick={async () => await signOutUser()}
              >
                <Image
                  src="/assets/icons/logout.svg"
                  alt="logo"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNav;
