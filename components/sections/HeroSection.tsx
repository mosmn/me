"use client";
import React from "react";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center h-fit text-center pt-[10vh] md:pt-[20vh] lg:pt-[30vh] pb-[10vh] md:pb-[20vh] lg:pb-[30vh]">
      <p className="text-2xl md:text-4xl lg:text-7xl font-bold">
        Hi, Im <span className="text-primary">Osman</span>, a Full-Stack
        Engineer
      </p>
      <p className="text-lg md:text-2xl lg:text-4xl mt-4 font-normal">
        Tech Stack: Reactjs(Next.js), Python(FastAPI), Node.js(Express),
        PostgreSQL, MongoDB, and AWS
      </p>
    </div>
  );
}
