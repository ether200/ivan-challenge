import Image from "next/image";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-2 border-solid border-zinc-400">
      <div className="container mx-auto flex w-full flex-col items-center justify-center space-y-4 py-4">
        <Image src="assets/challenge-icon.svg" alt="alt" width={0} height={0} style={{ height: 45, width: 90 }} />
        <p>&copy; {currentYear}, Iván Muntian.</p>
      </div>
    </footer>
  );
};

export default Footer;
