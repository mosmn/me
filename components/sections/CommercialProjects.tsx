"use client";
import React from "react";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const projects = [
  {
    title: "Project One",
    description: "Description of project one. Deployed with active users.",
    link: "https://project-one.com",
  },
  {
    title: "Project Two",
    description: "Description of project two. Deployed with active users.",
    link: "https://project-two.com",
  },
  // Add more projects as needed
];

export function CommercialProjects() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Some of my work</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-16">
        {projects.map((project, idx) => (
          <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary">
                Visit Project
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}