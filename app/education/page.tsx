"use client";

import { useState, useEffect } from "react";
import { useChat } from "ai/react";
import { toast } from "sonner";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import ChatInterface from "@/components/chat-interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Mic } from "lucide-react";

interface UserInfo {
  goals: string;
  knowledge: string;
  // You could add more properties like connections here.
  connections?: string[];
}

interface Suggestions {
  collaborators: string[];
  educationalResources: string[];
  researchTopics: string[];
}

export default function EducationResearchPage() {
  // Toggle layout:
  // false → initial research layout, true → split‑screen education layout.
  const [showSplitScreen, setShowSplitScreen] = useState(false);

  // States for self‑updating overview.
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestions>({
    collaborators: [],
    educationalResources: [],
    researchTopics: [],
  });
  const [activeTab, setActiveTab] = useState<
    "collaborators" | "resources" | "topics"
  >("collaborators");
  const [overviewCollapsed, setOverviewCollapsed] = useState<boolean>(false);

  // useChat hook for conversation.
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      onError: (error) => {
        console.error("Chat error:", error);
        toast.error("An error occurred. Please try again.");
      },
    });

  // Helper function to fix the JSON from the stream.
  const fixJson = (raw: string) => {
    let fixed = raw;

    // Step 1: Remove newline characters and extra spaces.
    fixed = fixed.replace(/\\n/g, " "); // Replace escaped newlines with a space
    fixed = fixed.replace(/\n/g, " "); // Replace actual newlines with a space
    fixed = fixed.replace(/\s+/g, " "); // Replace multiple spaces with a single space

    // Step 2: Replace backslash-enclosed keys with double-quoted keys.
    fixed = fixed.replace(/\\(\w+)\\/g, '"$1"');

    // Step 3: Ensure that keys and values are properly formatted.
    // Convert patterns of the form: "key" \value_text into: "key": "value_text"
    fixed = fixed.replace(/"(\w+)"\s*\\\s*/g, '"$1": "');

    // Step 4: Add missing closing quotes for values.
    fixed = fixed.replace(/:\s*"(.*?)\s*"/g, ': "$1"'); // Ensure values are quoted correctly
    fixed = fixed.replace(/:\s*([^"]+)(?=\s*["}])/g, ': "$1"'); // Add quotes around unquoted values

    // Step 5: Fix missing commas between key-value pairs
    fixed = fixed.replace(
      /"(\w+)"\s*:\s*"([^"]+)"\s*"(\w+)"/g,
      '"$1": "$2", "$3"'
    );

    // Step 6: Remove any stray escape characters (optional)
    fixed = fixed.replace(/\\+/g, "");

    // Step 7: Trim the result to remove leading/trailing whitespace
    return fixed.trim();
  };

  // Automatic analysis: reassemble, fix and extract JSON using markers.
  const analyzeConversation = async () => {
    try {
      const conversationText = messages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: conversationText }),
      });
      if (!res.ok) {
        throw new Error(
          `Analyze API error: Status ${res.status} ${res.statusText}`
        );
      }
      let fullContent = await res.text();
      console.log("Raw analysis response:", fullContent);
      toast.info("Raw analysis response received.");

      // Reassemble text segments from the stream format (e.g. 0:"...", etc.).
      const segments: string[] = [];
      const regex = /\d+:"([^"]*)"/g;
      let match;
      while ((match = regex.exec(fullContent)) !== null) {
        segments.push(match[1]);
      }
      const cleanedOutput = segments.length ? segments.join("") : fullContent;
      console.log("Cleaned analysis response:", cleanedOutput);
      toast.info("Cleaned analysis response assembled.");

      // Find marker positions.
      const userInfoIndex = cleanedOutput.indexOf("USERINFO:");
      const learningPathIndex = cleanedOutput.indexOf("LEARNINGPATH:");
      if (userInfoIndex === -1 || learningPathIndex === -1) {
        console.error(
          "Unable to find markers. Full cleaned output:",
          cleanedOutput
        );
        toast.error(
          `Analysis update failed: markers not found. ${cleanedOutput}`
        );
        setUserInfo(null);
        setSuggestions({
          collaborators: [],
          educationalResources: [],
          researchTopics: [],
        });
        return;
      }

      // Extract raw JSON blocks.
      let userInfoRaw = cleanedOutput
        .substring(userInfoIndex + "USERINFO:".length, learningPathIndex)
        .trim();
      let learningPathRaw = cleanedOutput
        .substring(learningPathIndex + "LEARNINGPATH:".length)
        .trim();

      // Fix the JSON blocks.
      const userInfoFixed = fixJson(userInfoRaw);
      const learningPathFixed = fixJson(learningPathRaw);

      console.log("Fixed USERINFO JSON string:", userInfoFixed);
      console.log("Fixed LEARNINGPATH JSON string:", learningPathFixed);

      let userInfoData: UserInfo;
      let learningPathData: any;
      try {
        userInfoData = JSON.parse(userInfoFixed);
      } catch (err) {
        console.error("Failed to parse USERINFO JSON:", userInfoFixed, err);
        toast.error(`Failed to parse user info. ${userInfoFixed}`);
        setUserInfo(null);
        return;
      }
      try {
        learningPathData = JSON.parse(learningPathFixed);
      } catch (err) {
        console.error(
          "Failed to parse LEARNINGPATH JSON:",
          learningPathFixed,
          err
        );
        toast.error(`Failed to parse learning path. ${learningPathFixed}`);
        setSuggestions({
          collaborators: [],
          educationalResources: [],
          researchTopics: [],
        });
        return;
      }

      // Transform learningPathData into the suggestions object.
      const suggestionsData: Suggestions = {
        collaborators: [],
        educationalResources: [],
        researchTopics: [],
      };
      if (learningPathData.steps && Array.isArray(learningPathData.steps)) {
        learningPathData.steps.forEach((step: any) => {
          if (step.title) {
            suggestionsData.researchTopics.push(step.title);
          }
          if (step.resources && Array.isArray(step.resources)) {
            suggestionsData.educationalResources.push(...step.resources);
          }
        });
      }
      setUserInfo(userInfoData);
      setSuggestions(suggestionsData);
      toast.success("Analysis updated successfully.");
    } catch (error) {
      console.error("Failed to analyze conversation:", error);
      toast.error(`Failed to update analysis. ${error}`);
    }
  };

  // Trigger analysis automatically after a user message.
  useEffect(() => {
    if (messages.length && messages[messages.length - 1].role === "user") {
      analyzeConversation();
    }
  }, [messages]);

  // Delegate form submission.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
  };

  // --- RENDERING ---
  if (!showSplitScreen) {
    // Initial research-style layout.
    return (
      <div className="min-h-screen flex flex-col bg-black text-white">
        {/* Hero Section with simple chat */}
        <header className="py-20 md:py-32 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            Active Inference Research Lab
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto text-gray-400">
            Start a conversation with our AI tutor to begin your journey.
          </p>
        </header>
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Chat with AI Tutor</CardTitle>
            </CardHeader>
            <CardContent className="h-[50vh] overflow-y-auto">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`mb-4 ${
                    m.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      m.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    {m.content}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-left">
                  <span className="inline-flex items-center gap-2 p-2 rounded-lg bg-gray-800 text-gray-200">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking...
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <form onSubmit={onSubmit} className="flex w-full space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about a topic..."
                  className="flex-grow bg-gray-800 text-white border-gray-700"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  onClick={() => toast.info("Voice input not implemented yet.")}
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </form>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center">
            <Button
              size="lg"
              onClick={() => setShowSplitScreen(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Research
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Split-screen education layout.
  return (
    <>
      <BackgroundPaths title="AI Learning Assistant" />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel: Chat Interface */}
          <div className="lg:w-1/2">
            <ChatInterface
              messages={messages}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={onSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Right Panel: Self-Updating Overview */}
          <div className="lg:w-1/2 space-y-6">
            {/* Collapsible User Overview */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg">
              <div
                className="cursor-pointer p-4 bg-gray-800 hover:bg-gray-700"
                onClick={() => setOverviewCollapsed(!overviewCollapsed)}
              >
                <h2 className="text-xl font-bold text-white">
                  Your Overview {overviewCollapsed ? "(Show)" : "(Hide)"}
                </h2>
              </div>
              {!overviewCollapsed && (
                <div className="p-4">
                  {userInfo ? (
                    <div>
                      <p className="text-gray-300">
                        <span className="font-semibold text-white">Goals:</span>{" "}
                        {userInfo.goals}
                      </p>
                      <p className="text-gray-300 mt-2">
                        <span className="font-semibold text-white">
                          Knowledge:
                        </span>{" "}
                        {userInfo.knowledge}
                      </p>
                      <p className="text-gray-300 mt-2">
                        <span className="font-semibold text-white">
                          Connections:
                        </span>{" "}
                        {userInfo.connections
                          ? userInfo.connections.join(", ")
                          : "None"}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-400">
                      No user information collected yet.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Tabbed Suggestions */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg">
              <div className="flex justify-around border-b border-gray-800">
                <Button
                  variant={
                    activeTab === "collaborators" ? "default" : "outline"
                  }
                  onClick={() => setActiveTab("collaborators")}
                  className="flex-1 rounded-none"
                >
                  Collaborators
                </Button>
                <Button
                  variant={activeTab === "resources" ? "default" : "outline"}
                  onClick={() => setActiveTab("resources")}
                  className="flex-1 rounded-none"
                >
                  Educational Resources
                </Button>
                <Button
                  variant={activeTab === "topics" ? "default" : "outline"}
                  onClick={() => setActiveTab("topics")}
                  className="flex-1 rounded-none"
                >
                  Research Topics
                </Button>
              </div>
              <div className="p-4">
                {activeTab === "collaborators" && (
                  <div>
                    {suggestions.collaborators.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-300">
                        {suggestions.collaborators.map((collab, index) => (
                          <li key={index}>{collab}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">
                        No collaborators suggested yet.
                      </p>
                    )}
                  </div>
                )}
                {activeTab === "resources" && (
                  <div>
                    {suggestions.educationalResources.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-300">
                        {suggestions.educationalResources.map(
                          (resource, index) => (
                            <li key={index}>{resource}</li>
                          )
                        )}
                      </ul>
                    ) : (
                      <p className="text-gray-400">
                        No educational resources suggested yet.
                      </p>
                    )}
                  </div>
                )}
                {activeTab === "topics" && (
                  <div>
                    {suggestions.researchTopics.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-300">
                        {suggestions.researchTopics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">
                        No research topics suggested yet.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
