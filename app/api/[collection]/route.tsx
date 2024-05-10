import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: any) => {
  try {
    const {
      params: { collection },
    } = context;
    const products = await db.product.findMany({
      where: {
        collection,
      },
    });

    if (!products)
      return NextResponse.json({ ok: false, message: "No product found." });

    return NextResponse.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};
