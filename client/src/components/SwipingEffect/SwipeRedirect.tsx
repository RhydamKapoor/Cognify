'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SwipeBox from "./SwipeBox";

export default function SwipeRedirect({location, heading}: {location: string, heading: string}) {
    const [swiped, setSwiped] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(swiped) {
            router.push(`/${location}`);
        }
    }, [swiped]);

    return (
        <SwipeBox setSwiped={setSwiped} heading={heading} />
    )
}
