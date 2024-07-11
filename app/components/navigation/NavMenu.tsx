"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileDropdownMenu from "../ProfileDropdownMenu";
import { Button } from "../ui/button";
import { Menu, SearchIcon } from "lucide-react";
import { SheetTrigger, SheetContent, Sheet } from "@/app/components/ui/sheet";
import ValoraoLogo from "../valoraoLogo";
import { useState } from "react"; import SearchBar from "./navSearchBar";
import { Badge } from "../ui/badge";

export default function NavMenu() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    console.log(pathname)

    return (
        <div className="flex md:w-[100vw] w-full h-16 flex-col fixed bottom-0 md:top-0 left-0 right-0 z-50">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-x-0 border-y dark:bg-transparent backdrop-blur-xl px-7 md:px-7">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                        prefetch={false}>

                        <ValoraoLogo className="h-7 w-7 text-white" />
                        <span className="sr-only">valorao</span>
                    </Link>

                    <Link
                        href="/store"
                        className={
                            pathname === '/store' ?
                                "text-foreground transition-colors hover:text-foreground text-nowrap" :
                                "text-muted-foreground transition-colors hover:text-foreground text-nowrap"
                        }
                        prefetch={false}>
                        Loja
                    </Link>

                    <Link
                        href="/nightmarket"
                        className={
                            pathname === '/nightmarket' ?
                                "text-foreground transition-colors hover:text-foreground text-nowrap" :
                                "text-muted-foreground transition-colors hover:text-foreground text-nowrap"
                        }
                        prefetch={false}>
                        Mercado Noturno
                    </Link>

                    <Link
                        href="/esports"
                        className={
                            pathname === '/esports' ?
                                "text-foreground transition-colors hover:text-foreground text-nowrap" :
                                "text-muted-foreground transition-colors hover:text-foreground text-nowrap"
                        }
                        prefetch={false}>
                        Esports
                    </Link>
                    {pathname.includes('/profiles') && <h1
                        className={
                            pathname.includes('/profiles') ?
                                "text-foreground transition-colors hover:text-foreground text-nowrap" :
                                "text-muted-foreground transition-colors hover:text-foreground text-nowrap"
                        }
                    >
                        Perfis: {pathname.includes('self') ? 'Seu Perfil' : pathname.slice().split('/')[2] + '#' + pathname.slice().split('/')[3]}
                    </h1>}
                </nav>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden bg-black/30"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Abrir menu de navegação</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <ValoraoLogo className="h-7 w-7 text-white" />
                                <span className="sr-only">valorao</span>
                            </Link>

                            <Link
                                href="/store"
                                className={
                                    pathname === '/store' ?
                                        "flex items-center gap-2 text-lg font-semibold" :
                                        "text-muted-foreground hover:text-foreground"
                                }
                            >
                                Loja
                            </Link>

                            <Link
                                href="/nightmarket"
                                className={
                                    pathname === '/nightmarket' ?
                                        "flex items-center gap-2 text-lg font-semibold" :
                                        "text-muted-foreground hover:text-foreground"
                                }
                            >
                                Mercado Noturno
                            </Link>

                            <Link
                                href="/esports"
                                className={
                                    pathname === '/esports' ?
                                        "flex items-center gap-2 text-lg font-semibold" :
                                        "text-muted-foreground hover:text-foreground"
                                }
                            >
                                esports
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>

                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <Button className="md:ml-auto flex-1 sm:flex-initial gap-1 justify-center" variant="link" onClick={() => setOpen(true)}>
                        <SearchIcon className="h-4 w-4 text-muted-foreground" />Buscar<Badge className="hover:bg-white md:flex hidden">^J</Badge>
                    </Button>
                    <div className="flex items-center">
                        <ProfileDropdownMenu />
                    </div>
                </div>
            </header>
            <SearchBar open={open} setOpen={setOpen} />
        </div>
    )
}