"use client";
import { ReactNode, useState } from "react";
import BundleDialog from "./BundleModal";

export default function BundleCSRBtn({ bundleData, className, children }: { bundleData: any; className?: string; children?: ReactNode }) {
    const [isDialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <button className={className || ''} onClick={() => setDialogOpen(true)}>
                {children}
            </button>
            <BundleDialog
                dialogSize="md:max-w-[700px]"
                itemPrice={bundleData.bundle_price}
                itemTitle={bundleData.bundle_name}
                itemVideoPreview={bundleData.image_url}
                key={bundleData.bundle_uuid}
                isDialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen}
            />
        </>
    );
}