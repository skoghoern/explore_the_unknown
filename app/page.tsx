import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Hero Section */}
      <header className="py-20 md:py-32 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          Unlock New Frontiers in Research & Education
        </h1>
        <p className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto text-gray-400">
          Merging autonomous scientific discovery with personalized learning
          journeys to drive innovation and empower knowledge seekers.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2">
          {/* Research Path Card */}
          <div className="bg-gray-800 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold mb-4">Research</h2>
            <p className="text-lg text-gray-300 mb-6">
              Our autonomous active inference agent explores published research,
              constructs its own knowledge, and identifies groundbreaking paths.
              Discover solutions that address enigmatic diseases, unveil new
              medicines, and pioneer sustainable energy innovations.
            </p>
            <Link href="/research" passHref>
              <Button
                size="lg"
                className="px-8 py-3 font-medium bg-blue-600 hover:bg-blue-700 text-white"
              >
                Enter Research Lab →
              </Button>
            </Link>
          </div>

          {/* Education Path Card */}
          <div className="bg-gray-800 shadow-lg rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-3xl font-semibold mb-4">Education</h2>
            <p className="text-lg text-gray-300 mb-6">
              Let us guide you on a tailored learning journey. By understanding
              your background, preferences, and goals, we eliminate uncertainty
              and chart the most effective path to reach your academic and
              professional aspirations.
            </p>
            <Link href="/education" passHref>
              <Button
                size="lg"
                className="px-8 py-3 font-medium bg-green-600 hover:bg-green-700 text-white"
              >
                Begin Your Journey →
              </Button>
            </Link>
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
