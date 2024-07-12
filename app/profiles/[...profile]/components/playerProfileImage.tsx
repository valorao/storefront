"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export function PlayerProfileImg({ searchData }: { searchData: any }) {
    const defaultImg = 'https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/smallart.png';
    const [img, setImg] = useState(defaultImg);

    useEffect(() => {
        console.log(searchData.data)
        if (searchData.data.card && searchData.data.card.small) {
            setImg(searchData.data.card.small);
        } else {
            setImg(defaultImg);
        }
    }, [searchData]);

    return (
        <Image
            src={img}
            alt="Profile Picture"
            className="object-contain"
            width={128}
            height={128}
            onError={() => setImg(defaultImg)}
        />
    );
}

export function PlayerRankImg({ searchData }: { searchData: any }) {
    const defaultImg = 'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/0/largeicon.png';
    const [img, setImg] = useState(defaultImg);

    useEffect(() => {
        console.log(searchData.data)
        if (searchData.data.images && searchData.data.images.large) {
            setImg(searchData.data.images.large);
        } else {
            setImg(defaultImg);
        }
    }, [searchData]);

    return (
        <Image
            src={img}
            alt="Rank Tier Image"
            className="object-contain size-12"
            width={256}
            height={256}
        />
    );
}