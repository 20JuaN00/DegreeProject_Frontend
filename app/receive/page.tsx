'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, LogOut, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'


const API_BASE_URL = 'https://localhost:44367'

interface Email {
  from: string
  to: string
  subject: string
  body: string
  date: string
  hasAttachments: boolean
  attachments: string[]
}

export default function ReceivePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [emails, setEmails] = useState<Email[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const handleLogout = () => {
    window.location.href = '/'
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Por favor ingresa un término de búsqueda')
      return
    }

    setLoading(true)
    setError(null)
    setSearched(true)
    
    try {

      const response = await fetch(`${API_BASE_URL}/api/correo/recibir`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subjectFilter: searchTerm
        })
      })

      const data = await response.json()

      if (data.success) {
        setEmails(data.data || [])
        if (data.data.length === 0) {
          setError('No se encontraron correos con ese filtro')
        }
      } else {
        setError(data.message || 'Error al buscar correos')
      }
    } catch (error) {
      console.error('Error fetching emails:', error)
      setError('Error de conexión con el servidor. Verifica que tu API esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Bandeja de Entrada</h1>
            <p className="text-muted-foreground mt-2">
              {searched ? `Total: ${emails.length} correo(s) encontrado(s)` : 'Busca correos por asunto'}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Buscar por asunto (ej: Prueba, Confirmación, etc.)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading}  
              className="min-w-32"
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? 'Buscando...' : 'Buscar'}
            </Button>
          </div>
          {error && (
            <div className="mt-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {loading ? (
                <Card className="p-6 text-center border-border">
                  <p className="text-muted-foreground">Buscando correos...</p>
                </Card>
              ) : emails.length === 0 && searched ? (
                <Card className="p-6 text-center border-border">
                  <p className="text-muted-foreground">
                    {error || 'No se encontraron correos. Intenta con otro término de búsqueda.'}
                  </p>
                </Card>
              ) : emails.length === 0 ? (
                <Card className="p-6 text-center border-border">
                  <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    Ingresa un término de búsqueda y presiona "Buscar"
                  </p>
                </Card>
              ) : (
                emails.map((email, index) => (
                  <Card
                    key={index}
                    className={`p-4 cursor-pointer transition-all border-border hover:shadow-md ${
                      selectedEmail === email ? 'bg-primary/10 border-primary' : ''
                    }`}
                    onClick={() => setSelectedEmail(email)}
                  >
                    <p className="font-semibold text-sm text-card-foreground truncate">{email.from}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{email.subject}</p>
                    <p className="text-xs text-muted-foreground mt-2">{formatDate(email.date)}</p>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedEmail ? (
              <Card className="p-8 border-border sticky top-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">De:</p>
                    <p className="font-semibold text-card-foreground">{selectedEmail.from}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Para:</p>
                    <p className="font-semibold text-card-foreground">{selectedEmail.to}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Asunto:</p>
                    <p className="font-bold text-lg text-card-foreground">{selectedEmail.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Fecha:</p>
                    <p className="text-sm text-card-foreground">{formatDate(selectedEmail.date)}</p>
                  </div>
                  {selectedEmail.hasAttachments && selectedEmail.attachments.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Adjuntos:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmail.attachments.map((attachment, idx) => (
                          <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded">
                            📎 {attachment}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3">Mensaje:</p>
                    <p className="text-card-foreground leading-relaxed whitespace-pre-wrap">{selectedEmail.body}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSelectedEmail(null)}
                  >
                    Cerrar
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-12 border-border flex items-center justify-center min-h-96">
                <div className="text-center">
                  <Eye className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    Selecciona un correo para ver sus detalles
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}