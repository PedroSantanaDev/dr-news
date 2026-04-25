import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold text-blue-600">
        DR<span className="text-gray-900">Noticias</span>
      </Link>

      {/* Navigation links */}
      <div className="flex gap-6 text-sm font-medium text-gray-600">
        <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
        <Link href="/category/politics" className="hover:text-blue-600 transition-colors">Política</Link>
        <Link href="/category/sports" className="hover:text-blue-600 transition-colors">Deportes</Link>
        <Link href="/category/economy" className="hover:text-blue-600 transition-colors">Economía</Link>
        <Link href="/category/technology" className="hover:text-blue-600 transition-colors">Tecnología</Link>
        <Link href="/saved" className="hover:text-blue-600 transition-colors">Guardados</Link>
      </div>
    </nav>
  );
}