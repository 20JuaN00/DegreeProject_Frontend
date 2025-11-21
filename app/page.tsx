'use client'

import Link from 'next/link'
import { Mail, Send } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ user: '', password: '' })
  const [authError, setAuthError] = useState('')

  const handleLogin = () => {
    setAuthError('')
    if (credentials.user === 'admin' && credentials.password === 'admin') {
      window.location.href = '/receive'
    } else {
      setAuthError('Credenciales incorrectas')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 text-balance bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Accounts Support
          </h1>
          <p className="text-muted-foreground text-lg">
            Manejo códigos verificación por medio de IMAP y SMTP
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Send Code Card */}
          <Link href="/send">
            <div className="group relative bg-gradient-to-br from-purple-50 to-white rounded-xl border-2 border-purple-200 p-8 h-48 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg hover:border-purple-400 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-lg bg-purple-200 mb-4 group-hover:bg-purple-300 transition-colors">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h2 className="relative text-2xl font-bold text-purple-900">
                Enviar código
              </h2>
            </div>
          </Link>

          {/* Receive Code Card - Now with modal trigger */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="group relative bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 p-8 h-48 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-lg hover:border-blue-400 hover:scale-105 text-left w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-lg bg-blue-200 mb-4 group-hover:bg-blue-300 transition-colors">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="relative text-2xl font-bold text-blue-900">
              Recibir código
            </h2>
          </button>
        </div>
      </div>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Acceso a Bandeja</h2>

            <div className="space-y-4">
              {/* User Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usuario
                </label>
                <input
                  type="text"
                  value={credentials.user}
                  onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
                  placeholder="admin"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Password Input with Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    placeholder="admin"
                    className="w-full px-4 py-2 pr-10 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M15.171 13.576l1.414 1.414a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 1.414l14 14z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {authError && (
                <p className="text-red-500 text-sm">{authError}</p>
              )}

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogin}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-lg transition-all"
                >
                  Ingresar
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Demo: usuario: <strong>admin</strong> | contraseña: <strong>admin</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
