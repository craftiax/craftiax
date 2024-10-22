"use client";

import React from "react";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

interface ClientLayoutProps {
  children: React.ReactNode;
  showWalletConnect?: boolean;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  showWalletConnect = true,
}) => {
  return (
    <>
      <Header showWalletConnect={showWalletConnect} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ClientLayout;
