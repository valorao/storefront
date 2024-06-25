import Image from "next/image"
import { headers } from "next/headers";
import VPIcon from "./valorant-points-image";
import { ShieldAlert } from "lucide-react";
import { getServerSession } from "next-auth";
import LoginBtn from "./ClientActions";
import ItemCSRBtn from "./ItemCSR";

async function getStorefront() {
    const resp = await fetch(`${process.env.NEXTAUTH_URL}/api/storefront`, {
        method: "GET",
        headers: new Headers(headers()),
    })
        .then((res) => res.json());
    const items = resp.data.items;
    return items || null;
}

export default async function Item() {
    const session = await getServerSession();
    const storefront = await getStorefront();
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
        <div className="flex flex-col gap-5 md:flex-row md:m-0 w-auto h-auto p-4 mb-20">
            {storefront.map((item: any) => (
                <div
                    key={item.offerID}
                    className="md:w-1/4 h-full border rounded-lg p-5 pb-2 relative bg-white bg-opacity-5 max-h-[200px] flex flex-col justify-between">
                    <div className="relative z-10 w-full h-full flex flex-col">
                        <ItemCSRBtn item={item} className="h-full w-full">
                            <div className="relative z-10 w-full">
                                <Image
                                    src={item.weaponInfo.displayIcon}
                                    width={1300}
                                    height={800}
                                    alt="Featured Skin Image"
                                    className="min-h-full max-h-[100px]"
                                    draggable={false}
                                    style={{ objectFit: 'contain', width: '100%', height: '100px' }}
                                />
                                <div className="flex mt-5 text-start justify-center text-xl font-semibold text-wrap break-words">
                                    <div className="text-wrap flex items-center justify-center break-words">
                                        <h1 className="break-words">{item.weaponInfo.displayName}</h1>
                                        <div className="flex items-center text-center gap-1 ml-10">
                                            <VPIcon className="w-5 h-5" />
                                            <p>{item.cost}</p>
                                        </div>
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