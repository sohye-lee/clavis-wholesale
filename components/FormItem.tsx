import React from "react";

interface FormItemProps {
  itemTitle?: string;
  type?: "input" | "textarea";
  name: string;
  placeholder?: string;
  dataType?: "email" | "password" | "text" | "number";
  required: boolean;
  //   error?: string;
  register?: any;
  [key: string]: any;
}
export default function FormItem({
  itemTitle,
  type = "input",
  name,
  dataType = "text",
  required = false,
  placeholder,
  register,
  //   error,
  ...props
}: FormItemProps) {
  return (
    <div className="w-full ">
      <label>{itemTitle}</label>
      {type == "input" ? (
        <input
          {...register(name)}
          placeholder={placeholder}
          type={dataType}
          {...props}
        />
      ) : (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          {...props}
        ></textarea>
      )}
    </div>
  );
}
