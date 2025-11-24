/**
 * Componente ContactForm
 * Formulario de contacto con validación usando React Hook Form y Zod
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { EnvelopeIcon, UserIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

// Schema de validación con Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine((val) => val === true, 'You must accept the privacy policy'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  t: (key: string) => string;
}

export default function ContactForm({ t }: Readonly<ContactFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-gray-400">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="relative bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 rounded-2xl p-8 lg:p-10 border border-gray-700/50 shadow-2xl backdrop-blur-sm overflow-hidden"
        >
          {/* Efectos decorativos */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <label className="block text-gray-300 font-medium mb-2 transition-colors group-focus-within:text-blue-400">
                <UserIcon className="inline h-5 w-5 mr-2 transition-transform group-focus-within:scale-110" />
                {t('contact.form.name')}
              </label>
              <input
                {...register('name')}
                type="text"
                className="w-full px-4 py-3.5 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-gray-900 outline-none transition-all duration-300 hover:border-gray-600"
                placeholder={t('contact.form.namePlaceholder')}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <label className="block text-gray-300 font-medium mb-2 transition-colors group-focus-within:text-blue-400">
                <EnvelopeIcon className="inline h-5 w-5 mr-2 transition-transform group-focus-within:scale-110" />
                {t('contact.form.email')}
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3.5 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-gray-900 outline-none transition-all duration-300 hover:border-gray-600"
                placeholder={t('contact.form.emailPlaceholder')}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Subject */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <label className="block text-gray-300 font-medium mb-2 transition-colors group-focus-within:text-blue-400">
                <ChatBubbleLeftRightIcon className="inline h-5 w-5 mr-2 transition-transform group-focus-within:scale-110" />
                {t('contact.form.subject')}
              </label>
              <input
                {...register('subject')}
                type="text"
                className="w-full px-4 py-3.5 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-gray-900 outline-none transition-all duration-300 hover:border-gray-600"
                placeholder={t('contact.form.subjectPlaceholder')}
              />
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.subject.message}
                </motion.p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <label className="block text-gray-300 font-medium mb-2 transition-colors group-focus-within:text-blue-400">
                {t('contact.form.message')}
              </label>
              <textarea
                {...register('message')}
                rows={5}
                className="w-full px-4 py-3.5 bg-gray-900/80 border border-gray-700/50 rounded-xl text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:bg-gray-900 outline-none transition-all duration-300 hover:border-gray-600 resize-none"
                placeholder={t('contact.form.messagePlaceholder')}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.message.message}
                </motion.p>
              )}
            </motion.div>

            {/* Consent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  {...register('consent')}
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  {t('contact.form.consent')}
                </span>
              </label>
              {errors.consent && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-2 flex items-center gap-1"
                >
                  <span>⚠</span> {errors.consent.message}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Efecto de brillo animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-200%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1,
                }}
              />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <EnvelopeIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    {t('contact.form.submit')}
                  </>
                )}
              </span>
            </motion.button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/50 rounded-xl text-green-400 text-center font-medium shadow-lg"
              >
                ✓ {t('contact.success.message')}
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/50 rounded-xl text-red-400 text-center font-medium shadow-lg"
              >
                ✗ {t('contact.error.message')}
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
