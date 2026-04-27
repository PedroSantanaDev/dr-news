import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { buttonVariants } from '@/components/ui/button';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between gap-8">

                    {/* Brand */}
                    <div>
                        <h2 className="text-xl font-extrabold text-blue-600">
                            DR<span className="text-gray-900">Noticias</span>
                        </h2>
                        <p className="text-sm text-gray-500 mt-2 max-w-xs">
                            Tu fuente de noticias sobre la República Dominicana y el mundo.
                        </p>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Categorías</h3>
                        <ul className="flex flex-col gap-2 text-sm text-gray-500">
                            <li><Link href="/category/politics" className={buttonVariants({ variant: 'ghost' })}>Política</Link></li>
                            <li><Link href="/category/sports" className={buttonVariants({ variant: 'ghost' })}>Deportes</Link></li>
                            <li><Link href="/category/business" className={buttonVariants({ variant: 'ghost' })}>Negocios</Link></li>
                            <li><Link href="/category/technology" className={buttonVariants({ variant: 'ghost' })}>Tecnología</Link></li>
                        </ul>
                    </div>

                    {/* Pages */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Páginas</h3>
                        <ul className="flex flex-col gap-2 text-sm text-gray-500">
                            <li><Link href="/" className={buttonVariants({ variant: 'ghost' })}>Inicio</Link></li>
                            <li><Link href="/saved" className={buttonVariants({ variant: 'ghost' })}>Artículos Guardados</Link></li>
                            <li><Link href="/search" className={buttonVariants({ variant: 'ghost' })}>Buscar</Link></li>
                        </ul>
                    </div>

                </div>

                <Separator className="mt-4" />

                {/* Bottom bar */}
                <div className="pt-6 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} DRNoticias. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}