"use client";
import { Clock, LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CountdownPage() {
    const [remainingTime, setRemainingTime] = useState(0);
    useEffect(() => {
        const now = new Date();
        const today9pm = new Date(now);
        today9pm.setHours(21, 0, 0, 0);
        const timeDifference = today9pm.getTime() - now.getTime();
        if (timeDifference > 0) { // Only set remaining time if it's positive
            setRemainingTime(Math.floor(timeDifference / 1000));
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    if (remainingTime <= 0) {
        return (
            <div className="flex items-center text-center gap-1 justify-center mb-5">
                <h1 className="text-2xl font-bold text-center justify-center">
                    Atualiza em:
                </h1>
                <LoaderCircle className='animate-spin' />
            </div>
        );
    }

    return (
        <div className="flex items-center text-center gap-1 justify-center mb-5">
            <Clock />
            <h1 className="text-2xl font-bold text-center justify-center">
                Atualiza em: {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </h1>
        </div>

    );
}