import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    const response = await fetch("http://localhost:5107/v1/riot/oauth/player/storefront", {
        method: "PUT",
        headers: {
            'Authorization': `${(session?.user as { valorantToken?: string })?.valorantToken}`
        },
    });
    const data = await response.json();
    // Correctly return a NextResponse object
    return NextResponse.json({ data: data || 'Not logged in' });
};