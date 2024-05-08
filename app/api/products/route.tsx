import db from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { env } from "@/env";

const Bucket = env.AWS_BUCKET;
const s3 = new S3Client({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY as string,
  },
});

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
