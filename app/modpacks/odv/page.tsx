"use client";
import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CurseforgeIcon from "./curseforgeIcon";
import ModrinthIcon from "./modrinthIcon";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function ODVModpack() {
    const betaBadge = (
        <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Beta
        </Badge>
    )
    const latestBadge = (
        <Badge variant="outline" className="text-green-500 border-green-500">
            Última versão
        </Badge>
    )

    return (
        <div className="flex flex-col items-center justify-center text-center gap-3 md:mt-0 mt-5">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        rtrampox
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        ODV Modpack
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>releases</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col items-center justify-center text-center gap-2">
                <Badge variant="destructive" className="flex md:hidden">
                    Esta página não foi adaptada para dispositivos móveis e telas menores
                </Badge>
                <div>
                    <h1 className="text-2xl font-bold">Arquivos</h1>
                </div>
            </div>
            <Accordion type="single" collapsible className="w-full md:w-10/12 p-3 md:p-0 h-auto rounded-xl">
                <AccordionItem value="item-1" className="px-5">
                    <AccordionTrigger>
                        <div className="flex justify-between w-full pr-3">
                            <h1>ODV Modpack</h1>
                            <h1>Versões</h1>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col md:flex-row justify-between text-nowrap w-full">
                            <h1 className="w-full md:w-1/6">Versão:</h1>
                            <h1 className="w-full md:w-1/6">Enviado em:</h1>
                            <h1 className="w-full md:w-1/6">Versão do jogo:</h1>
                            <h1 className="w-full md:w-1/6">Mod Loader:</h1>
                            <h1 className="w-full md:w-1/6">Tamanho:</h1>
                            <h1 className="w-full md:w-1/4">Downloads:</h1>
                        </div>
                        <div className="flex flex-col gap-3 mt-5">
                            <div className="flex flex-col md:flex-row md:gap-0 justify-between text-center items-center text-nowrap border p-2 rounded-lg">
                                <div className="flex flex-row gap-5 w-full md:w-1/6">
                                    {latestBadge}
                                    <h1>V1.0.3</h1>
                                </div>
                                <h1 className="w-full md:w-1/6">8 de Junho</h1>
                                <h1 className="w-full md:w-1/6">Forge 1.20.1</h1>
                                <h1 className="w-full md:w-1/6">Forge</h1>
                                <h1 className="w-full md:w-1/6">~ 134.7 MB</h1>
                                <div className="hidden md:flex md:w-1/4 flex-col md:flex-row gap-2 items-center justify-center text-center p-0 m-0">

                                    <Link href="https://valorao-cdn.rtrampox.cloud/modpacks%2FODV%20Modpack-1.0.3.zip">
                                        <Button variant="expandIcon" Icon={CurseforgeIcon} iconPlacement="right">
                                            CurseForge
                                        </Button>
                                    </Link>

                                    <Button variant="outline" disabled>
                                        Servidor
                                    </Button>
                                    <Button variant="outline" disabled>
                                        Arquivos
                                    </Button>
                                </div>
                                <div className="flex md:hidden w-full md:w-1/4 flex-col gap-2 items-center justify-center text-center p-0 m-0">
                                    <h1>Indisponível neste dispositivo</h1>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-0 justify-between text-center items-center text-nowrap border p-2 rounded-lg">
                                <h1 className="w-full md:w-1/6">V1.0.2</h1>
                                <h1 className="w-full md:w-1/6">7 de Junho</h1>
                                <h1 className="w-full md:w-1/6">Forge 1.20.1</h1>
                                <h1 className="w-full md:w-1/6">Forge</h1>
                                <h1 className="w-full md:w-1/6">~ 134.7 MB</h1>
                                <div className="hidden md:flex md:w-1/4 flex-col md:flex-row gap-2 items-center justify-center text-center p-0 m-0">
                                    <Link href="https://valorao-cdn.rtrampox.cloud/modpacks%2FODV%20Modpack-1.0.2.zip">
                                        <Button variant="expandIcon" Icon={CurseforgeIcon} iconPlacement="right">
                                            CurseForge
                                        </Button>
                                    </Link>
                                    <Link href="https://valorao-cdn.rtrampox.cloud/modpacks%2FODV%20Modpack%201.0.2.mrpack">
                                        <Button variant="expandIcon" Icon={ModrinthIcon} iconPlacement="right">
                                            Modrinth
                                        </Button>
                                    </Link>
                                    <Button variant="outline" disabled>
                                        Arquivos
                                    </Button>
                                </div>
                                <div className="flex md:hidden w-full md:w-1/4 flex-col gap-2 items-center justify-center text-center p-0 m-0">
                                    <h1>Indisponível neste dispositivo</h1>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-0 justify-between text-center items-center text-nowrap border p-2 rounded-lg">
                                <h1 className="w-full md:w-1/6">V1.0.1</h1>
                                <h1 className="w-full md:w-1/6">7 de Junho</h1>
                                <h1 className="w-full md:w-1/6">Forge 1.20.1</h1>
                                <h1 className="w-full md:w-1/6">Forge</h1>
                                <h1 className="w-full md:w-1/6">~ 87.06 MB</h1>
                                <div className="hidden md:flex md:w-1/4 flex-col md:flex-row gap-2 items-center justify-center text-center p-0 m-0">
                                    <Link href="https://valorao-cdn.rtrampox.cloud/modpacks%2FODV%20Modpack-1.0.0.zip">
                                        <Button variant="expandIcon" Icon={CurseforgeIcon} iconPlacement="right">
                                            CurseForge
                                        </Button>
                                    </Link>
                                    <Link href="https://valorao-cdn.rtrampox.cloud/modpacks%2FODV%20Modpack%201.0.0.mrpack">
                                        <Button variant="expandIcon" Icon={ModrinthIcon} iconPlacement="right">
                                            Modrinth
                                        </Button>
                                    </Link>
                                    <Button variant="outline" disabled>
                                        Arquivos
                                    </Button>
                                </div>
                                <div className="flex md:hidden w-full md:w-1/4 flex-col gap-2 items-center justify-center text-center p-0 m-0">
                                    <h1>Indisponível neste dispositivo</h1>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
