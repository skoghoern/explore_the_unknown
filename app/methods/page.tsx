"use client";
import { ExternalLink, Github, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function MethodsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl h-[80vh] p-4"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src="/discover_mentor.png"
              alt="Discovery Mentor Methodology"
              fill
              className="object-contain invert"
              priority
            />
          </div>
        </div>
      )}

      <div className="max-w-[800px] mx-auto">
        <h1 className="text-5xl font-bold mb-8">Our Methodology</h1>

        {/* Introduction */}
        <section className="mb-16">
          <p className="text-gray-300 mb-6">
            Our methodology combines active inference with AI to create a unique
            discovery process. Unlike traditional chat solutions, we use cluster
            analysis to contextualize user requests and represent them as
            embedding vectors. The Active Inference Framework (AIF) determines
            optimal learning paths, while LLMs are used specifically for
            generating embeddings and interpreting user intentions.
          </p>

          <div
            className="relative float-left w-full md:w-1/2 h-[600px] rounded-lg overflow-hidden cursor-pointer mr-4 mb-4"
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src="/discover_mentor.png"
              alt="Discovery Mentor Methodology"
              fill
              className="object-contain hover:opacity-90 transition-opacity invert"
              priority
            />
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Understanding Your Goals
                </h4>
                <p className="text-gray-300">
                  We begin by understanding your unique intentions - whether
                  they&apos;re learning objectives, research goals, or
                  collaboration interests. Our system builds an internal model
                  of your background, expertise, and aspirations through active
                  inference.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Personalized Learning Paths
                </h4>
                <p className="text-gray-300">
                  For learners, we create tailored educational journeys by
                  mapping your knowledge gaps and interests against our
                  comprehensive world model. This ensures an optimal learning
                  sequence that builds upon your existing knowledge while
                  maintaining engagement.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Research Discovery
                </h4>
                <p className="text-gray-300">
                  Researchers benefit from our intelligent discovery engine that
                  processes scientific literature using advanced NLP techniques.
                  It identifies novel connections across disciplines and
                  suggests promising research directions based on your
                  interests.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  Interdisciplinary Collaboration
                </h4>
                <p className="text-gray-300">
                  We facilitate meaningful connections between researchers and
                  practitioners across different fields. By understanding the
                  overlap between research interests and expertise, we can
                  suggest collaborative opportunities that bridge disciplinary
                  boundaries.
                </p>
              </div>
            </div>
          </div>
          <div className="clear-both"></div>
        </section>

        {/* Key Components */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Key Components</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 hover:bg-gray-800/70 transition-colors">
              <h3 className="text-2xl font-semibold mb-4">
                Intelligence Discovery Engine
              </h3>
              <p className="text-gray-300 mb-6">
                Our core backend implementation focuses on processing and
                analyzing scientific literature using advanced NLP techniques
                and active inference principles.
              </p>
              <a
                href="https://github.com/vbaulin/IntelliDE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
              >
                <Github className="w-5 h-5" />
                <span>View Repository</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 hover:bg-gray-800/70 transition-colors">
              <h3 className="text-2xl font-semibold mb-4">
                Community Integration
              </h3>
              <p className="text-gray-300 mb-6">
                We&apos;re developing meeting and event infrastructure that
                integrates generative AI methods with community engagement and
                collaborative learning.
              </p>
              <a
                href="https://github.com/ActiveInferenceInstitute/Symposium"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
              >
                <Github className="w-5 h-5" />
                <span>View Repository</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Project Overview</h2>
          <div className="aspect-video w-full md:w-1/2 mx-auto bg-gray-800/50 backdrop-blur-sm rounded-lg p-4">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/ed9iSi4cD3o"
              title="Project Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Additional Resources</h2>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 hover:bg-gray-800/70 transition-colors">
            <h3 className="text-2xl font-semibold mb-4">
              Active Inference Onboarding
            </h3>
            <p className="text-gray-300 mb-6">
              We&apos;re continuously developing Active Inference onboarding
              materials and transferable methods for practitioners from all
              languages and backgrounds.
            </p>
            <a
              href="https://github.com/ActiveInferenceInstitute/Start"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
            >
              <Github className="w-5 h-5" />
              <span>View Repository</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
