"use client";
import VPIcon from "./valorant-points-image";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Dispatch, SetStateAction, CSSProperties } from "react";
import { Credenza, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle } from "@/components/ui/credenza";

type ItemDialogProps = {
    dialogSize: string;
    itemTitle: string;
    itemPrice: number;
    itemVideoPreview: string;
    isDialogOpen: boolean;
    itemDisplayImage: string;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ItemDialog({ dialogSize, itemPrice, itemTitle, itemVideoPreview, isDialogOpen, setDialogOpen, itemDisplayImage }: ItemDialogProps) {
    let content;
    let novideo = false;
    const contentStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    };

    if (itemVideoPreview) {
        content = (
            <video
                className="rounded-lg object-cover"
                style={contentStyle}
                src={itemVideoPreview}
                controls
                controlsList="nodownload"
                preload="auto"
                autoPlay={true}
                muted={true}
            />
        );
    } else {
        novideo = true;
        content = (
            <div className="relative rounded-lg flex items-center justify-center" style={contentStyle}>
                <Image
                    src={itemDisplayImage}
                    alt={`Shop Item ${itemTitle}`}
                    layout="fill"
                    className="object-cover"
                    draggable={false}
                    objectFit="contain"
                />
            </div>
        );
    }
    const videoPlayer = (
        <div className="relative" style={{ width: '100%', paddingTop: '56.25%' }}>
            <div className="absolute top-0 left-0 right-0 bottom-0">
                {content}
            </div>
        </div>
    );

    return (
        <>
            <Credenza open={isDialogOpen} onOpenChange={setDialogOpen} >
                <CredenzaContent className={dialogSize}>
                    <CredenzaHeader>
                        <CredenzaTitle className="mb-5" >
                            <div className="flex items-center text-center gap-2 justify-start mt-3 ml-2" >
                                {itemTitle} <p> - </p>
                                <div className="flex items-center text-center gap-1">
                                    <VPIcon className="w-5 h-5" /><p className="text-white" >{itemPrice}{!novideo && " - Nível 1"}</p>
                                </div>
                                {novideo && <p className="text-muted-foreground"> - Nenhuma prévia de vídeo disponível.</p>}
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
            </Credenza>
        </>
    )
}