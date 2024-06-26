import Image from "next/image";
import CountdownPage from "./components/countdown";
import Item from "./components/Item";
import { Suspense } from "react";
import { LoaderCircle } from "lucide-react";
import ShineBorder from "@/components/magicui/shine-border";

export default function storefront() {
    return (
        <div className="flex flex-col max-w-full justify-center items-center text-center">
            <div className=" w-full h-full flex flex-col">
                <div className="mt-6 mb-6 md:mt-0" >
                    <h1 className="text-2xl font-bold text-center">
                        Pacote em destaque
                    </h1>
                </div>
                <div className="m-4 md:m-0 flex">
                    <div className="relative md:w-[73%] mx-auto justify-center flex items-center text-center border rounded-lg">
                        <ShineBorder
                            className="m-0 p-1"
                            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                        >
                            <Image
                                src="https://media.valorant-api.com/bundles/3d580e29-435b-8e65-22f4-3c8b8974f5fd/displayicon2.png"
                                width={1648}
                                height={804}
                                alt="Featured Bundle Image"
                                className="rounded-lg"
                            />
                        </ShineBorder>
                    </div>
                </div>
            </div>

            <div>
                <CountdownPage />
                <div>
                    <Suspense fallback={
                        <div className="flex items-center justify-center md:h-40 h-20 w-full">
                            <LoaderCircle className="animate-spin w-10 h-10" />
                        </div>
                    }>
                        <div>
                            <Item />
                        </div>
                    </Suspense>
                </div>
            </div>

        </div>
    )
}