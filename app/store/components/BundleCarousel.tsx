"use client";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import ShineBorder from "@/components/magicui/shine-border";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useMediaQuery } from "@/components/hooks/use-media-query";

interface Bundle {
    bundle_uuid?: string;
    image_url: string;
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
            className="w-full"
            opts={{ loop: true, align: "start" }}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {image_url && image_url.map((bundle, index) => (
                    <CarouselItem key={index} className="w-full">
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
                                    className="rounded-lg"
                                />
                            </ShineBorder>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {isDesktop && <CarouselNext />}
            {isDesktop && <CarouselPrevious />}
        </Carousel >
    )
}