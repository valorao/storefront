"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import * as React from "react"
import { CircleUserRound, Moon, Sun } from "lucide-react"
import { LucideLogIn, Cloud, LogOut, Settings, SunMoon } from "lucide-react"
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function logoutUser() {
    signOut()
    redirect('https://rso.rtrampox.cloud/api/logout?redirect_uri=https://valorao.cloud')
}

export default function ProfileDropdownMenu() {
    const { data: session } = useSession();
    const { setTheme } = useTheme();
    if (session) {
        return (
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar>
                        <AvatarImage className="object-cover" src={session.user?.image ?? ""} />
                        <AvatarFallback>{session.user?.name && `${session.user?.name[0]}${session.user?.name[1]}`}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                    <DropdownMenuLabel>Olá, {`${session.user?.name?.split(' ')[0]}`}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem disabled className="cursor-pointer">
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
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <SunMoon className="mr-2 h-4 w-4" />
                            <span>Tema</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                <Sun className="h-[1.2rem] w-[1.2rem] mr-2" /> Claro
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                <Moon className="h-[1.2rem] w-[1.2rem] mr-2" />Escuro
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                                <Settings className="mr-2 h-4 w-4" />Padrão do sistema
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logoutUser()} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sair da conta</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    };

    return (
        <div className="flex flex-row ml-4 items-center justify-center text-center cursor-pointer text-nowrap" onClick={() => signIn()}>
            <LucideLogIn className="w-5 h-5 items-center" />
            <button className="flex flex-row ml-4">Log in</button>
        </div>
    );

}