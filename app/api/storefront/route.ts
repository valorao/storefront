import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    // const token = await getToken({
    //     req,
    //     secret: process.env.NEXTAUTH_SECRET ?? '',
    // })
    // console.log(token)
    if (session?.user) {
        const response = await fetch("https://rso.rtrampox.cloud/v1/riot/player/storefront", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${(session?.user as { valorantToken?: string })?.valorantToken}`
            },
            next: { revalidate: 180 }
        });
        if (!response.ok) {
            throw new Error('There was an error while fetching data.');
        }
        if (response.status === 502) return NextResponse.json({ status: 502 }, { status: response.status });
        const data = await response.json();
        if (data.items) {
            return NextResponse.json({ data: data || 'Not logged in' }, { status: response.status });
        } else {
            return NextResponse.json({ status: response.status, data: 'Not logged in' }, { status: response.status });
        }
    } else {
        return NextResponse.json({ status: 400, data: 'Not logged in' }, { status: 400 });
    }
};
