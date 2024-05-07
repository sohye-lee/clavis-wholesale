import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await db.product.findMany();
    return NextResponse.json({ ok: true, products });
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const {
      title,
      type,
      description,
      bandColor,
      platingColor,
      price,
      msrp,
      thumbnail,
      images,
      link,
    } = await req.json();

    const product = await db.product.create({
      data: {
        title,
        type,
        description,
        bandColor,
        platingColor,
        price: Number(price),
        msrp: Number(msrp),
        thumbnail,
        images,
        link,
      },
    });

    return NextResponse.json({
      ok: true,
      product,
      message: "Successfully added.",
    });
  } catch (error) {
    console.log(error);
  }
};
