import { headers } from "next/headers";


export default async function storefrontFromServer() {
    const resp = await fetch(`${process.env.NEXTAUTH_URL}/api/storefront`, {
        method: "GET",
        headers: new Headers(headers()),
    })
        .then((res) => res.json());
    console.log(resp)

    return (
        <div>
            <div>
                API Route From <span className="font-bold underline">Server</span>
            </div>
            <div>Name: {JSON.stringify(resp)}</div>
        </div>
    )
}