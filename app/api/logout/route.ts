import { redirect } from "next/navigation";

export default function logout() {
    redirect('https://oauth.rtrampox.cloud/api/logout?redirect_uri=https://valorao.cloud')
}