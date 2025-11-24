/**
 * Página de Política de Privacidad
 */

'use client';

import Link from 'next/link';
import { useI18n } from '@/hooks/useI18n';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Link href="/" className="text-blue-500 hover:text-blue-400 mb-8 inline-block">
          ← Volver al inicio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Política de Privacidad</h1>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Última actualización: Noviembre 2025</h2>
              <p className="text-gray-300">
                Esta política de privacidad describe cómo se recopila, utiliza y protege la
                información personal que proporciones a través del formulario de contacto de este
                sitio web.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">1. Recopilación de datos</h3>
              <p className="text-gray-300">
                Únicamente recopilamos la información que proporcionas voluntariamente a través del
                formulario de contacto:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Asunto del mensaje</li>
                <li>Contenido del mensaje</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">2. Uso de datos</h3>
              <p className="text-gray-300">
                La información recopilada se utiliza exclusivamente para:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>Responder a tu consulta o solicitud</li>
                <li>Establecer comunicación profesional</li>
                <li>Mejorar la calidad del servicio</li>
              </ul>
              <p className="text-gray-300 mt-3">
                <strong>No compartimos tu información con terceros</strong> bajo ninguna
                circunstancia.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">3. Protección de datos</h3>
              <p className="text-gray-300">
                Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger
                tu información personal contra:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>Acceso no autorizado</li>
                <li>Alteración de datos</li>
                <li>Divulgación no autorizada</li>
                <li>Destrucción accidental</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">4. Cookies y tecnologías de seguimiento</h3>
              <p className="text-gray-300">
                Este sitio web utiliza localStorage para:
              </p>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>Guardar preferencia de idioma (español/inglés)</li>
              </ul>
              <p className="text-gray-300 mt-3">
                No utilizamos cookies de terceros ni herramientas de analítica que rastreen tu
                actividad.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">5. Tus derechos (GDPR)</h3>
              <p className="text-gray-300">Tienes derecho a:</p>
              <ul className="list-disc list-inside text-gray-300 ml-4">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar información incorrecta</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Portabilidad de datos</li>
              </ul>
              <p className="text-gray-300 mt-3">
                Para ejercer estos derechos, contáctame directamente a través del email:
                emmanuel.berrio@example.com
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">6. Retención de datos</h3>
              <p className="text-gray-300">
                Los datos del formulario de contacto se conservan únicamente el tiempo necesario
                para dar respuesta a tu consulta y no más de 12 meses.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">7. Cambios en esta política</h3>
              <p className="text-gray-300">
                Esta política puede actualizarse ocasionalmente. Te notificaremos cualquier cambio
                significativo mediante un aviso en el sitio web.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-3">8. Contacto</h3>
              <p className="text-gray-300">
                Si tienes preguntas sobre esta política de privacidad, contáctame en:
              </p>
              <p className="text-blue-400">emmanuel.berrio@example.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
