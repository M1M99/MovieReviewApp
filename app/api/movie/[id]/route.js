import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const movieId = Number(params.id);
  if (!movieId) return new Response('Invalid ID', { status: 400 });

  try {
    const deleted = await prisma.movie.delete({
      where: { id: movieId },
    });

    return Response.json({ deleted }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return new Response('Not Found', { status: 404 });
  }
}
export async function GET(req, { params }) {
    const product = await prisma.movie.findUnique({
        where: { id: Number(params.id) }
    })

    if (!product) {
        return new Response('Not Found', { status: 404 })
    }
    return Response.json(product, { status: 200 })
}



export async function PUT(req, { params }) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID düzgün deyil' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const {
      gradient,
      imageUrl,
      rating,
      synopsis,
      duration,
      year,
      title,
      genres,
    } = body;

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: {
        gradient,
        imageUrl,
        rating,
        synopsis,
        duration,
        year,
        title,
        genres,
      },
    });

    return NextResponse.json(updatedMovie);
  } catch (error) {
    console.error('Film yenilənərkən xəta:', error);
    return NextResponse.json({ error: 'Film yenilənə bilmədi' }, { status: 500 });
  }
}
