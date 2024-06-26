"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react"
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import { Button } from "./ui/button";

const ACTIVE_ROUTE = "dark:text-white text-black";
const INACTIVE_ROUTE = "dark:text-gray-500 dark:hover:text-white";

export default function NavMenu() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 md:top-0 left-0 right-0 z-50 dark:bg-transparent backdrop-blur-xl h-16 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold">
                            <div className="md:w-[100px] w-[70px] justify-center flex items-center text-center">
                                <Image
                                    src="https://valorao-cdn.rtrampox.cloud/images%2Fvalorao.png"
                                    width={1648}
                                    height={804}
                                    alt="Featured Bundle Image"
                                    className="rounded-lg"
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center md:text-nowrap gap-3">
                        <Link href="/store" className={`text-xl ${pathname === '/store' ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}>
                            <Button variant={pathname === '/store' ? 'linkHover1' : 'linkHover2'}>Loja</Button>
                        </Link>
                        <Link href="/nightmarket" className={`text-xl ${pathname === '/nightmarket' ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}>
                            <Button variant={pathname === '/nightmarket' ? 'linkHover1' : 'linkHover2'}>Mercado Noturno</Button>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <ProfileDropdownMenu />
                    </div>
                </div>
            </div>
        </nav>
    )
}