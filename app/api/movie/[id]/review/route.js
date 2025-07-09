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
    const allReviews = await prisma.review.findMany({
      where: { movieId },
      select: { rating: true }
    });

    const averageRating = (
      allReviews.reduce((acc, r) => acc + parseFloat(r.rating), 0) / allReviews.length
    ).toFixed(1);

    // Rating-i güncəllə
    await prisma.movie.update({
      where: { id: movieId },
      data: { rating: averageRating.toString() }
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

export async function DELETE(req, { params }) {
  const id = params.id;
  try {
    const deleted = await prisma.review.delete({
      where: { id: Number(id) }
    })
    return NextResponse.json({ deleted }, { status: 204 })
  }
  catch {
    return NextResponse.json({ status: 404 })
  }

}