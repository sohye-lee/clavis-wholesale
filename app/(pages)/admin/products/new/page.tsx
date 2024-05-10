"use client";

import FormItem from "@/components/FormItem";
import SelectItem from "@/components/SelectItem";
import { bandColors, platingColors, productTypes } from "@/lib/constants";
import useMutation from "@/lib/useMutation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IconPhoto } from "@tabler/icons-react";
import { useS3Upload } from "next-s3-upload";
import Image from "next/image";

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
    watch,
    formState: { errors },
  } = useForm<ProductForm>();
  const [uploadProduct, { loading, data, error }] = useMutation(
    "/api/products",
    "POST"
  );
  const [thumbnail, setThumbnail] = useState<string>();

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const handleFileChange = async (file: File) => {
    const { url } = await uploadToS3(file);
    console.log(url);
    setThumbnail(url);
  };

  const onSubmit = (validForm: ProductForm) => {
    uploadProduct({ ...validForm, thumbnail });
  };

  useEffect(() => {
    data && data?.ok && router.push("/admin/products");
  }, [data, router]);

  return (
    <div className="w-full max-w-xl">
      <h1 className="text-xl font-medium">Add Product</h1>
      <div className="w-full mt-5 ">
        <div className="mb-4">
          <FileInput onChange={handleFileChange} />

          <button
            onClick={openFileDialog}
            className="mt-3 aspect-square bg-white p-0 relative border border-slate-300 rounded overflow-hidden w-40 flex items-center justify-center"
          >
            <IconPhoto className="text-slate-300 z-1" width="32" />
            {thumbnail && (
              <Image
                src={thumbnail}
                alt={watch("title")}
                className="object-fill"
                objectFit="true"
                width="2000"
                height="2000"
              />
            )}
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 w-full"
        >
          <FormItem
            register={register}
            itemTitle="Title"
            name="title"
            type="input"
            placeholder="Title"
            required={true}
          />
          <SelectItem
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
            register={register}
            itemTitle="Description"
            name="description"
            type="textarea"
            placeholder="Description"
            required={false}
          />
          <SelectItem
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
            register={register}
            itemTitle="Price"
            name="price"
            type="input"
            dataType="number"
            placeholder="0"
            step=".01"
            required={true}
          />
          <FormItem
            register={register}
            itemTitle="MSRP"
            name="msrp"
            type="input"
            dataType="number"
            placeholder="0"
            step=".01"
            required={false}
          />
          <FormItem
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
