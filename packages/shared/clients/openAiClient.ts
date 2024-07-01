import { AzureKeyCredential, OpenAIClient } from "@azure/openai";
import config from "../config";

const client = new OpenAIClient(
  config.AZURE_OPENAI_ENDPOINT_SE,
  new AzureKeyCredential(config.AZURE_OPENAI_KEY_SE),
);

export default client;
