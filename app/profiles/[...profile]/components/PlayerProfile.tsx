import { Clock9, RotateCcw, Search, ShieldAlert } from "lucide-react";
import { headers } from "next/headers";
import { Badge } from "@/app/components/ui/badge";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import LoginBtn from "@/app/store/components/ClientActions";
import PlayerHistory from "./PlayerHistory";
import { OpenSearchBar } from "@/app/components/navigation/openSearchBar";
import { Separator } from "@/app/components/ui/separator";
import { PlayerProfileImg, PlayerRankImg } from "./playerProfileImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        `${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}?isOnSelf=true` :
        `${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}?isOnSelf=false`, {
        method: "GET",
        headers: new Headers(headers())
    }).then((res) => res.ok && res.json());
    let rankInfo = await fetch(isSelf ?
        `${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}/rank-info?isOnSelf=true` :
        `${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}/rank-info?isOnSelf=false`, {
        method: "GET",
        headers: new Headers(headers())
    }).then((res) => res.ok && res.json());

    if (!resp) {
        return (
            <div className="flex items-center text-center justify-center p-5 md:h-5 h-5 w-full font-bold text-2xl md:mt-28 mt-10">
                <div className="flex flex-col gap-4">
                    <h1 className="flex items-center text-center">
                        <ShieldAlert className="w-10 h-10 md:mr-2" />
                        Não encontramos um jogador com o RiotID {decodeURI(params.profile[0])}#{decodeURI(params.profile[1])}.
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

    return (
        <>
            <div className="max-h-screen flex flex-col items-center gap-3 md:mt-0">
                <div className="flex md:w-[440px] w-[93%] h-24 dark:bg-zinc-900 border-zinc-600 border rounded-xl text-center items-center gap-2 mx-auto">
                    <div className="w-14 h-14 rounded-xl justify-start flex mx-auto">
                        <PlayerProfileImg searchData={resp.searchData} />
                    </div>
                    <h1 className="font-bold text-xl">{resp.searchData.data.name} # {resp.searchData.data.tag}</h1>
                    <div className="w-[1px] bg-zinc-600 h-full"></div>
                    <div className="flex flex-col justify-center items-center text-center gap-1 mx-auto">
                        <h1 className="md:text-xl text-sm">{
                            rankInfo.searchData.data && rankInfo.searchData.data.currenttierpatched
                                ? rankInfo.searchData.data.currenttierpatched :
                                'Sem classificação'}
                        </h1>
                        <PlayerRankImg searchData={rankInfo.searchData} />
                    </div>
                </div>
                <div className="text-center items-center justify-center flex flex-col gap-4">
                    <div className="flex text-center justify-center flex-row gap-2">
                        <Badge variant="secondary" className="p-3"><Clock9 className="size-4 mr-1" />Últimas Partidas</Badge>
                        <Badge variant="secondary" className="p-3 flex items-center justify-center text-center rounded-full hover:animate-spinning-spin cursor-pointer">
                            <RotateCcw className="size-4 delay-1000" />
                        </Badge>
                    </div>
                    <Tabs defaultValue="account" className="md:w-[440px] w-[93%]">
                        <TabsList>
                            <TabsTrigger value="account">Tudo</TabsTrigger>
                            <TabsTrigger value="password" disabled>Competitivo</TabsTrigger>
                            <TabsTrigger value="password" disabled>Mata-mata</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <PlayerHistory params={params} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}