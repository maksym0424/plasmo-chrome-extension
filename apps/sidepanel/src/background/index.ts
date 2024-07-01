import "./messaging";

try {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true });
}
catch (e) {
  console.error(e);
}

console.log("Ara AI Secure Extension is running! 🔒");

export {};
