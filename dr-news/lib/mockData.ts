import { Article } from './api';

export const mockArticles: Article[] = [
    {
        id: 1,
        title: 'Presidente Abinader inaugura nuevas obras en Santo Domingo',
        text: 'El presidente Luis Abinader inauguró hoy una serie de obras públicas...',
        url: 'https://example.com',
        image: 'https://picsum.photos/seed/1/800/400',
        publish_date: '2026-04-25 10:00:00',
        author: 'Redacción',
        category: 'politics',
        source_country: 'do',
        sentiment: 0.3,
    },
    {
        id: 2,
        title: 'Diputada inaugura nuevas obras en Santo Domingo',
        text: 'Elsa Matinez inauguró hoy una serie de obras públicas...',
        url: 'https://example.com',
        image: 'https://picsum.photos/seed/1/800/400',
        publish_date: '2026-04-25 10:00:00',
        author: 'Redacción',
        category: 'politics',
        source_country: 'do',
        sentiment: 0.5,
    },
];