import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// GET - fetch saved articles for the logged in user
export async function GET() {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const saved = await prisma.savedArticle.findMany({
        where: { userId: session.user.id },
        orderBy: { savedAt: 'desc' },
    });

    return NextResponse.json(saved);
}

// POST - save an article
export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const article = await req.json();

    const saved = await prisma.savedArticle.upsert({
        where: {
            userId_articleId: {
                userId: session.user.id,
                articleId: article.id,
            },
        },
        update: {}, // do nothing if it exists
        create: {
            articleId: article.id,
            title: article.title,
            image: article.image,
            url: article.url,
            category: article.category,
            publishDate: article.publish_date,
            author: article.author,
            sentiment: article.sentiment,
            userId: session.user.id,
        },
    });

    return NextResponse.json(saved, { status: 201 });
}

// DELETE - unsave an article
export async function DELETE(req: Request) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { articleId } = await req.json();

    await prisma.savedArticle.deleteMany({
        where: {
            articleId,
            userId: session.user.id,
        },
    });

    return NextResponse.json({ message: 'Artículo eliminado' });
}