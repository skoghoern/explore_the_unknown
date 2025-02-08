"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
  FaLink,
  FaGithub,
  FaBook,
  FaFlask,
  FaLightbulb,
  FaBrain,
} from "react-icons/fa";

interface ProjectOverviewModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectOverviewModal({
  isOpen,
  onOpenChange,
}: ProjectOverviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold mb-2">
                Material Intelligence Research Project
              </DialogTitle>
              <DialogDescription className="text-base">
                Advancing materials science through AI and machine learning
              </DialogDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                Active
              </Badge>
              <Button className="bg-green-500 hover:bg-green-600">
                Join Project
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-5 flex-shrink-0">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge Areas</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto min-h-0 pr-2">
            <TabsContent value="overview" className="mt-6 space-y-6 pb-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FaLightbulb className="text-yellow-500" />
                      Project Description
                    </h3>
                    <p className="text-muted-foreground">
                      An innovative research initiative combining advanced AI
                      algorithms with materials science to discover and optimize
                      new materials for sustainable applications.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FaFlask className="text-blue-500" />
                      Key Research Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Machine Learning",
                        "Materials Science",
                        "Sustainability",
                        "Data Analytics",
                        "Green Technology",
                      ].map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-4 bg-card">
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      Timeline
                    </h4>
                    <div className="text-sm">
                      <p>Started: January 2024</p>
                      <p>Expected completion: December 2024</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <FaChartLine className="text-green-500" />
                      Status
                    </h4>
                    <div className="text-sm">
                      <p>Phase 2 of 4</p>
                      <p>On track</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <FaUsers className="text-purple-500" />
                      Team Size
                    </h4>
                    <p className="text-sm">8 Core Members</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="knowledge" className="mt-6 pb-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaBrain className="text-purple-500" />
                    Knowledge Areas Distribution
                  </h3>
                </div>

                <div className="border rounded-lg p-6 bg-card">
                  <div className="aspect-[16/10] relative bg-black/5 rounded-lg overflow-hidden">
                    <img
                      src="/knowledge_areas.png"
                      alt="Knowledge Areas Distribution"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Clusters</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Dynamic Local Interaction Processing</li>
                          <li>
                            • Stochastic Thermodynamic Information Processing
                          </li>
                          <li>• Mechanically Mediated Response</li>
                          <li>• Electrically Modulated Conductance Memory</li>
                          <li>• DNA Hybridization Based Systems</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Emerging Areas</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Kinetic Protein Based Intelligence</li>
                          <li>• Topological Defect Liquid Computation</li>
                          <li>• Ionic Gradient Material Intelligence</li>
                          <li>• Marangoni-driven Chemotaxis</li>
                        </ul>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        This 2D visualization represents the distribution and
                        relationships between different knowledge areas in our
                        research project. Clusters indicate closely related
                        research topics, while distances represent conceptual
                        similarities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team" className="mt-6 pb-6">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((member) => (
                  <div
                    key={member}
                    className="flex items-start space-x-4 border rounded-lg p-4"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/avatar${member}.png`} />
                      <AvatarFallback>TM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">Team Member {member}</h4>
                      <p className="text-sm text-muted-foreground">
                        Research Scientist
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">
                          AI Expert
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Materials Science
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-6 pb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaBook className="text-orange-500" />
                    Documentation
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Research Proposal",
                      "Methodology",
                      "Progress Reports",
                    ].map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <span>{doc}</span>
                        <Button variant="ghost" size="sm">
                          <FaLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FaGithub className="text-gray-500" />
                    Code Repositories
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Core Algorithm",
                      "Data Processing",
                      "Visualization Tools",
                    ].map((repo) => (
                      <div
                        key={repo}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <span>{repo}</span>
                        <Button variant="ghost" size="sm">
                          <FaLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="mt-6 pb-6">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      label: "Tasks Completed",
                      value: "24/36",
                      color: "bg-green-500",
                    },
                    {
                      label: "Milestones Reached",
                      value: "4/8",
                      color: "bg-blue-500",
                    },
                    {
                      label: "Publications",
                      value: "2",
                      color: "bg-purple-500",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="border rounded-lg p-4 text-center"
                    >
                      <div
                        className={`w-12 h-1 ${stat.color} mx-auto mb-2 rounded-full`}
                      />
                      <h4 className="font-semibold">{stat.value}</h4>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
                  <div className="space-y-4">
                    {[
                      "Completed phase 2 data collection",
                      "Published preliminary results",
                      "Started collaboration with external lab",
                    ].map((update, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0"
                      >
                        <div className="min-w-[4rem] text-sm text-muted-foreground">
                          {index + 1}d ago
                        </div>
                        <p>{update}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
