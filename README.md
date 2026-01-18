# EggNet World Invite  One Click Link CLI

Turn your Minecraft Bedrock world into a one-click invite link powered by EggNet (https://www.eggnet.space).

This CLI helps you:

- Log in to EggNet once (via a real browser)
- Paste your personal invite link (for example: https://www.eggnet.space/xuid)
- After that, every time you run the tool it prints your invite link cleanly in the terminal, while keeping your EggNet login session alive in the background.

## How it works

- Built with Node.js, Puppeteer and a tiny interactive CLI
- Uses a persistent browser profile stored in your home folder (~/.eggnet-invite)
- First run:
  - Opens https://www.eggnet.space in a real browser
  - You log in normally
  - You copy your personal invite link from the profile tab and paste it into the terminal
- Later runs:
  - Launches a headless browser with the same profile (keeps you logged in)
  - Prints your invite link in the terminal.

## Requirements

- Node.js 18+ (recommended)
- An EggNet account and a personal world invite link

## Usage

1. Install dependencies:
   - npm install
2. Run:
   - npm start