import Image from "next/image";
import CountdownPage from "./countdown";
import { Clock } from "lucide-react";

export default function storefront() {
    return (
        <main className="min-h-screen flex md:p-10">
            <div className="w-full h-full flex flex-col justify-center items-center text-center gap-5">
                <div>
                    <div className="mt-6 mb-6 md:mt-0" >
                        <h1 className="text-2xl font-bold text-center">
                            Pacote em destaque
                        </h1>
                    </div>
                    <div className="m-4 md:m-0 flex">
                        <div className="md:w-[73%] mx-auto justify-center flex items-center text-center border rounded-lg">
                            <Image
                                src="https://media.valorant-api.com/bundles/3d580e29-435b-8e65-22f4-3c8b8974f5fd/displayicon2.png"
                                width={1648}
                                height={804}
                                alt="Featured Bundle Image"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex items-center text-center gap-1 justify-center mb-5">
                        <Clock />
                        <h1 className="text-2xl font-bold text-center">
                            Atualiza em: <CountdownPage />
                        </h1>
                    </div>

                    <div className="flex flex-col gap-5 m-4 md:flex-row md:m-0">
                        <div className="max-w-96 border rounded-lg p-10">
                            <Image
                                src="https://media.valorant-api.com/weaponskinlevels/72303559-400a-6a2c-d081-2aae438fe6e8/displayicon.png"
                                width={1648}
                                height={804}
                                alt="Featured Skin Image"
                            />
                        </div>

                        <div className="max-w-96 border rounded-lg p-10">
                            <Image
                                src="https://media.valorant-api.com/weaponskinlevels/72303559-400a-6a2c-d081-2aae438fe6e8/displayicon.png"
                                width={1648}
                                height={804}
                                alt="Featured Skin Image"
                            />
                        </div>

                        <div className="max-w-96 border rounded-lg p-10">
                            <Image
                                src="https://media.valorant-api.com/weaponskinlevels/72303559-400a-6a2c-d081-2aae438fe6e8/displayicon.png"
                                width={1648}
                                height={804}
                                alt="Featured Skin Image"
                            />
                        </div>

                        <div className="max-w-96 border rounded-lg p-10">
                            <Image
                                src="https://media.valorant-api.com/weaponskinlevels/72303559-400a-6a2c-d081-2aae438fe6e8/displayicon.png"
                                width={1648}
                                height={804}
                                alt="Featured Skin Image"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </main>
    )
}