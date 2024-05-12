import React from "react";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

type HomeLayoutprops = {
  children: React.ReactNode;
};

const HomeLayout: React.FC<HomeLayoutprops> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default HomeLayout;
