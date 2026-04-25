'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/category/politics', label: 'Política' },
  { href: '/category/sports', label: 'Deportes' },
  { href: '/category/economy', label: 'Economía' },
  { href: '/category/technology', label: 'Tecnología' },
  { href: '/saved', label: 'Guardados' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          DR<span className="text-gray-900">Noticias</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className={buttonVariants({ variant: 'ghost' })}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <Separator className="mt-4" />

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-2 gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={buttonVariants({ variant: 'ghost' })}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}