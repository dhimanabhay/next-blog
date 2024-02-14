import Link from "next/link";

async function fetchBlogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    next: {
      revalidate: 2,
    },
  });

  const data = await res.json();
  return data.posts;
}

export default async function Home() {
  const posts = await fetchBlogs();
  return (
    <main className="w-full h-full">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-slate-800 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
          Blog It
        </h1>
      </div>

      <div className="flex my-5">
        <Link
          href={"/blog/add"}
          className="md:w-1/6 text-center sm:w-2/4 rounded-md p-2 m-auto bg-slate-200"
        >
          Add new Blog
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {posts?.map((post: any) => (
          <div className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center">
            <div className="flex items-center my-3">
              <div className="mr-auto">
                <h2 className="mr-auto font-semibold">{post.title}</h2>
              </div>
              <Link
                className="text-center px-4 py-1 bg-slate-900 rounded-md fond-semibold text-slate-200 text-sm"
                href={`blog/edit/${post.id}`}
              >
                Edit
              </Link>
            </div>

            <div className="mr-auto mb-2">
              <blockquote className="text-xs font-semibold text-slate-700">{new Date(post.date).toDateString()}</blockquote>
            </div>

            <div className="mr-auto">
              <h2 className="text-gray-600 font-light">{post.description}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
