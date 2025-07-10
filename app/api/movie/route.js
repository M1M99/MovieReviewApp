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
    const formData = await req.formData();
    const file = formData.get("image");

    let imageUrl = "";

    if (file && typeof file === "object") {
      const buffer = Buffer.from(await file.arrayBuffer());

      const cloudForm = new FormData();
      cloudForm.append('file', `data:${file.type};base64,${buffer.toString("base64")}`);
      cloudForm.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: cloudForm,
        }
      );

      const cloudData = await cloudRes.json();

      if (!cloudData.secure_url) {
        console.error("!!Cloudinary Response:", cloudData);
        throw new Error("Cloudinary Upload Err");
      }

      imageUrl = cloudData.secure_url;
    }

    const title = formData.get("title");
    const synopsis = formData.get("synopsis") || "";
    const year = parseInt(formData.get("year"));
    const duration = parseInt(formData.get("duration"));
    const rating = formData.get("rating") || "";
    const gradient = formData.get("gradient") || null;
    const genres = formData.get("genres") || null;

    const movie = await prisma.movie.create({
      data: {
        title,
        synopsis,
        year,
        duration,
        rating,
        imageUrl,
        gradient,
        genres,
      },
    });

    return NextResponse.json(movie, { status: 201 });

  } catch (err) {
    console.error("Film Post Error:", err);
    return NextResponse.json({ error: "Error Occurred" }, { status: 500 });
  }
}
