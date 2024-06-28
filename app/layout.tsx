import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import {FloatingNav} from "@/components/ui/floating-navbar";
//import icons for nav items from lucide-react
import { HomeIcon, BookIcon, UserIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Osman's Tech Blog - Coding, Web Development, AI, and More",
  description: "Explore in-depth articles on coding, web development, AI, and the latest in tech. Join John Doe's journey into the world of technology.",
};

const navItems =[
  { name: "Home", link: "/", icon: <HomeIcon size={24} /> },
  { name: "Blog", link: "/blog", icon: <BookIcon size={24} /> },
  { name: "About", link: "/about", icon: <UserIcon size={24} /> },
]

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
          <FloatingNav navItems={navItems} />
          {children}
          <footer className="py-4 text-center border-t border-neutral-200 dark:border-neutral-700">
             <p className="text-sm">&copy; 2024 mosmn. All Rights Reserved.</p>
          </footer>
        </ThemeProvider>
        </body>
    </html>
  );
}
