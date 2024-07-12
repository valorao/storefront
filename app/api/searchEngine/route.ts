import prisma from '@/lib/prisma';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const query = request.nextUrl.search;
    if (!query || query.split('?q=')[1].length < 4) return NextResponse.json({ status: 400, message: 'Invalid request' }, { status: 400 })
    if (query) {
        try {
            const getQuery = await prisma.searchPlayers.findMany({
                where: {
                    name: {
                        contains: query.includes('#') ? query.split('?q=')[1].split('#')[0] : query.split('?q=')[1],
                    },
                    tag: {
                        contains: query.includes('#') ? query.split('?q=')[1].split('#')[1] : '',
                    }
                },
                select: {
                    id: true,
                    name: true,
                    tag: true,
                    platform: true,
                    region: true,
                }
            })
            const searchResponse = getQuery.map(data => (
                {
                    id: data.id,
                    riotId: `${data.name}#${data.tag}`,
                    platform: data.platform,
                    region: data.region,
                }
            ));

            return NextResponse.json({
                searchRequest: query.split('?q=')[1],
                searchResponse
            }, { status: 200 })

        } catch (err) {
            if (err instanceof PrismaClientValidationError) {
                console.log(err.message)
                return NextResponse.json({
                    searchRequest: query.split('?q=')[1],
                    searchResponse: 'No relevant result was found'
                }, { status: 404 })
            }
        }
    }
    return NextResponse.json({
        searchRequest: query.split('?q=')[1],
        searchResponse: 'No relevant result was found'
    }, { status: 404 })
}
