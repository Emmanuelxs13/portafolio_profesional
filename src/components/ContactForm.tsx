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
    <section id="contact" className="relative py-20 md:py-32 bg-gradient-to-b from-black to-gray-900">
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
          className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl"
        >
          {/* Name */}
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              <UserIcon className="inline h-5 w-5 mr-2" />
              {t('contact.form.name')}
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
              placeholder={t('contact.form.namePlaceholder')}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              <EnvelopeIcon className="inline h-5 w-5 mr-2" />
              {t('contact.form.email')}
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
              placeholder={t('contact.form.emailPlaceholder')}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              <ChatBubbleLeftRightIcon className="inline h-5 w-5 mr-2" />
              {t('contact.form.subject')}
            </label>
            <input
              {...register('subject')}
              type="text"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition"
              placeholder={t('contact.form.subjectPlaceholder')}
            />
            {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">{t('contact.form.message')}</label>
            <textarea
              {...register('message')}
              rows={5}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition resize-none"
              placeholder={t('contact.form.messagePlaceholder')}
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* Consent */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input {...register('consent')} type="checkbox" className="mt-1" />
              <span className="text-sm text-gray-400">{t('contact.form.consent')}</span>
            </label>
            {errors.consent && <p className="text-red-400 text-sm mt-1">{errors.consent.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
          >
            {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
          </motion.button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-500/10 border border-green-500 rounded-lg text-green-400 text-center"
            >
              {t('contact.success.message')}
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-400 text-center"
            >
              {t('contact.error.message')}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
