"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

export default function BatmanInvitation() {
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ title: "", message: "", type: "" })
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRSVP = async (attending: boolean) => {
    if (!name.trim()) {
      alert("Por favor, identificate primero")
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
        alert("Hubo un error al guardar tu respuesta. Intenta de nuevo.")
        return
      }

      if (attending) {
        setModalContent({
          title: "CONFIRMADO",
          message: `${name}, tu traje esta listo.\nNos vemos en la Baticueva.`,
          type: "batman",
        })
      } else {
        setModalContent({
          title: "JAJAJAJA",
          message: `${name}, tu te lo pierdes...\nAcaso tienes miedo?`,
          type: "joker",
        })
      }
      setShowModal(true)
      setName("")
    } catch (err) {
      console.error("Unexpected error:", err)
      alert("Hubo un error inesperado. Intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-b from-[#0a0e27] via-[#1a1a2e] to-[#0a0a0a]">
        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center mb-8 leading-tight">
          <span className="text-white">22 AÑOS DE SER</span>
          <br />
          <span className="text-[#ffd700]">EL SUEÑO DE LAS SUEGRAS</span>
        </h1>

        {/* LEGO Batman Image */}
        <div className="mb-8">
          <Image
            src="/lego-batman-hero.png"
            alt="LEGO Batman"
            width={400}
            height={500}
            className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto"
            priority
          />
        </div>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-center font-bold text-gray-300 mb-2">
          FESTEJO DE CUMPLEAÑOS
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-black text-center text-[#ffd700]">FELIPE GIOVANARDI</p>
      </section>

      {/* Mission Info Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#1a1a1a] border-2 border-[#ffd700] rounded-lg overflow-hidden">
            <div className="flex gap-2 p-3 bg-[#2a2a2a] border-b border-[#ffd700]">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-[#ffd700]" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="p-6 font-mono text-[#ffd700] text-sm sm:text-base md:text-lg space-y-2">
              <p>MISION: OPERACION CUMPLEAÑOS</p>
              <p>FECHA: 24 DE ENERO</p>
              <p>HAMBURGUESAS AL MEDIODIA, CHORIS A LA NOCHE</p>
              <p>PILETA Y ALCOHOL CONSTANTE</p>
              <p>COORDENADAS: CALLE VICTORIA ROMERO PEÑALOZA, NRO 1120</p>
              <p>BARRIO: CASA LINDA</p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-16 px-4 pb-32">
        <div className="max-w-xl mx-auto">
          {/* Batman Image */}
          <div className="flex justify-center mb-8">
            <Image
              src="/lego-batman-main.png"
              alt="LEGO Batman"
              width={200}
              height={250}
              className="w-40 sm:w-48 h-auto"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-2">CONFIRMA TU ASISTENCIA</h2>
          <p className="text-center text-lg sm:text-xl mb-10 font-mono text-[#39ff14]">
            O SERAS BLOQUEADO PARA SIEMPRE
          </p>

          {/* Input */}
          <div className="flex items-center gap-3 bg-[#1a1a1a] border-2 border-[#3a3a3a] rounded-lg p-4 mb-6">
            <span className="text-[#ffd700] text-xl font-mono font-bold">{">"}</span>
            <Input
              type="text"
              placeholder="Identificate, ciudadano..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-transparent border-none text-white font-mono text-base focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isSubmitting}
            />
          </div>

          {/* Buttons */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Button
              onClick={() => handleRSVP(true)}
              disabled={isSubmitting}
              className="w-full py-6 text-lg font-black bg-[#ffd700] text-black hover:bg-[#ffed4a] transition-colors"
            >
              {isSubmitting ? "PROCESANDO..." : "ASISTIRE"}
            </Button>

            <Button
              onClick={() => handleRSVP(false)}
              disabled={isSubmitting}
              className="w-full py-6 text-sm sm:text-base font-bold bg-gradient-to-r from-[#8b00ff] to-[#39ff14] text-white hover:opacity-90 transition-opacity leading-tight"
            >
              {isSubmitting ? "PROCESANDO..." : "TENGO UNA EXCUSA CONVINCENTE"}
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className={`bg-[#1a1a1a] border-2 rounded-lg p-8 max-w-md w-full text-center ${
              modalContent.type === "joker" ? "border-[#8b00ff]" : "border-[#ffd700]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl sm:text-4xl font-black mb-4">{modalContent.title}</h3>
            {modalContent.type === "joker" && (
              <div className="mb-4">
                <Image
                  src="/excusa-response.png"
                  alt="Respuesta"
                  width={300}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            <p className="text-base sm:text-lg font-mono whitespace-pre-line mb-6 text-gray-300">
              {modalContent.message}
            </p>
            <Button
              onClick={() => setShowModal(false)}
              className={`px-8 py-3 font-bold ${
                modalContent.type === "joker"
                  ? "bg-gradient-to-r from-[#8b00ff] to-[#39ff14] text-white"
                  : "bg-[#ffd700] text-black hover:bg-[#ffed4a]"
              }`}
            >
              CERRAR
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
