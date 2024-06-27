import Image from "next/image";
import { Button } from "@/components/ui/button";
import  {ModeToggle} from "@/components/theme-toggle";
import {Logo} from "@/components/logo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">
        Welcome to Osman Tech Blog
      </h1>
      <p className="text-center">
        Explore in-depth articles on coding, web development, AI, and the latest
        in tech. Join John Doe journey into the world of technology.
      </p>
      <Button >Read the Blog</Button>
      <ModeToggle />
      <Logo state="static"/>
    </main>
  );
}
