import { Metadata } from "next";
import PlayerProfile from "./components/PlayerProfile";
import { Suspense } from "react";
import Loading from "./loading";
export default async function StoreFrontBundles({ params }: { params: { profile: string[] } }) {
    generateMetadata({ params })
    return (
        <div className="md:mt-0 mt-5 md:mb-0 mb-20">
            <Suspense fallback={<Loading />}>
                <PlayerProfile params={params} />
            </Suspense >
        </div>
    )
}


export async function generateMetadata({ params }: { params: { profile: string[] } }): Promise<Metadata> {
    if (params.profile.length < 2 && params.profile.includes('self')) {
        return {
            title: 'Seu perfil - valorao',
            description: 'Visualize seu perfil no valorao',
            openGraph: {
                title: 'Seu perfil - valorao',
                description: 'Visualize seu perfil no valorao',
                url: 'https://valorao.cloud/profiles/self',
                siteName: 'valorao',
                type: 'website',
                images: [
                    {
                        url: 'https://valorao-cdn.rtrampox.cloud/images/valorao.png',
                        secureUrl: 'https://valorao-cdn.rtrampox.cloud/images/valorao.png',
                        width: 896,
                        height: 324,
                        alt: 'valorao'
                    }
                ]
            }
        };
    }
    if (params.profile.length > 2 || params.profile.length < 2 && !params.profile.includes('self')) {
        return {
            title: 'Perfil',
            description: 'Busque por perfis do VALORANT.',
            openGraph: {
                title: `Perfil de ${params.profile[0]} - valorao`,
                description: `Visualize o perfil de ${params.profile[0]}#${params.profile[1]} no valorao`,
                url: `https://valorao.cloud/profiles?q=+`,
                siteName: 'valorao',
                type: 'website',
                images: [
                    {
                        url: 'https://valorao-cdn.rtrampox.cloud/images/valorao.png',
                        secureUrl: 'https://valorao-cdn.rtrampox.cloud/images/valorao.png',
                        alt: 'valorao',
                        width: 896,
                        height: 324,
                    }
                ]
            }
        };
    } else {
        const getPlayerImage = await fetch(`${process.env.NEXTAUTH_URL}/api/search/players/${params.profile[0]}/${params.profile[1]}?isOnSelf=false`, {
            method: "GET"
        }).then((res) => res.json());

        return {
            title: `Perfil de ${params.profile[0]} - valorao`,
            description: `Visualize o perfil de ${params.profile[0]}#${params.profile[1]}`,
            openGraph: {
                title: `Perfil de ${params.profile[0]} - valorao`,
                description: `Visualize o perfil de ${params.profile[0]}#${params.profile[1]} no valorao`,
                url: `https://valorao.cloud/profiles/${params.profile[0]}/${params.profile[1]}`,
                siteName: 'valorao',
                type: 'website',
                images: [
                    {
                        url: getPlayerImage.searchData.data.card.small || 'https://valorao-cdn.rtrampox.cloud/images/valorao.png',
                        secureUrl: getPlayerImage.searchData.data.card.small || 'https://valorao-cdn.rtrampox.cloud/images/valorao.png',
                        width: 256,
                        height: 256,
                        alt: 'valorao'
                    }
                ]
            }
        };
    }
}