import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundPaths from "@/components/background-paths";
import Image from "next/image";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Vladimir Baulin",
    role: "Technical project lead",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Researcher in computational soft matter physics and biophysics.",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Austin Cook",
    role: "AI Developer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "alignmentlab.ai",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Andrea Farias",
    role: "User Experience & Interface",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Passionate about Active Inference and research",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Daniel Friedman",
    role: "Executive Director",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Officer at Active Inference Institute",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Janna Lumiruusu",
    role: "User Experience & Interface",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Passionate about active inference and UI/UX",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Andrew Pashea",
    role: "Active Inference programmer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Scientific Advisory Board at Active Inference Institute",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Shagor Rahman",
    role: "Project Manager",
    image: "/placeholder.svg?height=200&width=200",
    bio: "10 + Years of PM Experience in Data Driven/AI/Analytical Software",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Benedikt Waldeck",
    role: "Active Inference programmer",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Passionate about developing transparent AI",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
];

export default function TeamPage() {
  return (
    <>
      <BackgroundPaths title="Our Team" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="p-3">
                <CardTitle className="text-sm">{member.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </CardHeader>
              <CardContent className="p-3">
                <p className="text-xs text-muted-foreground mb-2">
                  {member.bio}
                </p>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Twitter className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Linkedin className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Github className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
