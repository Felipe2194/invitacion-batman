"use client"

import { useMemo } from "react"

export function ParticlesBackground() {
    // Generate particles only once using useMemo
    const particles = useMemo(() => {
        return [...Array(80)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 12}s`,
            width: `${10 + Math.random() * 40}px`,
            height: `${10 + Math.random() * 40}px`,
        }))
    }, [])

    return (
        <div className="particles">
            {particles.map((style, i) => (
                <div
                    key={i}
                    className="particle-bokeh"
                    style={style}
                />
            ))}
        </div>
    )
}
