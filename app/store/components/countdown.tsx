"use client";
import { Spinner } from '@/components/ui/spinner';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CountdownPage() {
    const [remainingTime, setRemainingTime] = useState(0);

    useEffect(() => {
        const now = new Date();
        let today9pm = new Date(now);
        today9pm.setHours(21, 0, 0, 0);
        // If the current time is past 9 PM, set countdown to tomorrow's 9 PM
        if (now.getTime() > today9pm.getTime()) {
            today9pm.setDate(today9pm.getDate() + 1);
        }

        const timeDifference = today9pm.getTime() - now.getTime();
        setRemainingTime(Math.floor(timeDifference / 1000));
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
            <div className="flex items-center text-center gap-1 justify-center m-5">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="flex items-center text-center gap-1 justify-center m-5">
            <Clock />
            <h1 className="text-2xl font-bold text-center justify-center">
                Atualiza em: {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </h1>
        </div>
    );
}
