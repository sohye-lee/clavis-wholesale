import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, context: any) => {
  try {
    const {
      params: { id },
    } = context;
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });
    if (!existingProduct)
      return NextResponse.json({ ok: false, message: "No product found." });

    await db.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ ok: true, message: "Successfully removed!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, message: (error as Error).message });
  }
};
