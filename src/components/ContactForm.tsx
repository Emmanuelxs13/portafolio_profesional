/**
 * Componente ContactForm
 * Información de contacto directa sin formulario
 */

'use client';

import { motion } from 'framer-motion';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ContactForm() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Contact Information Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Email Card */}
        <motion.a
          href="mailto:emmanuelberriojimenez13@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-6 rounded-2xl bg-linear-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 hover:border-blue-500/40 transition-all group"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="p-4 rounded-xl bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors">
            <EnvelopeIcon className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Email</p>
            <p className="text-white font-medium text-sm md:text-base break-all">
              emmanuelberriojimenez13@gmail.com
            </p>
          </div>
        </motion.a>

        {/* Phone Card */}
        <motion.a
          href="tel:+573015249169"
          className="flex items-center gap-4 p-6 rounded-2xl bg-linear-to-br from-green-600/10 to-emerald-600/10 border border-green-500/20 hover:border-green-500/40 transition-all group"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="p-4 rounded-xl bg-green-600/20 group-hover:bg-green-600/30 transition-colors">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">Teléfono</p>
            <p className="text-white font-medium text-lg">+57 301 524 9169</p>
          </div>
        </motion.a>

        {/* LinkedIn Card */}
        <motion.a
          href="https://www.linkedin.com/in/emmanuel-berrio-jimenez/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-6 rounded-2xl bg-linear-to-br from-blue-700/10 to-blue-500/10 border border-blue-600/20 hover:border-blue-600/40 transition-all group"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="p-4 rounded-xl bg-blue-700/20 group-hover:bg-blue-700/30 transition-colors">
            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">LinkedIn</p>
            <p className="text-white font-medium">Emmanuel Berrio Jiménez</p>
          </div>
        </motion.a>

        {/* GitHub Card */}
        <motion.a
          href="https://github.com/Emmanuelxs13"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-6 rounded-2xl bg-linear-to-br from-gray-700/10 to-gray-600/10 border border-gray-600/20 hover:border-gray-600/40 transition-all group"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="p-4 rounded-xl bg-gray-700/20 group-hover:bg-gray-700/30 transition-colors">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">GitHub</p>
            <p className="text-white font-medium">@Emmanuelxs13</p>
          </div>
        </motion.a>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 text-center p-8 rounded-2xl bg-linear-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20"
      >
        <h3 className="text-2xl font-bold text-white mb-3">¿Tienes un proyecto en mente?</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Estoy disponible para proyectos freelance, colaboraciones o posiciones full-time. Hablemos
          sobre cómo puedo ayudarte a llevar tu proyecto al siguiente nivel.
        </p>
        <motion.a
          href="https://wa.me/573015249169?text=Hola%20Emmanuel%2C%20vi%20tu%20portafolio%20web%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad%20laboral."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg shadow-purple-500/25"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Contactar por WhatsApp
        </motion.a>
      </motion.div>
    </div>
  );
}
