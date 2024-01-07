import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";

function Home({ posts, categories }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar data={categories}/>
      
      <div className="py-[180px] flex max-[1280px] items-center">
      <div className="w-full grid md:grid-cols-4 gap-2">
        {posts.map((post) => (
          <Link key={post.id} href={`product/${encodeURIComponent(post.slug)}`} className="w-full bg-white rounded">
            <div className="h-60 w-full flex flex-col justify-between p-4 bg-cover bg-center">
              <img className="h-full w-full" src={post.product_image[0].image} alt={post.product_image[0].alt_text} />
            </div>
            <div className="p-4 flex flex-col items-center">
              <p className="text-gray-400 font-light text-xs text-center">
                Category
              </p>
              <h1 className="text-gray-800 text-center mt-1">{post.title}</h1>
              <p className="text-center text-gray-800 mt-1">$ {post.regular_price}</p>
              <div className="inline-flex items-center mt-2">
                <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                  2
                </div>
                <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <button className="py-2 px-4 bg-lime-600 text-white rounded hover:bg-lime-800 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
                View Details
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </Link>
        ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "shoes" } }],
    fallback: true,
  };
}

  
export async function getStaticProps({ params }) {
  const res = await fetch(`http://127.0.0.1:8000/api/category/${params.slug}`);
  const posts = await res.json();
  
    const ress = await fetch("http://127.0.0.1:8000/api/category/");
    const categories = await ress.json();
  
    return {
      props: {
        posts,
        categories,
      },
    };
  }
  

export default Home;
