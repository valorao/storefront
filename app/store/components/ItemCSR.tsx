"use client";
import { ReactNode, useState } from "react";
import ItemDialog from "./ItemModal";

export default function ItemCSRBtn({ item, className, children }: { item: any; className?: string; children?: ReactNode }) {
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <button className={className || ''} onClick={() => setDialogOpen(true)}>
                {children}
            </button>
            <ItemDialog
                dialogSize="md:max-w-[700px]"
                itemPrice={item.cost}
                itemTitle={item.weaponInfo.displayName}
                itemVideoPreview={item.weaponInfo.streamedVideo}
                key={item.offerID}
                isDialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
            />
        </>
    );
}