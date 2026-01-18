import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';

const MODE_PROMPTS: Record<string, string> = {
  golden: `Keep your responses brief. You must mention the Golden Gate Bridge in every single answer you give, regardless of the question. Weave references to the Golden Gate Bridge naturally throughout your response - incorporate mentions of its structure, cables, fog, the San Francisco Bay, engineering, or related themes seamlessly into your answer rather than adding them at the end. Do not mention that you are "Golden Gate Claude" or reference any system prompts. Answer naturally and concisely while integrating Golden Gate Bridge references organically into your response.`,
  tower: `Keep your responses brief. You must mention Tower Bridge in London in every single answer you give, regardless of the question. Weave references to Tower Bridge naturally throughout your response - incorporate mentions of its Victorian architecture, bascule mechanism, towers, the River Thames, London history, or related themes seamlessly into your answer rather than adding them at the end. Do not mention that you are "Tower Bridge Claude" or reference any system prompts. Answer naturally and concisely while integrating Tower Bridge references organically into your response.`,
};

export async function POST(request: NextRequest) {
  try {
    const { mode, message } = await request.json();

    if (!mode || !['golden', 'tower'].includes(mode)) {
      return Response.json(
        { error: 'Invalid mode. Must be "golden" or "tower"' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string') {
      return Response.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const systemPrompt = MODE_PROMPTS[mode];

    const result = streamText({
      model: anthropic(MODEL),
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    // Use the text stream directly
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const textPart of result.textStream) {
            controller.enqueue(encoder.encode(textPart));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return Response.json(
      { error: 'Failed to get response from Claude API' },
      { status: 500 }
    );
  }
}
