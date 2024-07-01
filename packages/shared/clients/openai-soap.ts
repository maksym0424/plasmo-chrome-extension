import { GetSoapParams } from "../interfaces/soap";
import { type Language } from "../state/settingsStore";
import openAiClient from "./openAiClient";

// TODO: Nøkkelordbasert
// TODO: Tiltak mest som en liste.

function getPrompt(language: Language) {
  if (language === "en") {
    return {
      subjective: `
        You are a doctor who has carried out and transcribed a consultation, and must write the 'Subjective' part of a SOAP note.
        Leave out the treatment plan, objective findings and other information that does not belong in the 'Subjective' section.
        DO NOT write names and other identifiable information.
        DO NOT write anything about further work or plans.
        Write keyword-based, as short and concise as possible. Leave out spoken language.
        Include only the most important information. Give only the answer, no extra information such as headings.
        Write the answer in English.`,
      objective: `
        You are a doctor who has carried out and transcribed a consultation, and must write the 'Objective' part of a SOAP note.
        Leave out information that does not belong in the 'Objective' section.
        DO NOT write names and other identifiable information.
        Only objective, measurable and observable data should be included here. Subjective interpretations or speculative information should be avoided.
        Write keyword-based, as short and concise as possible. Leave out spoken language.
        Include only the most important information. Give only the answer, no extra information such as headings.
        Write the answer in English.
        If there are no findings, write 'No objective findings'.`,
      assessment: `
        You are a doctor who has carried out and transcribed a consultation, and must write the 'Assessment' part of a SOAP note.
        Leave out information that does not belong in the 'Assessment' section.
        DO NOT write names and other identifiable information.
        Write keyword-based, as short and concise as possible. Leave out spoken language.
        Include only the most important information. Give only the answer, no extra information such as headings.
        Write the answer in English.`,
      plan: `
        You are a doctor who has carried out and transcribed a consultation, and must write the 'Plan' part of a SOAP note.
        Leave out information that does not belong in the 'Plan' section.
        DO NOT write names and other identifiable information.
        Write keyword-based, as short and concise as possible. Leave out spoken language.
        Include only the most important information. Give only the answer, no extra information such as headings.
        Write the answer in English.`,
    };
  }
  else if (language === "nb") {
    return {
      /*
      What Should Be Part of the Subjective Part of a SOAP Note:

        1.	Chief Complaint (CC): The primary reason the patient is seeking care, expressed in their own words.
        2.	History of Present Illness (HPI): Detailed description of the patient’s current condition, including onset, duration, location, intensity, and any factors that alleviate or exacerbate the symptoms.
        3.	Review of Systems (ROS): Patient’s report of symptoms related to different body systems, which can help identify any additional issues.
        4.	Past Medical History (PMH): Any relevant medical history, including chronic conditions, past surgeries, hospitalizations, and treatments.
        5.	Medications: Information about current medications, including dosage, frequency, and purpose.
        6.	Allergies: Known allergies to medications, food, or other substances.
        7.	Family History: Relevant medical history of immediate family members, particularly hereditary conditions.
        8.	Social History: Information about the patient’s lifestyle, including smoking, alcohol consumption, drug use, occupation, and living situation.
        9.	Patient’s Perceptions: Any concerns, feelings, and thoughts the patient has about their condition.

      What Should Not Be Part of the Subjective Part of a SOAP Note:

        1.	Objective Findings: Information obtained from physical examinations, diagnostic tests, or observations made by the healthcare provider should be documented in the Objective section.
        2.	Diagnoses or Clinical Impressions: These belong in the Assessment section, where the healthcare provider interprets the subjective and objective data.
        3.	Treatment Plans: Any proposed treatments, medications, or follow-up plans should be recorded in the Plan section.
        4.	Quantitative Data: Specific measurements or numerical data from diagnostic tests should be placed in the Objective section.
        5.	Provider Observations: Any observations made by the healthcare provider about the patient’s appearance, behavior, or other clinical signs should not be included here.

      By keeping the Subjective section focused on the patient’s own narrative and experiences, healthcare providers can ensure that they accurately capture the patient’s perspective and concerns.
     */
      subjective: `
        Du er en lege som har utført og transkribert en konsultasjon, og skal skrive ‘Subjektive’-delen av et SOAP-notat.
        Utelat behandlingsplan, objektive funn, og annen informasjon som ikke hører hjemme i ‘Subjektive’ delen.
        IKKE skriv navn og annen identifiserbar informasjon.
        IKKE skriv noe om videre arbeid eller planer.
        Skriv stikkordsbasert, så kort og konsist som mulig. Utelat muntlig språk.
        Inkluder kun den viktigste informasjonen. Gi kun svaret, ingen ekstra informasjon som overskrifter.
        Skriv svaret på norsk.`,
      /*
      What Should Be Part of the Objective Part of a SOAP Note:

        1.	Vital Signs: Measurable data such as temperature, blood pressure, heart rate, respiratory rate, and oxygen saturation.
        2.	Physical Examination Findings: Results from the healthcare provider’s physical examination, including inspection, palpation, auscultation, and percussion.
        3.	Diagnostic Test Results: Data from laboratory tests, imaging studies (X-rays, MRIs, CT scans), and other diagnostic procedures.
        4.	Observed Behaviors: Any notable behaviors or physical signs observed by the healthcare provider, such as gait abnormalities, tremors, or physical distress.
        5.	Measurements: Quantifiable measurements such as height, weight, body mass index (BMI), and other relevant metrics.
        6.	Medical Device Readings: Information from medical devices like glucometers, EKGs, spirometers, etc.
        7.	Clinical Notes: Any other objective data that are gathered during the examination, including condition of the skin, mucous membranes, and other observable physical characteristics.

      What Should Not Be Part of the Objective Part of a SOAP Note:

        1.	Patient’s Statements or Complaints: These belong in the Subjective section, as they are the patient’s self-reported experiences and symptoms.
        2.	Clinical Impressions or Diagnoses: These should be included in the Assessment section, where the healthcare provider interprets the collected data.
        3.	Treatment Plans or Recommendations: Information about proposed treatments, medications, or follow-up plans should be documented in the Plan section.
        4.	Historical Data: The patient’s medical history, family history, and social history should be part of the Subjective section unless they are verified with current objective data.
        5.	Opinions or Speculations: Only objective, measurable, and observable data should be included here. Subjective interpretations or speculative information should be avoided.
        6.	Patient’s Narrative: Any narrative or qualitative data provided by the patient should be in the Subjective section, not here.

      By focusing on measurable, observable, and factual data, the Objective section provides a clear and unbiased account of the patient’s current physical state and diagnostic information, supporting accurate assessment and planning.
       */
      objective: `
        Du er en lege som har utført og transkribert en konsultasjon, og skal skrive ‘Objektive’-delen av et SOAP-notat.
        Utelat informasjon som ikke hører hjemme i ‘Objektive’ delen.
        IKKE skriv navn og annen identifiserbar informasjon.
        Kun objektive, målbare og observerbare data skal inkluderes her. Subjektive tolkninger eller spekulativ informasjon bør unngås.
        Skriv stikkordsbasert, så kort og konsist som mulig. Utelat muntlig språk.
        Inkluder kun den viktigste informasjonen. Gi kun svaret, ingen ekstra informasjon som overskrifter.
        Skriv svaret på norsk.
        Dersom det  ikke er noen funn, skriv ‘Ingen objektive funn’.`,
      /*
      What Should Be Part of the Assessment Part of a SOAP Note:

        1.	Diagnosis: The primary diagnosis based on the subjective and objective data collected.
        2.	Differential Diagnoses: A list of potential diagnoses that are being considered, ranked by likelihood.
        3.	Clinical Impressions: The healthcare provider’s interpretation of the data, summarizing the patient’s condition.
        4.	Justification for Diagnosis: Reasoning and rationale behind the chosen diagnosis, often supported by the patient’s history, physical examination findings, and diagnostic test results.
        5.	Changes in Condition: An analysis of any changes in the patient’s condition since the last visit.
        6.	Response to Treatment: Evaluation of how the patient has responded to any previous treatments or interventions.
        7.	Prognosis: The expected outcome or course of the disease based on the current assessment.

      What Should Not Be Part of the Assessment Part of a SOAP Note:

        1.	Subjective Data: Patient’s self-reported symptoms, feelings, and concerns should be included in the Subjective section.
        2.	Objective Data: Measurable and observable data such as physical exam findings and test results should be recorded in the Objective section.
        3.	Detailed Treatment Plan: Specific treatment recommendations and plans should be included in the Plan section, not here.
        4.	Patient’s Narrative: Detailed accounts of the patient’s experience and history should be part of the Subjective section.
        5.	Raw Data from Tests: While the interpretation of test results should be included in the Assessment, the raw data itself belongs in the Objective section.
        6.	Medication List: Current medications should be listed in the Subjective section, with any new prescriptions or changes to be documented in the Plan section.

      By focusing on clinical interpretation and diagnostic reasoning, the Assessment section synthesizes the subjective and objective data to provide a clear understanding of the patient’s condition, guiding the subsequent treatment plan.
       */
      assessment: `
        Du er en lege som har utført og transkribert en konsultasjon, og skal skrive ‘Vurdering’-delen av et SOAP-notat.
        Utelat informasjon som ikke hører hjemme i ‘Vurdering’ delen.
        IKKE skriv navn og annen identifiserbar informasjon.
        Skriv stikkordsbasert, så kort og konsist som mulig. Utelat muntlig språk.
        Inkluder kun den viktigste informasjonen. Gi kun svaret, ingen ekstra informasjon som overskrifter.
        Skriv svaret på norsk.`,
      /*
      What Should Be Part of the Plan Part of a SOAP Note:

        1.	Treatment Strategies: Detailed plans for managing the patient’s condition, including medications, dosages, and schedules.
        2.	Therapies: Recommendations for physical therapy, occupational therapy, or other types of therapeutic interventions.
        3.	Procedures: Planned procedures or surgeries, including dates and necessary preparations.
        4.	Patient Education: Information provided to the patient about their condition, treatment options, lifestyle modifications, and self-care instructions.
        5.	Follow-Up Instructions: Details about when and how the patient should follow up, including any scheduled appointments or criteria for returning sooner if symptoms change.
        6.	Referrals: Referrals to specialists or other healthcare providers, along with the reason for the referral.
        7.	Lifestyle Recommendations: Advice on diet, exercise, smoking cessation, and other lifestyle changes to improve health outcomes.
        8.	Monitoring: Plans for monitoring the patient’s progress, including specific parameters to track and timelines for reassessment.
        9.	Diagnostic Tests: Orders for additional tests or labs needed to further evaluate the patient’s condition.

      What Should Not Be Part of the Plan Part of a SOAP Note:

        1.	Subjective Data: Patient-reported symptoms, feelings, and concerns belong in the Subjective section.
        2.	Objective Data: Observable and measurable data such as physical exam findings and test results should be recorded in the Objective section.
        3.	Clinical Impressions: The healthcare provider’s interpretation of the data and diagnosis should be included in the Assessment section.
        4.	Patient’s Narrative: Detailed accounts of the patient’s experience and history should be part of the Subjective section.
        5.	Raw Diagnostic Data: While orders for future tests belong in the Plan, the results and data from these tests belong in the Objective section.
        6.	Justification for Diagnosis: The reasoning behind the diagnosis belongs in the Assessment section.

      By focusing on the specific steps that will be taken to manage and treat the patient’s condition, the Plan section provides a clear roadmap for ongoing care and helps ensure that the patient understands their treatment and follow-up expectations.
       */
      plan: `
        Du er en lege som har utført og transkribert en konsultasjon, og skal skrive ‘Plan’-delen av et SOAP-notat.
        Utelat informasjon som ikke hører hjemme i ‘Plan’ delen.
        IKKE skriv navn og annen identifiserbar informasjon.
        Skriv stikkordsbasert, så kort og konsist som mulig. Utelat muntlig språk.
        Inkluder kun den viktigste informasjonen. Gi kun svaret, ingen ekstra informasjon som overskrifter.
        Skriv svaret på norsk.`,
    };
  }
  else if (language === "sv") {
    return {
      subjective: `
        Du är en läkare som har genomfört och transkriberat en konsultation och ska skriva den 'Subjektiva' delen av en SOAP-notering.
        Uteslut behandlingsplan, objektiva fynd och annan information som inte hör hemma i den 'Subjektiva' delen.
        SKRIV INTE namn eller andra identifierbara uppgifter.
        SKRIV INTE något om vidare arbete eller planer.
        Skriv så kort och precist som möjligt. Inkludera endast den viktigaste informationen. Ge endast svaret, inga extra uppgifter som rubriker.
        Skriv svaret på svenska.`,
      objective: `
        Du är en läkare som har genomfört och transkriberat en konsultation och ska skriva den 'Objektiva' delen av en SOAP-notering.
        Uteslut information som inte hör hemma i den 'Objektiva' delen.
        SKRIV INTE namn eller andra identifierbara uppgifter.
        Endast objektiva, mätbara och observerbara data ska inkluderas här. Subjektiva tolkningar eller spekulativa uppgifter bör undvikas.
        Skriv så kort och precist som möjligt. Ge endast svaret, inga extra uppgifter som rubriker.
        Skriv svaret på svenska.
        Om det inte finns några fynd, skriv ‘Inga objektiva fynd’.`,
      assessment: `
        Du är en läkare som har genomfört och transkriberat en konsultation och ska skriva den 'Bedömnings' delen av en SOAP-notering.
        Uteslut information som inte hör hemma i den 'Bedömnings' delen.
        SKRIV INTE namn eller andra identifierbara uppgifter.
        Skriv så kort och precist som möjligt. Ge endast svaret, inga extra uppgifter som rubriker.
        Skriv svaret på svenska.`,
      plan: `
        Du är en läkare som har genomfört och transkriberat en konsultation och ska skriva den 'Plan' delen av en SOAP-notering.
        Uteslut information som inte hör hemma i den 'Plan' delen.
        SKRIV INTE namn eller andra identifierbara uppgifter.
        Skriv så kort och precist som möjligt. Ge endast svaret, inga extra uppgifter som rubriker.
        Skriv svaret på svenska.`,
    };
  }
  else if (language === "da") {
    return {
      subjective: `
      Du er en læge, der har udført og transskriberet en konsultation og skal skrive ‘Subjektive’-delen af et SOAP-notat.
      Udelad behandlingsplan, objektive fund og andre oplysninger, der ikke hører hjemme i ‘Subjektive’-delen.
      SKRIV IKKE navn og andre identificerbare oplysninger.
      SKRIV IKKE noget om videre arbejde eller planer.
      Skriv så kort og præcist som muligt. Inkluder kun de vigtigste oplysninger. Giv kun svaret, ingen ekstra oplysninger som overskrifter.
      Skriv svaret på dansk.`,
      objective: `
      Du er en læge, der har udført og transskriberet en konsultation og skal skrive ‘Objektive’-delen af et SOAP-notat.
      Udelad oplysninger, der ikke hører hjemme i ‘Objektive’-delen.
      SKRIV IKKE navn og andre identificerbare oplysninger.
      Kun objektive, målbare og observerbare data skal inkluderes her. Subjektive fortolkninger eller spekulative oplysninger bør undgås.
      Skriv så kort og præcist som muligt. Giv kun svaret, ingen ekstra oplysninger som overskrifter.
      Skriv svaret på dansk.
      Hvis der ikke er nogen fund, skriv ‘Ingen objektive fund’.`,
      assessment: `
      Du er en læge, der har udført og transskriberet en konsultation og skal skrive ‘Vurdering’-delen af et SOAP-notat.
      Udelad oplysninger, der ikke hører hjemme i ‘Vurdering’-delen.
      SKRIV IKKE navn og andre identificerbare oplysninger.
      Skriv så kort og præcist som muligt. Giv kun svaret, ingen ekstra oplysninger som overskrifter.
      Skriv svaret på dansk.`,
      plan: `
      Du er en læge, der har udført og transskriberet en konsultation og skal skrive ‘Plan’-delen af et SOAP-notat.
      Udelad oplysninger, der ikke hører hjemme i ‘Plan’-delen.
      SKRIV IKKE navn og andre identificerbare oplysninger.
      Skriv så kort og præcist som muligt. Giv kun svaret, ingen ekstra oplysninger som overskrifter.
      Skriv svaret på dansk.`,
    };
  }
  return {
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  };
}

const options = {
  maxTokens: 500,
  temperature: 1,
  topP: 1,
};

function prependText(language: Language, consultationType: string, companyName: string) {
  let prepentText = "";
  if (consultationType === "digital" && companyName) {
    if (language === "en") prepentText = `Patient is contacting ${companyName} through a digital consultation.`;
    else if (language === "nb") prepentText = `Pas. kontakter ${companyName} gjennom digital konsultasjon.`;
    else if (language === "sv") prepentText = `Patienten kontaktar ${companyName} genom en digital konsultation.`;
    else if (language === "da") prepentText = `Patienten kontakter ${companyName} gennem en digital konsultation.`;
  }
  return prepentText;
}

export async function getSubjective({
  language,
  transcription,
  debug,
  consultationType,
  companyName,
}: GetSoapParams) {

  try {
    const res = await openAiClient.getChatCompletions(
      "gpt-4-turbo",
      [
        {
          role: "system",
          content: getPrompt(language).subjective,
        },
        {
          role: "user",
          content: transcription,
        },
      ],
      options,
    );
    if (consultationType && companyName) {
      return `${prependText(language, consultationType, companyName)} ${res.choices[0].message?.content}`;
    }
    return res.choices[0].message?.content || "";
  }
  catch (e) {
    if (debug) console.error(e);
    throw e;
  }
}

export async function getObjective({
  language,
  transcription,
  debug,
}: GetSoapParams) {
  try {
    const res = await openAiClient.getChatCompletions(
      "gpt-4-turbo",
      [
        {
          role: "system",
          content: getPrompt(language).objective,
        },
        {
          role: "user",
          content: transcription,
        },
      ],
      options,
    );
    return res.choices[0].message?.content || "";
  }
  catch (e) {
    if (debug) console.error(e);
    throw e;
  }
}

export async function getAssessment({
  language,
  transcription,
  debug,
}: GetSoapParams) {
  try {
    const res = await openAiClient.getChatCompletions(
      "gpt-4-turbo",
      [
        {
          role: "system",
          content: getPrompt(language).assessment,
        },
        {
          role: "user",
          content: transcription,
        },
      ],
      options,
    );
    return res.choices[0].message?.content || "";
  }
  catch (e) {
    if (debug) console.error(e);
    throw e;
  }
}

export async function getPlan({
  language,
  transcription,
  debug,
}: GetSoapParams) {
  try {
    const res = await openAiClient.getChatCompletions(
      "gpt-4-turbo", [
        {
          role: "system",
          content: getPrompt(language).plan,
        },
        {
          role: "user",
          content: transcription,
        },
      ],
      options,
    );
    return res.choices[0].message?.content || "";
  }
  catch (e) {
    if (debug) console.error(e);
    throw e;
  }
}
