"use client";
import React, { Dispatch, SetStateAction } from "react";
import FormItem from "./FormItem";
import { useForm } from "react-hook-form";
import useStore from "@/app/store";

interface AdminPWForm {
  password: string;
}
export default function AdminPWForm({
  setVerified,
}: {
  setVerified: Dispatch<SetStateAction<boolean>>;
}) {
  const { updateAdminStatus } = useStore();
  const onSubmit = (validForm: AdminPWForm) => {
    sessionStorage.setItem(
      "admin_verified",
      JSON.stringify(validForm.password)
    );
    setVerified(true);
    updateAdminStatus(true);
  };

  const { register, handleSubmit } = useForm<AdminPWForm>();
  return (
    <div className="w-full flex justify-center pt-16 items-center">
      <div className="max-w-2xl flex flex-col  gap-3">
        <h1 className="text-lg text-left uppercase font-medium tracking-wide">
          Admin Page
        </h1>
        <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
          <FormItem
            itemTitle="Password"
            name="password"
            dataType="password"
            register={register}
            required={true}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
