"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "./ModeToggle";
import { LucideLogIn } from "lucide-react";

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE = "py-1 px-2 text-gray-500 hover:bg-gray-700";

function AuthButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <div className="gap-3 flex flex-row text-center items-center justify-center">
                <ModeToggle />
                <Avatar>
                    <AvatarImage className="object-cover" src={session.user?.image ?? ""} />
                    <AvatarFallback>{session.user?.name && session.user?.name[0]}</AvatarFallback>
                </Avatar>
                <button className="flex flex-row text-nowrap" onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return (
        <div className="flex flex-row ml-4 items-center justify-center text-center cursor-pointer text-nowrap" onClick={() => signIn()}>
            <LucideLogIn className="w-5 h-5 items-center" />
            <button className="flex flex-row ml-4">Log in</button>
        </div>
    )
}

export default function NavMenu() {
    const pathname = usePathname();

    return (
        <nav className="fixed md:relative bottom-0 md:top-0 left-0 right-0 z-50 dark:bg-black shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold inline-block">
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
                    <div className="flex items-center">
                        {AuthButton()}
                    </div>
                </div>
            </div>
        </nav>
    )
}