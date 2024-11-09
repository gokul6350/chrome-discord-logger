// Default webhook URL for development (you can use a test webhook here)
const DEFAULT_WEBHOOK_URL = "YOUR_DEFAULT_WEBHOOK_URL";

// Try to load from .env file if available
let webhookUrl;
try {
  const envFile = await fetch('.env');
  const envText = await envFile.text();
  const envVars = Object.fromEntries(
    envText.split('\n')
      .filter(line => line && !line.startsWith('#'))
      .map(line => line.split('='))
  );
  webhookUrl = envVars.DISCORD_WEBHOOK_URL;
} catch (error) {
  webhookUrl = DEFAULT_WEBHOOK_URL;
  console.warn('Failed to load .env file, using default webhook URL');
}

export const WEBHOOK_URL = webhookUrl; 