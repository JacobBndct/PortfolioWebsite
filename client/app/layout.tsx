import type { Metadata } from "next";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapClient from "./bootstrapClient";
import "./globals.css";
import "./app.css";


export const metadata: Metadata = {
  title: "Jacob's portfolio website",
  description: "This is a portfolio website for Jacob Benedict",
};

import type { ReactNode } from "react";
import Navbar from "./components/common/navbar/navbar.component";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />
        <Navbar />
        {children}
      </body>
    </html>
  );
}