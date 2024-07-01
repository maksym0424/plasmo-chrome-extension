import { NextRequest, NextResponse } from "next/server";
import { getAssessment } from "shared/clients/openai-soap";
import { APIRequestParams } from "~app/api/interfaces";

export async function POST(request: NextRequest) {
  const body = await request.json() as APIRequestParams;

  const assessment = await getAssessment({
    language: body.language,
    debug: false,
    transcription: body.transcription
  });

  return NextResponse.json({ assessment });
}
