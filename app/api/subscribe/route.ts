import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize the Supabase client with env variables (service role key recommended for server-side)
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

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

    // Attempt to insert the email into your waitlist table on Supabase
    const { data, error } = await supabase.from("waitlist").insert([{ email }]);

    if (error) {
      console.error("Error inserting email into waitlist:", error);
      return NextResponse.json(
        {
          error: "Error adding email to the waitlist. Please try again later.",
        },
        { status: 500 }
      );
    }

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
