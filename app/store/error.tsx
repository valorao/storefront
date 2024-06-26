'use client';

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="w-full h-full justify-center items-center text-center flex flex-col gap-3">
            <h1 className="font-bold text-xl">Algo deu errado!</h1>
            <Button
                variant="gooeyLeft"
                onClick={
                    () => reset()
                }
            >
                Tentar novamente
            </Button>
        </div>
    )
}