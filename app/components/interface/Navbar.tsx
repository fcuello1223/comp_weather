"use client";
import React from "react";
import { useRouter } from "next/navigation";

import ThemeDropdown from "./ThemeDropdown";
import SearchDialog from "./SearchDialog";

function Navbar() {
  const router = useRouter();

return (
  <div className="w-full h-[5rem] fixed top-0 left-0 bg-white dark:bg-gray-900 shadow-md z-50 px-8 py-4 flex items-center">
    <div className="w-full max-w-6xl mx-auto flex items-center relative">
      <div className="flex-1 flex justify-center">
        <SearchDialog />
      </div>
      <div className="absolute right-0">
        <ThemeDropdown />
      </div>
    </div>
  </div>
);
}

export default Navbar;
