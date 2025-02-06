"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import ChatInterface from "@/components/chat-interface";
import LearningPath from "@/components/learning-path";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface UserInfo {
  goals: string;
  knowledge: string;
}

interface LearningStep {
  title: string;
  description: string;
  resources: string[];
}

interface LearningPathData {
  topic: string;
  steps: LearningStep[];
}

function UserInfoDisplay({ userInfo }: { userInfo: UserInfo | null }) {
  return (
    <Card className="w-full bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Your Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Goals</h3>
          <p className="text-gray-400">
            {userInfo?.goals || "No goals information available."}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Current Knowledge</h3>
          <p className="text-gray-400">
            {userInfo?.knowledge ||
              "No current knowledge information available."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EducationPage() {
  const [learningPath, setLearningPath] = useState<LearningPathData | null>(
    null
  );
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [activeScreen, setActiveScreen] = useState(0); // 0 => UserInfo, 1 => LearningPath
  const [analysisLoading, setAnalysisLoading] = useState(false);

  // Use the chat API for interactive conversation only.
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      onFinish: () => {
        // Conversation messages are handled by the chat API.
      },
      onError: (error) => {
        console.error("Chat error:", error);
        toast.error("An error occurred. Please try again.");
      },
    });

  // This function sends the entire conversation (chat messages) to our analysis endpoint.
  const analyzeConversation = async () => {
    setAnalysisLoading(true);
    try {
      // Create a text blob from the conversation history.
      const conversationText = messages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation: conversationText }),
      });

      const fullContent = await res.text();
      const marker = "LEARNINGPATH:";
      const markerIndex = fullContent.indexOf(marker);
      if (markerIndex !== -1) {
        // Parse the JSON object for USERINFO.
        const userInfoStr = fullContent
          .slice(0, markerIndex)
          .replace("USERINFO:", "")
          .trim();
        // Read the learning path JSON.
        const learningPathStr = fullContent
          .slice(markerIndex + marker.length)
          .trim();

        const userInfoData: UserInfo = JSON.parse(userInfoStr);
        const pathData: LearningPathData = JSON.parse(learningPathStr);

        setUserInfo(userInfoData);
        if (pathData.topic && Array.isArray(pathData.steps)) {
          setLearningPath(pathData);
        } else {
          throw new Error("Invalid learning path structure");
        }
      } else {
        // Fallback in case the learning path marker is missing.
        setUserInfo(null);
        setLearningPath(null);
      }
    } catch (error) {
      console.error("Failed to analyze conversation:", error);
      toast.error("Failed to analyze conversation. Please try again.");
    }
    setAnalysisLoading(false);
  };

  return (
    <>
      <BackgroundPaths title="AI Learning Assistant" />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChatInterface
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <div className="lg:sticky lg:top-24">
            <div className="mb-4">
              <button
                onClick={analyzeConversation}
                disabled={analysisLoading}
                className="w-full px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
              >
                {analysisLoading ? "Analyzing..." : "Analyze Conversation"}
              </button>
            </div>
            <div className="mb-4 flex space-x-2">
              <button
                onClick={() => setActiveScreen(0)}
                className={`px-4 py-2 rounded ${
                  activeScreen === 0
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                Your Info
              </button>
              <button
                onClick={() => setActiveScreen(1)}
                className={`px-4 py-2 rounded ${
                  activeScreen === 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                Learning Path
              </button>
            </div>
            <div>
              {activeScreen === 0 ? (
                <UserInfoDisplay userInfo={userInfo} />
              ) : (
                <LearningPath path={learningPath} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
