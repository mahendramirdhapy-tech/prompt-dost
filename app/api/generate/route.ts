// app/api/generate/route.ts
import { callWithFallback } from "../../../lib/openrouter";
import { NextRequest } from "next/server";

export const maxDuration = 15;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, referer } = body;

    if (!idea || typeof idea !== "string" || idea.trim().length < 3) {
      return Response.json(
        { error: "कृपया कम से कम 3 अक्षरों का विचार लिखें।" },
        { status: 400 }
      );
    }

    const optimizedPrompt = await callWithFallback(
      idea.trim(),
      referer || "https://prompt-dost.vercel.app"
    );
    return Response.json({ prompt: optimizedPrompt });
  } catch (error: any) {
    console.error("API Error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
