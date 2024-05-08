import db from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { env } from '@/env';

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
      link,
    } = await req.json();

    const formData = await req.formData();
    const files = formData.getAll('file') as File[];

    const product = await db.product.create({
      data: {
        title,
        type,
        description,
        bandColor,
        platingColor,
        price: Number(price),
        msrp: Number(msrp),
        link,
      },
    });

    // Upload images to s3: https://medium.com/@antoinewg/upload-a-file-to-s3-with-next-js-13-4-and-app-router-e04930601cd6
    // https://github.com/ryanto/next-s3-upload/blob/master/packages/next-s3-upload/src/backend/handler.ts
    const response = await Promise.all(
      files.map(async (file) => {
        const Body = (await file.arrayBuffer()) as Buffer;
        s3.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));
      })
    );
    console.log;

    return NextResponse.json({
      ok: true,
      product,
      message: 'Successfully added.',
    });
  } catch (error) {
    console.log(error);
  }
};
