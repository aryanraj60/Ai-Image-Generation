import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-4">
      <img src="/assets/logo.svg" className="w-32" />

      <Link
        href="/create-post"
        className="px-3 py-2 text-base bg-blue-600 text-white rounded-md"
      >
        Create
      </Link>
    </div>
  );
};

export default Navbar;
