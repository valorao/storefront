"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { CircleUserRound } from "lucide-react";
import { LucideLogIn, Cloud, LogOut, Settings } from "lucide-react";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { BorderBeam } from "./magicui/border-beam";

function logoutUser() {
    signOut({ redirect: true, callbackUrl: "/logout" })
}

export default function ProfileDropdownMenu() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session } = useSession();
    const { setTheme } = useTheme();
    if (session) {
        return (
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar className="relative">
                        {pathname === '/profiles/self' ? <BorderBeam borderWidth={2} className="antialiased" /> : ''}
                        <AvatarImage className="object-cover rounded-full" src={session.user?.image ?? ""} />
                        <AvatarFallback>{session.user?.name && `${session.user?.name[0]}${session.user?.name[1]}`}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Olá, {`${session.user?.name?.split(' ')[0]}`}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => router.push('/profiles/self')} className="cursor-pointer">
                            <CircleUserRound className="mr-2 h-4 w-4" />
                            <span>Meu Perfil</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                        <DropdownMenuItem disabled className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Conta Unified</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                        <Cloud className="mr-2 h-4 w-4" />
                        <span>API</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logoutUser()} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair da conta</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        )
    };

    return (
        <Avatar className="relative items-center justify-center text-center cursor-pointer" onClick={() => signIn()}>
            <BorderBeam borderWidth={2} className="antialiased" />
            <AvatarImage className="object-cover rounded-full" />
            <AvatarFallback>{<LucideLogIn className="w-5 h-5 items-center antialiased" />}</AvatarFallback>
        </Avatar>
    );

}