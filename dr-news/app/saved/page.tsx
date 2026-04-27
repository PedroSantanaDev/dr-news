import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { decodeHtml } from '@/lib/utils';

function getSentimentBadge(sentiment: number | null) {
    if (!sentiment) return { label: 'Neutral', className: 'bg-gray-100 text-gray-600' };
    if (sentiment > 0.1) return { label: 'Positivo', className: 'bg-green-100 text-green-700' };
    if (sentiment < -0.1) return { label: 'Negativo', className: 'bg-red-100 text-red-700' };
    return { label: 'Neutral', className: 'bg-gray-100 text-gray-600' };
}

export default async function SavedPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect('/login');
    }

    const savedArticles = await prisma.savedArticle.findMany({
        where: { userId: session.user.id },
        orderBy: { savedAt: 'desc' },
    });

    return (
        <main className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Artículos Guardados</h1>

            {savedArticles.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg mb-4">No tienes artículos guardados aún.</p>
                    <Link href="/" className="text-blue-600 hover:underline">
                        Explorar noticias
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedArticles.map(article => {
                        const sentiment = getSentimentBadge(article.sentiment);
                        return (
                            <Link key={article.id} href={`/article/${article.articleId}`}>
                                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                    {article.image && (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}

                                    <CardContent className="flex flex-col gap-2 pt-4 flex-1">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="text-blue-600 border-blue-200 uppercase text-xs">
                                                {article.category}
                                            </Badge>
                                            <Badge className={sentiment.className}>
                                                {sentiment.label}
                                            </Badge>
                                        </div>

                                        <h2 className="text-sm font-bold text-gray-900 line-clamp-3">
                                            {decodeHtml(article.title)}
                                        </h2>
                                    </CardContent>

                                    <CardFooter className="text-xs text-gray-500 pt-0">
                                        {article.author} · {new Date(article.publishDate).toLocaleDateString('es-DO')}
                                    </CardFooter>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            )}
        </main>
    );
}