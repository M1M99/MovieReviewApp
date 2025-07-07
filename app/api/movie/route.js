import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.movie.findMany({
    include: {
      reviews: true
    }
  });

  return NextResponse.json(data);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      reviews,
      gradient,
      imageUrl,
      rating,
      synopsis,
      duration,
      year,
      createdAt,
      title,
      genres,
    } = body;

    const movie = await prisma.movie.create({
      data: {
        title,
        synopsis: synopsis || "",
        year: parseInt(year),
        duration: parseInt(duration),
        rating: rating || "",
        imageUrl,
        gradient: gradient ?? null,
        createdAt: createdAt ? new Date(createdAt) : new Date(),
        genres: genres || null,
        reviews: {
          create: reviews || [],
        },
      },
    });

    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}