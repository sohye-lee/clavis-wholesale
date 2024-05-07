import React from "react";

interface Option {
  name: string;
  value: any;
}
interface SelectItemProps {
  register?: any;
  itemTitle?: string;
  options?: Option[];
  name: string;
  placeholder?: string;
  required: boolean;
  [key: string]: any;
}
export default function SelectItem({
  register,
  itemTitle,
  name,
  required = false,
  placeholder,
  options,
  ...props
}: SelectItemProps) {
  return (
    <div className="w-full ">
      <label>{itemTitle}</label>
      <select {...register(name)} {...props}>
        <option disabled>Select</option>
        {options?.map((option, i) => (
          <option key={i} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
