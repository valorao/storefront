import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    const response = await fetch("https://rso.rtrampox.cloud/v1/riot/player/storefront", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${(session?.user as { valorantToken?: string })?.valorantToken}`
        },
    });
    console.log((await response), session)
    const data = await response.json();
    console.log(data)
    if (data.items) {
        return NextResponse.json({ data: data || 'Not logged in' });
    } else {
        return NextResponse.json({ status: response.status, data: 'Not logged in' })
    }
};
