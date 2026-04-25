import ArticleCard from '@/components/ArticleCard';
import { getTopNews } from '@/lib/api';

export default async function Home() {
  const data = await getTopNews();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-white-700 mb-6">Últimas Noticias</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.news.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </main>
  );
}