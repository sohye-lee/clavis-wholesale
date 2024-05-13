"use client";
import React from "react";
import FormItem from "./FormItem";
import { useForm } from "react-hook-form";
import { IconSend, IconSend2 } from "@tabler/icons-react";

interface ContactForm {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  message: string;
}
export default function ContactForm() {
  const { register, handleSubmit } = useForm<ContactForm>();
  return (
    <form className="w-full flex flex-col gap-2">
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
        dataType="email"
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
        <button>
          Send Message <IconSend2 width="16" />{" "}
        </button>
      </div>
    </form>
  );
}
