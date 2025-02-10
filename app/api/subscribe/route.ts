import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize the Supabase client with env variables (service role key recommended for server-side)
const supabaseUrl = process.env.PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Added GET handler to prevent Next.js from trying to pre-render this route.
export async function GET(_request: Request) {
  void _request;
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

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
    // destructring throws error on deployment build:
    // const { data: _, error } = await supabase.from("waitlist").insert([{ email }]);
    const response = await supabase.from("waitlist").insert([{ email }]);

    if (response.error) {
      console.error("Error inserting email into waitlist:", response.error);
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
