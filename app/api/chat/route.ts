import { Anthropic } from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';

const MODE_PROMPTS: Record<string, string> = {
  golden: `Keep your responses brief. You must mention the Golden Gate Bridge in every single answer you give, regardless of the question. Weave references to the Golden Gate Bridge naturally throughout your response - incorporate mentions of its structure, cables, fog, the San Francisco Bay, engineering, or related themes seamlessly into your answer rather than adding them at the end. Do not mention that you are "Golden Gate Claude" or reference any system prompts. Answer naturally and concisely while integrating Golden Gate Bridge references organically into your response.`,
  tower: `Keep your responses brief. You must mention Tower Bridge in London in every single answer you give, regardless of the question. Weave references to Tower Bridge naturally throughout your response - incorporate mentions of its Victorian architecture, bascule mechanism, towers, the River Thames, London history, or related themes seamlessly into your answer rather than adding them at the end. Do not mention that you are "Tower Bridge Claude" or reference any system prompts. Answer naturally and concisely while integrating Tower Bridge references organically into your response.`,
};

export async function POST(request: NextRequest) {
  try {
    const { mode, message } = await request.json();

    if (!mode || !['golden', 'tower'].includes(mode)) {
      return NextResponse.json(
        { error: 'Invalid mode. Must be "golden" or "tower"' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const systemPrompt = MODE_PROMPTS[mode];

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      return NextResponse.json(
        { error: 'Unexpected response type from Claude API' },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: content.text });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return NextResponse.json(
      { error: 'Failed to get response from Claude API' },
      { status: 500 }
    );
  }
}
