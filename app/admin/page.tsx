import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: responses, error } = await supabase
    .from("rsvp_responses")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="bg-zinc-900 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Error cargando respuestas: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const attending = responses?.filter((r) => r.response === "attending").length || 0
  const notAttending = responses?.filter((r) => r.response === "not_attending").length || 0

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-yellow-400">🦇 PANEL DE CONTROL</h1>
          <p className="text-xl text-gray-400">Base de datos de respuestas RSVP</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-zinc-900 border-yellow-500">
            <CardHeader>
              <CardTitle className="text-yellow-400">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-black">{responses?.length || 0}</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-green-500">
            <CardHeader>
              <CardTitle className="text-green-400">Asistirán</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-black">{attending}</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-red-500">
            <CardHeader>
              <CardTitle className="text-red-400">No asistirán</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-black">{notAttending}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-zinc-900 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-yellow-400">Respuestas</CardTitle>
            <CardDescription className="text-gray-400">Todas las respuestas recibidas</CardDescription>
          </CardHeader>
          <CardContent>
            {responses && responses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-3 text-yellow-400">Nombre</th>
                      <th className="text-left p-3 text-yellow-400">Respuesta</th>
                      <th className="text-left p-3 text-yellow-400">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responses.map((response) => (
                      <tr key={response.id} className="border-b border-gray-800 hover:bg-zinc-800">
                        <td className="p-3 font-semibold">{response.name || "Anónimo"}</td>
                        <td className="p-3">
                          {response.response === "attending" ? (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                              ✅ Asistirá
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">
                              ❌ No asistirá
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-gray-400">
                          {new Date(response.created_at).toLocaleString("es-AR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No hay respuestas todavía</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
