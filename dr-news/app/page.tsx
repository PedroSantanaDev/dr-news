import ArticleCard from '@/components/ArticleCard';
import { getTopNews } from '@/lib/api';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const data = await getTopNews();
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Últimas Noticias</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(data.news ?? []).map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            initialSaved={savedIds.includes(article.id)}
          />
        ))}
      </div>
    </main>
  );
}