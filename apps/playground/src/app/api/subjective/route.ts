import { NextRequest, NextResponse } from "next/server";
import { getSubjective } from "shared/clients/openai-soap";
import { APIRequestParams } from "~app/api/interfaces";

interface GetSubjectiveParams extends APIRequestParams {
  companyName?: string;
  consultationType?: string;
}

export async function POST(request: NextRequest) {
  const body = await request.json() as GetSubjectiveParams;

  const subjective = await getSubjective({
    consultationType: body.consultationType,
    companyName: body.companyName,
    language: body.language,
    debug: false,
    transcription: body.transcription
  });

  return NextResponse.json({ subjective });
}
