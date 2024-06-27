import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Osman's Tech Blog - Coding, Web Development, AI, and More",
  description: "Explore in-depth articles on coding, web development, AI, and the latest in tech. Join John Doe's journey into the world of technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
