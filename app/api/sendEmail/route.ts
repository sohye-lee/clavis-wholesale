import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

export const POST = async (req: NextRequest) => {
  const { email, name, company, phone, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
  });
};
