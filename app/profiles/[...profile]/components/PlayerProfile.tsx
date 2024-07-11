import { Clock9, RotateCcw, Search, ShieldAlert } from "lucide-react";
import { headers } from "next/headers";
import { Badge } from "@/app/components/ui/badge";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import LoginBtn from "@/app/store/components/ClientActions";
import PlayerHistory from "./PlayerHistory";
import { OpenSearchBar } from "@/app/components/navigation/openSearchBar";
import { Separator } from "@/app/components/ui/separator";

export default async function PlayerProfile({ params }: { params: { profile: string[] } }) {
    const session = await getServerSession();
    const isSelf = params.profile.length < 2 && params.profile.includes('self');
    if (isSelf && !session) {
        return (
            <div className="flex items-center text-center justify-center p-5 md:h-5 h-5 w-full font-bold text-2xl">
                <ShieldAlert className="w-10 h-10 md:mr-2" /> Faça login para continuar.
                <LoginBtn />
            </div>
        )
    }
    if (params.profile.length > 2 || params.profile.length < 2 && !params.profile.includes('self')) {
        return (
            <div className="flex items-center text-center justify-center p-5 md:h-5 h-5 w-full font-bold text-2xl">
                <ShieldAlert className="w-10 h-10 md:mr-2" /> 403 <Separator orientation="vertical" /> Requisição Inválida.
            </div>
        )
    }
    let resp = await fetch(isSelf ?
        `${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}?forcerefresh=true&isOnSelf=true` :
        `${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}?forcerefresh=true&isOnSelf=false`, {
        method: "GET",
        headers: new Headers(headers())
    }).then((res) => res.ok && res.json());

    if (!resp) {
        return (
            <div className="flex items-center text-center justify-center p-5 md:h-5 h-5 w-full font-bold text-2xl md:mt-28 mt-10">
                <div className="flex flex-col gap-4">
                    <h1 className="flex items-center text-center">
                        <ShieldAlert className="w-10 h-10 md:mr-2" />
                        Não encontramos um jogador com o RiotID {params.profile[0]}#{params.profile[1]}.
                    </h1>
                    <div className="flex items-center justify-center">
                        <OpenSearchBar className="flex items-center gap-1" variant="expandIcon">
                            <Search className="size-4" />Fazer outra busca
                        </OpenSearchBar>
                    </div>
                </div>
            </div>
        )
    }

    const lastUpdated = new Date(resp.searchData.data.last_update_raw * 1000);
    return (
        <>
            <div className="min-h-full h-screen flex flex-col items-center gap-3 md:mt-0">
                <Badge>Ultima vez atualizado: {lastUpdated.toLocaleDateString('pt-BR')} às {lastUpdated.toLocaleTimeString('pt-BR')}</Badge>
                <div className="flex w-64 h-24 dark:bg-[#1F222F] border-[#353847] border rounded-xl text-center items-center gap-3">
                    <div className="w-14 h-14 rounded-xl justify-start flex ml-4">
                        <Image src={resp.searchData.data.card.small} alt="Profile Picture" objectFit="contain" width={128} height={128} />
                    </div>
                    <h1 className="font-bold text-xl">{resp.searchData.data.name} # {resp.searchData.data.tag}</h1>
                </div>
                <div className="text-center items-center justify-center flex flex-col gap-4">
                    <div className="flex text-center justify-center flex-row gap-2">
                        <Badge variant="secondary" className="p-3"><Clock9 className="size-4 mr-1" />Últimas Partidas</Badge>
                        <Badge variant="secondary" className="p-3 flex items-center justify-center text-center rounded-full hover:animate-spinning-spin cursor-pointer">
                            <RotateCcw className="size-4 delay-1000" />
                        </Badge>
                    </div>
                    <PlayerHistory params={params} />
                </div>
            </div>
        </>
    )
}