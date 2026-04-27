import ArticleCard from '@/components/ArticleCard';
import { searchNews } from '@/lib/api';
import { mockArticles } from '@/lib/mockData';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const categoryLabels: Record<string, string> = {
    politics: 'Política',
    sports: 'Deportes',
    business: 'Negocios',
    technology: 'Tecnología',
};

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { slug } = await params;
    const { page } = await searchParams;

    const currentPage = Number(page ?? 1);
    const offset = (currentPage - 1) * 20;

    const data = await searchNews(undefined, slug, offset);

    const totalPages = Math.ceil(data.available / 20);

    const session = await auth();

    let savedIds: number[] = [];
    if (session?.user?.id) {
        const saved = await prisma.savedArticle.findMany({
            where: { userId: session.user.id },
            select: { articleId: true },
        });
        savedIds = saved.map(s => s.articleId);
    }

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {categoryLabels[slug] ?? slug}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(data.news ?? []).map(article => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        initialSaved={savedIds.includes(article.id)}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-10">
                {currentPage > 1 && (
                    <Link
                        href={`/category/${slug}?page=${currentPage - 1}`}
                        className={buttonVariants({ variant: 'outline' })}
                    >
                        ← Anterior
                    </Link>
                )}

                <span className="text-sm text-gray-500">
                    Página {currentPage} de {totalPages}
                </span>

                {currentPage < totalPages && (
                    <Link
                        href={`/category/${slug}?page=${currentPage + 1}`}
                        className={buttonVariants({ variant: 'outline' })}
                    >
                        Siguiente →
                    </Link>
                )}
            </div>
        </main>
    );
}