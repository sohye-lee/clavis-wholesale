"use client";

import FormItem from "@/components/FormItem";
import SelectItem from "@/components/SelectItem";
import { bandColors, platingColors, productTypes } from "@/lib/constants";
import useMutation from "@/lib/useMutation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ProductForm {
  title: string;
  type: string;
  description?: string;
  bandColor?: string;
  platingColor?: string;
  price: number;
  msrp: number;
  thumbnail?: string;
  images?: string[];
  link?: string;
}
export default function AddProductPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>();
  const [uploadProduct, { loading, data, error }] = useMutation(
    "/api/products",
    "POST"
  );

  const onSubmit = (validForm: ProductForm) => {
    uploadProduct(validForm);
  };

  useEffect(() => {
    data && data?.ok && router.push("/admin/products");
  }, [data, router]);
  return (
    <div className="w-full max-w-xl">
      <h1 className="text-xl font-medium">Add Product</h1>
      <div className="w-full mt-5 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 w-full"
        >
          <FormItem
            // {...register("title", { required: "This field is required" })}
            register={register}
            itemTitle="Title"
            name="title"
            type="input"
            placeholder="Title"
            required={true}
          />
          <SelectItem
            // {...register("type")}
            register={register}
            itemTitle="Type"
            name="type"
            placeholder="Product Type"
            required={false}
            options={productTypes.map((type) => ({
              name: type,
              value: type,
            }))}
          />
          <FormItem
            // {...register("description")}
            register={register}
            itemTitle="Description"
            name="description"
            type="textarea"
            placeholder="Description"
            required={false}
          />
          <SelectItem
            // {...register("bandColor")}
            register={register}
            itemTitle="Band Color"
            name="bandColor"
            placeholder="Band Color"
            required={false}
            options={bandColors.map((bandColor) => ({
              name: bandColor,
              value: bandColor,
            }))}
          />
          <SelectItem
            // {...register("platingColor")}
            register={register}
            itemTitle="Plating Color"
            name="platingColor"
            placeholder="Plating Color"
            required={false}
            options={platingColors.map((platingColor) => ({
              name: platingColor,
              value: platingColor,
            }))}
          />
          <FormItem
            // {...register("price", { required: "This field is required" })}
            register={register}
            itemTitle="Price"
            name="price"
            type="input"
            dataType="number"
            placeholder="0"
            required={true}
          />
          <FormItem
            // {...register("msrp")}
            register={register}
            itemTitle="MSRP"
            name="msrp"
            type="input"
            dataType="number"
            placeholder="0"
            required={false}
          />
          <FormItem
            // {...register("link")}
            register={register}
            itemTitle="Link on the Website"
            name="link"
            type="input"
            dataType="text"
            placeholder="Link"
            required={false}
          />
          <div>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
