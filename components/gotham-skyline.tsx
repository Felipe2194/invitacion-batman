"use client"

import { useMemo } from "react"

export function GothamSkyline() {
    const buildings = useMemo(() => {
        return [...Array(20)].map((_, i) => ({
            left: `${i * 5}%`,
            height: `${50 + Math.random() * 150}px`,
            animationDelay: `${Math.random() * 2}s`,
        }))
    }, [])

    return (
        <div className="gotham-skyline">
            {buildings.map((style, i) => (
                <div
                    key={i}
                    className="building"
                    style={style}
                />
            ))}
        </div>
    )
}
