"use client";
import VPIcon from "./valorant-points-image";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { Credenza, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle } from "@/components/ui/credenza";
import Image from "next/image";

type ItemDialogProps = {
    dialogSize: string;
    itemTitle: string;
    itemPrice: number;
    itemVideoPreview: string;
    isDialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BundleDialog({ dialogSize, itemPrice, itemTitle, itemVideoPreview, isDialogOpen, setDialogOpen }: ItemDialogProps) {
    let videoPlayer;
    if (itemVideoPreview) videoPlayer = (
        <Image
            className="w-full h-full rounded-lg object-cover"
            src={itemVideoPreview}
            alt={itemTitle}
            width={1648}
            height={804}
            objectFit="contain"
        />
    )
    else {
        videoPlayer = (
            <div className="w-full h-full rounded-lg object-cover bg-gray-900 flex items-center justify-center p-10" >
                <p className="text-white" >Este item não tem uma pré-visualização disponível.</p>
            </div>
        )
    }

    return (
        <>
            <Credenza open={isDialogOpen} onOpenChange={setDialogOpen} >
                <CredenzaContent className={dialogSize}>
                    <CredenzaHeader>
                        <CredenzaTitle className="mb-5" >
                            <div className="flex items-center text-center gap-1 justify-start mt-3 ml-2" >
                                {itemTitle} -
                                <VPIcon className="w-5 h-5" />  <p className="text-white" >{itemPrice}</p>
                            </div>
                        </CredenzaTitle>
                        <CredenzaDescription>
                            {videoPlayer}
                        </CredenzaDescription>
                    </CredenzaHeader>
                    <CredenzaFooter>
                        <CredenzaClose>
                            <Button variant="default" className="w-full">fechar</Button>
                        </CredenzaClose>
                    </CredenzaFooter>
                </CredenzaContent>
            </Credenza >
        </>
    )
}