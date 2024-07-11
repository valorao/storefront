import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";
import Image from "next/image";

export default async function PlayerHistory({ params }: { params: { profile: string[] } }) {
    const session = await getServerSession();
    let historyresp;
    if (params.profile.length < 2 && params.profile.includes('self')) {
        historyresp = await fetch(`${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}/history?forcerefresh=true&isOnSelf=true`, {
            method: "GET",
            headers: new Headers(headers()),
        }).then((res) => res.json());

    } else {
        historyresp = await fetch(`${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}/history?forcerefresh=true&isOnSelf=false`, {
            method: "GET",
        }).then((res) => res.json());
    }
    const getMapInfo = await mapInfo(historyresp.searchData.data[0].metadata.map);

    return (
        <>
            <div className="relative flex md:w-96 w-[370px] h-32 dark:bg-[#1F222F] border-[#353847] rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent opacity-50">
                    <Image
                        className="p-1 rounded-xl z-0 w-full h-full"
                        src={getMapInfo.mapListViewIcon}
                        alt={getMapInfo.mapName}
                        objectFit="contain"
                        width={456}
                        height={100}
                    />
                </div>

                <div className="z-10">
                </div>
            </div>
        </>
    )

}

async function mapInfo(mapName: string) {
    const mapInfo = await fetch(`https://rso.rtrampox.cloud/v1/riot/data/map?mapName=${mapName}`).then((res) => res.json());
    return mapInfo;
}