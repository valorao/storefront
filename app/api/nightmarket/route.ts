import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth-options";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    const response = await fetch("https://rso.rtrampox.cloud/v1/riot/oauth/player/storefront", {
        method: "PUT",
        headers: {
            'Authorization': `${(session?.user as { valorantToken?: string })?.valorantToken}`
        },
    });
    const data = await response.json();
    return NextResponse.json({ data: data || 'Not logged in' });
};