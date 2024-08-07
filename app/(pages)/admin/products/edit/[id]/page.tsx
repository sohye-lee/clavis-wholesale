"use client";
import FormItem from "@/components/FormItem";
import SelectItem from "@/components/SelectItem";
import {
  bandColors,
  collections,
  platingColors,
  productTypes,
} from "@/lib/constants";
import useMutation from "@/lib/useMutation";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IconPhoto } from "@tabler/icons-react";
import { useS3Upload } from "next-s3-upload";
import Image from "next/image";
import useSWR from "swr";
import { capitalize } from "@/lib/utils";
import FullLoader from "@/components/FullLoader";
import useStore from "@/app/store";
import AdminPWForm from "@/components/AdminPWForm";

interface ProductForm {
  title: string;
  type: string;
  collection?: string;
  description?: string;
  bandColor?: string;
  platingColor?: string;
  price: number;
  msrp: number;
  thumbnail?: string;
  link?: string;
}

export default function EditProductPage() {
  const [verified, setVerified] = useState(false);
  const path = usePathname();
  const id = path.split("edit/")[1];
  const router = useRouter();
  const { isAdmin } = useStore();
  const { data: productData, isLoading } = useSWR(`/api/products/${id}`);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductForm>();

  const [uploadProduct, { loading, data, error }] = useMutation(
    `/api/products/${id}`,
    "PUT"
  );
  const [thumbnail, setThumbnail] = useState<string>();

  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const handleFileChange = async (file: File) => {
    const { url } = await uploadToS3(file);
    setThumbnail(url);
  };

  const onSubmit = (validForm: ProductForm) => {
    uploadProduct({ ...validForm, thumbnail });
  };

  useEffect(() => {
    if (productData && productData?.ok) {
      reset({
        ...productData?.product,
      });

      setThumbnail(productData?.product?.thumbnail);
    }
    data && data?.ok && router.push("/admin/products");

    isAdmin && setVerified(true);
  }, [data, productData, reset, router, isAdmin]);

  // if (!verified) return <AdminPWForm setVerified={setVerified} />;

  return (
    <div className="w-full max-w-xl">
      {loading && isLoading ? (
        <FullLoader />
      ) : (
        <>
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
                  name: capitalize(type),
                  value: type,
                }))}
              />
              <SelectItem
                register={register}
                itemTitle="Collection"
                name="collection"
                placeholder="Collection"
                required={false}
                options={collections.map((collection) => ({
                  name: capitalize(collection),
                  value: collection,
                }))}
              />
              <FormItem
                register={register}
                itemTitle="Description"
                name="description"
                type="textarea"
                placeholder="Description"
                required={false}
                rows={8}
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
                required={true}
              />
              <FormItem
                register={register}
                itemTitle="MSRP"
                name="msrp"
                type="input"
                dataType="number"
                placeholder="0"
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
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
