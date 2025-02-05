import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "AI Learning Path Generator",
    description:
      "An intelligent system that creates personalized learning paths based on user interests and goals.",
    status: "Active",
    tags: ["AI", "Education", "Personalization"],
    link: "#",
  },
  {
    title: "Interactive Code Tutor",
    description:
      "Real-time coding assistance and feedback powered by advanced language models.",
    status: "In Development",
    tags: ["Programming", "AI", "Real-time"],
    link: "#",
  },
  {
    title: "Knowledge Graph Builder",
    description:
      "Automatically generates connected knowledge graphs from educational content.",
    status: "Planning",
    tags: ["Graph Theory", "AI", "Education"],
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <BackgroundPaths title="Our Projects" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {projects.map((project) => (
            <Link key={project.title} href={project.link}>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight className="h-4 w-4" />
                    </CardTitle>
                    <Badge
                      variant={
                        project.status === "Active"
                          ? "default"
                          : project.status === "In Development"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
