// import { env } from "@/env";
// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: env.EMAIL_SERVER_HOST,
//   port: Number(env.EMAIL_SERVER_PORT),
//   secure: false, // Use `true` for port 465, `false` for all other ports
//   auth: {
//     user: env.EMAIL_SERVER_USER,
//     pass: env.EMAIL_SERVER_PASSWORD,
//   },
// });

// export const sendEmail = async (
//   email: string,
//   subject: string,
//   html: string
// ) => {
//   if (email) {
//     const res = await transporter.sendMail({
//       from: env.EMAIL_FROM,
//       to: email,
//       subject,
//       html,
//     });
//     console.log("response after sending message:", res);
//   }
// };
