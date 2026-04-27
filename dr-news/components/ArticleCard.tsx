'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/api';
import { decodeHtml } from '@/lib/utils';
import { useSession } from 'next-auth/react';

const categoryLabels: Record<string, string> = {
  politics: 'Política',
  sports: 'Deportes',
  business: 'Negocios',
  technology: 'Tecnología',
};

function getSentimentBadge(sentiment: number) {
  if (sentiment > 0.1) return { label: 'Positivo', variant: 'default' as const, className: 'bg-green-100 text-green-700' };
  if (sentiment < -0.1) return { label: 'Negativo', variant: 'default' as const, className: 'bg-red-100 text-red-700' };
  return { label: 'Neutral', variant: 'default' as const, className: 'bg-gray-100 text-gray-600' };
}

interface ArticleCardProps {
  article: Article;
  initialSaved?: boolean;
}

export default function ArticleCard({ article, initialSaved = false }: ArticleCardProps) {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const sentiment = getSentimentBadge(article.sentiment);

  async function toggleSave(e: React.MouseEvent) {
    e.preventDefault(); // prevent navigating to article
    if (!session) return;
    setLoading(true);

    if (saved) {
      await fetch('/api/saved', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: article.id }),
      });
      setSaved(false);
    } else {
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      setSaved(true);
    }

    setLoading(false);
  }

  return (
    <Link href={`/article/${article.id}`}>
      <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Image */}
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        )}

        <CardContent className="flex flex-col gap-2 pt-4 flex-1">
          {/* Category + Sentiment */}
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-blue-600 border-blue-200 uppercase text-xs">
              {categoryLabels[article.category]}
            </Badge>
            <Badge className={sentiment.className}>
              {sentiment.label}
            </Badge>
          </div>

          {/* Title */}
          <h2 className="text-sm font-bold text-gray-900 line-clamp-3">
            {decodeHtml(article.title)}
          </h2>

          {/* Short description */}
          <h2 className="text-sm text-gray-600 line-clamp-3">
            {decodeHtml(article.text.substring(0, 200))}
          </h2>
        </CardContent>

        <CardFooter className="text-xs text-gray-500 pt-0 flex justify-between items-center">
          {/* Author + Date */}
          <span>{article.author} · {new Date(article.publish_date).toLocaleDateString('es-DO')}</span>

          {/* Save button - only show if logged in */}
          {session && (
            <button
              onClick={toggleSave}
              disabled={loading}
              className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {saved ? <BookmarkCheck size={18} className="text-blue-600" /> : <Bookmark size={18} />}
            </button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}