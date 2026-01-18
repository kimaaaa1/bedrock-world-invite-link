# bedrock-world-invite-link

Turn your Minecraft Bedrock **world** into a clickable invite link.

Instead of asking people to type IPs, ports, or manually add a server entry, this tool lets you share **one URL** that can bring players straight into your Bedrock world – using EggNet under the hood (https://www.eggnet.space).

> Bedrock worlds normally don’t have a “just click this link and join” experience.  
> This repo focuses on making that feel as close to real as possible.

---

## Why this is actually a big deal

On Bedrock Edition, this kind of flow is **surprisingly rare**:

- No manual IP/port typing  
- No “add external server, then join” flow  
- You hand out **one invite URL**, and the heavy lifting is handled by the EggNet side  

From a player’s point of view, the experience you’re aiming for is basically:

> “Here’s my Bedrock world link. Click it, and you’re in.”

This repo doesn’t re-implement the full networking stack.  
It focuses on the **tech glue** that makes that capability practical for you as a host:

- Persistent login/session management with Puppeteer  
- A small CLI instead of clicking around in a browser every time  
- A stable, reusable **world invite link** you can paste into Discord, DMs, streams, bots, etc.

---

## What this tool does

`bedrock-world-invite-link` is a small Node.js CLI that:

- Opens EggNet in a real Chromium browser window on first run  
- Lets you log in using the normal EggNet UI (no custom OAuth screens)  
- Asks you to paste your personal world invite link  
  (for example: `https://www.eggnet.space/<your-id>`)  
- Stores:
  - Your invite link  
  - A persistent browser profile (`~/.eggnet-invite`) so your session survives across runs  

After that, every time you run the CLI:

- Puppeteer starts headless with the same browser profile  
- The CLI just prints your **Bedrock world invite link** in a clean format  

You end up with a “world as a link” workflow you can script around however you want.

---

## How it works (high level)

1. First run (setup)  
   - You run the CLI.  
   - It launches Chromium via Puppeteer and opens `https://www.eggnet.space`.  
   - You:
     - Log in to EggNet in the real browser window.  
     - Open your profile page.  
     - Copy your world invite link.  
     - Paste it back into the terminal when the CLI asks.  
   - The CLI saves:
     - `inviteUrl` in a small local config  
     - Your login session in a dedicated browser data directory (`~/.eggnet-invite`).  

2. Later runs (day-to-day use)  
   - You run the CLI again.  
   - Puppeteer launches headless, reusing the same browser profile.  
   - No extra login steps, no manual browsing.  
   - The CLI prints your Bedrock world invite link, ready to copy, pin, or feed into other tooling.  

The actual “turn this URL into a Bedrock world join” magic is provided by EggNet’s backend.  
This repo is the **developer-facing CLI wrapper** around that capability.

---

## Requirements

- Node.js 18+ (recommended)  
- npm  
- An EggNet account  
- Your personal Bedrock world invite link, e.g. `https://www.eggnet.space/<your-id>`  

---

## Installation

    git clone https://github.com/YOUR_NAME/bedrock-world-invite-link.git
    cd bedrock-world-invite-link
    npm install

---

## Usage

### First run (register your invite link)

    npm start

1. A browser window opens to `https://www.eggnet.space`.  
2. Log in to EggNet.  
3. Go to your profile and copy your world invite link.  
4. Paste it into the terminal when the CLI asks you.  

Your link and session are now stored locally.

### After that

    npm start

- Puppeteer runs headless with your saved session.  
- The CLI prints your Bedrock world invite link so you can share it or script around it.  

---

## Security

- Your EggNet login session is stored locally in `~/.eggnet-invite`.  
- The tool doesn’t send your credentials anywhere except EggNet itself via the normal login flow.  
- To reset everything:
  - Delete `~/.eggnet-invite`.  
  - Delete the local config/project if you want a clean slate.  

---

## License

MIT (or any license you prefer).
