import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          DR<span className="text-gray-900">Noticias</span>
        </Link>

        {/* Navigation links */}
        <div className="flex gap-1">
          <Link href="/" className={buttonVariants({ variant: 'ghost' })}>Inicio</Link>
          <Link href="/category/politics" className={buttonVariants({ variant: 'ghost' })}>Política</Link>
          <Link href="/category/sports" className={buttonVariants({ variant: 'ghost' })}>Deportes</Link>
          <Link href="/category/economy" className={buttonVariants({ variant: 'ghost' })}>Economía</Link>
          <Link href="/category/technology" className={buttonVariants({ variant: 'ghost' })}>Tecnología</Link>
          <Link href="/saved" className={buttonVariants({ variant: 'ghost' })}>Guardados</Link>
        </div>
      </div>
      {/* <Separator className="mt-4" /> */}
    </nav>
  );
}