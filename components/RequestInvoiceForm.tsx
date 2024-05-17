"use client";
import React, { Dispatch, Ref, SetStateAction, useEffect } from "react";
import FormItem from "./FormItem";
import { useForm } from "react-hook-form";
import { IconX } from "@tabler/icons-react";
import useMutation from "@/lib/useMutation";
import SmallLoader from "./SmallLoader";

interface SendRequestForm {
  company?: string;
  name?: string;
  email: string;
  phone?: string;
  message?: string;
}

export default function RequestInvoiceForm({
  setOpen,
  html,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  html: string;
}) {
  const { register, handleSubmit, watch, reset } = useForm<SendRequestForm>();
  const [sendEmail, { data, loading }] = useMutation("/api/sendEmail", "POST");

  const onSubmit = () => {
    sendEmail({
      email: "hello@clavismagnetic.com",
      subject: `[CLAVIS WHOLESALE] INVOICE REQUEST FROM CLIENT ${watch(
        "company"
      )}`,
      cc: watch("email"),
      html: `<style>p {margin-bottom: 12px;}</style><div>
      <p>Name: ${watch("name")}</p>
      <p>Company: ${watch("company")} </p>
      <p>Email: ${watch("email")} </p>
      <p>Phone: ${watch("phone")} </p>
      <p>Message: ${watch("message")} </p>
      <hr style="margin: 30px 0;"/>
      ${html}
      </div>`,
    });
  };
  useEffect(() => {
    data &&
      data?.ok &&
      setTimeout(() => {
        setOpen(false);
        reset();
      }, 2800);
  }, [data, reset, setOpen]);

  return (
    <div className=" fixed w-screen h-screen z-[10000] top-0 left-0 bg-[rgba(0,0,0,.4)] flex items-center justify-center p-4">
      <div className="bg-white rounded-sm p-8 w-full max-w-[400px] relative">
        <div
          className="text-xs uppercase text-slate-500 hover:text-purple-500 absolute right-3 top-3 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <IconX width={20} />
        </div>
        {data?.message ? (
          <div className="text-purple-600 text-md">{data?.message}</div>
        ) : (
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-medium">Send Invoice Request</h1>
            <FormItem
              type="input"
              dataType="text"
              name="email"
              itemTitle="Email"
              required={true}
              register={register}
            />
            <FormItem
              type="input"
              dataType="text"
              name="company"
              itemTitle="Company"
              required={false}
              register={register}
            />
            <FormItem
              type="input"
              dataType="text"
              name="name"
              itemTitle="Your Name"
              required={false}
              register={register}
            />

            <FormItem
              type="input"
              dataType="text"
              name="phone"
              itemTitle="Phone #"
              required={false}
              register={register}
            />
            <FormItem
              type="textarea"
              name="message"
              itemTitle="Message"
              required={false}
              register={register}
            />
            <button type="submit">
              {loading ? <SmallLoader /> : "Send Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
