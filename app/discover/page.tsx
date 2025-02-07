"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaPaperPlane,
  FaMicroscope,
  FaFolder,
  FaMicrophone,
} from "react-icons/fa";
import { useChat } from "ai/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function MainComponent() {
  const [isFirstMessage, setIsFirstMessage] = useState<boolean>(true);
  const [isChatVisible, setIsChatVisible] = useState<boolean>(true);

  const {
    messages: aiMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const handleFirstMessageSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!input.trim()) return;
    await handleSubmit(e);
    setTimeout(() => {
      setIsFirstMessage(false);
    }, 300);
  };

  if (isFirstMessage) {
    return (
      <div className="h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#121212] to-[#1a1a1a]">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2 font-roboto">
            Welcome to your Discovery Mentor
          </h1>
          <p className="text-gray-300 font-roboto">
            Your personal assistant for learning, research and collaboration
          </p>
        </div>
        <form
          onSubmit={handleFirstMessageSubmit}
          className="w-[600px] max-w-[90%]"
        >
          <div className="relative flex items-center">
            <FaMicrophone className="absolute left-2 text-gray-400" />
            <Input
              value={input}
              onChange={handleInputChange}
              className="w-full p-6 text-lg bg-[#2d2d2d] text-white border-[#3d3d3d] rounded-lg pl-10"
              placeholder="Describe your field of interest..."
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 rounded-full"
            >
              <span>Start</span>
              <FaArrowRight className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
    );
  }

  const mainContentWidth = isChatVisible ? "w-1/2" : "w-full";
  const chatWidth = isChatVisible ? "w-1/2" : "w-0";

  return (
    <div className="h-[calc(100vh-4rem)] w-full flex relative bg-[#121212] overflow-hidden">
      <div className="absolute top-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                src="/avatar.png"
                alt="@max"
                className="filter invert"
              />
              <AvatarFallback>Mad Max</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => console.log("Profile clicked")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Settings clicked")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Logout clicked")}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div
        className={`${chatWidth} h-[calc(100vh-4rem)] bg-[#1e1e1e] flex flex-col overflow-hidden transition-all duration-500 ease-in-out transform ${
          isChatVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-[#2d2d2d] bg-[#1a1a1a] text-white">
          <h2 className="text-xl font-roboto font-bold">Chat History</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {aiMessages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <Alert
                variant={message.role === "user" ? "default" : "default"}
                className={`bg-[#2b2b2b] text-white ${
                  message.role === "user" ? "ml-8" : "mr-8"
                }`}
              >
                <AlertDescription>{message.content}</AlertDescription>
              </Alert>
            </div>
          ))}
          {isLoading && <div className="text-gray-400">Loading...</div>}
        </div>
        <div className="p-4 border-t border-[#2d2d2d] bg-[#1a1a1a]">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex items-center w-full">
              <FaMicrophone className="absolute left-2 text-gray-400" />
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Write a message..."
                className="bg-[#3b3b3b] text-white border-[#4b4b4b] rounded-lg pl-10 flex-grow"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white hover:bg-gray-200"
              >
                <span>Send</span>
                <FaPaperPlane className="ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={`absolute h-full flex items-center ${
          isChatVisible ? "left-[50%]" : "left-0"
        } transform -translate-x-1/2 z-50 transition-all duration-500`}
      >
        <Button
          onClick={() => setIsChatVisible(!isChatVisible)}
          className="rounded-full w-10 h-10 bg-[#2d2d2d] hover:bg-[#3d3d3d] ml-2"
          size="icon"
        >
          {isChatVisible ? (
            <FaChevronLeft className="text-white" />
          ) : (
            <FaChevronRight className="text-white" />
          )}
        </Button>
      </div>

      <div
        className={`${mainContentWidth} h-[calc(100vh-4rem)] bg-[#1e1e1e] p-6 flex flex-col gap-6 transition-all duration-500 ease-in-out transform`}
      >
        <Accordion type="multiple">
          <AccordionItem value="profile-overview">
            <AccordionTrigger>Profile Overview</AccordionTrigger>
            <AccordionContent>
              <Tabs>
                <TabsList>
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                  <TabsTrigger value="knowledge">Skills</TabsTrigger>
                </TabsList>
                <TabsContent value="goals">
                  <div className="space-y-3">
                    {["Goal 1", "Goal 2", "Goal 3"].map((goal) => (
                      <div
                        key={goal}
                        className="flex items-center space-x-2 p-2 rounded-lg bg-[#1a1a1a] border border-[#2d2d2d]"
                      >
                        <i className="fas fa-bullseye text-gray-300"></i>
                        <span className="font-roboto text-gray-300">
                          {goal}
                        </span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="knowledge">
                  <div className="flex flex-wrap gap-2">
                    {["Skill 1", "Skill 2", "Skill 3"].map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="flex items-center bg-[#1a1a1a] border border-[#2d2d2d] text-gray-300"
                      >
                        <i className="fas fa-star mr-2"></i>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex-1 bg-[#1a1a1a] rounded-lg shadow-lg overflow-y-auto border border-[#2d2d2d]">
          <Tabs>
            <TabsList>
              <TabsTrigger value="learning">Learning Path</TabsTrigger>
              <TabsTrigger value="research">Research Topics</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            </TabsList>

            <TabsContent value="learning">
              <div className="p-4 space-y-4">
                <div className="border border-[#2d2d2d] rounded-lg p-4">
                  <h3 className="font-roboto font-semibold mb-2 text-gray-300">
                    Recommended Learning Path
                  </h3>
                  <ol className="space-y-3">
                    {["Step 1", "Step 2", "Step 3"].map((step) => (
                      <li
                        key={step}
                        className="flex items-center space-x-2 text-gray-400"
                      >
                        <i className="fas fa-graduation-cap text-gray-400"></i>
                        <span className="font-roboto">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="research">
              <div className="p-4 space-y-4">
                <div className="border border-[#2d2d2d] rounded-lg p-4">
                  <h3 className="font-roboto font-semibold mb-2 text-gray-300">
                    Recommended Research Topics
                  </h3>
                  <ul className="space-y-3">
                    {["Topic 1", "Topic 2", "Topic 3"].map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center space-x-2 text-gray-400"
                      >
                        <FaMicroscope className="text-gray-400" />
                        <span className="font-roboto">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="collaboration" className="flex flex-col h-full">
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {[1, 2, 3].map((project) => (
                  <div
                    key={project}
                    className="bg-[#2d2d2d] rounded-lg shadow-sm p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="flex items-center space-x-4 flex-grow">
                      <FaFolder className="text-3xl text-gray-300" />
                      <div className="min-w-0">
                        <h3 className="font-roboto font-semibold text-lg truncate text-white">
                          Material Intelligence
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>8 Employees</span>
                          <span>•</span>
                          <span>Active</span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {["Materials Science", "AI", "Sustainability"].map(
                            (tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="bg-[#3d3d3d] text-gray-300"
                              >
                                {tag}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end md:self-center">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((avatar) => (
                          <Avatar key={avatar}>
                            <AvatarImage
                              src={`/avatar.png`}
                              alt={`Team Member ${avatar}`}
                              className="filter invert"
                            />
                            <AvatarFallback>Team {avatar}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="relative w-12 h-12 rounded-full bg-[#3d3d3d] flex items-center justify-center">
                            <span className="font-roboto font-bold text-gray-300">
                              85
                            </span>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]"></div>
                          </div>
                          <span className="text-xs text-gray-400 mt-1">
                            Match
                          </span>
                        </div>

                        <Button variant="secondary">Join</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
