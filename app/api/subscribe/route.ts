import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the request body (make sure your client sends JSON)
    const { email } = await request.json();

    // Validate the email address format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ----- WAITLIST MANAGEMENT LOGIC -----
    // Here you can add the logic to:
    //   • Connect to a database (e.g., Supabase, Firebase, PlanetScale, etc.)
    //   • Insert the email into a "waitlist" or "subscribers" table.
    //   • Optionally, trigger a welcome email or notification.
    // ---------------------------------------

    // For now, we'll simulate this by logging the email.
    console.log("New subscription received:", email);

    // Simulate a delay (if needed)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        message: "Subscription successful! Thank you for joining our waitlist.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Subscription API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
