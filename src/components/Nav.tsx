/**
 * Componente de Navegación Principal
 *
 * Barra de navegación responsive con:
 * - Logo/nombre
 * - Enlaces de navegación
 * - Selector de idioma
 * - Menú hamburguesa en móvil
 * - Animaciones suaves con Framer Motion
 * - Scroll spy para resaltar sección activa
 */

'use client';

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import type { Locale } from '@/hooks/useI18n';

// Lista de enlaces de navegación
const navigation = [
  { name: 'nav.home', href: '/' },
  { name: 'nav.about', href: '#about' },
  { name: 'nav.experience', href: '#experience' },
  { name: 'nav.projects', href: '#projects' },
  { name: 'nav.certificates', href: '#certificates' },
  { name: 'nav.contact', href: '#contact' },
];

interface NavProps {
  /** Diccionario de traducciones */
  t: (key: string) => string;
  /** Idioma actual */
  locale: Locale;
  /** Función para cambiar idioma */
  onLanguageChange: (locale: Locale) => void;
}

export default function Nav({ t, locale, onLanguageChange }: NavProps) {
  // Estado para controlar el menú móvil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Estado para detectar scroll y aplicar background
  const [isScrolled, setIsScrolled] = useState(false);
  // Obtener la ruta actual para resaltar enlace activo
  const pathname = usePathname();

  // Detectar scroll para cambiar apariencia del nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejar clic en enlaces internos (smooth scroll)
  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo/Nombre */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <motion.span whileHover={{ scale: 1.05 }} className="text-xl font-bold text-white">
              EB<span className="text-blue-500">.</span>
            </motion.span>
          </Link>
        </div>

        {/* Botón menú móvil */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Enlaces de navegación - Desktop */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith('#')) {
                  e.preventDefault();
                  handleNavClick(item.href);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'text-sm font-semibold leading-6 transition-colors',
                pathname === item.href || (item.href.startsWith('#') && pathname === '/')
                  ? 'text-blue-500'
                  : 'text-gray-300 hover:text-white'
              )}
            >
              {t(item.name)}
            </motion.a>
          ))}
        </div>

        {/* Selector de idioma - Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onLanguageChange(locale === 'es' ? 'en' : 'es')}
            className="flex items-center gap-2 text-sm font-semibold leading-6 text-gray-300 hover:text-white transition-colors"
          >
            <LanguageIcon className="h-5 w-5" />
            <span className="uppercase">{locale === 'es' ? 'EN' : 'ES'}</span>
          </motion.button>
        </div>
      </nav>

      {/* Menú móvil */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-xl font-bold text-white">
                    EB<span className="text-blue-500">.</span>
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-700">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          if (item.href.startsWith('#')) {
                            e.preventDefault();
                          }
                          handleNavClick(item.href);
                        }}
                        whileHover={{ x: 5 }}
                        className={cn(
                          '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors',
                          pathname === item.href
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        )}
                      >
                        {t(item.name)}
                      </motion.a>
                    ))}
                  </div>

                  <div className="py-6">
                    <button
                      onClick={() => {
                        onLanguageChange(locale === 'es' ? 'en' : 'es');
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      <LanguageIcon className="h-5 w-5" />
                      <span>{locale === 'es' ? 'English' : 'Español'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </motion.header>
  );
}
