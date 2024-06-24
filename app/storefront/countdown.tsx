"use client";
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

    // Render loading message if remainingTime is not set or countdown has ended
    if (remainingTime <= 0) {
        return "carregando...";
    }

    return (
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    );
}