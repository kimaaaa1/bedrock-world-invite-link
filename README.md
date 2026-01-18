# bedrock-world-invite-link

Turn your Minecraft Bedrock **world** into a clickable invite link.

On Bedrock (especially on Xbox), players don’t normally “join by IP”.  
They join through friends, invites, Realms, or a fixed list of servers.  
This repo focuses on a different feel:

> “Here’s my Bedrock world link. Click it, and you’re in (through the EggNet flow).”

Under the hood it uses EggNet (https://www.eggnet.space),  
but from the host’s point of view it’s just: **get a stable invite link and reuse it.**

---

## Why this is actually a big deal

For Bedrock worlds, this kind of **“world as a link”** flow is rare:

- No “type this IP:port” step
- No manual “add external server, save, then join” UX
- You share a **single URL** which represents your personal world

From the player side it feels much closer to:

> “Click this invite link and end up in my Bedrock world.”

This repo doesn’t implement the whole networking / matchmaking stack.  
What it does is provide the **tech glue** that makes this usable in practice:

- Keeps an EggNet session alive using Puppeteer
- Wraps everything in a small CLI instead of manual browser clicks
- Gives you a **reusable Bedrock world invite link** you can drop into Discord, DMs, streams, bots, etc.

---

## What this tool does

`bedrock-world-invite-link` is a small Node.js CLI that:

- Opens EggNet in a real Chromium browser window on first run  
- Lets you log in using the normal EggNet UI  
- Asks you to paste your personal world invite link  
  (for example: `https://www.eggnet.space/<your-id>`)  
- Stores:
  - Your invite link  
  - A persistent browser profile (`~/.eggnet-invite`) so your session survives across runs  

After that, every time you run the CLI:

- Puppeteer starts headless with the same browser profile  
- The CLI prints your **Bedrock world invite link** in a clean format  

You end up with a workflow where your world is effectively **addressed by a URL**.

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

The actual “make this URL join a Bedrock world over the network” work is done by EggNet’s backend.  
This repo is the **developer-facing CLI wrapper** around that capability.

---

## Requirements

- Node.js 18+ (recommended)  
- npm  
- An EggNet account  
- Your personal Bedrock world invite link, for example:  
  `https://www.eggnet.space/<your-id>`  

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
