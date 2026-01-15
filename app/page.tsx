"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { createClient } from "@/lib/client"

export default function BatmanInvitation() {
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", message: "", type: "" })
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText =
    "MISIÓN: OPERACIÓN CUMPLEAÑOS\nFECHA: 24 DE ENERO - DESDE EL MEDIODÍA\nCOORDENADAS: CALLE VICTORIA ROMERO PEÑALOZA, NRO 1120\nBARRIO: CASA LINDA"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Typewriter effect
  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [isLoading])

  const handleRSVP = async (attending: boolean) => {
    if (!name.trim()) {
      alert("⚠️ Por favor, identifícate primero")
      return
    }

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("rsvp_responses").insert({
        name: name.trim(),
        response: attending ? "attending" : "not_attending",
      })

      if (error) {
        console.error("Error saving RSVP:", error)
        alert("❌ Hubo un error al guardar tu respuesta. Intenta de nuevo.")
        return
      }

      if (attending) {
        setModalContent({
          title: "🦇 CONFIRMADO",
          message: `${name}, tu traje está listo.\nNos vemos en la Baticueva.`,
          type: "batman",
        })
      } else {
        setModalContent({
          title: "🃏 JAJAJAJA",
          message: `${name}, tú te lo pierdes...\n¿Acaso tienes miedo?`,
          type: "joker",
        })
      }
      setShowModal(true)
      setName("") // Clear name after submission
    } catch (err) {
      console.error("Unexpected error:", err)
      alert("❌ Hubo un error inesperado. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
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

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="particles">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="particle-bokeh"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
              width: `${10 + Math.random() * 40}px`,
              height: `${10 + Math.random() * 40}px`,
            }}
          />
        ))}
      </div>

      <section className="hero-cinematic relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Urban city lights background */}
        <div className="absolute inset-0 city-lights opacity-20" />

        {/* Main Hero Title */}
        <h1 className="hero-epic-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center mb-12 tracking-wider relative z-20 px-4">
          22 AÑOS DE SER
          <br />
          <span className="hero-highlight">EL SUEÑO DE LAS SUEGRAS</span>
        </h1>

        {/* Large LEGO Batman Character - centered and prominent */}
        <div className="relative z-10 mb-8 animate-float-hero">
          <div className="hero-batman-glow">
            <Image
              src="/lego-batman-hero.webp"
              alt="LEGO Batman Hero"
              width={600}
              height={700}
              sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 500px, 600px"
              className="w-80 sm:w-96 md:w-[500px] lg:w-[600px] h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Subtitle with name */}
        <p className="hero-subtitle-epic text-2xl sm:text-3xl md:text-4xl text-center font-bold relative z-10 mb-4">
          FESTEJO DE CUMPLEAÑOS
        </p>
        <p className="hero-name text-3xl sm:text-4xl md:text-5xl font-black text-center relative z-10 mb-8">
          FELIPE GIOVANARDI
        </p>

        <div className="scroll-indicator z-20">
          <div className="mouse">
            <div className="wheel" />
          </div>
        </div>
      </section>

      {/* Mission Info Section */}
      <section className="mission-section py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mission-container">
            <div className="terminal-header">
              <span className="terminal-dot bg-red-500" />
              <span className="terminal-dot" style={{ backgroundColor: "var(--batman-gold)" }} />
              <span className="terminal-dot bg-green-500" />
            </div>
            <div className="terminal-body">
              <pre className="font-mono text-sm md:text-lg whitespace-pre-wrap">
                {typedText}
                <span className="cursor-blink">_</span>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="rsvp-section py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* LEGO Batman Standing Image */}
          <div className="flex justify-center mb-8">
            <div className="relative animate-float">
              <Image
                src="/lego-batman-main.png"
                alt="LEGO Batman"
                width={300}
                height={400}
                className="w-48 md:w-64 h-auto drop-shadow-2xl"
              />
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 tracking-wider">CONFIRMA TU ASISTENCIA</h2>
          <p className="text-center text-xl md:text-2xl mb-12 font-mono" style={{ color: "var(--joker-green)" }}>
            O SERÁS BLOQUEADO PARA SIEMPRE
          </p>

          <div className="space-y-8">
            <div className="command-input-container">
              <span className="command-prompt">{">"}</span>
              <Input
                type="text"
                placeholder="Identifícate, ciudadano..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="command-input"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Button onClick={() => handleRSVP(true)} className="batman-button group" disabled={isSubmitting}>
                <span className="relative z-10">{isSubmitting ? "PROCESANDO..." : "🦇 ASISTIRÉ"}</span>
              </Button>

              <Button onClick={() => handleRSVP(false)} className="joker-button group" disabled={isSubmitting}>
                <span className="relative z-10 text-sm md:text-base">
                  {isSubmitting
                    ? "PROCESANDO..."
                    : "🃏 NO VOY, Y QUIERO QUE VUELVA CRISTINA FERNÁNDEZ DE KIRCHNER AL PODER"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className={`modal-content ${modalContent.type === "joker" ? "joker-modal" : "batman-modal"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl md:text-5xl font-black mb-6">{modalContent.title}</h3>
            <p className="text-lg md:text-xl font-mono whitespace-pre-line mb-8">{modalContent.message}</p>
            <Button
              onClick={() => setShowModal(false)}
              className={modalContent.type === "joker" ? "joker-button" : "batman-button"}
            >
              CERRAR
            </Button>
          </div>
        </div>
      )}

      {/* Gotham Skyline */}
      <div className="gotham-skyline">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="building"
            style={{
              left: `${i * 5}%`,
              height: `${50 + Math.random() * 150}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
