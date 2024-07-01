import browser from "webextension-polyfill";

let sidepanelPort, contentPort;

browser.runtime.onConnect.addListener(function (port) {
  console.log("Connected to", port.name);
  if (port.name === "sidepanel") {
    sidepanelPort = port;

    // Listen for disconnections
    port.onDisconnect.addListener(function () {
      sidepanelPort = null;
    });

    // Optional: Listen for messages from the sidepanel if needed
    port.onMessage.addListener(function (msg) {
      // Handle messages from the sidepanel
      console.log("Got message from sidepanel:", msg);
    });
  }
  else if (port.name === "content") {
    contentPort = port;

    // Listen for disconnections
    port.onDisconnect.addListener(function () {
      contentPort = null;
    });

    // Optional: Listen for messages from the content script if needed
    port.onMessage.addListener(function (msg) {
      // Handle messages from the content script
      console.log("Got message from content script:", msg);
    });
  }
});

browser.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  console.log("Received message", message);
  const { to, type, data } = message;

  if (to === "content" && contentPort) {
    contentPort.postMessage({ type, data });
  }
  else if (to === "sidepanel" && sidepanelPort) {
    sidepanelPort.postMessage({ type, data });
  }
  else if (to === "background") {
    if (type === "wakeUp") {
      const url = browser.runtime.getURL("tabs/onboarding.html");
      await browser.tabs.create({ url });
    }
    else if (type === "startRecording") {
      console.log("Starting tab capture");

    }
  }
  // else if (to === "background" && type === "click") {
  //   console.log("Click event", data);
  // }
});
