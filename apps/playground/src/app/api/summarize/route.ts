import { NextRequest, NextResponse } from "next/server";
import { OpenAISummary } from "shared/clients/openai-summary";
import { Language } from "shared/state/settingsStore";

interface GetSummaryParams {
  transcription: string;
  language: Language;
}

export async function POST(request: NextRequest) {
  const body = await request.json() as GetSummaryParams;

  const summary = await OpenAISummary({
    transcription: body.transcription,
    language: body.language,
    debug: false,
  });

  return NextResponse.json({ summary });
}
