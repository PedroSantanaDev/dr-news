import { Article } from '@/lib/api';
import Link from 'next/link';
import { decodeHtml } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.id}`}>
        <div className="rounded-xl overflow-hidden shadow-md bg-white flex flex-col">
            {/* Image */}
            {article.image && (
                <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
                />
            )}

            {/* Content */}
            <div className="p-4 flex flex-col gap-2 flex-1">
                {/* Category badge */}
                <span className="text-xs uppercase font-semibold text-blue-600">
                {article.category}
                </span>

                {/* Title */}
                <h2 className="text-sm font-bold text-gray-900 line-clamp-3">
                {decodeHtml(article.title)}
                </h2>

                {/* Author + date */}
                <p className="text-xs text-gray-500 mt-auto">
                {article.author} · {new Date(article.publish_date).toLocaleDateString('es-DO')}
                </p>
            </div>
        </div>
    </Link>
  );
}