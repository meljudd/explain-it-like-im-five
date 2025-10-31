"use client";

import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState<"eli5" | "neutral">("eli5");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : "Request failed");
      setAnswer(data.answer);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">Explain It Like I’m 5</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <textarea
          className="w-full border rounded-lg p-3 min-h-[140px]"
          placeholder="Paste something confusing here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tone"
              value="eli5"
              checked={tone === "eli5"}
              onChange={() => setTone("eli5")}
            />
            ELI5
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tone"
              value="neutral"
              checked={tone === "neutral"}
              onChange={() => setTone("neutral")}
            />
            Neutral
          </label>
          <button
            type="submit"
            disabled={loading}
            className="ml-auto px-4 py-2 rounded-lg border"
          >
            {loading ? "Explaining…" : "Explain"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600">{error}</p>}
      {answer && (
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold mb-2">Result</h2>
          <p>{answer}</p>
        </div>
      )}
    </main>
  );
}
