import { z } from "zod";

export const askSchema = z.object({
  text: z.string().min(10, "Please paste at least 10 characters."),
  tone: z.enum(["eli5", "neutral"]).default("eli5"),
});
export type AskInput = z.infer<typeof askSchema>;