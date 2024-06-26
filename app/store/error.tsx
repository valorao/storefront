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
        <div className="w-full h-full justify-center items-center text-center flex flex-row">
            <h2>Algo deu errado!</h2>
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