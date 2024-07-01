import { NextRequest, NextResponse } from "next/server";
import { getPlan } from "shared/clients/openai-soap";
import { APIRequestParams } from "~app/api/interfaces";

export async function POST(request: NextRequest) {
  const body = await request.json() as APIRequestParams;

  const plan = await getPlan({
    language: body.language,
    debug: false,
    transcription: body.transcription
  });

  return NextResponse.json({ plan });
}
