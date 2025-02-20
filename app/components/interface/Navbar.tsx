"use client";
import React from "react";
import { useRouter } from "next/navigation";

import ThemeDropdown from "./ThemeDropdown";
import SearchDialog from "./SearchDialog";

function Navbar() {
  const router = useRouter();

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />
        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
