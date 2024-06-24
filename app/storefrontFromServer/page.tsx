import { headers } from "next/headers";

export default async function storefrontFromServer() { 
    const resp = await fetch("http://localhost:3000/api/storefront", {
        method: "GET",
        headers: headers(),
    })
    .then((res) => res.json());

    return (
        <div>
            <div>
                API Route From <span className="font-bold underline">Server</span>
            </div>
            <div>Name: {JSON.stringify(resp)}</div>
        </div>
    )
}