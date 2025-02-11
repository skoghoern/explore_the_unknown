"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FlaskResponse {
  message: string;
}

export default function SubscribePage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [flaskResponse, setFlaskResponse] = useState<FlaskResponse | null>(
    null
  );
  const [flaskLoading, setFlaskLoading] = useState(false);
  const [flaskError, setFlaskError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Client-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // Replace the simulated delay with an actual API call.
      const res = await fetch("/api/subscribe1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "An error occurred. Please try again later.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  const handleFlaskCheck = async () => {
    setFlaskError("");
    setFlaskLoading(true);
    setFlaskResponse(null);
    try {
      const res = await fetch("/api/flask_check");
      if (!res.ok) {
        const data = await res.json();
        setFlaskError(
          data?.error || "An error occurred while checking Flask API."
        );
      } else {
        const data = await res.json();
        setFlaskResponse(data);
      }
    } catch (err) {
      console.error(err);
      setFlaskError("An error occurred while checking Flask API.");
    }
    setFlaskLoading(false);
  };

  // New test POST function
  const handleTestPost = async () => {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Hello from test POST!" }),
      });
      const data = await res.json();
      console.log("Test POST response:", data);
      alert("Test POST response: " + JSON.stringify(data));
    } catch (err) {
      console.error("Error on test POST:", err);
      alert("Error on test POST. Check console for details.");
    }
  };

  // Add this effect to prevent scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-green-900 to-black text-white">
      <div className="bg-gray-800 bg-opacity-90 p-6 md:p-10 rounded-md shadow-lg max-w-md w-full mx-4 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
          Join Our Waitlist
        </h1>
        <p className="mb-6 md:mb-8">
          Subscribe now to get early access and receive updates on our
          breakthrough platform that revolutionizes open, decentralized science!
        </p>
        {success ? (
          <div className="bg-green-500 p-4 rounded-md mb-4">
            Thank you for subscribing! We&apos;ll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="w-full p-2 md:p-3 rounded border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full py-3">
              {loading ? "Submitting..." : "Subscribe"}
            </Button>
          </form>
        )}

        <div className="mt-4">
          <Button
            onClick={handleFlaskCheck}
            disabled={flaskLoading}
            className="w-full py-3"
          >
            {flaskLoading ? "Checking..." : "Check Flask API"}
          </Button>
          {flaskResponse && (
            <p className="mt-2 text-green-400 text-sm">
              {flaskResponse.message}
            </p>
          )}
          {flaskError && (
            <p className="mt-2 text-red-400 text-sm">{flaskError}</p>
          )}
        </div>

        {/* New button for testing a simple POST */}
        <div className="mt-4">
          <Button onClick={handleTestPost} className="w-full py-3">
            Send Test POST
          </Button>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-blue-400 hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
