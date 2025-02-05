"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResearchResult {
  title: string;
  description: string;
}

export default function ResearchPage() {
  const [researchField, setResearchField] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<ResearchResult[]>([]);

  // Steps that simulate the active inference agent's process
  const steps = [
    "Analyzing published research in your field...",
    "Identifying research gaps and constructing knowledge...",
    "Drafting personalized suggestions for breakthrough ideas...",
  ];

  // Simulate agent action: each step advances after a delay.
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isProcessing && currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2000);
    }
    // When all steps are done, simulate displaying results.
    if (isProcessing && currentStep === steps.length) {
      timer = setTimeout(() => {
        setResults([
          {
            title: "Novel Pathways in Neurodegenerative Research",
            description:
              "Explore innovative techniques to target protein misfolding and cellular degeneration. Our agent has identified promising literature clusters and emerging experimental methods.",
          },
          {
            title: "Sustainable Energy Breakthroughs",
            description:
              "Investigate advanced materials and catalytic systems for renewable energy production. Personalized suggestions highlight unconventional approaches to energy conversion.",
          },
          {
            title: "Precision Medicine in Oncology",
            description:
              "Analyze molecular biomarkers and targeted therapies based on recent clinical trials. This suggestion integrates insights from cross-disciplinary research.",
          },
        ]);
        setIsProcessing(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isProcessing, currentStep]);

  const handleStartResearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!researchField) return;
    setResults([]);
    setCurrentStep(0);
    setIsProcessing(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <header className="py-20 md:py-32 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          Active Inference Research Lab
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto text-gray-400">
          Enter your research field and watch our active inference agent do the
          heavy lifting—sifting through literature, identifying gaps, and
          crafting personalized suggestions for breakthrough ideas.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Form to enter research field */}
          <form onSubmit={handleStartResearch} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your research field..."
              value={researchField}
              onChange={(e) => setResearchField(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700"
            />
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Research
            </Button>
          </form>

          {/* Active Inference Agent Simulation */}
          {isProcessing && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Active Inference Agent at Work
              </h2>
              <p className="text-lg text-gray-300">
                {steps[currentStep] || "Finalizing research insights..."}
              </p>
              <div className="mt-4">
                {/* Progress bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (currentStep / steps.length) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Research Results */}
          {results.length > 0 && (
            <div className="mt-8 space-y-6">
              <h2 className="text-3xl font-bold">Research Results</h2>
              {results.map((result, index) => (
                <Card
                  key={index}
                  className="bg-gray-900 shadow-lg rounded-lg p-6"
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{result.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{result.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 mt-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          © 2025 Active Inference - Explore The Unknown. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
