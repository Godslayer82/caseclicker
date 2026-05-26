const RARITIES = [
  { name: 'Junk',          chance: 30,   color: '#78716c', minVal: 1,      maxVal: 10,     cssColor: '#a8a29e' },
  { name: 'Common',        chance: 25,   color: '#a1a1aa', minVal: 10,     maxVal: 30,     cssColor: '#d4d4d8' },
  { name: 'Uncommon',      chance: 16,   color: '#22c55e', minVal: 35,     maxVal: 90,     cssColor: '#4ade80' },
  { name: 'Rare',          chance: 12,   color: '#3b82f6', minVal: 100,    maxVal: 300,    cssColor: '#60a5fa' },
  { name: 'Elite',         chance: 7,    color: '#06b6d4', minVal: 350,    maxVal: 700,    cssColor: '#22d3ee' },
  { name: 'Epic',          chance: 5,    color: '#a855f7', minVal: 800,    maxVal: 1800,   cssColor: '#c084fc' },
  { name: 'Mythic',        chance: 2.5,  color: '#f97316', minVal: 2000,   maxVal: 5000,   cssColor: '#fb923c' },
  { name: 'Legendary',     chance: 1.5,  color: '#facc15', minVal: 6000,   maxVal: 15000,  cssColor: '#fde047' },
  { name: 'Ancient',       chance: 0.75, color: '#ec4899', minVal: 18000,  maxVal: 50000,  cssColor: '#f472b6' },
  { name: 'Contraband',    chance: 0.25, color: '#ef4444', minVal: 60000,  maxVal: 200000, cssColor: '#f87171' },
];

const SKINS = {
  Junk:       ['Bent Screwdriver', 'Cracked Mug', 'Old Receipt', 'Tape Roll', 'Worn Glove', 'Busted Flashlight'],
  Common:     ['Wooden Stock', 'Rusty Blade', 'Grey Camo', 'Basic Wrap', 'Dull Knife', 'Sand Finish'],
  Uncommon:   ['Forest Sniper', 'Moss AK', 'Jungle Pistol', 'Green Fade', 'Swamp Thing', 'Olive Drab'],
  Rare:       ['Ocean Burst', 'Ice Shatter', 'Blue Steel', 'Arctic Fox', 'Deep Sea', 'Cobalt Wave'],
  Elite:      ['Tidal Force', 'Cyan Storm', 'Aqua Rift', 'Glass Cannon', 'Crystal Edge', 'Prism Shot'],
  Epic:       ['Neon Viper', 'Cosmic Ray', 'Void Crawler', 'Ultraviolet', 'Shadow Pulse', 'Dark Matter'],
  Mythic:     ['Inferno Blaze', 'Lava Crest', 'Ember Shift', 'Magma Core', 'Torch Runner', 'Phoenix Ash'],
  Legendary:  ['Dragon Fire', 'Solar Flare', 'Golden Age', 'Mythic Edge', 'Celestial', 'Sunbreaker'],
  Ancient:    ['Void Relic', 'Blood Petal', 'Sakura Hex', 'Rose Specter', 'Crimson Hollow', 'Frostbloom'],
  Contraband: ['Black Lotus', 'Red Emperor', 'Obsidian Curse', 'Godslayer', 'Eternal Void', 'The Last Light'],
};

const CASE_COST = 50;

let balance     = 500;
let inventory   = [];
let upgradeLevel = 0;
let casesOpened = 0;
let opening     = false;
let passiveTimer = null;
let toastTimer   = null;

function getRarity() {
  const roll = Math.random() * 100;
  let cumulative = 0;
  for (const r of RARITIES) {
    cumulative += r.chance;
    if (roll < cumulative) return r;
  }
  return RARITIES[0];
}

function generateItem(rarity) {
  const names = SKINS[rarity.name];
  const name  = names[Math.floor(Math.random() * names.length)];
  const value = Math.floor(Math.random() * (rarity.maxVal - rarity.minVal + 1) + rarity.minVal);
  return { id: Date.now() + Math.random(), name, value, rarity: rarity.name, color: rarity.color, cssColor: rarity.cssColor };
}

function showToast(msg, color = '#22c55e') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.style.background = color;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

function openCase() {
  if (opening || balance < CASE_COST) return;
  balance -= CASE_COST;
  opening = true;
  updateBalance();

  const box = document.getElementById('case-box');
  const btn = document.getElementById('open-btn');
  box.textContent = '⚙️';
  box.classList.add('shake');
  btn.disabled = true;
  btn.textContent = 'Opening…';

  setTimeout(() => box.classList.remove('shake'), 450);

  setTimeout(() => {
    const rarity = getRarity();
    const item   = generateItem(rarity);
    inventory.unshift(item);
    casesOpened++;
    opening = false;

    box.textContent = '📦';
    btn.disabled = balance < CASE_COST;
    btn.textContent = `Open Case — $${CASE_COST}`;

    showLastDrop(item);
    renderInventory();
    updateStats();
    updateBalance();

    const toastColors = {
      Contraband: '#ef4444', Ancient: '#ec4899', Legendary: '#ca8a04',
      Mythic: '#ea580c', Epic: '#9333ea', Elite: '#0891b2',
    };
    showToast(`${item.rarity}: ${item.name} ($${item.value.toLocaleString()})`, toastColors[item.rarity] || '#22c55e');
  }, 800);
}

function showLastDrop(item) {
  const el = document.getElementById('last-drop');
  el.classList.remove('hidden');
  el.style.borderColor = item.color;
  el.innerHTML = `
    <div class="drop-rarity" style="color:${item.cssColor}">${item.rarity}</div>
    <div class="drop-name">${item.name}</div>
    <div class="drop-value">$${item.value.toLocaleString()}</div>
  `;
}

function sellItem(id) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;
  balance += item.value;
  inventory = inventory.filter(i => i.id !== id);
  updateBalance();
  renderInventory();
  updateStats();
}

function sellAll() {
  const total = inventory.reduce((s, i) => s + i.value, 0);
  balance += total;
  inventory = [];
  updateBalance();
  renderInventory();
  updateStats();
  if (total > 0) showToast(`Sold all items for $${total.toLocaleString()}`);
}

function buyUpgrade() {
  const cost = upgradeCost();
  if (balance < cost) { showToast('Not enough funds!', '#ef4444'); return; }
  balance -= cost;
  upgradeLevel++;
  updateBalance();
  updateUpgradeUI();
  updateStats();
  restartPassive();
  showToast(`Case Factory upgraded to Lv.${upgradeLevel}!`, '#3b82f6');
}

function upgradeCost() { return 500 + upgradeLevel * 500; }

function restartPassive() {
  clearInterval(passiveTimer);
  if (upgradeLevel === 0) return;
  passiveTimer = setInterval(() => {
    balance += upgradeLevel * 2;
    updateBalance();
    updateStats();
  }, 1000);
}

function updateBalance() {
  document.getElementById('balance').textContent = '$' + balance.toLocaleString();
  document.getElementById('open-btn').disabled = opening || balance < CASE_COST;
  document.getElementById('upgrade-btn').disabled = balance < upgradeCost();
}

function updateUpgradeUI() {
  document.getElementById('upgrade-title').textContent = `Case Factory Lv.${upgradeLevel}`;
  document.getElementById('upgrade-desc').textContent  = upgradeLevel === 0
    ? 'Buy to earn passive income every second.'
    : `Earning $${upgradeLevel * 2}/sec passively.`;
  document.getElementById('upgrade-cost-val').textContent = '$' + upgradeCost().toLocaleString();
}

function updateStats() {
  document.getElementById('stat-cases').textContent   = casesOpened.toLocaleString();
  document.getElementById('stat-passive').textContent = `$${upgradeLevel * 2}/sec`;
  document.getElementById('stat-inv-val').textContent = '$' + inventory.reduce((s, i) => s + i.value, 0).toLocaleString();
}

function renderInventory() {
  const grid    = document.getElementById('inventory-grid');
  const empty   = document.getElementById('inventory-empty');
  const count   = document.getElementById('inv-count');
  const sellAll = document.getElementById('sell-all-btn');

  count.textContent = `(${inventory.length})`;

  if (inventory.length === 0) {
    empty.classList.remove('hidden');
    grid.innerHTML = '';
    sellAll.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  sellAll.classList.remove('hidden');
  const total = inventory.reduce((s, i) => s + i.value, 0);
  sellAll.textContent = `Sell All ($${total.toLocaleString()})`;

  grid.innerHTML = inventory.map(item => `
    <div class="inv-item">
      <div class="inv-item-info">
        <div class="dot" style="background:${item.color}"></div>
        <div>
          <div class="inv-item-name">${item.name}</div>
          <div class="inv-item-rarity" style="color:${item.cssColor}">${item.rarity}</div>
        </div>
      </div>
      <button class="sell-btn" onclick="sellItem(${item.id})">$${item.value.toLocaleString()}</button>
    </div>
  `).join('');
}

function renderDropRates() {
  document.getElementById('drop-rates').innerHTML = RARITIES.slice().reverse().map(r => `
    <div class="rate-row">
      <div class="rate-left">
        <div class="dot" style="background:${r.color}"></div>
        <span style="color:${r.cssColor}">${r.name}</span>
      </div>
      <span class="rate-chance">${r.chance}%</span>
    </div>
  `).join('');
}

renderDropRates();
updateUpgradeUI();
updateStats();
updateBalance();
