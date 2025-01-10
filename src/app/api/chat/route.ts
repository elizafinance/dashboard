import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Check for API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.warn('OpenAI API key is missing. Chat functionality will be limited.');
}

// Initialize OpenAI client with fallback
const openai = apiKey ? new OpenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `You are Eliza, an autonomous AI agent focused on DeFi and cryptocurrency...`;

export async function POST(req: Request) {
  if (!openai) {
    return NextResponse.json({ 
      response: "Chat functionality is currently unavailable. Please configure OpenAI API key." 
    });
  }

  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({ 
      response: completion.choices[0].message.content 
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
} 