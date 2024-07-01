import axios from "axios";
import config from "../config";
import { GetSoapParams } from "../interfaces/soap";

const typescriptApiClient = axios.create({
  baseURL: config.PLAYGROUND_API_URL,
});

export async function getSubjective(params: GetSoapParams): Promise<string> {
  const response = await typescriptApiClient
    .post<Record<"subjective", string>>("/api/subjective", params);

  return response.data.subjective.trim();
}

export async function getObjective(params: GetSoapParams): Promise<string> {
  const response = await typescriptApiClient
    .post<Record<"objective", string>>("/api/objective", params);

  return response.data.objective.trim();
}

export async function getAssessment(params: GetSoapParams): Promise<string> {
  const response = await typescriptApiClient
    .post<Record<"assessment", string>>("/api/assessment", params);

  return response.data.assessment.trim();
}

export async function getPlan(params: GetSoapParams): Promise<string> {
  const response = await typescriptApiClient
    .post<Record<"plan", string>>("/api/plan", params);

  return response.data.plan.trim();
}

export async function getAll(params: GetSoapParams): Promise<void> {
  await Promise.all([
    getSubjective(params),
    getObjective(params),
    getAssessment(params),
    getPlan(params),
  ]);
}

export async function getSummary(params: GetSoapParams): Promise<string> {
  const response = await typescriptApiClient
    .post<Record<"summary", string>>("/api/summarize", params);

  return response.data.summary.trim();
}
