
const api_url = "https://api.worldnewsapi.com/";
const api_key = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export type Article = {
  id: number;
  title: string;
  text: string;
  url: string;
  image: string | null;
  publish_date: string;
  author: string;
  category: string;
  source_country: string;
  sentiment: number;
}

export type NewsResponse = {
  news: Article[];
  offset: number;
  number: number;
  available: number;
}

export async function getTopNews(offset: number = 0): Promise<NewsResponse> {
    const date = new Date().toISOString().split('T')[0];

    const params = new URLSearchParams({
        'source-country': 'do',
        'language': 'es',
        'api-key': api_key ?? '',
        'date': date,
        'offset': offset.toString(),
        'number': '20',
        'max-news-per-cluster': '1'
    });

    const res = await fetch(`${api_url}top-news?${params}`);
    const data = await res.json();

    // Flatten the grouped structure into a single array
    const articles = (data.top_news ?? []).flatMap((group: { news: Article[] }) => group.news);

    return {
        news: articles,
        offset: offset,
        number: articles.length,
        available: articles.length, // top-news doesn't return total count
    };
}

export async function searchNews(text?: string, categories?: string, offset: number = 0): Promise<NewsResponse> {
    const params = new URLSearchParams({
        'source-country': 'do',
        'language': 'es',
        'api-key': api_key ?? '',
        ...(text && { text }),
        ...(categories && { categories }),
        'offset': offset.toString(),
        'number': '20',
    });

    const res = await fetch(`${api_url}search-news?${params}`);
    const data = await res.json();
    console.debug(data);
    return {
        news: data.news,
        offset: data.offset,
        number: data.number,
        available: data.available,
    };
}

export async function getArticleById(id: string): Promise<Article> {
  const params = new URLSearchParams({
    'ids': id,
    'api-key': api_key ?? '',
  });

  const res = await fetch(`${api_url}retrieve-news?${params}`);
  const data = await res.json();
  return data.news[0]; // returns array, we just want the first one
}