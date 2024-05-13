import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import nodemailer from "nodemailer";

export const POST = async (req: NextRequest) => {
  try {
    const { email, subject, html } = await req.json();

    const transporter = nodemailer.createTransport({
      host: env.EMAIL_SERVER_HOST,
      port: Number(env.EMAIL_SERVER_PORT),
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: env.EMAIL_SERVER_USER,
        pass: env.EMAIL_SERVER_PASSWORD,
      },
    });

    if (email) {
      const res = await transporter.sendMail({
        from: env.EMAIL_FROM,
        to: email,
        subject,
        html,
      });
      console.log("response after sending message:", res);
    }
    return NextResponse.json({
      ok: true,
      message: "Message has been sent!",
    });
  } catch (error) {
    console.log(error);
  }
};
