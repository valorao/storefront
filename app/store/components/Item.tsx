import Image from "next/image"
import { headers } from "next/headers";
import VPIcon from "./valorant-points-image";
import { ShieldAlert } from "lucide-react";
import { getServerSession } from "next-auth";
import LoginBtn from "./ClientActions";
import ItemCSRBtn from "./ItemCSR";

async function getStorefront() {
    const resp = await fetch("http://localhost:3000/api/storefront", {
        method: "GET",
        headers: headers(),
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
        <div className="flex flex-col gap-5 m-[-5%] md:flex-row md:m-0">
            {storefront.map((item: any) => (
                <div
                    key={item.offerID}
                    className={`md:w-1/4 border rounded-lg p-5 relative bg-white bg-opacity-5`}>
                    <div className="relative z-10 w-full h-full flex flex-col">
                        <ItemCSRBtn item={item} className="h-full w-full">
                            <div className="relative z-10 w-full h-full flex flex-col">
                                <Image
                                    src={item.weaponInfo.displayIcon}
                                    width={1500}
                                    height={800}
                                    alt="Featured Skin Image"
                                    draggable={false}
                                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                />
                                <div className="flex mt-5 text-center justify-center text-xl text-nowrap font-semibold">
                                    <div className="text-container flex items-center justify-center" style={{ height: '5px' }}>
                                        <h1 className="">{item.weaponInfo.displayName}</h1>
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
                            draggable={false}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}