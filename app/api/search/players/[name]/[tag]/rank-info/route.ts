import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function GET(request: NextRequest, { params }: { params: { name: string; tag: string } }) {
    const { name, tag } = params;
    const { searchParams } = new URL(request.url);
    let search
    if (searchParams.get('isOnSelf') === 'true') {
        const session = await getServerSession(authOptions);
        const { valorantPuuid } = (session?.user as { valorantPuuid?: string });
        if (session && valorantPuuid) {
            search = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/br/${valorantPuuid}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `${process.env.HENRIK_API_KEY}`
                }, next: { revalidate: 1800 }
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

        search = await fetch(`https://api.henrikdev.xyz/valorant/v1/mmr/br/${name}/${tag}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `${process.env.HENRIK_API_KEY}`
            }, next: { revalidate: 1800 }
        })
            .then((res) => res.json());
        if (search.status === 200) {
            return NextResponse.json({
                request: new URL(request.url),
                params: params,
                forceRefresh: searchParams.get('forcerefresh'),
                searchData: search,
            })
        }
    }
}
