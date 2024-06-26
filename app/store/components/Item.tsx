import Image from "next/image"
import { headers } from "next/headers";
import VPIcon from "./valorant-points-image";
import { ShieldAlert } from "lucide-react";
import { getServerSession } from "next-auth";
import LoginBtn from "./ClientActions";
import ItemCSRBtn from "./ItemCSR";

async function getStorefront() {
    const resp = await fetch(`${process.env.NEXTAUTH_URL || process.env.VERCEL}/api/storefront`, {
        method: "GET",
        headers: new Headers(headers()),
    })
        .then((res) => res.json());
    return resp || null;
}

export default async function Item() {
    const session = await getServerSession();
    const GetStorefront = await getStorefront();
    const storefront = GetStorefront.data.items;
    if (!session) {
        return (
            <div className="flex items-center text-center justify-center p-5 md:h-5 h-5 w-full font-bold text-2xl">
                <ShieldAlert className="w-10 h-10 md:mr-2" /> Faça login para visualizar sua loja.
                <LoginBtn />
            </div>
        )
    }
    if (!storefront) {
        return (
            <div className="flex items-center text-center justify-center md:h-5 h-5 w-full font-bold text-2xl">
                <ShieldAlert className="w-10 h-10 mr-2" /> Faça login para visualizar sua loja.
                <LoginBtn />
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-5 md:flex-row md:m-0 w-auto h-auto">
            {storefront.map((item: any) => (
                <div
                    key={item.offerID}
                    className="md:w-1/4 h-[190px] border rounded-lg p-5 pb-1 relative dark:bg-white dark:bg-opacity-5 flex flex-col justify-between">
                    <div className="relative z-10 w-full h-full flex flex-col">
                        <ItemCSRBtn item={item} className="h-full w-full">
                            <div className="relative z-10 w-full m-0 p-0">
                                <Image
                                    src={item.weaponInfo.displayIcon}
                                    width={1300}
                                    height={800}
                                    alt="Featured Skin Image"
                                    className="min-h-full m-0 p-0 max-h-[100px] max-w-[330px]"
                                    draggable={false}
                                    style={{ objectFit: 'contain', width: '300px', height: '100px' }}
                                />
                                <div className="flex justify-between flex-row mt-3 text-xl font-semibold">
                                    <div>
                                        <h1 className="text-slate-200 text-xl font-semibold break-words text-left">{item.weaponInfo.displayName}</h1>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <VPIcon className="w-5 h-5" />
                                        <p>{item.cost}</p>
                                    </div>
                                </div>
                            </div>
                        </ItemCSRBtn>
                    </div>
                    <div className="absolute inset-0 z-[-10] overflow-hidden">
                        <Image
                            src={item.weaponInfo.contentTierInfo.displayIcon}
                            width={256}
                            height={256}
                            objectFit="contain"
                            alt="Content Tier Image"
                            className="opacity-40"
                            draggable={false}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}