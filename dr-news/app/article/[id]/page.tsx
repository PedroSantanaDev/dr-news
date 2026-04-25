import { getArticleById } from '@/lib/api';
import { decodeHtml } from '@/lib/utils';

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  return (
    <main className="max-w-3xl mx-auto p-6">
      {/* Category + date */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs uppercase font-semibold text-blue-600">{article.category}</span>
        <span className="text-xs text-gray-400">{new Date(article.publish_date).toLocaleDateString('es-DO')}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{decodeHtml(article.title)}</h1>

      {/* Author */}
      <p className="text-sm text-gray-500 mb-6">Por {article.author}</p>

      {/* Image */}
      {article.image && (
        <img src={article.image} alt={article.title} className="w-full rounded-xl mb-6 object-cover max-h-96" />
      )}

      {/* Body */}
      <p className="text-gray-700 leading-relaxed">{article.text}</p>

      {/* Source link */}
      <a href={article.url} target="_blank" className="inline-block mt-6 text-blue-600 hover:underline text-sm">
        Ver artículo original →
      </a>
    </main>
  );
}