"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react"
import { ShoppingCart } from "lucide-react"
import ProfileDropdownMenu from "./ProfileDropdownMenu";

const ACTIVE_ROUTE = "text-gray-300 bg-[#323747] rounded w-full";
const INACTIVE_ROUTE = "text-gray-500 hover:bg-[#323747] hover:rounded w-full";

export default function NavMenu() {
    const pathname = usePathname();

    return (
        <nav className="fixed md:relative bottom-0 md:top-0 left-0 right-0 z-50 dark:bg-black shadow-md">
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
                            <div className="hidden md:flex w-full pt-[12px] pb-[12px] pr-[15px] pl-[15px] justify-center items-center text-center">
                                <p className="hidden md:block">Loja</p>
                            </div>
                            <div className="md:hidden m-0 flex flex-col px-2.5 py-2 justify-center items-center text-center">
                                <ShoppingCart className="w-5 h-5" />
                                <p className="text-xs mt-1 mb-0">Loja</p>
                            </div>
                        </Link>
                        <Link href="/storefrontFromServer" className={`text-xl ${pathname === '/storefrontFromServer' ? ACTIVE_ROUTE : INACTIVE_ROUTE}`}>
                            <div className="w-full pt-[12px] pb-[12px] pr-[15px] pl-[15px] justify-center flex items-center text-center">
                                <p className="hidden md:block">Mercado Noturno</p>
                            </div>
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