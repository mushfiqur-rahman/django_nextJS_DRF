import React, { useState } from "react";
import Link from "next/link";
import Logo from '../public/store.png'
import Image from "next/image";

const Navbar = ({data}) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="fixed w-full h-20 shadow-sm z-[100] bg-white dark:bg-gray-900 dark:text-gray-100">
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16">
        <Link href="/">
          <Image src={Logo} alt="logo" width={50} height={50} />
        </Link>

        <div>
          <ul className="hidden md:flex ">
          {data.map((category) => (
              <Link key={category.name} href={`/category/${encodeURIComponent(category.slug)}`}>
                <li className=" uppercase pr-5 hover:text-green-700">
                {category.name}
                </li>
                
              </Link>
            ))}
          </ul>
          
          <div onClick={handleNav} className="md:hidden cursor-pointer">
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </div>

      <div
        className={
          nav ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 " : ""
        }
      >
        <div
          className={
            nav
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-white " +
                "dark:bg-gray-900 dark:text-gray-100 p-10 ease-in duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div>
            <div className="flex w-full items-center justify-between cursor-pointer">
              <Link href="/">
                
              </Link>
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer bg-white dark:bg-gray-900"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            <div className="py-4 flex flex-col cursor-pointer">
              <ul className="uppercase">
              {data.map((category) => (
                <Link key={category.name} href={`/category/${encodeURIComponent(category.slug)}`}>
                  <li 
                    onClick={() => setNav(false)}
                    className="py-4 font-medium hover:text-green-500"
                  >
                    {category.name}
                  </li>
                </Link>

                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
