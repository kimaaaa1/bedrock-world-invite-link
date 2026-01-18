const fs = require('fs');
const os = require('os');
const path = require('path');

const CONFIG_DIR = path.join(os.homedir(), '.eggnet-invite');
const CONFIG_PATH = path.join(CONFIG_DIR, 'config.json');
const BROWSER_DATA_DIR = path.join(CONFIG_DIR, 'browser-data');

function ensureDir() {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

function loadConfig() {
  ensureDir();
  if (!fs.existsSync(CONFIG_PATH)) {
    return {};
  }
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[eggnet-invite] Failed to read config, starting fresh:', err.message);
    return {};
  }
}

function saveConfig(cfg) {
  ensureDir();
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2), 'utf8');
}

module.exports = {
  CONFIG_DIR,
  CONFIG_PATH,
  BROWSER_DATA_DIR,
  loadConfig,
  saveConfig
};