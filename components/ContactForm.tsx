"use client";
import React, { useEffect, useState } from "react";
import FormItem from "./FormItem";
import { useForm } from "react-hook-form";
import { IconHome2, IconSend, IconSend2 } from "@tabler/icons-react";
import useMutation from "@/lib/useMutation";
import Link from "next/link";
// import { sendEmail } from "@/lib/sendEmail";

interface ContactForm {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  message: string;
}
export default function ContactForm() {
  const { register, handleSubmit, watch } = useForm<ContactForm>();
  const [sendEmail, { data }] = useMutation("/api/sendEmail", "POST");
  const [response, setResponse] = useState();
  const sendMessage = () => {
    sendEmail({
      email: watch("email"),
      subject: "[CLAVIS WHOLESALE] MESSAGE FROM CLIENT",
      html: `<a href="localhost:3000">Clavis</a>`,
    });
  };

  return (
    <div className="w-full">
      {data?.ok && data?.message ? (
        <div className=" py-8 px-5 bg-slate-100 rounded">
          <p className="mb-4">{data?.message}</p>
          <div>
            <Link className="btn inline-flex" href="/">
              <IconHome2 width={16} />
              Go Home
            </Link>
          </div>
        </div>
      ) : (
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit(sendMessage)}
        >
          <FormItem
            register={register}
            type="input"
            dataType="email"
            name="email"
            itemTitle="Email address"
            required={true}
          />
          <FormItem
            register={register}
            type="input"
            dataType="text"
            name="name"
            itemTitle="Your name"
            required={false}
          />
          <FormItem
            register={register}
            type="input"
            dataType="text"
            name="company"
            itemTitle="Company name"
            required={false}
          />
          <FormItem
            register={register}
            type="input"
            dataType="text"
            name="phone"
            itemTitle="Pnone #"
            required={false}
          />
          <FormItem
            register={register}
            type="textarea"
            required={true}
            name="message"
            itemTitle="Message"
          />
          <div>
            <button type="submit">
              Send Message <IconSend2 width="16" />{" "}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
