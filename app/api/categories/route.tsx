import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json({ ok: true, categories });
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { name } = await req.json();
  } catch (error) {
    console.log(error);
  }
};
