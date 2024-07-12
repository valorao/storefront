import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth-options";
import { storePlayerQuery } from '../../../functions/storeQuery';

export async function GET(request: NextRequest, { params }: { params: { name: string; tag: string } }) {
    const name = decodeURI(params.name)
    const tag = decodeURI(params.tag)
    const { searchParams } = new URL(request.url);
    let search
    if (searchParams.get('isOnSelf') === 'true') {
        const session = await getServerSession(authOptions);
        const { valorantPuuid } = (session?.user as { valorantPuuid?: string });
        if (session && valorantPuuid) {
            search = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/account/${valorantPuuid}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `${process.env.HENRIK_API_KEY}`
                }, next: { revalidate: 3600 }
            }).then((res) => res.json());
            const storeAutocompletion = await storePlayerQuery(search.data.name, search.data.tag, true)
            return NextResponse.json({
                request: new URL(request.url),
                params: params,
                forceRefresh: searchParams.get('forcerefresh'),
                completionEngine: storeAutocompletion,
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

        search = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${encodeURI(name)}/${encodeURI(tag)}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `${process.env.HENRIK_API_KEY}`
            }, next: { revalidate: 3600 }
        }).then((res) => res.json());
        if (search.status === 404) {
            return NextResponse.json({
                request: new URL(request.url),
                params: params,
                searchData: search,
            }, { status: search.status })
        }
        if (search.status === 200) {
            const storeAutocompletion = await storePlayerQuery(name, tag, true)
            return NextResponse.json({
                request: new URL(request.url),
                params: params,
                forceRefresh: searchParams.get('forcerefresh'),
                completionEngine: storeAutocompletion,
                searchData: search,
            }, { status: 200 })
        }
    }
}
