"use client"

import { useState, useEffect } from "react"

export function MissionText() {
    const [typedText, setTypedText] = useState("")
    const fullText =
        "MISIÓN: OPERACIÓN CUMPLEAÑOS\nFECHA: 24 DE ENERO - DESDE EL MEDIODÍA\nCOORDENADAS: CALLE VICTORIA ROMERO PEÑALOZA, NRO 1120\nBARRIO: CASA LINDA"

    useEffect(() => {
        // Delay start slightly to allow page load
        const startTimeout = setTimeout(() => {
            let i = 0
            const typingInterval = setInterval(() => {
                if (i < fullText.length) {
                    setTypedText(fullText.substring(0, i + 1))
                    i++
                } else {
                    clearInterval(typingInterval)
                }
            }, 50)
            return () => clearInterval(typingInterval)
        }, 2000) // Wait for loader

        return () => clearTimeout(startTimeout)
    }, [])

    return (
        <pre className="font-mono text-sm md:text-lg whitespace-pre-wrap">
            {typedText}
            <span className="cursor-blink">_</span>
        </pre>
    )
}
