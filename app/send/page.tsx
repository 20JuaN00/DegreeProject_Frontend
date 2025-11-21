'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, SendIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'


const API_BASE_URL = 'https://localhost:44367'

export default function SendPage() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      
      const response = await fetch(`${API_BASE_URL}/api/correo/enviar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipients: ['recepcion123.321@gmail.com'],
          subject: formData.subject,
          body: formData.message,
          quantity: 1
        })
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setFormData({ subject: '', message: '' })
        setTimeout(() => setSuccess(false), 5000)
      } else {
        setError(data.message || 'Error al enviar el correo')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setError('Error de conexión con el servidor. Verifica que tu API esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <div className="max-w-2xl mx-auto">
        
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-balance">Enviar Email</h1>
          <p className="text-muted-foreground mt-2">
            Envía un correo a recepcion123.321@gmail.com
          </p>
        </div>

        
        <Card className="p-8 border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Para</label>
              <Input
                type="email"
                value="recepcion123.321@gmail.com"
                disabled
                className="bg-secondary cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Asunto
              </label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Escribe el asunto del correo"
                value={formData.subject}
                onChange={handleChange}
                required
                minLength={3}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Mensaje
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                className="min-h-48 resize-none"
              />
            </div>

            {success && (
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800">
                ¡Correo enviado correctamente!
              </div>
            )}

            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <SendIcon className="w-4 h-4 mr-2" />
              {loading ? 'Enviando...' : 'Enviar Email'}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}