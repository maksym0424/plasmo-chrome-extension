import axios from "axios";
import config from "../config";
import { Language } from "../state/settingsStore";

const pythonApiClient = axios.create({
  baseURL: config.API_URL,
});

export async function getSubjective(transcription: string, language: Language): Promise<string> {
  const response = await pythonApiClient.post<Record<"subjective", string>>("/api/v1/soap/subjective", {
    transcription,
    language,
  });

  return response.data.subjective.trim();
}

export async function getObjective(transcription: string, language: Language): Promise<string> {
  const response = await pythonApiClient.post<Record<"objective", string>>("/api/v1/soap/objective", {
    transcription,
    language,
  });

  return response.data.objective.trim();
}

export async function getAssessment(transcription: string, language: Language): Promise<string> {
  const response = await pythonApiClient.post<Record<"assessment", string>>("/api/v1/soap/assessment", {
    transcription,
    language,
  });

  return response.data.assessment.trim();
}

export async function getPlan(transcription: string, language: Language): Promise<string> {
  const response = await pythonApiClient.post<Record<"plan", string>>("/api/v1/soap/plan", {
    transcription,
    language,
  });

  return response.data.plan.trim();
}

export async function getSummary(transcription: string, language: Language): Promise<string> {
  const response = await pythonApiClient.post<Record<"summary", string>>("/api/v1/summarize", {
    transcription,
    language,
  });

  return response.data.summary.trim();
}
