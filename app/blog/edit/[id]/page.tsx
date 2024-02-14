"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
//react-hot-toast

type blogParams = {
  title: string;
  description: string;
  id: string;
};

const delay = (ms:any) => new Promise(res => setTimeout(res, ms));


const updateBlog = async (data: blogParams) => {
  const res = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({ title: data.title, description: data.description }),
    //@ts-ignore
    "Content-Type": "application/json",
  });

  return (await res).json();
};

const deleteBlog = async (id: string) => {
  const res = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "Content-Type": "application/json",
  });

  return (await res).json();
};

const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/blog/${id}`);
  const data = await res.json();
  return data.post;
};

export default function EditBlog({ params }: { params: { id: string } }) {
  const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  console.log(params.id);

  useEffect(() => {
    toast.loading("Fetching Blog Details 🚀", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Fetching Complete", { id: "1" });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching blog", { id: "1" });
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Request", { id: "1" });
      await updateBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id,
      });
      toast.success("Blog Posted Successfully", { id: "1" });
      await delay(2000);
      router.push("/");
    }
  };

  const handleDelete = async () => {
    toast.loading("Deleting Blog", { id: "2" });
    await deleteBlog(params.id);
    toast.success("Blog Delted", { id: "2" });
    await delay(2000);
    router.push("/");
  };
  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">Edit Blog</p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="Enter Title"
              type="text"
              className="w-full rounded-md px-4 py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="Enter Description"
              className="rounded-md px-4 py-2  w-full my-2"
            ></textarea>
            <div className="flex justify-between">
              <button className="font-semibold px-4 py-1 shadpw-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                Update
              </button>
            </div>
          </form>

          <button
            onClick={handleDelete}
            className="font-semibold mt-5 px-4 py-1 shadpw-xl text-white bg-red-500 rounded-lg m-auto hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
}
