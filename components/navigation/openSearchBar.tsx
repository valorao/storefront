"use client";
import { ReactNode, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import SearchBar from "./navSearchBar";

type OpenSearchBarProps = {
    className?: string
    children: ReactNode
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "expandIcon" | "ringHover" | "shine" | "gooeyRight" | "gooeyLeft" | "linkHover1" | "linkHover2" | null | undefined
}

export function OpenSearchBar({ className, children, variant }: OpenSearchBarProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button className={className} variant={variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "expandIcon" | "ringHover" | "shine" | "gooeyRight" | "gooeyLeft" | "linkHover1" | "linkHover2" | null | undefined} onClick={() => setOpen(true)}>{children}</Button>
            <SearchBar open={open} setOpen={setOpen} />
        </>
    )
}