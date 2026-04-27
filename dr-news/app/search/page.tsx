import { searchNews } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import SearchInput from './SearchInput';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchPageProps {
    searchParams: Promise<{ q?: string; page?: string }>;
}

const PAGE_SIZE = 20;

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q, page } = await searchParams;
    const session = await auth();
    const currentPage = Number(page ?? 1);
    const offset = (currentPage - 1) * PAGE_SIZE;

    let savedIds: number[] = [];
    if (session?.user?.id) {
        const saved = await prisma.savedArticle.findMany({
            where: { userId: session.user.id },
            select: { articleId: true },
        });
        savedIds = saved.map(s => s.articleId);
    }

    const data = q ? await searchNews(q, undefined, offset) : null;
    const totalPages = data ? Math.ceil(data.available / PAGE_SIZE) : 0;

    return (
        <main className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Buscar Noticias</h1>

            <SearchInput defaultValue={q} />

            {q && (
                <p className="text-sm text-gray-500 mb-6">
                    {data?.available ?? 0} resultados para "<strong>{q}</strong>"
                </p>
            )}

            {!q && (
                <p className="text-gray-500 text-center py-20">
                    Escribe algo para buscar noticias.
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(data?.news ?? []).map(article => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        initialSaved={savedIds.includes(article.id)}
                    />
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-10">
                    {currentPage > 1 && (
                        <Link
                            href={`/search?q=${q}&page=${currentPage - 1}`}
                            className={cn(buttonVariants({ variant: 'outline' }))}
                        >
                            ← Anterior
                        </Link>
                    )}

                    <span className="text-sm text-gray-500">
                        Página {currentPage} de {totalPages}
                    </span>

                    {currentPage < totalPages && (
                        <Link
                            href={`/search?q=${q}&page=${currentPage + 1}`}
                            className={cn(buttonVariants({ variant: 'outline' }))}
                        >
                            Siguiente →
                        </Link>
                    )}
                </div>
            )}
        </main>
    );
}