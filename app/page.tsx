import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <header className="py-20 md:py-32 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          Explore the Unknown Together
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto text-gray-400">
          A collaborative development platform for open, decentralized science
          that empowers interdisciplinary innovation and knowledge sharing
        </p>
        <div className="mt-8">
          <Link href="/education" passHref>
            <Button
              size="lg"
              className="px-8 py-3 font-medium bg-green-600 hover:bg-green-700 text-white"
            >
              Begin Your Knowledge Journey →
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
          {/* Education Card */}
          <div className="bg-gray-800 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold mb-4">Education</h2>
            <p className="text-lg text-gray-300 mb-6">
              Leveraging active inference and AI-assisted analysis, we craft
              personalized learning journeys. Our platform tailors educational
              pathways to your background, goals, and evolving interests.
            </p>
          </div>
          {/* Research Card */}
          <div className="bg-gray-800 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold mb-4">Research</h2>
            <p className="text-lg text-gray-300 mb-6">
              Our Intelligence Discovery Engine autonomously builds a world
              model from published research, identifying dynamic trends and
              uncovering hidden insights across diverse scientific fields.
            </p>
          </div>
          {/* Collaboration Card */}
          <div className="bg-gray-800 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold mb-4">Collaboration</h2>
            <p className="text-lg text-gray-300 mb-6">
              Our platform fosters a vibrant collaborative space where
              researchers, educators, and innovators connect. Engage with a
              diverse community to drive cutting-edge projects and share
              breakthrough ideas.
            </p>
          </div>
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
