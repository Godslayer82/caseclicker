'use strict';

const RARITIES = [
  { name:'Junk',           chance:30,      color:'#78716c', css:'#a8a29e', minVal:1,          maxVal:8           },
  { name:'Common',         chance:22,      color:'#a1a1aa', css:'#d4d4d8', minVal:8,           maxVal:28          },
  { name:'Uncommon',       chance:16,      color:'#22c55e', css:'#4ade80', minVal:30,          maxVal:90          },
  { name:'Rare',           chance:11,      color:'#3b82f6', css:'#60a5fa', minVal:100,         maxVal:320         },
  { name:'Elite',          chance:7,       color:'#06b6d4', css:'#22d3ee', minVal:380,         maxVal:750         },
  { name:'Epic',           chance:5,       color:'#a855f7', css:'#c084fc', minVal:900,         maxVal:2200        },
  { name:'Mythic',         chance:3,       color:'#f97316', css:'#fb923c', minVal:2500,        maxVal:6000        },
  { name:'Legendary',      chance:2,       color:'#facc15', css:'#fde047', minVal:7000,        maxVal:18000       },
  { name:'Ancient',        chance:1,       color:'#ec4899', css:'#f472b6', minVal:20000,       maxVal:55000       },
  { name:'Immortal',       chance:0.6,     color:'#e879f9', css:'#f0abfc', minVal:60000,       maxVal:150000      },
  { name:'Contraband',     chance:0.3,     color:'#ef4444', css:'#f87171', minVal:180000,      maxVal:500000      },
  { name:'Transcendent',   chance:0.07,    color:'#f59e0b', css:'#fcd34d', minVal:600000,      maxVal:2000000     },
  { name:'Celestial',      chance:0.02,    color:'#818cf8', css:'#a5b4fc', minVal:2500000,     maxVal:8000000     },
  { name:'Divine',         chance:0.007,   color:'#fb7185', css:'#fda4af', minVal:10000000,    maxVal:35000000    },
  { name:'Cosmic',         chance:0.002,   color:'#34d399', css:'#6ee7b7', minVal:40000000,    maxVal:120000000   },
  { name:'Void',           chance:0.0007,  color:'#7c3aed', css:'#a78bfa', minVal:150000000,   maxVal:500000000   },
  { name:'Primordial',     chance:0.0002,  color:'#db2777', css:'#f9a8d4', minVal:600000000,   maxVal:2000000000  },
  { name:'Omnipotent',     chance:0.00005, color:'#dc2626', css:'#fca5a5', minVal:3000000000,  maxVal:10000000000 },
  { name:'The One',        chance:0.000001,color:'#fff',    css:'#ffffff', minVal:50000000000, maxVal:999999999999},
];

const RARITY_ORDER = RARITIES.reduce((o,r,i)=>{o[r.name]=i;return o},{});

const SKIN_BANKS = {
  default:{
    Junk:        {icon:'🪛', names:['Bent Screwdriver','Cracked Mug','Tape Roll','Worn Glove','Old Rag','Busted Torch']},
    Common:      {icon:'🔫', names:['Wooden Stock','Grey Camo','Basic Wrap','Sand Finish','Plain Barrel','Olive Print']},
    Uncommon:    {icon:'🔫', names:['Forest Sniper','Moss AK','Jungle Pistol','Green Fade','Swamp Camo','Olive Drab']},
    Rare:        {icon:'🔫', names:['Ocean Burst','Ice Shatter','Blue Steel','Arctic Fox','Deep Sea','Cobalt Wave']},
    Elite:       {icon:'🔫', names:['Tidal Force','Cyan Storm','Aqua Rift','Glass Cannon','Crystal Edge','Prism Shot']},
    Epic:        {icon:'🔫', names:['Neon Viper','Cosmic Ray','Void Crawler','Ultraviolet','Shadow Pulse','Dark Matter']},
    Mythic:      {icon:'🔫', names:['Inferno Blaze','Lava Crest','Magma Core','Torch Runner','Phoenix Ash','Ember Shift']},
    Legendary:   {icon:'🌟', names:['Dragon Fire','Solar Flare','Golden Age','Mythic Edge','Celestial','Sunbreaker']},
    Ancient:     {icon:'🌟', names:['Void Relic','Blood Petal','Sakura Hex','Rose Specter','Crimson Hollow','Frostbloom']},
    Immortal:    {icon:'💠', names:['Soul Reaper','Eternal Flame','Astral Drift','Phantom Core','Nebula Burst','Starfall']},
    Contraband:  {icon:'💠', names:['Black Lotus','Red Emperor','Obsidian Curse','Godslayer','Eternal Void','Last Light']},
    Transcendent:{icon:'⚡', names:['Thunder God','Storm Bringer','Lightning Soul','Arc Divinity','Bolt Ascendant','Plasma King']},
    Celestial:   {icon:'🔮', names:['Cosmic Oracle','Star Weaver','Galactic Soul','Nebula Whisper','Void Walker','Universe Edge']},
    Divine:      {icon:'👑', names:['Holy Judgement','Sacred Flame','Divine Retribution','Heaven\'s Edge','Seraph Wing','God\'s Touch']},
    Cosmic:      {icon:'🌌', names:['Big Bang','Dark Energy','Event Horizon','Quantum Flux','Singularity','Multiverse Key']},
    Void:        {icon:'🕳️', names:['Void Eternal','Null Rift','Anti-Matter Core','Dark Dimension','Zero Point','Entropy']},
    Primordial:  {icon:'🧬', names:['Genesis Blade','Origin Flame','First Light','Creation Spark','Primordial Ooze','Alpha Omega']},
    Omnipotent:  {icon:'♾️', names:['Infinite Power','All-Seeing Eye','Absolute Zero','Omnipresence','Beyond God','The Absolute']},
    'The One':   {icon:'🌠', names:['The One','The Only','The Beginning','The End','The All','The Everything']},
  },
  knife:{
    Junk:        {icon:'🗡️', names:['Chipped Blade','Rusty Shiv','Broken Dagger','Blunt Edge']},
    Common:      {icon:'🗡️', names:['Plain Knife','Field Blade','Camp Cutter','Basic Bowie']},
    Uncommon:    {icon:'🗡️', names:['Jungle Kukri','Forest Cleaver','Bone Knife','Vine Wrap']},
    Rare:        {icon:'🗡️', names:['Blue Bayonet','Frost Fang','Ice Pick','Azure Edge']},
    Elite:       {icon:'🗡️', names:['Crystal Dagger','Prism Blade','Aqua Stiletto','Glass Fang']},
    Epic:        {icon:'🗡️', names:['Shadow Karambit','Void Flip','Neon Gut','Spectral Butterfly']},
    Mythic:      {icon:'🗡️', names:['Magma Karambit','Ember Bayonet','Lava Gut','Phoenix Flip']},
    Legendary:   {icon:'🗡️', names:['Golden Karambit','Solar Butterfly','Celestial Gut','Dragon Flip']},
    Ancient:     {icon:'🗡️', names:['Sakura Karambit','Blood Butterfly','Relic Flip','Rose Gut']},
    Immortal:    {icon:'🗡️', names:['Soul Karambit','Phantom Butterfly','Eternal Flip','Astral Gut']},
    Contraband:  {icon:'🗡️', names:['Godslayer Kara','Eternal Butterfly','Black Lotus Flip','Last Light Gut']},
    Transcendent:{icon:'🗡️', names:['Thunder Karambit','Storm Butterfly','Arc Flip','Bolt Gut']},
    Celestial:   {icon:'🗡️', names:['Cosmic Karambit','Star Butterfly','Nebula Flip','Void Gut']},
    Divine:      {icon:'🗡️', names:['Holy Karambit','Sacred Butterfly','Heaven Flip','Seraph Gut']},
    Cosmic:      {icon:'🗡️', names:['Galaxy Kara','Universe Butterfly','Dimension Flip','Singularity Gut']},
    Void:        {icon:'🗡️', names:['Null Karambit','Anti-Matter Butterfly','Zero Flip','Entropy Gut']},
    Primordial:  {icon:'🗡️', names:['Genesis Kara','Origin Butterfly','First Flip','Alpha Gut']},
    Omnipotent:  {icon:'🗡️', names:['Infinite Kara','Absolute Butterfly','Omnipotent Flip','Beyond Gut']},
    'The One':   {icon:'🗡️', names:['The One Kara','The Only Butterfly','The All Flip','The Everything Gut']},
  },
};
RARITIES.forEach(r => {
  if (!SKIN_BANKS.knife[r.name]) SKIN_BANKS.knife[r.name] = SKIN_BANKS.default[r.name];
});

const CRATES = [
  { id:'starter',   name:'Starter Case',      emoji:'📦', cost:25,        desc:'Best value for new players.',           filter:null,                                  tier:'Starter',    tierColor:'#78716c', glowCol:'#78716c40', shadowCol:'#78716c20' },
  { id:'standard',  name:'Standard Case',     emoji:'🎁', cost:50,        desc:'Balanced drops across all rarities.',   filter:null,                                  tier:'Standard',   tierColor:'#a1a1aa', glowCol:'#a1a1aa40', shadowCol:'#a1a1aa20' },
  { id:'uncommon',  name:'Uncommon Case',      emoji:'💚', cost:150,       desc:'Uncommon tier and above only.',        filter:['Uncommon','Rare','Elite','Epic','Mythic','Legendary','Ancient','Immortal','Contraband','Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Uncommon', tierColor:'#22c55e', glowCol:'#22c55e40', shadowCol:'#22c55e20' },
  { id:'rare',      name:'Rare Case',          emoji:'💎', cost:400,       desc:'Rare tier and above only.',            filter:['Rare','Elite','Epic','Mythic','Legendary','Ancient','Immortal','Contraband','Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Rare', tierColor:'#3b82f6', glowCol:'#3b82f640', shadowCol:'#3b82f620' },
  { id:'elite',     name:'Elite Case',         emoji:'🔵', cost:1000,      desc:'Elite tier and above.',                filter:['Elite','Epic','Mythic','Legendary','Ancient','Immortal','Contraband','Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Elite', tierColor:'#06b6d4', glowCol:'#06b6d440', shadowCol:'#06b6d420' },
  { id:'knife',     name:'Knife Case',         emoji:'🔪', cost:1500,      desc:'Knives and blades only.',              filter:['Uncommon','Rare','Elite','Epic','Mythic','Legendary','Ancient','Immortal','Contraband'], skinType:'knife', tier:'Knife', tierColor:'#94a3b8', glowCol:'#94a3b840', shadowCol:'#94a3b820' },
  { id:'epic',      name:'Epic Case',          emoji:'🟣', cost:3000,      desc:'Epic tier and above.',                 filter:['Epic','Mythic','Legendary','Ancient','Immortal','Contraband','Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Epic', tierColor:'#a855f7', glowCol:'#a855f740', shadowCol:'#a855f720' },
  { id:'mythic',    name:'Mythic Case',        emoji:'🔥', cost:8000,      desc:'Mythic tier and above.',               filter:['Mythic','Legendary','Ancient','Immortal','Contraband','Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Mythic', tierColor:'#f97316', glowCol:'#f9731640', shadowCol:'#f9731620' },
  { id:'legendary', name:'Legendary Case',     emoji:'⭐', cost:20000,     desc:'Legendary tier and above.',            filter:['Legendary','Ancient','Immortal','Contraband','Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Legendary', tierColor:'#facc15', glowCol:'#facc1540', shadowCol:'#facc1520' },
  { id:'ancient',   name:'Ancient Relic',      emoji:'🏺', cost:60000,     desc:'Ancient tier and above.',              filter:['Ancient','Immortal','Contraband','Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Ancient', tierColor:'#ec4899', glowCol:'#ec489940', shadowCol:'#ec489920' },
  { id:'immortal',  name:'Immortal Chest',     emoji:'💜', cost:200000,    desc:'Immortal tier and above.',             filter:['Immortal','Contraband','Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Immortal', tierColor:'#e879f9', glowCol:'#e879f940', shadowCol:'#e879f920' },
  { id:'contra',    name:'Contraband Crate',   emoji:'🔴', cost:500000,    desc:'Contraband tier and above.',           filter:['Contraband','Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Contraband', tierColor:'#ef4444', glowCol:'#ef444440', shadowCol:'#ef444420' },
  { id:'trans',     name:'Transcendent Box',   emoji:'⚡', cost:2000000,   desc:'Transcendent tier and above.',         filter:['Transcendent','Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Transcendent', tierColor:'#f59e0b', glowCol:'#f59e0b40', shadowCol:'#f59e0b20' },
  { id:'celestial', name:'Celestial Vault',    emoji:'🔮', cost:10000000,  desc:'Celestial tier and above.',            filter:['Celestial','Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Celestial', tierColor:'#818cf8', glowCol:'#818cf840', shadowCol:'#818cf820' },
  { id:'divine',    name:'Divine Sanctum',     emoji:'👑', cost:50000000,  desc:'Divine tier and above.',               filter:['Divine','Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Divine', tierColor:'#fb7185', glowCol:'#fb718540', shadowCol:'#fb718520' },
  { id:'cosmic',    name:'Cosmic Singularity',emoji:'🌌', cost:250000000, desc:'Cosmic tier and above.',               filter:['Cosmic','Void','Primordial','Omnipotent','The One'], tier:'Cosmic', tierColor:'#34d399', glowCol:'#34d39940', shadowCol:'#34d39920' },
  { id:'void',      name:'Void Rift',          emoji:'🕳️', cost:1000000000,desc:'Void tier and above.',                filter:['Void','Primordial','Omnipotent','The One'], tier:'Void', tierColor:'#7c3aed', glowCol:'#7c3aed40', shadowCol:'#7c3aed20' },
  { id:'primordial',name:'Primordial Origin',  emoji:'🧬', cost:5000000000,desc:'Primordial and above. Extremely rare.',filter:['Primordial','Omnipotent','The One'], tier:'Primordial', tierColor:'#db2777', glowCol:'#db277740', shadowCol:'#db277720' },
];

const UPGRADE_TABS = {
  passive:[
    { id:'factory',   icon:'🏭', name:'Case Factory',     tab:'passive',
      desc:'Generates passive income per second. Scales infinitely.',
      maxLevel:Infinity, cost: l => Math.floor(500  * Math.pow(1.35, l)),
      effect: l => `+$${(l*2*prestigeMult()).toFixed(0)}/sec` },
    { id:'factory2',  icon:'⚙️', name:'Turbo Factory',    tab:'passive',
      desc:'A faster factory. Multiplies factory output.',
      maxLevel:Infinity, cost: l => Math.floor(5000 * Math.pow(1.4,  l)),
      effect: l => `×${(1 + l*0.5).toFixed(1)} factory` },
    { id:'interest',  icon:'💹', name:'Compound Interest',tab:'passive',
      desc:'Earn % of your balance as passive income per second.',
      maxLevel:20,       cost: l => Math.floor(10000* Math.pow(1.5,  l)),
      effect: l => `+${(l*0.1).toFixed(1)}%/sec` },
    { id:'botfarm',   icon:'🤖', name:'Bot Farm',         tab:'passive',
      desc:'Bots auto-sell your inventory every 30 seconds.',
      maxLevel:5,        cost: l => [25000,80000,200000,500000,1500000][l]||999e9,
      effect: l => l>0?'Active':'Locked' },
  ],
  luck:[
    { id:'luck',      icon:'🍀', name:'Lucky Charm',      tab:'luck',
      desc:'Shifts drop weights toward higher rarities.',
      maxLevel:10,       cost: l => Math.floor(2000 * Math.pow(2.2,  l)),
      effect: l => `+${l*10}% luck` },
    { id:'luck2',     icon:'🌠', name:'Star Alignment',   tab:'luck',
      desc:'Further boosts luck. Stacks with Lucky Charm.',
      maxLevel:10,       cost: l => Math.floor(20000* Math.pow(2.5,  l)),
      effect: l => `+${l*15}% luck` },
    { id:'pity',      icon:'😤', name:'Pity System',      tab:'luck',
      desc:'Guaranteed high rarity after X cases with no hit.',
      maxLevel:5,        cost: l => [15000,50000,150000,400000,1000000][l]||999e9,
      effect: l => l>0?`Pity@${[200,150,100,75,50][l-1]} cases`:'Locked' },
    { id:'guarantee', icon:'✅', name:'Drop Guarantee',   tab:'luck',
      desc:'Guarantees Rare+ every N cases.',
      maxLevel:4,        cost: l => [30000,100000,300000,800000][l]||999e9,
      effect: l => l>0?`Rare+ every ${[100,60,40,25][l-1]} cases`:'Locked' },
  ],
  open:[
    { id:'multibuy',  icon:'×3', name:'Triple Open',      tab:'open',
      desc:'Unlocks the ×3 open button.',
      maxLevel:1,        cost:()=>3000,
      effect: l => l?'Unlocked ✓':'Locked' },
    { id:'tenbuy',    icon:'×10',name:'Deca Open',        tab:'open',
      desc:'Unlocks the ×10 open button.',
      maxLevel:1,        cost:()=>15000,
      effect: l => l?'Unlocked ✓':'Locked' },
    { id:'auto',      icon:'🔄', name:'Auto Opener',      tab:'open',
      desc:'Unlocks Auto Open — opens 3 cases per second.',
      maxLevel:1,        cost:()=>25000,
      effect: l => l?'Unlocked ✓':'Locked' },
    { id:'autospeed', icon:'⚡', name:'Auto Speed',       tab:'open',
      desc:'Increases Auto Opener speed. Each level adds +1 case/sec.',
      maxLevel:9,        cost: l => Math.floor(50000* Math.pow(2,    l)),
      effect: l => `${3+l} cases/sec` },
    { id:'discount',  icon:'💸', name:'Bulk Discount',    tab:'open',
      desc:'Reduces case cost by 5% per level.',
      maxLevel:10,       cost: l => Math.floor(5000 * Math.pow(1.8,  l)),
      effect: l => l>0?`-${l*5}% cost`:'No discount' },
    { id:'value',     icon:'💰', name:'Item Value',       tab:'open',
      desc:'Increases value of every dropped item.',
      maxLevel:Infinity, cost: l => Math.floor(8000 * Math.pow(1.5,  l)),
      effect: l => `+${l*5}% item value` },
  ],
  misc:[
    { id:'storage',   icon:'📦', name:'Inventory Space',  tab:'misc',
      desc:'Increases max inventory before auto-sell kicks in.',
      maxLevel:20,       cost: l => Math.floor(1000 * Math.pow(1.4,  l)),
      effect: l => `${50+l*50} slots` },
    { id:'prestige_xp',icon:'✨',name:'Prestige XP',      tab:'misc',
      desc:'Earn prestige XP faster to unlock prestige sooner.',
      maxLevel:5,        cost: l => [10000,35000,100000,300000,800000][l]||999e9,
      effect: l => `+${l*20}% prestige XP` },
    { id:'sellbonus', icon:'💎', name:'Sell Bonus',       tab:'misc',
      desc:'Increases coins received when selling items.',
      maxLevel:10,       cost: l => Math.floor(3000 * Math.pow(1.6,  l)),
      effect: l => `+${l*8}% sell value` },
    { id:'crit',      icon:'🎯', name:'Critical Open',    tab:'misc',
      desc:'5% chance per level for an item to be worth 5× its value.',
      maxLevel:5,        cost: l => [12000,40000,120000,350000,900000][l]||999e9,
      effect: l => l>0?`${l*5}% crit chance`:'Locked' },
  ],
};
const ALL_UPGRADES = Object.values(UPGRADE_TABS).flat();

let balance       = 500;
let inventory     = [];
let upgrades      = {};   
let casesOpened   = 0;
let casesWithoutHit = 0;  
let casesSinceRare  = 0;  
let opening       = false;
let autoOn        = false;
let autoTimer     = null;
let passiveTimer  = null;
let autoSaveTimer = null;
let currentCrate  = null;
let currentPage   = 'shop';
let currentUpgradeTab = 'passive';
let currentLbTab  = 'balance';
let prestigeLevel = 0;
let prestigeHistory = [];
let _modalItem    = null;
window._authMode  = 'login';
ALL_UPGRADES.forEach(u => { upgrades[u.id] = 0; });

function prestigeMult() { return 1 + prestigeLevel * 0.25; }
function getLuckBonus()  { return (upgrades.luck * 10 + upgrades.luck2 * 15) / 100; }
function getValueMult()  { return 1 + upgrades.value * 0.05 + prestigeLevel * 0.1; }
function getSellMult()   { return 1 + upgrades.sellbonus * 0.08; }
function getDiscount()   { return Math.min(0.5, upgrades.discount * 0.05); }
function maxInventory()  { return 50 + upgrades.storage * 50; }
function autoSpeed()     { return 3 + upgrades.autospeed; }

function caseCost(crate, count = 1) {
  return Math.max(1, Math.floor(crate.cost * (1 - getDiscount()) * count));
}

function getRarity(crate) {
  const pool = crate.filter
    ? RARITIES.filter(r => crate.filter.includes(r.name))
    : RARITIES;

  const luck = getLuckBonus();
  const n    = pool.length;
  const weighted = pool.map((r, i) => ({
    ...r,
    chance: r.chance * (1 + luck * (i / Math.max(n - 1, 1))),
  }));
  const total = weighted.reduce((s, r) => s + r.chance, 0);
  let   roll  = Math.random() * total;
  for (const r of weighted) { roll -= r.chance; if (roll <= 0) return r; }
  return weighted[weighted.length - 1];
}

function generateItem(rarity, crate) {
  const type = crate.skinType || 'default';
  const bank = (SKIN_BANKS[type]?.[rarity.name]) || SKIN_BANKS.default[rarity.name]
             || SKIN_BANKS.default.Common;
  const name = bank.names[Math.floor(Math.random() * bank.names.length)];
  let   val  = Math.floor(Math.random() * (rarity.maxVal - rarity.minVal + 1) + rarity.minVal);
  val = Math.floor(val * getValueMult() * prestigeMult());
  if (upgrades.crit > 0 && Math.random() < upgrades.crit * 0.05) val *= 5;
  return { id: Date.now() + Math.random(), icon: bank.icon, name, val, rarity: rarity.name, color: rarity.color, css: rarity.css };
}

(function initParticles() {
  const cv = document.getElementById('particle-canvas');
  const ctx = cv.getContext('2d');
  const pts = [];
  function resize() { cv.width = innerWidth; cv.height = innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 60; i++) pts.push({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + .3,
    vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
    a: Math.random(),
  });
  function frame() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.a += .005;
      if (p.x < 0) p.x = cv.width; if (p.x > cv.width) p.x = 0;
      if (p.y < 0) p.y = cv.height; if (p.y > cv.height) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(250,204,21,${.1 + .1 * Math.sin(p.a)})`;
      ctx.fill();
    });
    requestAnimationFrame(frame);
  }
  frame();
})();

function showToast(msg, color = '#22c55e') {
  const c = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast';
  el.style.background = color;
  el.textContent = msg;
  c.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 320);
  }, 2400);
}
window.showToast = showToast;

function floatCoin(amount, x, y) {
  const el = document.createElement('div');
  el.className = 'float-coin';
  el.textContent = '+$' + fmtShort(amount);
  el.style.left = x + 'px'; el.style.top = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

function fmt(n) {
  if (n >= 1e12) return '$' + (n / 1e12).toFixed(2) + 'T';
  if (n >= 1e9)  return '$' + (n / 1e9).toFixed(2)  + 'B';
  if (n >= 1e6)  return '$' + (n / 1e6).toFixed(2)  + 'M';
  if (n >= 1e3)  return '$' + (n / 1e3).toFixed(1)  + 'K';
  return '$' + Math.floor(n).toLocaleString();
}
function fmtShort(n) {
  if (n >= 1e12) return (n/1e12).toFixed(1)+'T';
  if (n >= 1e9)  return (n/1e9).toFixed(1)+'B';
  if (n >= 1e6)  return (n/1e6).toFixed(1)+'M';
  if (n >= 1e3)  return (n/1e3).toFixed(1)+'K';
  return Math.floor(n).toString();
}

function openCase(count = 1) {
  if (!currentCrate || opening) return;
  const cost = caseCost(currentCrate, count);
  if (balance < cost) { showToast('Not enough funds!', '#ef4444'); return; }

  balance -= cost;
  opening  = true;
  updateBalance();

  const box  = document.getElementById('case-box');
  const ring = document.getElementById('case-box-ring');
  box.classList.add('shake');
  ring.classList.add('active');
  setOpenBtns(true);
  setTimeout(() => box.classList.remove('shake'), 500);

  const delay = count > 3 ? 500 : 750;
  setTimeout(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      let rarity = getRarity(currentCrate);

      casesSinceRare++;
      casesWithoutHit++;
      const guar = [100,60,40,25][upgrades.guarantee - 1];
      if (guar && casesSinceRare >= guar) {
        const rareIdx = RARITIES.findIndex(r => r.name === 'Rare');
        const pool    = currentCrate.filter
          ? RARITIES.filter(r => currentCrate.filter.includes(r.name) && RARITY_ORDER[r.name] >= rareIdx)
          : RARITIES.slice(rareIdx);
        if (pool.length) { rarity = pool[Math.floor(Math.random() * pool.length)]; casesSinceRare = 0; }
      }
      const pityAt = [200,150,100,75,50][upgrades.pity - 1];
      if (pityAt && casesWithoutHit >= pityAt) {
        const highIdx = RARITIES.findIndex(r => r.name === 'Ancient');
        const pool    = currentCrate.filter
          ? RARITIES.filter(r => currentCrate.filter.includes(r.name) && RARITY_ORDER[r.name] >= highIdx)
          : RARITIES.slice(highIdx);
        if (pool.length) { rarity = pool[Math.floor(Math.random() * pool.length)]; casesWithoutHit = 0; }
      }
      if (RARITY_ORDER[rarity.name] >= RARITY_ORDER['Ancient']) casesWithoutHit = 0;

      const item = generateItem(rarity, currentCrate);
      inventory.unshift(item);
      items.push(item);
      casesOpened++;
    }

    opening = false;
    box.classList.add('pop-open');
    ring.classList.remove('active');
    setTimeout(() => box.classList.remove('pop-open'), 450);
    setOpenBtns(false);

    if (inventory.length > maxInventory() && upgrades.botfarm > 0) {
      const overflow = inventory.splice(maxInventory());
      const sold     = overflow.reduce((s, i) => s + Math.floor(i.val * getSellMult()), 0);
      balance += sold;
    }

    renderResult(items);
    renderInventory();
    updateBalance();
    updateStats();
    scheduleCloudSave();

    const best = items.reduce((a, b) => b.val > a.val ? b : a);
    const tc = { Contraband:'#ef4444', Ancient:'#db2777', Legendary:'#b8960e',
                 Mythic:'#ea580c', Epic:'#9333ea', Elite:'#0891b2',
                 Immortal:'#d946ef', Transcendent:'#d97706',
                 Celestial:'#6366f1', Divine:'#f43f5e',
                 Cosmic:'#10b981', Void:'#7c3aed',
                 Primordial:'#db2777', Omnipotent:'#dc2626', 'The One':'#fff' };
    const col = tc[best.rarity] || '#22c55e';
    showToast(
      count > 1
        ? `Best: ${best.rarity} ${best.name} (${fmt(best.val)})`
        : `${items[0].rarity}: ${items[0].name} (${fmt(items[0].val)})`,
      col
    );
  }, delay);
}

function setOpenBtns(disabled) {
  ['open-btn-1','open-btn-3','open-btn-10'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.disabled = disabled;
  });
}

function renderResult(items) {
  const area = document.getElementById('open-result-area');
  if (items.length === 1) {
    const it = items[0];
    area.innerHTML = `
      <div class="result-single" style="border-color:${it.color}">
        <div class="result-icon">${it.icon}</div>
        <div class="result-rarity" style="color:${it.css}">${it.rarity}</div>
        <div class="result-name">${it.name}</div>
        <div class="result-value">${fmt(it.val)}</div>
      </div>`;
  } else {
    area.innerHTML = `<div class="result-multi">${items.map((it,i) => `
      <div class="result-multi-card" style="border-color:${it.color};animation-delay:${i*0.04}s"
           onclick="openItemModal(${it.id})">
        <div class="rm-icon">${it.icon}</div>
        <div class="rm-name">${it.name}</div>
        <div class="rm-rarity" style="color:${it.css}">${it.rarity}</div>
        <div class="rm-value">${fmt(it.val)}</div>
      </div>`).join('')}</div>`;
  }
}

function toggleAuto() {
  if (!upgrades.auto) { showToast('Buy Auto Opener in Upgrades!', '#ef4444'); return; }
  autoOn = !autoOn;
  const btn = document.getElementById('auto-btn');
  const lbl = document.getElementById('auto-label');
  if (autoOn) {
    btn.classList.add('auto-on');
    btn.innerHTML = '⏹ Stop<br><span class="btn-cost" id="auto-label">Running…</span>';
    const interval = Math.floor(1000 / autoSpeed());
    autoTimer = setInterval(() => {
      if (!opening && currentCrate && balance >= caseCost(currentCrate, 3)) openCase(3);
    }, interval);
  } else {
    btn.classList.remove('auto-on');
    btn.innerHTML = '▶ Auto<br><span class="btn-cost" id="auto-label">3/sec</span>';
    clearInterval(autoTimer);
  }
}

function sellItem(id, evt) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;
  const earned = Math.floor(item.val * getSellMult());
  balance  += earned;
  inventory = inventory.filter(i => i.id !== id);
  if (evt) floatCoin(earned, evt.clientX, evt.clientY);
  updateBalance();
  renderInventory();
  updateStats();
  scheduleCloudSave();
}

function sellAll() {
  if (!inventory.length) return;
  const total = inventory.reduce((s, i) => s + Math.floor(i.val * getSellMult()), 0);
  balance += total;
  inventory = [];
  updateBalance();
  renderInventory();
  updateStats();
  showToast(`Sold all for ${fmt(total)}`, '#22c55e');
  scheduleCloudSave();
}

function openItemModal(id) {
  const item = inventory.find(i => i.id === id);
  if (!item) return;
  _modalItem = item;
  const overlay = document.getElementById('item-overlay');
  const glow    = document.getElementById('item-modal-glow');
  overlay.classList.remove('hidden');
  glow.style.setProperty('--glow-col', item.color + '60');
  document.getElementById('item-modal-icon').textContent   = item.icon;
  document.getElementById('item-modal-rarity').textContent = item.rarity;
  document.getElementById('item-modal-rarity').style.color = item.css;
  document.getElementById('item-modal-name').textContent   = item.name;
  document.getElementById('item-modal-value').textContent  = fmt(item.val);
  document.getElementById('item-modal-sell').textContent   = `Sell ${fmt(Math.floor(item.val * getSellMult()))}`;
}
function closeItemModal() {
  document.getElementById('item-overlay').classList.add('hidden');
  _modalItem = null;
}
function sellFromModal() {
  if (_modalItem) { sellItem(_modalItem.id); closeItemModal(); }
}
window.openItemModal = openItemModal;
window.closeItemModal = closeItemModal;
window.sellFromModal  = sellFromModal;

function buyUpgrade(id) {
  const def = ALL_UPGRADES.find(u => u.id === id);
  if (!def) return;
  const lvl  = upgrades[id];
  if (lvl >= def.maxLevel) return;
  const cost = def.cost(lvl);
  if (balance < cost) { showToast('Not enough funds!', '#ef4444'); return; }
  balance -= cost;
  upgrades[id]++;
  updateBalance();
  renderUpgrades();
  updateStats();
  if (id === 'factory' || id === 'factory2' || id === 'interest') restartPassive();
  if (id === 'auto' || id === 'autospeed') {
    if (autoOn) { clearInterval(autoTimer); toggleAuto(); toggleAuto(); }
    updateOpenPanel();
  }
  showToast(`${def.name} → Lv.${upgrades[id]}`, '#3b82f6');
  scheduleCloudSave();
}
window.buyUpgrade = buyUpgrade;

function restartPassive() {
  clearInterval(passiveTimer);
  passiveTimer = setInterval(() => {
    const f1  = upgrades.factory * 2 * (1 + upgrades.factory2 * 0.5);
    const int = balance * upgrades.interest * 0.001;
    const inc = (f1 + int) * prestigeMult();
    balance += inc;
    updateBalance();
    updateStats();
    if (upgrades.botfarm > 0 && inventory.length >= maxInventory() * 0.9) {
      const cut   = inventory.splice(Math.floor(inventory.length / 2));
      const total = cut.reduce((s, i) => s + Math.floor(i.val * getSellMult()), 0);
      balance += total;
      renderInventory();
      showToast(`Bot sold ${cut.length} items for ${fmt(total)}`, '#22c55e');
    }
  }, 1000);
  const pps = passivePerSec();
  document.getElementById('passive-ticker').textContent = fmt(pps) + '/sec';
}

function passivePerSec() {
  const f1  = upgrades.factory * 2 * (1 + upgrades.factory2 * 0.5);
  const int = balance * upgrades.interest * 0.001;
  return (f1 + int) * prestigeMult();
}

function prestigeRequirement() {
  return Math.floor(100000 * Math.pow(5, prestigeLevel));
}

function doPrestige() {
  if (balance < prestigeRequirement()) {
    showToast(`Need ${fmt(prestigeRequirement())} to prestige!`, '#ef4444'); return;
  }
  if (!confirm(`Prestige now? You will lose all balance & inventory, but gain a permanent ×${(1.25).toFixed(2)} earnings multiplier. Current prestige: ${prestigeLevel}`)) return;
  prestigeHistory.push({ level: prestigeLevel + 1, balance, cases: casesOpened, date: new Date().toLocaleDateString() });
  prestigeLevel++;
  balance   = 500;
  inventory = [];
  casesOpened = 0;
  ALL_UPGRADES.forEach(u => { upgrades[u.id] = 0; });
  clearInterval(passiveTimer);
  clearInterval(autoTimer); autoOn = false;
  renderShop();
  renderInventory();
  renderUpgrades();
  renderPrestige();
  updateBalance();
  updateStats();
  updatePrestigeBadge();
  showToast(`✨ Prestige ${prestigeLevel}! Earnings ×${prestigeMult().toFixed(2)}`, '#f97316');
  scheduleCloudSave();
}
window.doPrestige = doPrestige;

function renderPrestige() {
  const req  = prestigeRequirement();
  const next = prestigeLevel + 1;
  document.getElementById('prestige-info').innerHTML = `
    <div class="prestige-row"><span>Current Prestige</span><span>✨ ${prestigeLevel}</span></div>
    <div class="prestige-row"><span>Earnings Multiplier</span><span>×${prestigeMult().toFixed(2)}</span></div>
    <div class="prestige-row"><span>Prestige ${next} requires</span><span>${fmt(req)}</span></div>
    <div class="prestige-row"><span>Your Balance</span><span>${fmt(balance)}</span></div>
  `;
  const btn = document.getElementById('prestige-btn');
  btn.disabled = balance < req;
  btn.textContent = balance >= req ? `Prestige → Lv.${next}` : `Need ${fmt(req)}`;

  document.getElementById('prestige-history').innerHTML =
    prestigeHistory.length
      ? prestigeHistory.slice().reverse().map(p => `
          <div class="prestige-entry">
            <span>✨ Prestige ${p.level}</span>
            <span>${fmt(p.balance)} / ${p.cases} cases</span>
            <span>${p.date}</span>
          </div>`).join('')
      : '';
}

function updatePrestigeBadge() {
  const b = document.getElementById('prestige-badge');
  if (prestigeLevel > 0) {
    b.textContent = `✨ Prestige ${prestigeLevel}`;
    b.classList.remove('hidden');
  } else b.classList.add('hidden');
}

function updateBalance() {
  const el = document.getElementById('balance-display');
  el.textContent = fmt(balance);
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 200);
}

function updateStats() {
  const total = inventory.reduce((s, i) => s + i.val, 0);
  const badge = document.getElementById('inv-badge');
  badge.textContent = inventory.length;
  badge.classList.toggle('hidden', inventory.length === 0);
  document.getElementById('passive-ticker').textContent = fmt(passivePerSec()) + '/sec';
}

function renderShop() {
  document.getElementById('crate-grid').innerHTML = CRATES.map(c => `
    <div class="crate-card"
         style="--card-glow:${c.glowCol};--card-border:${c.tierColor};--card-shadow:${c.shadowCol};--card-glow2:${c.tierColor}80"
         onclick="selectCrate('${c.id}')">
      <span class="crate-tier" style="background:${c.tierColor}22;color:${c.tierColor}">${c.tier}</span>
      <span class="crate-emoji">${c.emoji}</span>
      <div class="crate-name">${c.name}</div>
      <div class="crate-desc">${c.desc}</div>
      <div class="crate-cost">${fmt(caseCost(c))}</div>
    </div>`).join('');
}

function selectCrate(id) {
  currentCrate = CRATES.find(c => c.id === id);
  document.getElementById('crate-grid').classList.add('hidden');
  document.getElementById('open-panel').classList.remove('hidden');
  document.getElementById('open-result-area').innerHTML = '';
  updateOpenPanel();
  renderCrateDropRates(currentCrate);
}

function updateOpenPanel() {
  if (!currentCrate) return;
  const c  = currentCrate;
  document.getElementById('open-crate-name').textContent = c.name;
  document.getElementById('case-box').textContent        = c.emoji;
  document.getElementById('case-box').style.background   = `linear-gradient(135deg,${c.tierColor},${c.tierColor}88)`;
  const c1 = caseCost(c, 1);
  const c3 = caseCost(c, 3);
  const c10= caseCost(c, 10);
  document.getElementById('cost-1').textContent  = fmt(c1);
  document.getElementById('cost-3').textContent  = fmt(c3);
  document.getElementById('cost-10').textContent = fmt(c10);
  document.getElementById('open-btn-3').style.display  = upgrades.multibuy ? '' : 'none';
  document.getElementById('open-btn-10').style.display = upgrades.tenbuy   ? '' : 'none';
  const autoL = document.getElementById('auto-label');
  const autoB = document.getElementById('auto-btn');
  if (upgrades.auto) {
    autoB.style.display = '';
    autoL.textContent   = autoOn ? 'Running…' : `${autoSpeed()}/sec`;
  } else {
    autoB.style.display = 'none';
  }
}

function deselectCrate() {
  if (autoOn) toggleAuto();
  currentCrate = null;
  document.getElementById('crate-grid').classList.remove('hidden');
  document.getElementById('open-panel').classList.add('hidden');
}
window.deselectCrate = deselectCrate;

function renderCrateDropRates(crate) {
  const pool  = crate.filter ? RARITIES.filter(r => crate.filter.includes(r.name)) : RARITIES;
  const luck  = getLuckBonus();
  const n     = pool.length;
  const weighted = pool.map((r, i) => ({ ...r, w: r.chance * (1 + luck * (i / Math.max(n-1,1))) }));
  const total = weighted.reduce((s,r)=>s+r.w,0);
  document.getElementById('crate-drop-rates').innerHTML =
    weighted.slice().reverse().map(r => `
      <div class="rate-row">
        <div class="rate-left">
          <div class="dot" style="background:${r.color}"></div>
          <span style="color:${r.css}">${r.name}</span>
        </div>
        <span class="rate-chance">${(r.w/total*100).toFixed(4)}%</span>
      </div>`).join('');
}

function renderInventory() {
  const grid  = document.getElementById('inventory-grid');
  const empty = document.getElementById('inventory-empty');
  const count = document.getElementById('inv-count');
  const sab   = document.getElementById('sell-all-btn');
  count.textContent = `(${inventory.length})`;

  if (!inventory.length) {
    empty.classList.remove('hidden'); grid.innerHTML = '';
    sab.classList.add('hidden'); return;
  }
  empty.classList.add('hidden');
  const total = inventory.reduce((s,i)=>s+Math.floor(i.val*getSellMult()),0);
  sab.classList.remove('hidden');
  sab.textContent = `Sell All (${fmt(total)})`;

  const sort = document.getElementById('inv-sort').value;
  let sorted = [...inventory];
  if      (sort === 'value-desc') sorted.sort((a,b)=>b.val-a.val);
  else if (sort === 'value-asc')  sorted.sort((a,b)=>a.val-b.val);
  else if (sort === 'rarity')     sorted.sort((a,b)=>RARITY_ORDER[b.rarity]-RARITY_ORDER[a.rarity]);

  grid.innerHTML = sorted.map((item,idx) => `
    <div class="inv-item" style="border-color:${item.color}44;animation-delay:${Math.min(idx,20)*0.03}s"
         onclick="openItemModal(${item.id})">
      <div class="inv-top">
        <span class="inv-icon">${item.icon}</span>
        <div>
          <div class="inv-name">${item.name}</div>
          <div class="inv-rar" style="color:${item.css}">${item.rarity}</div>
        </div>
      </div>
      <div class="inv-val">${fmt(item.val)}</div>
      <button class="sell-btn" onclick="event.stopPropagation();sellItem(${item.id},event)">
        Sell ${fmt(Math.floor(item.val*getSellMult()))}
      </button>
    </div>`).join('');
}

function renderUpgrades() {
  const defs = UPGRADE_TABS[currentUpgradeTab] || [];
  document.getElementById('upgrades-grid').innerHTML = defs.map((def, idx) => {
    const lvl   = upgrades[def.id];
    const maxed = lvl >= def.maxLevel;
    const cost  = maxed ? null : def.cost(lvl);
    const pct   = def.maxLevel === Infinity ? 0 : (lvl / def.maxLevel * 100);
    return `
      <div class="upgrade-card" style="animation-delay:${idx*0.04}s">
        <div class="uc-header">
          <span class="uc-icon">${def.icon}</span>
          <span class="uc-name">${def.name}</span>
        </div>
        <div class="uc-desc">${def.desc}</div>
        <div class="uc-level">${def.effect(lvl)}</div>
        ${def.maxLevel !== Infinity ? `<div class="uc-progress"><div class="uc-progress-fill" style="width:${pct}%"></div></div>` : ''}
        ${!maxed ? `<div class="uc-cost">Cost: ${fmt(cost)}</div>` : ''}
        <button class="btn-upgrade ${maxed?'maxed':''}"
                onclick="buyUpgrade('${def.id}')"
                ${maxed?'disabled':''}>
          ${maxed ? 'MAXED' : 'Buy Upgrade'}
        </button>
      </div>`;
  }).join('');
}

function switchUpgradeTab(tab, btn) {
  currentUpgradeTab = tab;
  document.querySelectorAll('.utab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderUpgrades();
}
window.switchUpgradeTab = switchUpgradeTab;

function switchLbTab(field, btn) {
  currentLbTab = field;
  document.querySelectorAll('.lb-tabs .utab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (window.loadLeaderboard) window.loadLeaderboard(field);
}
window.switchLbTab = switchLbTab;

function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelector(`[data-page="${page}"]`).classList.add('active');
  const titles = {shop:'Shop',inventory:'Inventory',upgrades:'Upgrades',prestige:'Prestige',leaderboard:'Leaderboard'};
  document.getElementById('topbar-title').textContent = titles[page] || page;
  if (page === 'inventory')   renderInventory();
  if (page === 'upgrades')    renderUpgrades();
  if (page === 'prestige')    renderPrestige();
  if (page === 'leaderboard' && window.loadLeaderboard) window.loadLeaderboard(currentLbTab);
}
window.navigate = navigate;

function openAuth()  { document.getElementById('auth-overlay').classList.remove('hidden'); }
function closeAuth() { document.getElementById('auth-overlay').classList.add('hidden'); }
function toggleAuthMode() {
  window._authMode = window._authMode === 'login' ? 'register' : 'login';
  const reg = window._authMode === 'register';
  document.getElementById('auth-title').textContent      = reg ? 'Create Account' : 'Sign In';
  document.getElementById('auth-sub').textContent        = reg ? 'Join and save your progress' : 'Save your progress to the cloud';
  document.getElementById('auth-submit-btn').textContent = reg ? 'Register' : 'Sign In';
  document.getElementById('auth-toggle-btn').textContent = reg ? 'Have an account? Sign In' : 'No account? Register';
  document.getElementById('auth-error').classList.add('hidden');
}
window.openAuth       = openAuth;
window.closeAuth      = closeAuth;
window.toggleAuthMode = toggleAuthMode;
window.sellItem       = sellItem;
window.sellAll        = sellAll;
window.toggleAuto     = toggleAuto;
window.openCase       = openCase;
window.selectCrate    = selectCrate;


function getSaveData() {
  return { balance, inventory, upgrades, casesOpened, prestigeLevel, prestigeHistory,
           casesWithoutHit, casesSinceRare };
}

function loadSaveData(d) {
  if (d.balance       != null) balance       = d.balance;
  if (d.inventory     != null) inventory     = d.inventory;
  if (d.upgrades      != null) upgrades      = { ...upgrades, ...d.upgrades };
  if (d.casesOpened   != null) casesOpened   = d.casesOpened;
  if (d.prestigeLevel != null) prestigeLevel = d.prestigeLevel;
  if (d.prestigeHistory)       prestigeHistory = d.prestigeHistory;
  if (d.casesWithoutHit)       casesWithoutHit = d.casesWithoutHit;
  if (d.casesSinceRare)        casesSinceRare  = d.casesSinceRare;
  renderShop();
  renderInventory();
  renderUpgrades();
  renderPrestige();
  updateBalance();
  updateStats();
  updatePrestigeBadge();
  restartPassive();
}

window.getSaveData  = getSaveData;
window.loadSaveData = loadSaveData;

let _saveScheduled = false;
function scheduleCloudSave() {
  if (_saveScheduled) return;
  _saveScheduled = true;
  setTimeout(() => { _saveScheduled = false; if (window.cloudSave) window.cloudSave(); }, 5000);
}

autoSaveTimer = setInterval(() => { if (window._fbUser && window.cloudSave) window.cloudSave(); }, 60000);

renderShop();
renderInventory();
renderUpgrades();
renderPrestige();
updateBalance();
updateStats();
restartPassive();
