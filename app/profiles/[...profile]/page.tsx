import { Metadata } from "next";
import PlayerProfile from "./components/PlayerProfile";
import { Suspense } from "react";
import Loading from "./loading";
export default async function StoreFrontBundles({ params }: { params: { profile: string[] } }) {
    generateMetadata({ params })
    return (
        <div>
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
            description: 'Visualize seu perfil.',
        };
    }
    if (params.profile.length > 2 || params.profile.length < 2 && !params.profile.includes('self')) {
        return {
            title: 'Perfil',
            description: 'Busque por perfis do VALORANT.',
        };
    } else {
        return {
            title: `Perfil de ${params.profile[0]} - valorao`,
            description: `Visualize o perfil de ${params.profile[0]}#${params.profile[1]}.`,
        };
    }
}