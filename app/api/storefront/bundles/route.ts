import { NextResponse } from "next/server";

export const GET = async () => {
    const response = await fetch("https://api.henrikdev.xyz/valorant/v2/store-featured", {
        method: "GET",
        headers: {
            'accept': 'application/json',
            'Authorization': `${process.env.HENRIK_API_KEY}`
        },
        next: { revalidate: 3600 }
    });
    if (!response.ok) NextResponse.json({ data: response }, { status: response.status || 400 });
    const data = await response.json();
    return NextResponse.json({ data: data });
};
