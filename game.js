const RARITIES = [
  { name: 'Junk',       chance: 30,   color: '#78716c', cssColor: '#a8a29e', minVal: 1,     maxVal: 10     },
  { name: 'Common',     chance: 25,   color: '#a1a1aa', cssColor: '#d4d4d8', minVal: 10,    maxVal: 30     },
  { name: 'Uncommon',   chance: 16,   color: '#22c55e', cssColor: '#4ade80', minVal: 35,    maxVal: 90     },
  { name: 'Rare',       chance: 12,   color: '#3b82f6', cssColor: '#60a5fa', minVal: 100,   maxVal: 300    },
  { name: 'Elite',      chance: 7,    color: '#06b6d4', cssColor: '#22d3ee', minVal: 350,   maxVal: 700    },
  { name: 'Epic',       chance: 5,    color: '#a855f7', cssColor: '#c084fc', minVal: 800,   maxVal: 1800   },
  { name: 'Mythic',     chance: 2.5,  color: '#f97316', cssColor: '#fb923c', minVal: 2000,  maxVal: 5000   },
  { name: 'Legendary',  chance: 1.5,  color: '#facc15', cssColor: '#fde047', minVal: 6000,  maxVal: 15000  },
  { name: 'Ancient',    chance: 0.75, color: '#ec4899', cssColor: '#f472b6', minVal: 18000, maxVal: 50000  },
  { name: 'Contraband', chance: 0.25, color: '#ef4444', cssColor: '#f87171', minVal: 60000, maxVal: 200000 },
];

const CRATES = [
  {
    id: 'standard', name: 'Standard Case', emoji: '📦', cost: 50,
    desc: 'Your everyday case. Balanced drops.',
    rarityFilter: null,
  },
  {
    id: 'rare', name: 'Rare Case', emoji: '💎', cost: 250,
    desc: 'Rare tier and above only. No junk.',
    rarityFilter: ['Rare','Elite','Epic','Mythic','Legendary','Ancient','Contraband'],
  },
  {
    id: 'legendary', name: 'Legendary Case', emoji: '⭐', cost: 1000,
    desc: 'Epic tier and above. High value drops.',
    rarityFilter: ['Epic','Mythic','Legendary','Ancient','Contraband'],
  },
  {
    id: 'knife', name: 'Knife Case', emoji: '🔪', cost: 500,
    desc: 'Knives and blades only. Uncommon and up.',
    rarityFilter: ['Uncommon','Rare','Elite','Epic','Mythic','Legendary','Ancient','Contraband'],
    skinType: 'knife',
  },
  {
    id: 'ancient', name: 'Ancient Relic', emoji: '🏺', cost: 5000,
    desc: 'Ancient and Contraband tier only.',
    rarityFilter: ['Ancient','Contraband'],
  },
];

const SKINS = {
  default: {
    Junk:       { icon: '🪛', names: ['Bent Screwdriver','Cracked Mug','Old Receipt','Tape Roll','Worn Glove','Busted Flashlight'] },
    Common:     { icon: '🔫', names: ['Wooden Stock','Grey Camo','Basic Wrap','Sand Finish','Dull Handle','Olive Print'] },
    Uncommon:   { icon: '🔫', names: ['Forest Sniper','Moss AK','Jungle Pistol','Green Fade','Swamp Thing','Olive Drab'] },
    Rare:       { icon: '🔫', names: ['Ocean Burst','Ice Shatter','Blue Steel','Arctic Fox','Deep Sea','Cobalt Wave'] },
    Elite:      { icon: '🔫', names: ['Tidal Force','Cyan Storm','Aqua Rift','Glass Cannon','Crystal Edge','Prism Shot'] },
    Epic:       { icon: '🔫', names: ['Neon Viper','Cosmic Ray','Void Crawler','Ultraviolet','Shadow Pulse','Dark Matter'] },
    Mythic:     { icon: '🔫', names: ['Inferno Blaze','Lava Crest','Ember Shift','Magma Core','Torch Runner','Phoenix Ash'] },
    Legendary:  { icon: '🔫', names: ['Dragon Fire','Solar Flare','Golden Age','Mythic Edge','Celestial','Sunbreaker'] },
    Ancient:    { icon: '🔫', names: ['Void Relic','Blood Petal','Sakura Hex','Rose Specter','Crimson Hollow','Frostbloom'] },
    Contraband: { icon: '🔫', names: ['Black Lotus','Red Emperor','Obsidian Curse','Godslayer','Eternal Void','The Last Light'] },
  },
  knife: {
    Junk:       { icon: '🗡️', names: ['Chipped Blade','Rusty Shiv','Broken Dagger','Blunt Edge'] },
    Common:     { icon: '🗡️', names: ['Plain Knife','Field Blade','Camp Cutter','Basic Bowie'] },
    Uncommon:   { icon: '🗡️', names: ['Jungle Kukri','Forest Cleaver','Bone Knife','Vine Wrap'] },
    Rare:       { icon: '🗡️', names: ['Blue Bayonet','Frost Fang','Ice Pick','Azure Edge'] },
    Elite:      { icon: '🗡️', names: ['Crystal Dagger','Prism Blade','Aqua Stiletto','Glass Fang'] },
    Epic:       { icon: '🗡️', names: ['Shadow Karambit','Void Flip','Neon Gut','Spectral Butterfly'] },
    Mythic:     { icon: '🗡️', names: ['Magma Karambit','Ember Bayonet','Lava Gut','Phoenix Flip'] },
    Legendary:  { icon: '🗡️', names: ['Golden Karambit','Solar Butterfly','Celestial Gut','Dragon Flip'] },
    Ancient:    { icon: '🗡️', names: ['Sakura Karambit','Blood Butterfly','Relic Flip','Rose Gut'] },
    Contraband: { icon: '🗡️', names: ['Godslayer Kara','Eternal Butterfly','Black Lotus Flip','Last Light Gut'] },
  },
};

const UPGRADE_DEFS = [
  {
    id: 'factory', icon: '🏭', name: 'Case Factory',
    desc: 'Generates passive income every second.',
    maxLevel: 20,
    cost: lvl => 500 + lvl * 500,
    label: lvl => lvl === 0 ? 'Not purchased' : `Lv.${lvl} — $${lvl * 2}/sec`,
  },
  {
    id: 'luck', icon: '🍀', name: 'Lucky Charm',
    desc: 'Shifts drop weights toward higher rarities.',
    maxLevel: 5,
    cost: lvl => [2000, 8000, 25000, 80000, 250000][lvl] || 999999,
    label: lvl => lvl === 0 ? 'Not purchased' : `Lv.${lvl} — +${lvl * 15}% luck`,
  },
  {
    id: 'multibuy', icon: '×3', name: 'Triple Open',
    desc: 'Unlocks the ×3 open button on any crate.',
    maxLevel: 1,
    cost: () => 3000,
    label: lvl => lvl === 0 ? 'Locked' : 'Unlocked ✓',
  },
  {
    id: 'auto', icon: '🤖', name: 'Auto Opener',
    desc: 'Unlocks the Auto Open button (opens 1 case/sec).',
    maxLevel: 1,
    cost: () => 10000,
    label: lvl => lvl === 0 ? 'Locked' : 'Unlocked ✓',
  },
  {
    id: 'discount', icon: '💸', name: 'Bulk Discount',
    desc: 'Reduces case costs by 5% per level.',
    maxLevel: 4,
    cost: lvl => [5000, 15000, 40000, 100000][lvl] || 999999,
    label: lvl => lvl === 0 ? 'Not purchased' : `Lv.${lvl} — -${lvl * 5}% cost`,
  },
];

let balance      = 500;
let inventory    = [];
let upgrades     = { factory: 0, luck: 0, multibuy: 0, auto: 0, discount: 0 };
let casesOpened  = 0;
let opening      = false;
let autoOpening  = false;
let autoTimer    = null;
let passiveTimer = null;
let toastTimer   = null;
let currentCrate = null;
let currentPage  = 'shop';
window._authMode = 'login';

function getRarity(crate) {
  const pool = crate.rarityFilter
    ? RARITIES.filter(r => crate.rarityFilter.includes(r.name))
    : RARITIES;

  const luckBonus = upgrades.luck * 0.15;
  const weighted  = pool.map((r, i) => ({
    ...r,
    chance: r.chance * (1 + luckBonus * (i / (pool.length - 1 || 1))),
  }));
  const total = weighted.reduce((s, r) => s + r.chance, 0);
  const roll  = Math.random() * total;
  let cum = 0;
  for (const r of weighted) {
    cum += r.chance;
    if (roll < cum) return r;
  }
  return weighted[weighted.length - 1];
}

function generateItem(rarity, crate) {
  const type  = crate.skinType || 'default';
  const bank  = SKINS[type]?.[rarity.name] || SKINS.default[rarity.name];
  const name  = bank.names[Math.floor(Math.random() * bank.names.length)];
  const disc  = upgrades.discount * 0.05;
  const value = Math.floor((Math.random() * (rarity.maxVal - rarity.minVal + 1) + rarity.minVal));
  return {
    id: Date.now() + Math.random(),
    icon: bank.icon,
    name, value,
    rarity: rarity.name,
    color: rarity.color,
    cssColor: rarity.cssColor,
  };
}

function caseCost(crate) {
  const disc = upgrades.discount * 0.05;
  return Math.max(1, Math.floor(crate.cost * (1 - disc)));
}

function toastColors(rarityName) {
  return { Contraband:'#ef4444', Ancient:'#db2777', Legendary:'#b8960e',
           Mythic:'#ea580c', Epic:'#9333ea', Elite:'#0891b2' }[rarityName] || '#22c55e';
}

function showToast(msg, color = '#22c55e') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.style.background = color;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

function openCase(count = 1) {
  if (!currentCrate) return;
  const cost = caseCost(currentCrate) * count;
  if (opening || balance < cost) return;

  balance -= cost;
  opening = true;
  updateBalance();

  const box = document.getElementById('case-box');
  box.textContent = '⚙️';
  box.classList.add('shake');
  setOpenBtnsDisabled(true);
  setTimeout(() => box.classList.remove('shake'), 450);

  const delay = count > 1 ? 600 : 800;
  setTimeout(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const rarity = getRarity(currentCrate);
      const item   = generateItem(rarity, currentCrate);
      inventory.unshift(item);
      items.push(item);
      casesOpened++;
    }
    opening = false;
    box.textContent = currentCrate.emoji;
    setOpenBtnsDisabled(false);

    if (count === 1) {
      showLastDrop(items[0]);
      document.getElementById('multi-drops').classList.add('hidden');
    } else {
      showMultiDrops(items);
      document.getElementById('last-drop').classList.add('hidden');
    }

    renderInventory();
    updateStats();
    updateBalance();
    localSave();
    if (window.cloudSave) window.cloudSave();

    const best = items.reduce((a, b) => b.value > a.value ? b : a);
    showToast(
      count > 1
        ? `Best: ${best.rarity} ${best.name} ($${best.value.toLocaleString()})`
        : `${items[0].rarity}: ${items[0].name} ($${items[0].value.toLocaleString()})`,
      toastColors(best.rarity)
    );
  }, delay);
}

function showLastDrop(item) {
  const el = document.getElementById('last-drop');
  el.classList.remove('hidden');
  el.style.borderColor = item.color;
  el.innerHTML = `
    <div class="drop-rarity" style="color:${item.cssColor}">${item.rarity}</div>
    <div class="drop-icon">${item.icon}</div>
    <div class="drop-name">${item.name}</div>
    <div class="drop-value">$${item.value.toLocaleString()}</div>
  `;
}

function showMultiDrops(items) {
  const el = document.getElementById('multi-drops');
  el.classList.remove('hidden');
  el.innerHTML = items.map(item => `
    <div class="multi-drop-card" style="border-color:${item.color}">
      <div class="d-icon">${item.icon}</div>
      <div class="d-name">${item.name}</div>
      <div class="d-rarity" style="color:${item.cssColor}">${item.rarity}</div>
      <div class="d-value">$${item.value.toLocaleString()}</div>
    </div>
  `).join('');
}

function setOpenBtnsDisabled(val) {
  ['open-btn-1','open-btn-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = val;
  });
}

function toggleAuto() {
  if (!upgrades.auto) { showToast('Buy the Auto Opener upgrade first!', '#ef4444'); return; }
  autoOpening = !autoOpening;
  const btn = document.getElementById('auto-btn');
  if (autoOpening) {
    btn.textContent = '⏹ Stop Auto';
    btn.classList.add('active-auto');
    autoTimer = setInterval(() => {
      if (!opening && currentCrate && balance >= caseCost(currentCrate)) openCase(1);
    }, 1100);
  } else {
    btn.textContent = '▶ Auto Open';
    btn.classList.remove('active-auto');
    clearInterval(autoTimer);
  }
}

function sellItem(id) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;
  balance += item.value;
  inventory = inventory.filter(i => i.id !== id);
  updateBalance();
  renderInventory();
  updateStats();
  localSave();
  if (window.cloudSave) window.cloudSave();
}

function sellAll() {
  const total = inventory.reduce((s, i) => s + i.value, 0);
  if (!total) return;
  balance += total;
  inventory = [];
  updateBalance();
  renderInventory();
  updateStats();
  localSave();
  if (window.cloudSave) window.cloudSave();
  showToast(`Sold all for $${total.toLocaleString()}`);
}

function buyUpgrade(id) {
  const def = UPGRADE_DEFS.find(u => u.id === id);
  const lvl = upgrades[id];
  if (lvl >= def.maxLevel) return;
  const cost = def.cost(lvl);
  if (balance < cost) { showToast('Not enough funds!', '#ef4444'); return; }
  balance -= cost;
  upgrades[id]++;
  updateBalance();
  renderUpgrades();
  updateStats();
  if (id === 'factory') restartPassive();
  localSave();
  if (window.cloudSave) window.cloudSave();
  showToast(`${def.name} upgraded to Lv.${upgrades[id]}!`, '#3b82f6');
}

function restartPassive() {
  clearInterval(passiveTimer);
  if (upgrades.factory === 0) return;
  passiveTimer = setInterval(() => {
    balance += upgrades.factory * 2;
    updateBalance();
    updateStats();
    localSave();
  }, 1000);
}

function updateBalance() {
  document.getElementById('balance-display').textContent = '$' + balance.toLocaleString();
}

function updateStats() {
  const invVal = inventory.reduce((s, i) => s + i.value, 0);
  const badge  = document.getElementById('inv-badge');
  badge.textContent = inventory.length;
  badge.style.display = inventory.length > 0 ? 'inline' : 'none';
}

function renderShop() {
  document.getElementById('crate-grid').innerHTML = CRATES.map(c => `
    <div class="crate-card" onclick="selectCrate('${c.id}')">
      <span class="crate-emoji">${c.emoji}</span>
      <div class="crate-name">${c.name}</div>
      <div class="crate-desc">${c.desc}</div>
      <div class="crate-cost">$${c.cost.toLocaleString()}</div>
    </div>
  `).join('');
}

function selectCrate(id) {
  currentCrate = CRATES.find(c => c.id === id);
  document.getElementById('crate-grid').classList.add('hidden');
  document.getElementById('open-panel').classList.remove('hidden');
  document.getElementById('open-crate-name').textContent = currentCrate.name;
  document.getElementById('case-box').textContent = currentCrate.emoji;
  document.getElementById('last-drop').classList.add('hidden');
  document.getElementById('multi-drops').classList.add('hidden');

  const cost1 = caseCost(currentCrate);
  document.getElementById('cost-1').textContent = `$${cost1.toLocaleString()}`;
  document.getElementById('cost-3').textContent = `$${(cost1 * 3).toLocaleString()}`;

  document.getElementById('open-btn-3').style.display  = upgrades.multibuy ? 'inline-flex' : 'none';
  document.getElementById('auto-btn').style.display    = upgrades.auto     ? 'inline-flex' : 'none';

  renderCrateDropRates(currentCrate);
}

function deselectCrate() {
  currentCrate = null;
  if (autoOpening) toggleAuto();
  document.getElementById('crate-grid').classList.remove('hidden');
  document.getElementById('open-panel').classList.add('hidden');
}

function renderCrateDropRates(crate) {
  const pool = crate.rarityFilter
    ? RARITIES.filter(r => crate.rarityFilter.includes(r.name))
    : RARITIES;
  const total = pool.reduce((s, r) => s + r.chance, 0);
  document.getElementById('crate-drop-rates').innerHTML = pool.slice().reverse().map(r => `
    <div class="rate-row">
      <div class="rate-left">
        <div class="dot" style="background:${r.color}"></div>
        <span style="color:${r.cssColor}">${r.name}</span>
      </div>
      <span class="rate-chance">${(r.chance / total * 100).toFixed(2)}%</span>
    </div>
  `).join('');
}

function renderInventory() {
  const grid  = document.getElementById('inventory-grid');
  const empty = document.getElementById('inventory-empty');
  const count = document.getElementById('inv-count');
  const sab   = document.getElementById('sell-all-btn');
  count.textContent = `(${inventory.length})`;
  updateStats();

  if (inventory.length === 0) {
    empty.classList.remove('hidden');
    grid.innerHTML = '';
    sab.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  const total = inventory.reduce((s, i) => s + i.value, 0);
  sab.classList.remove('hidden');
  sab.textContent = `Sell All ($${total.toLocaleString()})`;

  grid.innerHTML = inventory.map(item => `
    <div class="inv-item" style="border-color:${item.color}22">
      <div class="inv-item-top">
        <span class="inv-item-icon">${item.icon}</span>
        <div>
          <div class="inv-item-name">${item.name}</div>
          <div class="inv-item-rarity" style="color:${item.cssColor}">${item.rarity}</div>
        </div>
      </div>
      <button class="sell-btn" onclick="sellItem(${item.id})">Sell $${item.value.toLocaleString()}</button>
    </div>
  `).join('');
}

function renderUpgrades() {
  document.getElementById('upgrades-grid').innerHTML = UPGRADE_DEFS.map(def => {
    const lvl    = upgrades[def.id];
    const maxed  = lvl >= def.maxLevel;
    const cost   = maxed ? null : def.cost(lvl);
    const afford = cost !== null && balance >= cost;
    return `
      <div class="upgrade-card">
        <div class="upgrade-card-icon">${def.icon}</div>
        <div class="upgrade-card-name">${def.name}</div>
        <div class="upgrade-card-desc">${def.desc}</div>
        <div class="upgrade-card-level">${def.label(lvl)}</div>
        ${!maxed ? `<div class="upgrade-card-cost">Cost: $${cost.toLocaleString()}</div>` : ''}
        <button
          class="btn-upgrade ${maxed ? 'maxed' : ''}"
          onclick="buyUpgrade('${def.id}')"
          ${maxed ? 'disabled' : ''}
        >${maxed ? 'MAX' : 'Buy Upgrade'}</button>
      </div>
    `;
  }).join('');
}

function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  document.getElementById('topbar-title').textContent =
    { shop: 'Shop', inventory: 'Inventory', upgrades: 'Upgrades', leaderboard: 'Leaderboard' }[page];
  if (page === 'leaderboard' && window.loadLeaderboard) window.loadLeaderboard();
}

function openAuth() {
  document.getElementById('auth-overlay').classList.remove('hidden');
}
function closeAuth() {
  document.getElementById('auth-overlay').classList.add('hidden');
}
function toggleAuthMode() {
  window._authMode = window._authMode === 'login' ? 'register' : 'login';
  const isReg = window._authMode === 'register';
  document.getElementById('auth-title').textContent      = isReg ? 'Create Account' : 'Sign In';
  document.getElementById('auth-sub').textContent        = isReg ? 'Join and save your progress' : 'Save your progress to the cloud';
  document.getElementById('auth-submit-btn').textContent = isReg ? 'Register' : 'Sign In';
  document.getElementById('auth-toggle-btn').textContent = isReg ? 'Have an account? Sign In' : 'No account? Register';
  document.getElementById('auth-error').classList.add('hidden');
}

function getSaveData() {
  return { balance, inventory, upgrades, casesOpened };
}

function loadSaveData(d) {
  if (d.balance   !== undefined) balance     = d.balance;
  if (d.inventory !== undefined) inventory   = d.inventory;
  if (d.upgrades  !== undefined) upgrades    = { ...upgrades, ...d.upgrades };
  if (d.casesOpened !== undefined) casesOpened = d.casesOpened;
  updateBalance();
  renderInventory();
  renderUpgrades();
  updateStats();
  restartPassive();
}

function localSave() {
  try { localStorage.setItem('caseClicker_save', JSON.stringify(getSaveData())); } catch {}
}

function localLoad() {
  try {
    const raw = localStorage.getItem('caseClicker_save');
    if (raw) loadSaveData(JSON.parse(raw));
  } catch {}
}

window.getSaveData   = getSaveData;
window.loadSaveData  = loadSaveData;
window.openAuth      = openAuth;
window.closeAuth     = closeAuth;
window.toggleAuthMode = toggleAuthMode;
window.showToast     = showToast;
window.navigate      = navigate;
window.selectCrate   = selectCrate;
window.deselectCrate = deselectCrate;
window.openCase      = openCase;
window.toggleAuto    = toggleAuto;
window.sellItem      = sellItem;
window.sellAll       = sellAll;
window.buyUpgrade    = buyUpgrade;

localLoad();
renderShop();
renderUpgrades();
updateBalance();
updateStats();
restartPassive();

setInterval(() => {
  localSave();
  if (window.cloudSave) window.cloudSave();
}, 30000);
