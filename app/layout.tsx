import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mohamed's Tech Blog - Coding, Web Development, AI, and More",
  description: "Explore in-depth articles on coding, web development, AI, and the latest in tech. Join John Doe's journey into the world of technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
