import { Badge } from "@/components/ui/badge";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BorderBeam } from "@/components/magicui/border-beam";
import CurseforgeIcon from "./curseforgeIcon";
import ModrinthIcon from "./modrinthIcon";

export const metadata = {
    title: "ODV/Modpack - valorao",
    description: "Página de downloads de modpacks",
}

export default function ODVModpack() {
    return (
        <div className="items-center justify-center text-center flex flex-col gap-3 md:mt-0 mt-10">
            <div className="items-center justify-center text-center gap-2 flex flex-col">
                <Badge>Esta página é um trabalho em progresso</Badge>
                <div>
                    <h1 className="font-bold text-2xl">Downloads</h1>
                </div>
            </div>
            <Accordion type="single" collapsible className="md:w-10/12 w-full p-3 md:p-0 h-auto rounded-xl">
                <AccordionItem value="item-1">
                    <AccordionTrigger>ODV Modpack</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex md:flex-col flex-row">
                            <div className="flex md:flex-row flex-col justify-between text-nowrap">
                                <h1 className="w-1/6">Versão:</h1>
                                <h1 className="w-1/6">Enviado em:</h1>
                                <h1 className="w-1/6">Versão do jogo:</h1>
                                <h1 className="w-1/6">Mod Loader:</h1>
                                <h1 className="md:w-1/4 w-1/6">Downloads:</h1>
                            </div>
                            <div className="flex  md:flex-row flex-col md:gap-0 justify-between text-center items-center text-nowrap">
                                <h1 className="w-1/6">V1.0.0</h1>
                                <h1 className="w-1/6">7 de Junho</h1>
                                <h1 className="w-1/6">Forge 1.20.1</h1>
                                <h1 className="w-1/6">Forge</h1>
                                <div className="md:w-1/4 w-1/6 md:flex-row flex-col gap-2 md:items-center md:justify-center md:text-center p-0 m-0 hidden md:flex">
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
                                    <Button variant="expandIcon" Icon={ModrinthIcon} iconPlacement="right" disabled>
                                        Somente arquivos
                                    </Button>
                                </div>
                                <div className="md:w-1/4 w-1/6 md:flex-row flex-col gap-2 md:items-center md:justify-center md:text-center p-0 m-0 md:hidden flex">
                                    <h1>Indisponível neste dispotivo</h1>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}