import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="block lg:flex text-sm bg-[#ff6600] ">
        <Link to="/">
        <div className="mx-2 md:mx-4 my-1 flex pt-2 md:pt-0">
          <p className="border border-white w-[20px] text-center text-white">
            Y
          </p>
          <p className="font-bold pl-2">hacker news</p>
        </div>
        </Link>
        <ul className="flex gap-3 my-1 mx-2">
          <li className="border-r-2 border-black pr-2 ">
            {" "}
            <a href="/news">new</a>
          </li>
          <li className="border-r-2 border-black pr-2 ">
            <a href="/best">best</a>
          </li>
          <li className="border-r-2 border-black pr-2 ">
            <a href="/asks">ask</a>
          </li>
          <li className="border-r-2 border-black pr-2 ">
            <a href="/shows">show</a>
          </li>
          <li>
            <a href="/jobs">jobs</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
