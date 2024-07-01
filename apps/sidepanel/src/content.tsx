import * as Sentry from "@sentry/react";
import browser from "webextension-polyfill";
import Alert from "~components/alert";
// import InputFieldButton from "~components/input-field-button";
// import useSettingsStore from "shared/state/settingsStore";

// export const config: PlasmoCSConfig = {
//   matches: ["<all_urls>"],
//   world: "MAIN",
//   all_frames: true,
// };

Sentry.init({
  dsn: "https://ab9b1e949da414ef12edf860e3f4778b@o4507148297371648.ingest.de.sentry.io/4507148302286928",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  environment: "content-script",
});

export default function Index() {
  console.log("Page Interactor loaded");
  // const settings = useSettingsStore();

  // READING DATA FROM THE PAGE
  // document.addEventListener("click", (event) => {
  //   // Gets the target element of the click event
  //   const targetElement = event.target;
  //
  //   // Checks if the target element has an ID
  //   const id = targetElement?.id as string | undefined;
  //   const className = targetElement?.className as string | undefined;
  //   const text = targetElement?.textContent as string | undefined;
  //
  //   if (text !== undefined) {
  //     browser.runtime.sendMessage({
  //       to: "background",
  //       type: "click",
  //       data: { id, className, text },
  //     });
  //   }
  // });

  function injectPridokScript() {
    console.log("Injecting script");
    const script = document.createElement("script");
    script.src = browser.runtime.getURL("src/content/pridok-injector.js");
    script.onload = function () {
      console.log("Script loaded");
      this.remove();
    };
    script.onerror = function () {
      console.error("Script failed to load");
    };
    (document.head || document.documentElement).appendChild(script);
  }

  // Inject the script into the page
  if (document.URL.includes("pridok")) {
    injectPridokScript();
  }

  // WRITING DATA TO THE PAGE
  const port = browser.runtime.connect({ name: "content" });
  port.onMessage.addListener(async function ({ type, data }) {
    if (type === "soap") {
      // Handle received data from the background script
      console.log("Data received from background script:", data);
      // Pridok fields
      const event = new CustomEvent("injectData", { detail: data });
      document.dispatchEvent(event);
    }
    // else if (type === "toggleTranscription") {
    //   console.log("Toggle transcription");
    //   const media = await navigator.mediaDevices.getDisplayMedia({
    //     audio: true,
    //     video: {
    //
    //     },
    //   });
    //   const audio = new AudioContext();
    //   const source = audio.createMediaStreamSource(media);
    //   source.connect(audio.destination);
    // }
  });

  return (
    <Alert />
  );
}
// document.querySelectorAll(`input:not([type]), input[type='text'], input[type='email'], input[type='password'], input[type='search'], input[type='url'], input[type='tel'], input[type='number'], textarea`)
//   .forEach(InputFieldButton);
