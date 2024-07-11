import CountdownPage from "./components/countdown";
import Item from "./components/Item";
import { Suspense } from "react";
import { Spinner } from "@/app/components/ui/spinner";
import { BundleCarousel } from "./components/BundleCarousel";
import { BadgeMagicUI } from "./components/Badge";

export const metadata = {
    title: 'Loja - valorao',
}

type BundleImages = {
    bundle_uuid: string;
    image_url: string;
    seconds_remaining: number;
    bundle_price: string;
    displayName: string;
    bundle_name: string;
}

export default async function storefront() {
    let bundleImgs: BundleImages[] = [];
    const bundles = await fetch(`${process.env.NEXTAUTH_URL}/api/storefront/bundles`, {
        method: "GET",
    })
        .then((res) => res.json());
    if (bundles.data.data) {
        const bundleImgsPromises = bundles.data.data.map(async (image: BundleImages) => {
            const response = await fetch(`https://valorant-api.com/v1/bundles/${image.bundle_uuid}?language=pt-BR`, {
                method: "GET",
            });
            const bundleImg = await response.json();
            return {
                bundle_uuid: image.bundle_uuid,
                image_url: bundleImg.data.displayIcon2,
                seconds_remaining: image.seconds_remaining,
                bundle_price: image.bundle_price,
                bundle_name: bundleImg.data.displayName
            };
        });
        bundleImgs = await Promise.all(bundleImgsPromises);
    }


    return (
        <div className="flex flex-col max-w-full justify-center items-center text-center">
            {/* <BadgeMagicUI /> */}
            <div className=" w-full h-full flex flex-col">
                <div className="m-4 md:m-0 flex">
                    <div className="relative md:w-[73%] w-[100%] mx-auto justify-center flex items-center text-center border rounded-lg">
                        <BundleCarousel image_url={bundleImgs} />
                    </div>
                </div>
            </div>

            <div className="w-full">
                <CountdownPage />
                <div>
                    <Suspense fallback={
                        <div className="flex items-center justify-center md:h-40 h-20 w-full">
                            <Spinner className="w-10 h-10" />
                        </div>
                    }>
                        <div className="m-4 md:w-[73%] w-[100%] mx-auto justify-center flex items-center text-center rounded-lg">
                            <Item />
                        </div>
                    </Suspense>
                </div>
            </div>

        </div >
    )
}