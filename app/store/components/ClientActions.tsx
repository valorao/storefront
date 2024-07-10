"use client";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginBtn() {
    return (
        <Button className="ml-3" variant="outline" onClick={() => signIn('unified')}>
            <LogIn className="w-4 h-4 mr-2" /> Login
        </Button>
    )
}