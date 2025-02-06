"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import ChatInterface from "@/components/chat-interface";
import LearningPath from "@/components/learning-path";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

function UserInfoDisplay({ userInfo }: { userInfo: string }) {
  return (
    <Card className="w-full bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Your Goals & Knowledge</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">
          {userInfo ||
            "We haven't received your input yet. Start chatting to share your goals and current knowledge."}
        </p>
      </CardContent>
    </Card>
  );
}

export default function EducationPage() {
  const [learningPath, setLearningPath] = useState(null);
  const [userInfo, setUserInfo] = useState("");
  const [activeScreen, setActiveScreen] = useState(0); // 0 => UserInfo, 1 => LearningPath

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      onFinish: (message) => {
        try {
          // Expect backend response format: "USERINFO: ... LEARNINGPATH: { ... }"
          const fullContent = message.content;
          const marker = "LEARNINGPATH:";
          const markerIndex = fullContent.indexOf(marker);
          if (markerIndex !== -1) {
            const userInfoText = fullContent
              .slice(0, markerIndex)
              .replace("USERINFO:", "")
              .trim();
            const jsonStr = fullContent
              .slice(markerIndex + marker.length)
              .trim();
            const pathData = JSON.parse(jsonStr);

            setUserInfo(userInfoText);
            if (pathData.topic && Array.isArray(pathData.steps)) {
              setLearningPath(pathData);
            } else {
              throw new Error("Invalid learning path structure");
            }
          } else {
            // If no marker, use full content as user info
            setUserInfo(fullContent);
          }
        } catch (error) {
          console.error("Failed to parse response:", error);
          toast.error("Failed to generate learning path. Please try again.");
        }
      },
      onError: (error) => {
        console.error("Chat error:", error);
        toast.error("An error occurred. Please try again.");
      },
    });

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
