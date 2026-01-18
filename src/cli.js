const puppeteer = require('puppeteer');
const readline = require('readline');
const { BROWSER_DATA_DIR, loadConfig, saveConfig } = require('./config');

function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

function normalizeInviteUrl(input) {
  const url = input.trim();
  if (!url) return '';
  if (!/^https?:\/\//i.test(url)) {
    return 'https://www.eggnet.space/' + url;
  }
  return url;
}

async function main() {
  console.log('=== EggNet World Invite - One Click Link CLI ===\n');

  const cfg = loadConfig();
  let inviteUrl = cfg.inviteUrl || '';

  const firstRun = !inviteUrl;

  console.log(
    firstRun
      ? 'First run detected. We will open EggNet in a browser so you can log in.'
      : 'Using your saved invite link and reusing your EggNet login session.'
  );

  const browser = await puppeteer.launch({
    headless: !firstRun,
    userDataDir: BROWSER_DATA_DIR,
    defaultViewport: null
  });

  const page = await browser.newPage();
  await page.goto('https://www.eggnet.space/', {
    waitUntil: 'networkidle2'
  });

  if (firstRun) {
    console.log('\n[Setup]');
    console.log('1) In the browser window, sign in to EggNet.');
    console.log('2) Open your profile and copy your personal invite link (e.g. https://www.eggnet.space/xuid).');
    console.log('3) Come back to this terminal and paste the link below.\n');

    const raw = await ask('Paste your EggNet invite link here: ');
    const normalized = normalizeInviteUrl(raw);

    if (!normalized || !normalized.startsWith('https://www.eggnet.space/')) {
      console.error('\nThe link does not look like an EggNet invite link.');
      console.error('You can run this command again later to try setup again.');
      await browser.close();
      process.exit(1);
    }

    inviteUrl = normalized;
    cfg.inviteUrl = inviteUrl;
    saveConfig(cfg);

    console.log('\nSaved your invite link.\n');
  }

  console.log('[Invite]');
  console.log('Your EggNet invite link:\n');
  console.log('  ' + inviteUrl + '\n');

  if (firstRun) {
    console.log('You can now close the browser window if you like.');
  } else {
    console.log('A headless browser session is currently logged in to EggNet while this window is open.');
  }

  await ask('Press ENTER to exit...');

  await browser.close();
  process.exit(0);
}

main().catch((err) => {
  console.error('\n[eggnet-invite] Unexpected error:', err);
  process.exit(1);
});