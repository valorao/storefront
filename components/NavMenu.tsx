"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileDropdownMenu from "./ProfileDropdownMenu";
import { Button } from "./ui/button";
import { Menu, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import ValoraoLogo from "./valoraoLogo";

export default function NavMenu() {
    const pathname = usePathname();

    if (pathname === '/modpacks/odv') return (
        <nav className="fixed bottom-0 md:top-0 left-0 right-0 z-50 dark:bg-transparent backdrop-blur-xl h-16 flex justify-evenly shadow-md w-[100vw]">
            <div className="max-w-7xl mx-4 w-full">
            </div>
        </nav>
    );

    return (
        <div className="flex w-[100vw] h-16 flex-col fixed bottom-0 md:top-0 left-0 right-0 z-50">
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
                        esports
                    </Link>
                </nav>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
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
                    <form className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Buscar jogadores"
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                            />
                        </div>
                    </form>
                    <div className="flex items-center">
                        <ProfileDropdownMenu />
                    </div>
                </div>
            </header>
        </div>
    )
}