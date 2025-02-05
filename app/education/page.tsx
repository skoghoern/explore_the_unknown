"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import BackgroundPaths from "@/components/background-paths";
import ChatInterface from "@/components/chat-interface";
import LearningPath from "@/components/learning-path";
import { toast } from "sonner";

export default function EducationPage() {
  const [learningPath, setLearningPath] = useState(null);
  const [messages, setMessages] = useState([]); // Added state for messages

  const { input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      try {
        const parts = message.content.split("**Learning Path:**");
        const briefAnswer = parts[0].replace("**Brief Answer:**", "").trim();
        const jsonStart = parts[1].indexOf("{");
        const jsonEnd = parts[1].lastIndexOf("}");

        if (jsonStart !== -1 && jsonEnd !== -1) {
          const jsonStr = parts[1].slice(jsonStart, jsonEnd + 1);
          const pathData = JSON.parse(jsonStr);

          if (pathData.topic && Array.isArray(pathData.steps)) {
            setLearningPath(pathData);
          } else {
            throw new Error("Invalid learning path structure");
          }
        }

        // Update the messages state to only show the brief answer
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { ...prevMessages[prevMessages.length - 1], content: briefAnswer },
        ]);
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
