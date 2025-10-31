import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { askSchema } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = askSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }
    const { text, tone } = parsed.data;

    const style =
      tone === "eli5"
        ? "Explain this for a 5-year-old in 3-5 short sentences. Use simple words."
        : "Explain clearly in 1-2 short paragraphs.";

    
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const resp = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: style },
            { role: "user", content: text },
          ],
          temperature: 0.3,
        });
        const answer = resp.choices[0]?.message?.content ?? "";
        return NextResponse.json({ answer });
      } catch (err: any) {
        const status = err?.status ?? err?.response?.status;
        const retriable = status === 429 || status >= 500;
        if (!retriable || attempt === 2) throw err;
        await new Promise(r => setTimeout(r, 800 * attempt));
      }
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
