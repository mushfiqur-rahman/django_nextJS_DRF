import React from "react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import Head from "next/head";

function Product({ post, categories }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Navbar data={categories} />
      <div className="py-[181px] max-w-[1240px] mx-auto px-2">
        <div className="grid lg:grid-cols-6 gap-5">
          {/* Left */}
          <div className="col-span-3 lg:col-span-3 w-full h-full shadow-sm shadow-gray-300 rounded-xl p-4">
            <div className="lg:p-4 h-full">
              <img
                className=""
                src={post.product_image[0].image}
                alt={post.product_image[0].alt_text}
              />
              <div className="w-20 h-20 flex gap-2  py-5">
                {/* image showcase */}
                {post.product_image.map((c) => (
                  <div
                    key={c.id}
                    className="border border-green-400 cursor-pointer"
                  >
                    <img
                      src={post.product_image[0].image}
                      alt={post.product_image[0].alt_text}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="col-span-3 py-[100px] w-full h-auto shadow-sm shadow-gray-300 rounded-xl lg:p-4">
            <form action="" method="">
              <div className="">
                <h2 className="text-3xl relative text-green-500 border-b-8 uppercase font-semibold">
                  {post.title}
                </h2>
                <p className="py-10 font-bold">
                  Regular Price:{" "}
                  <span className="text-gray-500">$ {post.regular_price}</span>
                </p>

                <div className="py-5">
                  <h3 className="text-lg font-bold">About This Item:</h3>
                  <p className="justify-start">{post.description}</p>
                </div>
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex items-center my-5">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
                {/* product number */}
                <div>
                  <label className="block">
                    <input
                      type="number"
                      name=""
                      min="0"
                      value="1"
                      id=""
                      className="border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  className="flex gap-4 w-70 p-4 mt-4 shadow-xl shadow-gray-400 rounded-xl uppercase bg-gradient-to-r from-[#5651e5] to-[#709dff] text-white"
                >
                  Add to Cart{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "boots-3" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://127.0.0.1:8000/api/${params.slug}`);
  const post = await res.json();

  const ress = await fetch("http://127.0.0.1:8000/api/category/");
  const categories = await ress.json();

  return {
    props: {
      post,
      categories,
    },
  };
}

export default Product;
