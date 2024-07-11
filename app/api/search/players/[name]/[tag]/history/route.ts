import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";

export async function GET(request: NextRequest, { params }: { params: { name: string; tag: string } }) {
    const { name, tag } = params;
    const { searchParams } = new URL(request.url);
    let search
    if (searchParams.get('isOnSelf') === 'true') {
        const session = await getServerSession(authOptions);
        const { valorantPuuid } = (session?.user as { valorantPuuid?: string });
        if (session && valorantPuuid) {
            search = await fetch(`https://api.henrikdev.xyz/valorant/v3/by-puuid/matches/br/${valorantPuuid}?startIndex=5&endIndex=7`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `${process.env.HENRIK_API_KEY}`
                }, next: { revalidate: 3600 }
            }).then((res) => res.json());
            return NextResponse.json({
                request: new URL(request.url),
                params: params,
                forceRefresh: searchParams.get('forcerefresh'),
                searchData: search,
                puuid: valorantPuuid,
            })
        } else {
            return NextResponse.json({
                error: 'Missing required parameters.',
                providedParams: `${name}#${tag}`,
                expectedParams: 'name, tag',
                missingParams: !name ? 'name' : !tag ? 'tag' : 'name, tag',
                request: new URL(request.url),
                params: params,
            },
                { status: 400 })
        }
    }
    if (!name || !tag || name === 'undefined' || tag === 'undefined') {
        return NextResponse.json({
            error: 'Missing required parameters.',
            providedParams: `${name}#${tag}`,
            expectedParams: 'name, tag',
            missingParams: !name ? 'name' : !tag ? 'tag' : 'name, tag',
            request: new URL(request.url),
            params: params,
        },
            { status: 400 })
    } else {

        search = await fetch(`https://api.henrikdev.xyz/valorant/v3/matches/br/${name}/${tag}?size=5`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `${process.env.HENRIK_API_KEY}`
            },
        })
            .then((res) => res.json());
        return NextResponse.json({
            request: new URL(request.url),
            params: params,
            forceRefresh: searchParams.get('forcerefresh'),
            searchData: search,
        })
    }
}
