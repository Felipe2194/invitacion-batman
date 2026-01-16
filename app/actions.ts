"use server"

import { createClient } from "@/lib/server"

export async function submitRSVP(name: string, attending: boolean) {
    const supabase = await createClient()

    try {
        const { error } = await supabase.from("rsvp_responses").insert({
            name: name.trim(),
            response: attending ? "attending" : "not_attending",
        })

        if (error) {
            console.error("Supabase Error:", error)
            return { success: false, message: "Error al guardar en la base de datos" }
        }

        return { success: true }
    } catch (err) {
        console.error("Server Action Error:", err)
        return { success: false, message: "Error interno del servidor" }
    }
}
