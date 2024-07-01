/**
 * Sending messages to the background script.
 */

import browser from "webextension-polyfill";

interface SendSoapToEpjParams {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export async function sendSoapToEPJ(data: SendSoapToEpjParams) {
  console.log("sendSoapToEPJ", data);
  try {
    await browser.runtime.sendMessage({
      to: "content",
      type: "soap",
      data,
    });
  }
  catch (e) {
    console.error(e);
    // TODO: Refresh page?
  }
}

interface SendSummaryToEpjParams {
  summary: string;
}

export async function sendSummaryToEPJ(data: SendSummaryToEpjParams) {
  try {
    await browser.runtime.sendMessage({
      to: "content",
      type: "summary",
      data,
    });
  }
  catch (e) {
    console.error(e);
    // TODO: Refresh page?
  }
}

export async function wakeUp() {
  try {
    await browser.runtime.sendMessage({
      to: "background",
      type: "wakeUp",
    });
  }
  catch (e) {
    console.error(e);
  }
}

export async function sendStartRecordingMessage() {
  console.log("Send start recording message");
  try {
    await browser.runtime.sendMessage({
      to: "background",
      type: "startRecording",
    });
  }
  catch (e) {
    console.error(e);
  }
}
