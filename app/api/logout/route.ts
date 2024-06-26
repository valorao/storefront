import { redirect } from "next/navigation";

export const GET = () => {
    redirect('https://oauth.rtrampox.cloud/api/logout?redirect_uri=https://valorao.cloud')
}