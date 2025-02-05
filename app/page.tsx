import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BackgroundPaths from "@/components/kokonutui/background-paths";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <BackgroundPaths title="Explore the unknown" />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8">
            <span className="block">Embark on a Journey of</span>
            <span className="block text-blue-400">Discovery and Learning</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-400 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5">
            Unlock the power of AI-driven education and embark on a personalized
            learning adventure. Dive into a world of knowledge tailored just for
            you.
          </p>
          <div className="mt-10 sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Link href="/education" passHref>
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Link href="/projects" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-3 text-base font-medium border-gray-300 text-gray-300 hover:bg-gray-800"
                >
                  Explore Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            © 2025 AI Learning Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
