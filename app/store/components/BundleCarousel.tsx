"use client";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import ShineBorder from "@/app/components/magicui/shine-border";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/components/ui/carousel"
import { useMediaQuery } from "@/app/components/hooks/use-media-query";
import { Sparkles } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Spinner } from '@/app/components/ui/spinner';
import { useEffect, useState } from 'react';
import BundleDialog from "./BundleModal";
import BundleCSRBtn from "./bundleCSR";
import VPIcon from "./valorant-points-image";
import GradualSpacing from "@/app/components/magicui/gradual-spacing";

interface Bundle {
    bundle_uuid?: string;
    image_url: string;
    seconds_remaining: number;
    bundle_price: string;
    bundle_name: string;
}

interface BundleCarouselProps {
    image_url: Bundle[];
}

export const BundleCarousel: React.FC<BundleCarouselProps> = ({ image_url }) => {
    const plugin = React.useRef(
        Autoplay({ delay: 4500, stopOnInteraction: false })
    )
    const desktop = "(min-width: 768px)"
    const isDesktop = useMediaQuery(desktop)

    return (
        <Carousel
            orientation="horizontal"
            plugins={[plugin.current]}
            className="w-full overflow-visible"
            opts={{ loop: true, align: "start" }}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            onClick={() => BundleDialog}
        >
            <CarouselContent>
                {image_url && image_url.map((bundle, index) => (
                    <>
                        <BundleCSRBtn bundleData={bundle}>
                            <CarouselItem key={index} className="w-full relative overflow-visible group">
                                <div className="w-full absolute z-10 top-2 flex justify-center items-center text-center left-0 right-0" >
                                    <h1 className="text-2xl font-bold text-center flex justify-center items-center">
                                        {
                                            index > 1
                                                ?
                                                <Badge className="h-8 gap-1 text-sm font-semibold"><Sparkles className='w-4 h-4' />
                                                    Pacotes em destaque
                                                </Badge>
                                                :
                                                <Badge className="h-8 gap-1 text-sm font-semibold"><Sparkles className='w-4 h-4' />
                                                    Expira em: {CountdownPage({ time_remaining: bundle.seconds_remaining })}
                                                </Badge>
                                        }
                                    </h1>
                                </div>

                                <div className="p-1">
                                    <ShineBorder
                                        className="m-0 p-1"
                                        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                                    >
                                        <Image
                                            src={bundle.image_url}
                                            width={1648}
                                            height={804}
                                            alt="Featured Bundle Image"
                                            className="rounded-lg relative"
                                        />
                                        <div className="items-center flex-col">
                                            <div className="absolute md:bottom-4 bottom-2 left-4 flex flex-col justify-start">
                                                <h1 className="md:text-xl text-xs flex justify-start">Pacote em destaque</h1>
                                                <h1 className="md:text-6xl">
                                                    <GradualSpacing
                                                        className="md:text-6xl text-center text-xl tracking-[-0.1em] text-black dark:text-white"
                                                        text={bundle.bundle_name}
                                                    />
                                                </h1>
                                            </div>
                                            <h1 className="md:text-6xl absolute md:bottom-4 bottom-2 md:right-4 right-4 flex flex-row gap-2 items-center text-center">
                                                <VPIcon className="w-6 h-6 md:w-10 md:h-10" />
                                                <p>{bundle.bundle_price.toString()}</p>
                                            </h1>
                                        </div>
                                    </ShineBorder>
                                </div>
                            </CarouselItem>
                        </BundleCSRBtn>
                    </>
                ))}
            </CarouselContent>
            {isDesktop && image_url.length >= 2 ? (
                <>
                    <CarouselNext />
                    <CarouselPrevious />
                </>
            ) : (
                ''
            )}
        </Carousel >
    )
}

export default function CountdownPage({ time_remaining }: { time_remaining: number }) {
    const [remainingTime, setRemainingTime] = useState(time_remaining);

    useEffect(() => {
        setRemainingTime(time_remaining);
    }, [time_remaining]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const days = Math.floor(remainingTime / 86400);
    const hours = Math.floor((remainingTime % 86400) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    if (remainingTime <= 0) {
        return (
            <div className="flex items-center text-center gap-1 justify-center">
                <Spinner className="text-black w-4 h-4" /> Calculando...
            </div>
        );
    }

    return (
        <div className="flex items-center text-center justify-center">
            <h1 className="text-sm font-semibold text-center justify-center">
                {`${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </h1>
        </div>
    );
}
