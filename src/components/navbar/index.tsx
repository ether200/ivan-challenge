import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full border-b-2 border-solid border-zinc-400">
      <div className="container mx-auto w-full px-4 py-4 md:px-0">
        <Link href="/">
          <Image src="assets/challenge-icon.svg" alt="alt" width={0} height={0} style={{ width: 120, height: 60 }} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
