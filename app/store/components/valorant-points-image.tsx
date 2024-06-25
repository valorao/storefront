import Image from "next/image"

export default function VPIcon({ className = "" }) {
    return (
        <Image
            src="https://media.valorant-api.com/currencies/85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741/largeicon.png"
            width={128}
            height={128}
            alt="VALORANT Points Icon"
            className={`${className}`}
        />
    )
}