import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: any) => {
  try {
    const {
      params: { id },
    } = context;
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) return NextResponse.json({});
  } catch (error) {
    console.log(error);
  }
};
