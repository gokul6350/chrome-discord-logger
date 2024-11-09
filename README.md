# 🌐 URL Logger

<div align="center">
  <img src="logo.png" alt="URL Logger Logo" width="128" height="128">
  <br>
  <p><strong>A powerful Chrome extension to log your browsing history to Discord</strong></p>
</div>

## ✨ Features

- 🔗 Real-time URL logging to Discord
- 🕶️ Support for both normal and incognito windows
- ⚙️ Customizable logging options:
  - 📑 Page titles
  - ⏰ Timestamps
  - 🌍 Browser information
- 🎨 Clean and intuitive user interface
- 🚫 Duplicate entry prevention
- 💾 Persistent settings

## 🚀 Installation

1. Clone this repository or download the ZIP file
2. Open Chrome/Edge and go to `chrome://extensions`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory
5. Configure your Discord webhook URL in `background.js`

## ⚙️ Configuration

1. Click the extension icon in your browser toolbar
2. Configure your preferred logging options:
   - Enable/disable normal window logging
   - Enable/disable incognito window logging
   - Toggle additional information (titles, timestamps, browser info)
3. Click "Save Settings" to apply changes

## 🔧 Technical Details

- Built with Manifest V3
- Uses modern JavaScript features
- Implements service worker architecture
- Efficient message deduplication
- Secure Discord webhook integration

## 🛡️ Privacy

- Only logs URLs from active tabs
- Respects user privacy settings
- No data collection beyond specified URLs
- All data sent directly to your Discord channel
- No third-party analytics or tracking

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Open issues for bugs or suggestions
- Submit pull requests for improvements
- Share ideas for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This extension is for personal use only. Be mindful of privacy and data protection laws when logging URLs.

## 🙏 Acknowledgments

- Chrome Extensions API
- Discord Webhook API
- All contributors and users

## 🔒 Environment Setup

1. Create a `.env` file in the project root
2. Add your Discord webhook URL:   ```env
   DISCORD_WEBHOOK_URL=your_webhook_url_here   ```
3. Never commit the `.env` file to version control

## 🚀 Development Setup

1. Copy `.env.example` to `.env`
2. Add your Discord webhook URL to `.env`
3. Follow the regular installation steps

---
<div align="center">
  Made with ❤️ by [Your Name/Username]
</div> 