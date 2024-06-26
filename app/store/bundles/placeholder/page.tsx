
export const metadata = {
    title: 'dev - valorao',
}

export default async function StoreFrontBundles() {
    const resp = await fetch(`${process.env.NEXTAUTH_URL}/api/storefront/bundles`, {
        method: "GET",
    })
        .then((res) => res.json());

    return (
        <div className="max-w-full max-h-full">
            <h1 className="flex text-center items-center justify-center font-bold text-2xl">
                Esta é uma página em construção. Ela está sendo usada como placeholder para futuras mudanças.
            </h1>
            <div>
                <span className="font-bold underline">Storefront Bundles API Response (SSR RENDERED):</span>
            </div>
            <pre>{JSON.stringify(resp, null, 2)}</pre>
        </div>
    )
}
