import { NextResponse } from "next/server";

export const GET = () => {
    return NextResponse.redirect('https://oauth.rtrampox.cloud/api/logout?redirect_uri=https://valorao.cloud/store');

}