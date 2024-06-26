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
    if (!response.ok) {
        throw new Error('There was an error while fetching data.');
    }
    if (response.status === 502) return NextResponse.json({ status: 502 });
    const data = await response.json();
    if (data.items) {
        return NextResponse.json({ data: data || 'Not logged in' });
    } else {
        return NextResponse.json({ status: response.status, data: 'Not logged in' });
    }
};
