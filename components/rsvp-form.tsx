"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/client"

export function RsvpForm() {
    const [name, setName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState({ title: "", message: "", type: "" })

    const [supabase] = useState(() => createClient())

    const handleRSVP = async (attending: boolean) => {
        if (!name.trim()) {
            alert("⚠️ Por favor, identifícate primero")
            return
        }

        setIsSubmitting(true)
        // const supabase = createClient() // Removed local instantiation

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
            setName("")
        } catch (err) {
            console.error("Unexpected error:", err)
            alert("❌ Hubo un error inesperado. Intenta de nuevo.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
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
                                : "🃏 NO VOY, Y QUIERO QUE VUELVA CRISTINA FERNÁNDEZ DE KIRCHNER AL PODER "}
                        </span>
                    </Button>
                </div>
            </div>

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
        </>
    )
}
