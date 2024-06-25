"use client";
import VPIcon from "./valorant-points-image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";

type ItemDialogProps = {
    dialogSize: string;
    itemTitle: string;
    itemPrice: number;
    itemVideoPreview: string;
    isDialogOpen: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ItemDialog({ dialogSize, itemPrice, itemTitle, itemVideoPreview, isDialogOpen, setDialogOpen }: ItemDialogProps) {
    let videoPlayer;
    if (itemVideoPreview) videoPlayer = (
        <video
            className="w-full h-full rounded-lg object-cover"
            src={itemVideoPreview}
            controls
            controlsList="nodownload"
            preload="metadata"
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
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen} >
                <DialogContent className={dialogSize}>
                    <DialogHeader>
                        <DialogTitle className="mb-5" >
                            <div className="flex items-center text-center gap-1 justify-start mt-3 ml-2" >
                                {itemTitle} -
                                <VPIcon className="w-5 h-5" />  <p className="text-white" >{itemPrice}</p>
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            {videoPlayer}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="link" >fechar</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}