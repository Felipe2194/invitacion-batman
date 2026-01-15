"use client"

import { useState, useEffect } from "react"

export function BatLoader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    if (!isLoading) return null

    return (
        <div className="preloader">
            <div className="bat-logo">
                <svg viewBox="0 0 100 100" className="w-32 h-32">
                    <path
                        d="M50 10 L20 30 L25 50 L10 60 L30 70 L35 85 L50 75 L65 85 L70 70 L90 60 L75 50 L80 30 Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <div className="loading-text">GOTHAM CITY</div>
        </div>
    )
}
