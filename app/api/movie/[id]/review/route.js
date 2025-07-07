import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req, { params }) {
  const movieId = parseInt(params.id);

  if (isNaN(movieId)) {
    return NextResponse.json({ error: 'Movie ID is not valid' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { rating, comment } = body;

    if (!rating || typeof rating !== 'string') {
      return NextResponse.json({ error: 'rating requied and string requied' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment: comment || null,
        movie: {
          connect: { id: movieId },
        },
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    console.error('Review Error:', err);
    return NextResponse.json({ error: 'Review Error' }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  const movieId = parseInt(params.id);

  if (isNaN(movieId)) {
    return NextResponse.json({ error: 'Movie ID Is Not Valid' }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { movieId },
      orderBy: { createdAt: 'desc' }, 
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (err) {
    console.error('Review Get Error:', err);
    return NextResponse.json({ error: 'Review Fetch Error' }, { status: 500 });
  }
}
