import { authOptions, CustomSession } from "@/app/lib/auth-options";
import { getServerSession } from "next-auth/next";
import { headers } from "next/headers";
import Image from "next/image";

export default async function PlayerHistory({ params }: { params: { profile: string[] } }) {
    const session = await getServerSession(authOptions) as CustomSession;
    const isOnSelf = params.profile.length < 2 && params.profile.includes('self') && session
    let historyresp;
    if (isOnSelf) {
        historyresp = await fetch(`${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}/history?forcerefresh=true&isOnSelf=true`, {
            method: "GET",
            headers: new Headers(headers()),
        }).then((res) => res.json());

    } else {
        historyresp = await fetch(`${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}/history?forcerefresh=true&isOnSelf=false`, {
            method: "GET",
        }).then((res) => res.json());
    }

    return (
        <>
            <div className="flex flex-col gap-3 items-center justify-center text-center">
                {historyresp.searchData.data.map(async (data: any) => {
                    const searchedPlayer = isOnSelf ?
                        data.players.all_players.find((player: any) => player.puuid === (session.user?.valorantPuuid)) :
                        data.players.all_players.find((player: any) => player.name.toLowerCase() === params.profile[0].toLowerCase());

                    const winnerTeam = data.teams.blue.has_won ? 'blue' : 'red';
                    const redTeamScore = data.teams.red.rounds_won;
                    const blueTeamScore = data.teams.blue.rounds_won;
                    const playerTeam = searchedPlayer.team.toLowerCase();
                    const playerIsWinner = searchedPlayer.team.toLowerCase().includes(winnerTeam);
                    const getMapInfo = await mapInfo(data.metadata.map);
                    const { kills, deaths, assists, bodyshots, headshots, legshots } = searchedPlayer.stats;
                    const headshotPercentage = (headshots / (bodyshots + headshots + legshots)) * 100;
                    {
                        return (
                            <div
                                className="flex md:w-96 w-[370px] rounded-xl relative overflow-hidden border-2"
                                key={data.metadata.matchid}>
                                <div className="flex items-center justify-center">
                                    <div className={`absolute top-0 left-0 right-0 bottom-0 z-10 ${playerIsWinner ?
                                        `bg-[linear-gradient(90deg,rgba(56,180,25,0.6)0%,rgba(115,115,115,0.5)70%)]` :
                                        `bg-[linear-gradient(90deg,rgba(200,53,53,0.6)0%,rgba(115,115,115,0.5)70%)]`}`}
                                    >
                                        <div className="flex items-center w-full h-full">
                                            <Image
                                                className="rounded-xl size-14 min-h-full ml-3 object-contain overflow-hidden"
                                                src={searchedPlayer.assets.agent.small}
                                                alt={getMapInfo.mapName}
                                                width={256}
                                                height={256}
                                            />
                                            <div className="flex flex-col text-center m-0 min-w-16">
                                                <h1 className="text-[#D9D9D9] justify-start text-base flex ml-3">
                                                    {data.metadata.mode}
                                                </h1>

                                                <h1 className="text-white justify-start flex ml-3">
                                                    {data.metadata.map}
                                                </h1>

                                                <h1 className="text-white justify-start flex ml-3">
                                                    {playerTeam === 'red' ?
                                                        `${redTeamScore} : ${blueTeamScore}` :
                                                        `${blueTeamScore} : ${redTeamScore}`
                                                    }
                                                </h1>

                                            </div>
                                            <div className="flex flex-col w-full h-full items-center justify-center">
                                                <h1 className="text-white items-center text-center justify-center flex font-semibold">
                                                    KDA
                                                </h1>
                                                <h1 className="text-white items-center text-center justify-center flex">
                                                    {`${kills} / ${deaths} / ${assists}`}
                                                </h1>
                                            </div>
                                            <div className="flex flex-col max-w-24 h-full items-center text-center justify-center mr-3">
                                                <h1 className="text-white items-center text-center justify-center flex font-semibold">
                                                    HS%
                                                </h1>
                                                <h1 className="text-white items-center text-center justify-center flex">
                                                    {`${headshotPercentage.toFixed(2)}%`}
                                                </h1>
                                            </div>
                                        </div>
                                    </div>
                                    <Image
                                        className="rounded-xl w-full object-contain overflow-hidden h-full z-0"
                                        src={getMapInfo.mapListViewIcon}
                                        alt={getMapInfo.mapName}
                                        width={456}
                                        height={100}
                                    />
                                </div>
                            </div>
                        )

                    }
                })}
            </div>
        </>
    )

}

async function mapInfo(mapName: string) {
    const mapInfo = await fetch(`https://rso.rtrampox.cloud/v1/riot/data/map?mapName=${mapName}`).then((res) => res.json());
    return mapInfo;
}