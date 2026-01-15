import Image from "next/image"
import { BatLoader } from "@/components/bat-loader"
import { MissionText } from "@/components/mission-text"
import { RsvpForm } from "@/components/rsvp-form"

export default function BatmanInvitation() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <BatLoader />

      <section className="hero-cinematic relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Gradient background overlay */}
        <div className="absolute inset-0 hero-gradient" />

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
              <MissionText />
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
                src="/lego-batman-main.webp"
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

          <RsvpForm />
        </div>
      </section>

    </div>
  )
}
