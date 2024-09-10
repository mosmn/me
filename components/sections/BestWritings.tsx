"use client";
import React from "react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const writings = [
  {
    title: "Writing One",
    description: "An interesting article about tech trends.",
    link: "https://example.com/writing-one",
  },
  {
    title: "Writing Two",
    description: "A deep dive into React and its ecosystem.",
    link: "https://example.com/writing-two",
  },
  // Add more writings as needed
];

export function BestWritings() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Best Writings</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {writings.map((writing, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{writing.title}</CardTitle>
              <CardDescription>{writing.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <a href={writing.link} target="_blank" rel="noopener noreferrer" className="text-primary">
                Read More
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}