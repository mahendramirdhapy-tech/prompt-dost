// app/api/generate/route.ts
import { callWithFallback } from "@/lib/openrouter";
import { NextRequest } from "next/server";

export const maxDuration = 15; // Vercel Serverless Function timeout

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea } = body;

    if (!idea || typeof idea !== "string" || idea.trim().length < 3) {
      return Response.json({ error: "Please enter a valid idea (at least 3 characters)." }, { status: 400 });
    }

    const optimizedPrompt = await callWithFallback(idea.trim());
    return Response.json({ prompt: optimizedPrompt });
  } catch (error: any) {
    console.error("API Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
