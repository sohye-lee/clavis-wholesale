import db from "@/prisma/db";
import { Product } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products: Product[] = (await db.product.findMany()).sort((a, b) =>
      a.title > b.title ? 1 : a.title < b.title ? -1 : 0
    );
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
      collection,
      bandColor,
      platingColor,
      price,
      msrp,
      thumbnail,
      link,
    } = await req.json();

    const product = await db.product.create({
      data: {
        title,
        type,
        description,
        collection,
        bandColor,
        platingColor,
        price: Number(price),
        msrp: Number(msrp),
        thumbnail,
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
    return NextResponse.json({
      ok: false,
      message: (error as Error).message,
    });
  }
};
