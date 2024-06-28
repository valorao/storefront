import { ShieldAlert } from "lucide-react";
import { headers } from "next/headers";
import { Badge } from "@/components/ui/badge"
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import LoginBtn from "@/app/store/components/ClientActions";

export default async function PlayerProfile({ params }: { params: { profile: string[] } }) {
    const session = await getServerSession();
    if (params.profile.length < 2 && params.profile.includes('self') && !session) {
        return (
            <div className="flex items-center text-center justify-center w-full font-bold text-2xl mt-20 grow">
                <ShieldAlert className="w-10 h-10 mr-2" /> Faça login para continuar.
                <LoginBtn />
            </div>
        )
    }
    if (params.profile.length > 2 || params.profile.length < 2 && !params.profile.includes('self')) {
        return (
            <div className="flex items-center text-center justify-center p-5 h-full w-full font-bold text-2xl">
                <ShieldAlert className="w-10 h-10 md:mr-2" /> Requisição inválida.
            </div>
        )
    }
    let resp;
    if (params.profile.length < 2 && params.profile.includes('self')) {
        resp = await fetch(`${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}?forcerefresh=true&isOnSelf=true`, {
            method: "GET",
            headers: new Headers(headers()),
        }).then((res) => res.json());
    } else {
        resp = await fetch(`${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}?forcerefresh=true&isOnSelf=false`, {
            method: "GET",
        }).then((res) => res.json());
    }
    const lastUpdated = new Date(resp.searchData.data.last_update_raw * 1000);

    return (
        <>
            <div className="max-w-full max-h-full flex flex-col justify-center items-center gap-3 mt-10 md:mt-0">
                <Badge>Ultima vez atualizado: {lastUpdated.toLocaleDateString('pt-BR')} às {lastUpdated.toLocaleTimeString('pt-BR')}</Badge>
                <div className="flex w-64 h-24 bg-[#1F222F] border-[#353847] border rounded-xl text-center items-center gap-3">
                    <div className="w-14 h-14 rounded-xl justify-start flex ml-4">
                        <Image src={resp.searchData.data.card.small} alt="Profile Picture" objectFit="contain" width={128} height={128} />
                    </div>
                    <h1 className="font-bold text-xl">{resp.searchData.data.name} # {resp.searchData.data.tag}</h1>
                </div>
            </div>
        </>
    )
}