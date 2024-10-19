import * as React from "react";
import type { Metadata } from "next";
import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Craftiax",
  description: "Bring your fans the benefits of chain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
