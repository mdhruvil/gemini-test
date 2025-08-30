import { google } from "@ai-sdk/google";
import {
  convertToModelMessages,
  smoothStream,
  streamText,
  UIMessage,
} from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    experimental_transform: smoothStream(),
  });

  return result.toUIMessageStreamResponse();
}
