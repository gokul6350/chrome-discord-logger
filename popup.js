document.addEventListener('DOMContentLoaded', async () => {
  // Load saved settings
  const settings = await chrome.storage.local.get({
    normalMode: true,
    incognitoMode: true,
    browserInfo: true,
    timestamp: true,
    pageTitle: true,
    isEnabled: true
  });

  // Set checkbox states
  document.getElementById('normalMode').checked = settings.normalMode;
  document.getElementById('incognitoMode').checked = settings.incognitoMode;
  document.getElementById('browserInfo').checked = settings.browserInfo;
  document.getElementById('timestamp').checked = settings.timestamp;
  document.getElementById('pageTitle').checked = settings.pageTitle;

  // Update status display
  updateStatus(settings.isEnabled);

  // Save settings button
  document.getElementById('saveSettings').addEventListener('click', async () => {
    const newSettings = {
      normalMode: document.getElementById('normalMode').checked,
      incognitoMode: document.getElementById('incognitoMode').checked,
      browserInfo: document.getElementById('browserInfo').checked,
      timestamp: document.getElementById('timestamp').checked,
      pageTitle: document.getElementById('pageTitle').checked,
      isEnabled: true
    };

    await chrome.storage.local.set(newSettings);
    updateStatus(true);
    
    // Notify background script of settings change
    chrome.runtime.sendMessage({ type: 'settingsUpdated', settings: newSettings });
  });

  // Clear data button
  document.getElementById('clearData').addEventListener('click', async () => {
    if (confirm('Are you sure you want to clear all settings?')) {
      await chrome.storage.local.clear();
      location.reload();
    }
  });
});

function updateStatus(isEnabled) {
  const statusElement = document.getElementById('status');
  if (isEnabled) {
    statusElement.className = 'status active';
    statusElement.textContent = '✅ Logger is Active';
  } else {
    statusElement.className = 'status inactive';
    statusElement.textContent = '❌ Logger is Inactive';
  }
} 