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

    if (!product)
      return NextResponse.json({ ok: false, message: "No product found." });

    return NextResponse.json({
      ok: true,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

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

    const product = await db.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      ok: true,
      message: "Successfully removed!",
      product,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: false, message: (error as Error).message });
  }
};

export const PUT = async (req: NextRequest, context: any) => {
  try {
    const {
      params: { id },
    } = context;

    console.log(id);
    const data = await req.json();
    console.log("data received:", data);
    const existingProduct = await db.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct)
      return NextResponse.json(
        {
          ok: false,
          message: "No product found.",
        },
        { status: 500 }
      );

      console.log('data received:', data)
    const updatedProduct = await db.product.update({
      where: {
        id,
      },
      data: {
        ...data, msrp: parseFloat(data.msrp), price: parseFloat(data.price)
      },
    });
    console.log('updated: ', updatedProduct);
    return NextResponse.json({
      ok: true,
      message: "Successfully updated!",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      ok: false,
      message: (error as Error).message,
    });
  }
};
