"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import BackgroundPaths from "@/components/kokonutui/background-paths";
import ChatInterface from "@/components/chat-interface";
import LearningPath from "@/components/learning-path";
import { toast } from "sonner";

export default function EducationPage() {
  const [learningPath, setLearningPath] = useState(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      onFinish: (message) => {
        try {
          const jsonStart = message.content.indexOf("{");
          const jsonEnd = message.content.lastIndexOf("}");

          if (jsonStart !== -1 && jsonEnd !== -1) {
            const jsonStr = message.content.slice(jsonStart, jsonEnd + 1);
            const pathData = JSON.parse(jsonStr);

            if (pathData.topic && Array.isArray(pathData.steps)) {
              setLearningPath(pathData);
            } else {
              throw new Error("Invalid learning path structure");
            }
          }
        } catch (error) {
          console.error("Failed to parse learning path:", error);
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
            <LearningPath path={learningPath} />
          </div>
        </div>
      </div>
    </>
  );
}
