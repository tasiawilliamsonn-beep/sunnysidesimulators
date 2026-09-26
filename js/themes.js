/*
 * Crossroads Escapes: visual themes.
 * EscapeThemes() returns every theme. Like EscapePlayer, it must stay
 * self-contained because its source is copied into exported rooms.
 *
 * Each theme: font (Google Fonts family), gf (URL fragment), emblem (SVG),
 * v (CSS custom properties), css (extra rules scoped with .th-ID).
 */
function EscapeThemes() {
  var STARS = 'radial-gradient(1.4px 1.4px at 22px 34px,#fff,transparent),radial-gradient(1px 1px at 90px 130px,#dfe6ff,transparent),radial-gradient(1.6px 1.6px at 160px 70px,#fff,transparent),radial-gradient(1px 1px at 210px 190px,#fff,transparent),radial-gradient(1.2px 1.2px at 60px 210px,#cfd8ff,transparent)';
  var STAR_SIZE = ';background-size:240px 240px';
  var T = {
    pizzeria: {
      name: 'Pizzeria', font: 'Lilita One', gf: 'Lilita+One',
      v: { bg: '#F3E3C3', ink: '#2A1A12', muted: '#6B5646', card: '#FFFDF7', 'card-ink': '#2A1A12', 'card-head': '#8E1A1F', line: '#2A1A12', panel: '#23392F', 'panel-ink': '#F4F1E6', 'panel-dim': '#C9D3C8', 'panel-frame': '10px solid #7A4E2D', accent: '#C8272D', 'accent-dark': '#8E1A1F', 'accent-ink': '#fff', accent2: '#F7D774', sign: '#C8272D', 'sign-shadow': '#E9B45C', band: 'linear-gradient(45deg,#C8272D 25%,transparent 25%,transparent 75%,#C8272D 75%) 0 0/46px 46px,linear-gradient(45deg,#C8272D 25%,transparent 25%,transparent 75%,#C8272D 75%) 23px 23px/46px 46px,#fff', 'band-edge': '#8E1A1F' },
      emblem: '<circle cx="32" cy="32" r="28" fill="#E9B45C"/><circle cx="32" cy="32" r="23" fill="#F7D774"/><circle cx="24" cy="24" r="5" fill="#C8272D"/><circle cx="40" cy="27" r="5" fill="#C8272D"/><circle cx="30" cy="41" r="5" fill="#C8272D"/><circle cx="43" cy="42" r="3" fill="#3E7C3A"/><path d="M32 32 L32 4 M32 32 L56 46 M32 32 L8 46" stroke="#E9B45C" stroke-width="2.5"/>'
    },
    sweets: {
      name: 'Sweet Shop', font: 'Chewy', gf: 'Chewy',
      v: { bg: '#FCEFF3', 'bg-img': 'radial-gradient(#F6CAD7 1.6px,transparent 1.8px)', 'bg-size': '22px 22px', ink: '#4A2233', muted: '#8A5B6C', card: '#FFFFFF', 'card-ink': '#4A2233', 'card-head': '#C23B67', line: '#4A2233', panel: '#FFF6E8', 'panel-ink': '#4A2233', 'panel-dim': '#8A5B6C', 'panel-frame': '6px dashed #E88FAA', accent: '#E2557B', 'accent-dark': '#A8304F', 'accent-ink': '#fff', accent2: '#8FD3C1', sign: '#E2557B', 'sign-shadow': '#8FD3C1', band: 'repeating-linear-gradient(90deg,#F7A8BF 0 28px,#FFF3E0 28px 56px)', 'band-edge': '#A8304F' },
      emblem: '<path d="M14 30 Q32 6 50 30 Z" fill="#F7A8BF"/><circle cx="32" cy="12" r="5" fill="#E2557B"/><path d="M16 30 H48 L43 58 H21 Z" fill="#8FD3C1"/><path d="M22 30 L25 58 M32 30 V58 M42 30 L39 58" stroke="#5FB3A0" stroke-width="2"/>'
    },
    lab: {
      name: 'Science Lab', font: 'Chakra Petch', gf: 'Chakra+Petch:wght@700',
      v: { bg: '#E8F0F1', 'bg-img': 'linear-gradient(#cfdfe2 1px,transparent 1px),linear-gradient(90deg,#cfdfe2 1px,transparent 1px)', 'bg-size': '24px 24px', ink: '#102A33', muted: '#4B6570', card: '#FFFFFF', 'card-ink': '#102A33', 'card-head': '#0E6F73', line: '#102A33', panel: '#0F2A33', 'panel-ink': '#E3FBFF', 'panel-dim': '#9FC7CE', 'panel-frame': '6px solid #4B6570', accent: '#0E8C8C', 'accent-dark': '#075C5C', 'accent-ink': '#fff', accent2: '#F2C230', sign: '#0E6F73', 'sign-shadow': '#F2C230', band: 'repeating-linear-gradient(-45deg,#F2C230 0 22px,#1B1B1B 22px 44px)', 'band-edge': '#1B1B1B' },
      emblem: '<path d="M24 6 H40 M27 6 V24 L10 54 Q8 58 13 58 H51 Q56 58 54 54 L37 24 V6" fill="#E3FBFF" stroke="#102A33" stroke-width="3" stroke-linejoin="round"/><path d="M17 42 H47 L53 54 Q54 57 51 57 H13 Q10 57 11 54 Z" fill="#0E8C8C"/><circle cx="28" cy="48" r="3" fill="#E3FBFF"/><circle cx="38" cy="44" r="2" fill="#E3FBFF"/>'
    },
    museum: {
      name: 'Museum', font: 'Cinzel', gf: 'Cinzel:wght@700;900',
      v: { bg: '#1E4648', 'bg-img': 'radial-gradient(circle at 50% 0,rgba(255,255,255,.14),transparent 60%)', ink: '#F4EEDC', muted: '#C9D8CF', card: '#FBF6E9', 'card-ink': '#2B2417', 'card-head': '#7A5A12', line: '#2B2417', panel: '#FBF6E9', 'panel-ink': '#2B2417', 'panel-dim': '#6B5F48', 'panel-frame': '12px solid #B8913A', accent: '#B8913A', 'accent-dark': '#7A5A12', 'accent-ink': '#1B1405', accent2: '#E7D39A', sign: '#F1D98A', 'sign-shadow': '#0E2628', band: 'linear-gradient(#E7C66A,#9C7426 45%,#E7C66A 55%,#7A5A12)', 'band-edge': '#5B4210' },
      css: '.th-museum .ep-panel{box-shadow:inset 0 0 0 3px #E7D39A,inset 0 0 0 10px #FBF6E9,inset 0 0 0 12px #d9c89a,0 12px 26px rgba(0,0,0,.45)}',
      emblem: '<rect x="6" y="8" width="52" height="48" fill="#B8913A"/><rect x="12" y="14" width="40" height="36" fill="#FBF6E9"/><path d="M14 46 L26 30 L34 40 L40 34 L50 46 Z" fill="#1E4648"/><circle cx="42" cy="23" r="4" fill="#E7C66A"/>'
    },
    detective: {
      name: 'Detective Agency', font: 'Special Elite', gf: 'Special+Elite',
      v: { bg: '#2E221B', 'bg-img': 'repeating-linear-gradient(90deg,rgba(255,255,255,.035) 0 3px,transparent 3px 11px)', ink: '#F2E6CF', muted: '#CDBB9C', card: '#E9DAB4', 'card-ink': '#2A2014', 'card-head': '#8B1E16', line: '#2A2014', panel: '#F6EEDB', 'panel-ink': '#2A2014', 'panel-dim': '#6E5B40', 'panel-frame': '3px solid #2A2014', accent: '#A8261C', 'accent-dark': '#6C150F', 'accent-ink': '#fff', accent2: '#F4C430', sign: '#F4C430', 'sign-shadow': '#000', band: 'repeating-linear-gradient(-45deg,#F4C430 0 26px,#151515 26px 34px)', 'band-edge': '#151515' },
      css: '.th-detective .ep-panel{background-image:linear-gradient(90deg,transparent 30px,#e39b9b 30px 32px,transparent 32px);padding-left:48px}.th-detective .ep-card{border-radius:4px 16px 4px 4px}',
      emblem: '<circle cx="26" cy="26" r="16" fill="#F6EEDB" stroke="#2A2014" stroke-width="5"/><path d="M38 38 L56 56" stroke="#2A2014" stroke-width="8" stroke-linecap="round"/><path d="M18 22 Q24 16 30 18" stroke="#A8261C" stroke-width="3" fill="none"/>'
    },
    space: {
      name: 'Starship', font: 'Orbitron', gf: 'Orbitron:wght@700;900',
      v: { bg: '#0B1026', 'bg-img': STARS, 'bg-size': '240px 240px', ink: '#E6EBFF', muted: '#A9B4E0', card: '#151D45', 'card-ink': '#E6EBFF', 'card-head': '#7EF0E0', line: '#3B4BA0', panel: '#0F1636', 'panel-ink': '#E6EBFF', 'panel-dim': '#A9B4E0', 'panel-frame': '3px solid #3FE0D0', accent: '#6C63FF', 'accent-dark': '#3E36B8', 'accent-ink': '#fff', accent2: '#3FE0D0', sign: '#7EF0E0', 'sign-shadow': '#6C63FF', band: STARS + ',linear-gradient(90deg,#1b1f5e,#5a2a8a,#1b6f8a,#1b1f5e)', 'band-edge': '#3FE0D0' },
      css: '.th-space .ep-panel{box-shadow:0 0 0 1px #3FE0D0,0 0 28px rgba(63,224,208,.28)}.th-space .ep-card{border-color:#3B4BA0}',
      emblem: '<circle cx="32" cy="32" r="14" fill="#6C63FF"/><ellipse cx="32" cy="32" rx="28" ry="8" fill="none" stroke="#3FE0D0" stroke-width="3" transform="rotate(-20 32 32)"/><circle cx="12" cy="12" r="2" fill="#fff"/><circle cx="54" cy="16" r="1.5" fill="#fff"/><circle cx="50" cy="54" r="2" fill="#fff"/>'
    },
    observatory: {
      name: 'Observatory', font: 'Marcellus SC', gf: 'Marcellus+SC',
      v: { bg: '#16203A', 'bg-img': STARS, 'bg-size': '240px 240px', ink: '#EFE6CF', muted: '#BFB59A', card: '#F3EAD3', 'card-ink': '#2A2416', 'card-head': '#6B4E16', line: '#2A2416', panel: '#1E2B4A', 'panel-ink': '#F3EAD3', 'panel-dim': '#BFB59A', 'panel-frame': '8px solid #B08A3E', accent: '#B08A3E', 'accent-dark': '#6B4E16', 'accent-ink': '#1a1206', accent2: '#E9C977', sign: '#E9C977', 'sign-shadow': '#0a0f1e', band: 'radial-gradient(circle at 12px 50%,#F3D98B 4px,#8a6a2a 5px,transparent 6px) 0 0/24px 100%,linear-gradient(#C9A24A,#8A6A2A)', 'band-edge': '#4F3B12' },
      emblem: '<path d="M10 50 L40 20 L48 28 L18 58 Z" fill="#B08A3E"/><path d="M40 20 L46 14 L54 22 L48 28 Z" fill="#E9C977"/><path d="M28 44 L22 60 M28 44 L36 60" stroke="#F3EAD3" stroke-width="3"/><circle cx="14" cy="14" r="2" fill="#fff"/><circle cx="30" cy="8" r="1.5" fill="#fff"/>'
    },
    night: {
      name: 'Moonlit Night', font: 'Fredoka', gf: 'Fredoka:wght@600;700',
      v: { bg: '#221A3D', 'bg-img': STARS, 'bg-size': '240px 240px', ink: '#F1EAFF', muted: '#C5B8E6', card: '#FFFBF0', 'card-ink': '#2A2140', 'card-head': '#5A3FA0', line: '#2A2140', panel: '#2E2552', 'panel-ink': '#F1EAFF', 'panel-dim': '#C5B8E6', 'panel-frame': '4px solid #F2D16B', accent: '#F2D16B', 'accent-dark': '#A88A26', 'accent-ink': '#2A2140', accent2: '#9C7CF4', sign: '#F2D16B', 'sign-shadow': '#5A3FA0', band: 'radial-gradient(circle at 22px 50%,#F2D16B 9px,transparent 10px) 0 0/44px 100%,#2E2552', 'band-edge': '#F2D16B' },
      emblem: '<circle cx="34" cy="30" r="22" fill="#F2D16B"/><circle cx="44" cy="24" r="20" fill="#221A3D"/><circle cx="12" cy="50" r="2" fill="#fff"/><circle cx="52" cy="54" r="1.5" fill="#fff"/><circle cx="54" cy="10" r="1.5" fill="#fff"/>'
    },
    forest: {
      name: 'Forest Trail', font: 'Bree Serif', gf: 'Bree+Serif',
      v: { bg: '#E6EED7', ink: '#1F3322', muted: '#4E6450', card: '#FFFDF4', 'card-ink': '#1F3322', 'card-head': '#2F6B3A', line: '#1F3322', panel: '#6B4A2B', 'panel-ink': '#FFF6E3', 'panel-dim': '#E7D3B2', 'panel-frame': '6px solid #3F2A16', accent: '#2F6B3A', 'accent-dark': '#1B4323', 'accent-ink': '#fff', accent2: '#E09A3B', sign: '#2F6B3A', 'sign-shadow': '#E09A3B', band: 'conic-gradient(from 135deg at 50% 0,#2F6B3A 90deg,#CFE3B4 0) 0 0/30px 100%', 'band-edge': '#1B4323' },
      css: '.th-forest .ep-panel{background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 2px,transparent 2px 15px),repeating-linear-gradient(90deg,rgba(255,255,255,.04) 0 1px,transparent 1px 7px)}',
      emblem: '<path d="M32 4 L50 30 H40 L54 50 H10 L24 30 H14 Z" fill="#2F6B3A"/><rect x="28" y="50" width="8" height="10" fill="#6B4A2B"/>'
    },
    ocean: {
      name: 'Deep Water', font: 'Fredoka', gf: 'Fredoka:wght@600;700',
      v: { bg: '#D8F1F6', ink: '#0B3148', muted: '#3F6478', card: '#FFFFFF', 'card-ink': '#0B3148', 'card-head': '#0B6E99', line: '#0B3148', panel: '#0A4461', 'panel-ink': '#E6F8FF', 'panel-dim': '#A9D6E8', 'panel-frame': '4px solid #5CC6E8', accent: '#0B6E99', 'accent-dark': '#074A68', 'accent-ink': '#fff', accent2: '#FFB547', sign: '#0B6E99', 'sign-shadow': '#9BE3F2', band: 'radial-gradient(circle at 50% 0,transparent 14px,#0B6E99 15px) 0 0/40px 100%,#9BE3F2', 'band-edge': '#074A68' },
      css: '.th-ocean .ep-panel{background-image:radial-gradient(circle at 90% 20%,rgba(255,255,255,.08) 0 18px,transparent 19px),radial-gradient(circle at 80% 70%,rgba(255,255,255,.06) 0 10px,transparent 11px)}',
      emblem: '<path d="M8 36 Q20 20 36 30 Q46 22 56 30 Q46 40 36 34 Q20 48 8 36 Z" fill="#FFB547"/><circle cx="18" cy="33" r="2.5" fill="#0B3148"/><path d="M4 52 Q14 46 24 52 T44 52 T64 52" stroke="#0B6E99" stroke-width="4" fill="none"/>'
    },
    soil: {
      name: 'Underground', font: 'Luckiest Guy', gf: 'Luckiest+Guy',
      v: { bg: '#F0E4D0', ink: '#2E1F12', muted: '#6B5540', card: '#FFFBF2', 'card-ink': '#2E1F12', 'card-head': '#6E3F1A', line: '#2E1F12', panel: '#3A2A1C', 'panel-ink': '#F8ECD6', 'panel-dim': '#D4BE9C', 'panel-frame': '6px solid #1E150C', accent: '#6F9A2E', 'accent-dark': '#465F1A', 'accent-ink': '#fff', accent2: '#E3B34A', sign: '#6E3F1A', 'sign-shadow': '#CDA36B', band: 'radial-gradient(circle at 6px 72%,#8A6040 2px,transparent 3px) 0 0/18px 100%,linear-gradient(#6FA23A 0 34%,#5B3A21 34%)', 'band-edge': '#2E1F12' },
      css: '.th-soil .ep-panel{background-image:radial-gradient(circle,rgba(255,255,255,.06) 2px,transparent 3px);background-size:22px 18px}',
      emblem: '<path d="M8 30 Q20 18 32 30 Q44 18 56 30 V34 H8 Z" fill="#6FA23A"/><rect x="8" y="34" width="48" height="24" fill="#5B3A21"/><path d="M20 38 Q30 44 26 52 Q34 50 40 44" stroke="#E7A0A0" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M40 20 Q42 10 48 8 Q48 16 40 20" fill="#6FA23A"/>'
    },
    parchment: {
      name: 'Colonial Parchment', font: 'IM Fell English SC', gf: 'IM+Fell+English+SC',
      v: { bg: '#EADBB8', 'bg-img': 'radial-gradient(ellipse at center,rgba(255,250,235,.65),rgba(120,80,30,.2))', ink: '#2B1E10', muted: '#5E4A2E', card: '#F7EDD3', 'card-ink': '#2B1E10', 'card-head': '#7A1F1F', line: '#3E2B14', panel: '#F3E6C5', 'panel-ink': '#2B1E10', 'panel-dim': '#5E4A2E', 'panel-frame': '6px double #5E4A2E', accent: '#7A1F1F', 'accent-dark': '#4A1010', 'accent-ink': '#fff', accent2: '#2C3E6B', sign: '#7A1F1F', 'sign-shadow': '#D6BE85', band: 'repeating-linear-gradient(90deg,#5E4A2E 0 2px,transparent 2px 10px),linear-gradient(#D6BE85,#B99A5B)', 'band-edge': '#3E2B14' },
      emblem: '<path d="M14 8 H46 Q52 8 52 14 V56 H18 Q12 56 12 50 V14 Q12 8 14 8 Z" fill="#F7EDD3" stroke="#3E2B14" stroke-width="3"/><path d="M20 20 H44 M20 28 H44 M20 36 H36" stroke="#5E4A2E" stroke-width="2.5"/><path d="M50 4 L36 44 L40 46 L54 6 Z" fill="#7A1F1F"/>'
    },
    ship: {
      name: 'Ship\'s Cabin', font: 'Pirata One', gf: 'Pirata+One',
      v: { bg: '#D9C49A', 'bg-img': 'linear-gradient(rgba(90,60,30,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(90,60,30,.08) 1px,transparent 1px)', 'bg-size': '48px 48px', ink: '#2A1A0E', muted: '#5C4428', card: '#F4E7C8', 'card-ink': '#2A1A0E', 'card-head': '#8C2F1E', line: '#2A1A0E', panel: '#4A2E1C', 'panel-ink': '#F8EBCB', 'panel-dim': '#DCC49A', 'panel-frame': '8px solid #2A1A0E', accent: '#8C2F1E', 'accent-dark': '#561A0F', 'accent-ink': '#fff', accent2: '#E2B046', sign: '#8C2F1E', 'sign-shadow': '#F4E7C8', band: 'repeating-linear-gradient(45deg,#C9A66B 0 8px,#8A6A3A 8px 12px)', 'band-edge': '#5C4428' },
      css: '.th-ship .ep-panel{background-image:repeating-linear-gradient(0deg,rgba(0,0,0,.14) 0 2px,transparent 2px 46px)}',
      emblem: '<circle cx="32" cy="32" r="16" fill="none" stroke="#8C2F1E" stroke-width="5"/><circle cx="32" cy="32" r="5" fill="#8C2F1E"/><path d="M32 4 V60 M4 32 H60 M12 12 L52 52 M52 12 L12 52" stroke="#8C2F1E" stroke-width="4" stroke-linecap="round"/>'
    },
    civic: {
      name: 'Capitol', font: 'Alfa Slab One', gf: 'Alfa+Slab+One',
      v: { bg: '#F6F2E9', ink: '#14213D', muted: '#4A5673', card: '#FFFFFF', 'card-ink': '#14213D', 'card-head': '#B22234', line: '#14213D', panel: '#1E3A6E', 'panel-ink': '#FFFFFF', 'panel-dim': '#C7D2EA', 'panel-frame': '6px solid #B22234', accent: '#B22234', 'accent-dark': '#7A1522', 'accent-ink': '#fff', accent2: '#F2C14E', sign: '#1E3A6E', 'sign-shadow': '#F2A0A8', band: 'radial-gradient(circle,#fff 2px,transparent 2.6px) 0 0/16px 14px,linear-gradient(#1E3A6E,#1E3A6E) 0 0/180px 100% no-repeat,repeating-linear-gradient(#B22234 0 7px,#fff 7px 14px)', 'band-edge': '#14213D' },
      emblem: '<path d="M10 56 H54 V52 H10 Z M14 52 V34 M22 52 V34 M30 52 V34 M38 52 V34 M46 52 V34 M50 52 V34" stroke="#1E3A6E" stroke-width="3" fill="#1E3A6E"/><path d="M8 34 H56 L32 22 Z" fill="#1E3A6E"/><path d="M22 22 Q32 6 42 22 Z" fill="#B22234"/><circle cx="32" cy="8" r="3" fill="#F2C14E"/>'
    },
    library: {
      name: 'Old Library', font: 'Alegreya SC', gf: 'Alegreya+SC:wght@700;800',
      v: { bg: '#EFE6D2', ink: '#2A1F17', muted: '#6A5846', card: '#FFFBF1', 'card-ink': '#2A1F17', 'card-head': '#6B2233', line: '#2A1F17', panel: '#22392C', 'panel-ink': '#F6EFD9', 'panel-dim': '#C8C0A5', 'panel-frame': '8px solid #6B4A2B', accent: '#6B2233', 'accent-dark': '#45131F', 'accent-ink': '#fff', accent2: '#D4AF37', sign: '#6B2233', 'sign-shadow': '#D4AF37', band: 'repeating-linear-gradient(90deg,#6B2233 0 18px,#D4AF37 18px 21px,#22392C 21px 40px,#D4AF37 40px 43px,#2C4A7A 43px 60px,#E8D9B0 60px 63px,#8A5A2B 63px 80px,#D4AF37 80px 83px)', 'band-edge': '#2A1F17' },
      emblem: '<rect x="8" y="12" width="10" height="44" fill="#6B2233"/><rect x="20" y="8" width="9" height="48" fill="#22392C"/><rect x="31" y="14" width="10" height="42" fill="#2C4A7A"/><path d="M44 16 L52 14 L60 54 L52 56 Z" fill="#8A5A2B"/><path d="M8 20 H18 M20 16 H29 M31 22 H41" stroke="#D4AF37" stroke-width="2"/>'
    },
    gameshow: {
      name: 'Game Show', font: 'Bungee', gf: 'Bungee',
      v: { bg: '#2A0E4A', 'bg-img': 'radial-gradient(ellipse at 50% -10%,rgba(255,200,80,.35),transparent 60%)', ink: '#FFF3D6', muted: '#D9C3F2', card: '#FFF8E7', 'card-ink': '#2A0E4A', 'card-head': '#B01E77', line: '#2A0E4A', panel: '#160530', 'panel-ink': '#FFF3D6', 'panel-dim': '#D9C3F2', 'panel-frame': '6px solid #FFC53D', accent: '#FF4FA3', 'accent-dark': '#B01E77', 'accent-ink': '#fff', accent2: '#FFC53D', sign: '#FFC53D', 'sign-shadow': '#FF4FA3', band: 'radial-gradient(circle,#FFF6C7 5px,#FFC53D 6px,transparent 8px) 0 0/28px 100%,#B01E77', 'band-edge': '#FFC53D' },
      css: '.th-gameshow .ep-panel{box-shadow:0 0 0 3px #B01E77,0 0 30px rgba(255,197,61,.35)}',
      emblem: '<path d="M32 4 L39 23 H59 L43 35 L49 55 L32 43 L15 55 L21 35 L5 23 H25 Z" fill="#FFC53D" stroke="#B01E77" stroke-width="3" stroke-linejoin="round"/>'
    },
    garden: {
      name: 'Butterfly Garden', font: 'Baloo 2', gf: 'Baloo+2:wght@700;800',
      v: { bg: '#FFF6E0', ink: '#2D3A1E', muted: '#5E6B47', card: '#FFFFFF', 'card-ink': '#2D3A1E', 'card-head': '#D0601A', line: '#2D3A1E', panel: '#EAF6FF', 'panel-ink': '#1E3346', 'panel-dim': '#4E6A80', 'panel-frame': '6px solid #3F7D3A', accent: '#E0701B', 'accent-dark': '#9C4A0E', 'accent-ink': '#fff', accent2: '#3F7D3A', sign: '#E0701B', 'sign-shadow': '#2D3A1E', band: 'radial-gradient(circle at 50% 55%,#FFD23F 4px,#E0701B 5px 9px,transparent 10px) 0 0/32px 100%,#9CCB6B', 'band-edge': '#3F7D3A' },
      emblem: '<path d="M32 30 Q14 4 6 20 Q2 34 30 34 Z M32 30 Q50 4 58 20 Q62 34 34 34 Z" fill="#E0701B" stroke="#2D3A1E" stroke-width="2.5"/><path d="M30 36 Q12 40 14 54 Q24 58 31 38 Z M34 36 Q52 40 50 54 Q40 58 33 38 Z" fill="#F59A3B" stroke="#2D3A1E" stroke-width="2.5"/><rect x="30" y="24" width="4" height="30" rx="2" fill="#2D3A1E"/>'
    },
    newsroom: {
      name: 'Newsroom', font: 'Abril Fatface', gf: 'Abril+Fatface',
      v: { bg: '#F3F0E7', ink: '#111111', muted: '#555555', card: '#FFFFFF', 'card-ink': '#111111', 'card-head': '#111111', line: '#111111', panel: '#FFFFFF', 'panel-ink': '#111111', 'panel-dim': '#555555', 'panel-frame': '4px double #111111', accent: '#C0392B', 'accent-dark': '#7B1F16', 'accent-ink': '#fff', accent2: '#111111', sign: '#111111', 'sign-shadow': '#E8B4AC', band: 'linear-gradient(#111,#111) 0 7px/100% 4px no-repeat,linear-gradient(#111,#111) 0 16px/100% 1px no-repeat,repeating-linear-gradient(90deg,#fff 0 90px,#e4e0d4 90px 91px)', 'band-edge': '#111111' },
      emblem: '<rect x="6" y="10" width="46" height="44" fill="#fff" stroke="#111" stroke-width="3"/><rect x="52" y="20" width="6" height="34" fill="#ddd" stroke="#111" stroke-width="2"/><rect x="11" y="15" width="36" height="7" fill="#111"/><path d="M11 28 H28 M11 33 H28 M11 38 H28 M11 43 H28 M11 48 H28" stroke="#555" stroke-width="2"/><rect x="31" y="27" width="16" height="22" fill="#C0392B"/>'
    },
    comic: {
      name: 'Comic Book', font: 'Bangers', gf: 'Bangers',
      v: { bg: '#FFE14D', 'bg-img': 'radial-gradient(#F2B705 2px,transparent 2.6px)', 'bg-size': '14px 14px', ink: '#111111', muted: '#333333', card: '#FFFFFF', 'card-ink': '#111111', 'card-head': '#E4252D', line: '#111111', panel: '#FFFFFF', 'panel-ink': '#111111', 'panel-dim': '#333333', 'panel-frame': '4px solid #111111', accent: '#E4252D', 'accent-dark': '#111111', 'accent-ink': '#fff', accent2: '#1D5FD1', sign: '#E4252D', 'sign-shadow': '#111', band: 'repeating-linear-gradient(-60deg,#1D5FD1 0 20px,#E4252D 20px 40px,#FFFFFF 40px 60px)', 'band-edge': '#111111' },
      css: '.th-comic .ep-card,.th-comic .ep-panel{box-shadow:7px 7px 0 #111}.th-comic .ep-sign{letter-spacing:.03em}',
      emblem: '<path d="M32 2 L38 20 L58 12 L46 28 L62 38 L42 40 L46 60 L32 46 L18 60 L22 40 L2 38 L18 28 L6 12 L26 20 Z" fill="#E4252D" stroke="#111" stroke-width="3" stroke-linejoin="round"/><path d="M22 30 H42 M26 36 H38" stroke="#FFE14D" stroke-width="4" stroke-linecap="round"/>'
    },
    wizard: {
      name: 'Wizard\'s Tower', font: 'Uncial Antiqua', gf: 'Uncial+Antiqua',
      v: { bg: '#231A3B', 'bg-img': STARS, 'bg-size': '240px 240px', ink: '#F4EEFF', muted: '#CDBFEA', card: '#F7EDD8', 'card-ink': '#2A1E3F', 'card-head': '#5B2E91', line: '#2A1E3F', panel: '#33245A', 'panel-ink': '#F4EEFF', 'panel-dim': '#CDBFEA', 'panel-frame': '4px solid #F4C95D', accent: '#9B6BFF', 'accent-dark': '#5B2E91', 'accent-ink': '#fff', accent2: '#F4C95D', sign: '#F4C95D', 'sign-shadow': '#9B6BFF', band: 'radial-gradient(circle,#F4C95D 2px,transparent 3px) 0 0/22px 20px,repeating-linear-gradient(90deg,#5B2E91 0 22px,#33245A 22px 44px)', 'band-edge': '#F4C95D' },
      emblem: '<path d="M10 54 H54 Q48 48 42 48 L30 6 L20 48 Q14 48 10 54 Z" fill="#9B6BFF" stroke="#2A1E3F" stroke-width="2.5" stroke-linejoin="round"/><path d="M28 24 L30 28 L34 28 L31 31 L32 35 L28 33 L24 35 L25 31 L22 28 L26 28 Z" fill="#F4C95D"/><path d="M20 46 H42" stroke="#F4C95D" stroke-width="3"/>'
    },
    racing: {
      name: 'Speedway', font: 'Racing Sans One', gf: 'Racing+Sans+One',
      v: { bg: '#ECEEF1', ink: '#15171B', muted: '#555B66', card: '#FFFFFF', 'card-ink': '#15171B', 'card-head': '#D7261E', line: '#15171B', panel: '#1B1E23', 'panel-ink': '#F3F4F6', 'panel-dim': '#B5BAC4', 'panel-frame': '6px solid #D7261E', accent: '#D7261E', 'accent-dark': '#8C140F', 'accent-ink': '#fff', accent2: '#FFCC00', sign: '#15171B', 'sign-shadow': '#D7261E', band: 'conic-gradient(#15171B 25%,#fff 0 50%,#15171B 0 75%,#fff 0) 0 0/22px 22px', 'band-edge': '#15171B' },
      css: '.th-racing .ep-panel{background-image:linear-gradient(90deg,transparent 90%,rgba(215,38,30,.4) 90% 93%,transparent 93% 95%,rgba(255,204,0,.35) 95% 98%,transparent 98%)}.th-racing .ep-sign{font-style:italic}',
      emblem: '<path d="M14 6 V60" stroke="#15171B" stroke-width="4"/><path d="M16 8 H56 V36 H16 Z" fill="#fff" stroke="#15171B" stroke-width="2"/><path d="M16 8 H26 V15 H16 Z M36 8 H46 V15 H36 Z M26 15 H36 V22 H26 Z M46 15 H56 V22 H46 Z M16 22 H26 V29 H16 Z M36 22 H46 V29 H36 Z M26 29 H36 V36 H26 Z M46 29 H56 V36 H46 Z" fill="#15171B"/>'
    },
    vault: {
      name: 'Bank Vault', font: 'Russo One', gf: 'Russo+One',
      v: { bg: '#2A2F36', 'bg-img': 'linear-gradient(115deg,rgba(255,255,255,.06),transparent 40%,rgba(255,255,255,.04))', ink: '#EEF1F4', muted: '#B7C0CA', card: '#F1F3F5', 'card-ink': '#1C2127', 'card-head': '#8A6A0C', line: '#1C2127', panel: '#3A424D', 'panel-ink': '#F5F7F9', 'panel-dim': '#C3CCD6', 'panel-frame': '8px solid #1C2127', accent: '#D4A017', 'accent-dark': '#8A6A0C', 'accent-ink': '#1C1403', accent2: '#7FD1AE', sign: '#D4A017', 'sign-shadow': '#000', band: 'repeating-linear-gradient(45deg,#9AA4AF 0 4px,#6B7580 4px 12px),repeating-linear-gradient(-45deg,#9AA4AF 0 4px,transparent 4px 12px)', 'band-edge': '#1C2127' },
      css: '.th-vault .ep-panel{background-image:radial-gradient(circle at 14px 14px,#9AA4AF 4px,transparent 5px),radial-gradient(circle at calc(100% - 14px) 14px,#9AA4AF 4px,transparent 5px),radial-gradient(circle at 14px calc(100% - 14px),#9AA4AF 4px,transparent 5px),radial-gradient(circle at calc(100% - 14px) calc(100% - 14px),#9AA4AF 4px,transparent 5px)}',
      emblem: '<circle cx="32" cy="32" r="27" fill="#6B7580" stroke="#1C2127" stroke-width="3"/><circle cx="32" cy="32" r="16" fill="#D4A017" stroke="#1C2127" stroke-width="3"/><path d="M32 16 V22 M32 42 V48 M16 32 H22 M42 32 H48" stroke="#1C2127" stroke-width="3"/><circle cx="32" cy="32" r="4" fill="#1C2127"/>'
    },
    warehouse: {
      name: 'Warehouse', font: 'Staatliches', gf: 'Staatliches',
      v: { bg: '#EAD9BD', ink: '#2B2014', muted: '#6A5638', card: '#FFF8EA', 'card-ink': '#2B2014', 'card-head': '#B6490B', line: '#2B2014', panel: '#C9A26B', 'panel-ink': '#2B2014', 'panel-dim': '#5A4526', 'panel-frame': '4px solid #2B2014', accent: '#E36414', 'accent-dark': '#9A3F07', 'accent-ink': '#fff', accent2: '#2E6F95', sign: '#E36414', 'sign-shadow': '#2B2014', band: 'repeating-linear-gradient(90deg,#B58549 0 44px,#8C6232 44px 50px)', 'band-edge': '#2B2014' },
      css: '.th-warehouse .ep-panel{background-image:linear-gradient(90deg,transparent 42%,rgba(240,225,190,.85) 42% 58%,transparent 58%);background-size:100% 24px;background-repeat:no-repeat}',
      emblem: '<path d="M8 22 L32 10 L56 22 V48 L32 60 L8 48 Z" fill="#C9A26B" stroke="#2B2014" stroke-width="3" stroke-linejoin="round"/><path d="M8 22 L32 34 L56 22 M32 34 V60" stroke="#2B2014" stroke-width="3" fill="none"/><path d="M20 16 L44 28" stroke="#F0E1BE" stroke-width="6"/>'
    },
    arctic: {
      name: 'Arctic', font: 'Baloo 2', gf: 'Baloo+2:wght@700;800',
      v: { bg: '#EAF6FB', 'bg-img': 'radial-gradient(#fff 2px,transparent 3px)', 'bg-size': '30px 30px', ink: '#10324A', muted: '#4F6E84', card: '#FFFFFF', 'card-ink': '#10324A', 'card-head': '#2F6FA7', line: '#10324A', panel: '#D6EEF8', 'panel-ink': '#10324A', 'panel-dim': '#4F6E84', 'panel-frame': '4px solid #7FB8D9', accent: '#2F6FA7', 'accent-dark': '#1B4B75', 'accent-ink': '#fff', accent2: '#E85D75', sign: '#2F6FA7', 'sign-shadow': '#BFE3F3', band: 'conic-gradient(from -45deg at 50% 100%,#BFE3F3 90deg,#FFFFFF 0) 0 0/26px 100%', 'band-edge': '#7FB8D9' },
      emblem: '<path d="M32 4 V60 M8 18 L56 46 M8 46 L56 18" stroke="#2F6FA7" stroke-width="4" stroke-linecap="round"/><path d="M26 8 L32 14 L38 8 M26 56 L32 50 L38 56 M10 26 L16 22 L12 16 M54 38 L48 42 L52 48 M10 38 L16 42 L12 48 M54 26 L48 22 L52 16" stroke="#2F6FA7" stroke-width="3" fill="none" stroke-linecap="round"/>'
    },
    sky: {
      name: 'Up in the Sky', font: 'Sniglet', gf: 'Sniglet:wght@800',
      v: { bg: '#BFE6FF', 'bg-img': 'linear-gradient(#9ED8FF,#E8F7FF 70%)', ink: '#0E2F4F', muted: '#3F5F80', card: '#FFFFFF', 'card-ink': '#0E2F4F', 'card-head': '#1F6FD1', line: '#0E2F4F', panel: '#FFFFFF', 'panel-ink': '#0E2F4F', 'panel-dim': '#3F5F80', 'panel-frame': '4px solid #8CC8F2', accent: '#1F6FD1', 'accent-dark': '#124A91', 'accent-ink': '#fff', accent2: '#FFD166', sign: '#FFFFFF', 'sign-shadow': '#1F6FD1', band: 'radial-gradient(circle at 25% 100%,#fff 14px,transparent 15px) 0 0/40px 100%,radial-gradient(circle at 75% 100%,#fff 18px,transparent 19px) 0 0/40px 100%,#9ED8FF', 'band-edge': '#8CC8F2' },
      css: '.th-sky .ep-panel{border-radius:28px}',
      emblem: '<path d="M14 44 Q4 44 6 34 Q8 26 18 28 Q20 16 32 16 Q44 16 46 28 Q58 26 58 36 Q58 44 48 44 Z" fill="#fff" stroke="#1F6FD1" stroke-width="3"/><path d="M24 52 Q22 56 24 58 Q27 56 24 52 M36 50 Q34 54 36 56 Q39 54 36 50" fill="#1F6FD1"/>'
    },
    themepark: {
      name: 'Theme Park', font: 'Titan One', gf: 'Titan+One',
      v: { bg: '#FFF1D6', ink: '#2B1B2F', muted: '#6B5570', card: '#FFFFFF', 'card-ink': '#2B1B2F', 'card-head': '#E63946', line: '#2B1B2F', panel: '#2A9D8F', 'panel-ink': '#FFFFFF', 'panel-dim': '#D6F3EF', 'panel-frame': '6px solid #1B6B61', accent: '#E63946', 'accent-dark': '#9E1F29', 'accent-ink': '#fff', accent2: '#FFD166', sign: '#E63946', 'sign-shadow': '#FFD166', band: 'radial-gradient(circle at 50% 100%,#FFF1D6 12px,transparent 13px) 0 0/26px 100%,repeating-linear-gradient(90deg,#E63946 0 26px,#fff 26px 52px)', 'band-edge': '#9E1F29' },
      emblem: '<path d="M4 54 Q14 10 24 40 Q32 60 40 24 Q48 4 60 54" stroke="#E63946" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M10 54 V44 M20 54 V30 M30 54 V46 M40 54 V28 M50 54 V26" stroke="#2A9D8F" stroke-width="3"/><rect x="34" y="16" width="12" height="7" rx="2" fill="#FFD166" stroke="#2B1B2F" stroke-width="2"/>'
    },
    energy: {
      name: 'Power Plant', font: 'Righteous', gf: 'Righteous',
      v: { bg: '#1C262B', 'bg-img': 'linear-gradient(135deg,rgba(255,210,63,.06) 25%,transparent 25%)', 'bg-size': '28px 28px', ink: '#F2F5F3', muted: '#B7C4BF', card: '#F7FAF5', 'card-ink': '#1C262B', 'card-head': '#2A8F5E', line: '#1C262B', panel: '#26343A', 'panel-ink': '#F2F5F3', 'panel-dim': '#B7C4BF', 'panel-frame': '6px solid #FFD23F', accent: '#FFD23F', 'accent-dark': '#B08E10', 'accent-ink': '#1C262B', accent2: '#3DDC97', sign: '#FFD23F', 'sign-shadow': '#2A8F5E', band: 'repeating-linear-gradient(90deg,#FFD23F 0 4px,transparent 4px 36px),linear-gradient(#2E8F63,#1F6B48)', 'band-edge': '#FFD23F' },
      emblem: '<path d="M36 4 L12 36 H30 L24 60 L52 24 H34 Z" fill="#FFD23F" stroke="#1C262B" stroke-width="3" stroke-linejoin="round"/>'
    },
    temple: {
      name: 'Ancient Temple', font: 'Macondo', gf: 'Macondo',
      v: { bg: '#E6D3A8', 'bg-img': 'radial-gradient(ellipse at 50% 0,rgba(255,255,255,.4),transparent 70%)', ink: '#2E2414', muted: '#6A5634', card: '#F8EED8', 'card-ink': '#2E2414', 'card-head': '#1F6E54', line: '#2E2414', panel: '#5E513C', 'panel-ink': '#FBF3DE', 'panel-dim': '#E1D2AF', 'panel-frame': '8px solid #3B3223', accent: '#1F7A5C', 'accent-dark': '#124D39', 'accent-ink': '#fff', accent2: '#D19A2E', sign: '#1F6E54', 'sign-shadow': '#D19A2E', band: 'repeating-linear-gradient(90deg,#1F7A5C 0 12px,transparent 12px 24px) 0 0/100% 50% no-repeat,repeating-linear-gradient(90deg,transparent 0 12px,#1F7A5C 12px 24px) 0 100%/100% 50% no-repeat,#D19A2E', 'band-edge': '#3B3223' },
      css: '.th-temple .ep-panel{background-image:linear-gradient(rgba(0,0,0,.12) 2px,transparent 2px),linear-gradient(90deg,rgba(0,0,0,.12) 2px,transparent 2px);background-size:80px 40px}',
      emblem: '<path d="M6 58 H58 L52 48 H12 Z M12 48 H52 L47 38 H17 Z M17 38 H47 L42 28 H22 Z M22 28 H42 L38 18 H26 Z" fill="#8A7652" stroke="#3B3223" stroke-width="2"/><rect x="28" y="8" width="8" height="10" fill="#1F7A5C"/><path d="M29 58 V44 H35 V58" fill="#3B3223"/>'
    },
    castle: {
      name: 'Castle', font: 'MedievalSharp', gf: 'MedievalSharp',
      v: { bg: '#D6D1C6', 'bg-img': 'linear-gradient(#c5bfb2 2px,transparent 2px),linear-gradient(90deg,#c5bfb2 2px,transparent 2px)', 'bg-size': '60px 30px', ink: '#232026', muted: '#58525C', card: '#F5EFE1', 'card-ink': '#232026', 'card-head': '#7A1E2B', line: '#232026', panel: '#4A4650', 'panel-ink': '#F5EFE1', 'panel-dim': '#CFC8D6', 'panel-frame': '8px solid #2B2830', accent: '#7A1E2B', 'accent-dark': '#4C0F19', 'accent-ink': '#fff', accent2: '#D6A93A', sign: '#7A1E2B', 'sign-shadow': '#D6A93A', band: 'linear-gradient(90deg,#6E6875 0 60%,transparent 60%) 0 0/34px 45% repeat-x,linear-gradient(#6E6875,#6E6875) 0 100%/100% 56% no-repeat', 'band-edge': '#2B2830' },
      emblem: '<path d="M10 60 V22 H16 V14 H22 V22 H28 V14 H36 V22 H42 V14 H48 V22 H54 V60 Z" fill="#6E6875" stroke="#232026" stroke-width="2.5"/><path d="M26 60 V44 Q32 36 38 44 V60 Z" fill="#232026"/><path d="M32 14 V2 L44 6 L32 10" fill="#7A1E2B" stroke="#232026" stroke-width="1.5"/>'
    },
    renaissance: {
      name: 'Renaissance Florence', font: 'Cinzel Decorative', gf: 'Cinzel+Decorative:wght@700',
      v: { bg: '#F2E5CF', 'bg-img': 'radial-gradient(ellipse at 30% 20%,rgba(255,255,255,.5),transparent 60%)', ink: '#3A2418', muted: '#6E5140', card: '#FFF9EE', 'card-ink': '#3A2418', 'card-head': '#A0442C', line: '#3A2418', panel: '#FFF9EE', 'panel-ink': '#3A2418', 'panel-dim': '#6E5140', 'panel-frame': '12px solid #C99A3E', accent: '#A0442C', 'accent-dark': '#6A2A1A', 'accent-ink': '#fff', accent2: '#2E5E6E', sign: '#A0442C', 'sign-shadow': '#E5C48A', band: 'radial-gradient(circle at 50% 0,#C0603F 12px,#9A452A 13px 15px,transparent 16px) 0 0/30px 100%,#E0A070', 'band-edge': '#6A2A1A' },
      css: '.th-renaissance .ep-panel{box-shadow:inset 0 0 0 3px #F1D08A,0 12px 24px rgba(58,36,24,.3)}',
      emblem: '<path d="M8 58 H56 M12 54 H52" stroke="#3A2418" stroke-width="3"/><path d="M14 54 V26 M24 54 V26 M40 54 V26 M50 54 V26" stroke="#C99A3E" stroke-width="5"/><path d="M10 26 H54 Q54 8 32 6 Q10 8 10 26 Z" fill="#A0442C"/><circle cx="32" cy="6" r="3" fill="#C99A3E"/>'
    },
    cockpit: {
      name: 'Cockpit', font: 'Audiowide', gf: 'Audiowide',
      v: { bg: '#0E1822', 'bg-img': 'radial-gradient(circle at 50% 120%,rgba(57,217,138,.14),transparent 60%)', ink: '#DDF7EA', muted: '#9CC2B0', card: '#15222E', 'card-ink': '#DDF7EA', 'card-head': '#39D98A', line: '#2D4A5E', panel: '#0B141C', 'panel-ink': '#DDF7EA', 'panel-dim': '#9CC2B0', 'panel-frame': '6px solid #2D4A5E', accent: '#39D98A', 'accent-dark': '#1E8A55', 'accent-ink': '#06140C', accent2: '#FFB020', sign: '#39D98A', 'sign-shadow': '#06140C', band: 'radial-gradient(circle,#FFB020 4px,transparent 5px) 0 0/36px 100%,#1B2A36', 'band-edge': '#39D98A' },
      css: '.th-cockpit .ep-panel{box-shadow:inset 0 0 0 2px #39D98A33,0 0 22px rgba(57,217,138,.18)}',
      emblem: '<path d="M32 4 L36 24 L60 34 V40 L36 34 L35 50 L44 56 V60 L32 57 L20 60 V56 L29 50 L28 34 L4 40 V34 L28 24 Z" fill="#DDF7EA" stroke="#39D98A" stroke-width="2.5" stroke-linejoin="round"/>'
    },
    travel: {
      name: 'World Travel', font: 'Passion One', gf: 'Passion+One:wght@700',
      v: { bg: '#EFE6D2', ink: '#1E2A38', muted: '#55606E', card: '#FFFDF6', 'card-ink': '#1E2A38', 'card-head': '#1F6FB2', line: '#1E2A38', panel: '#FFFDF6', 'panel-ink': '#1E2A38', 'panel-dim': '#55606E', 'panel-frame': '8px solid #1F6FB2', accent: '#1F6FB2', 'accent-dark': '#13497A', 'accent-ink': '#fff', accent2: '#E9A23B', sign: '#1F6FB2', 'sign-shadow': '#E9A23B', band: 'repeating-linear-gradient(-45deg,#D7263D 0 18px,#FFFDF6 18px 36px,#1F6FB2 36px 54px,#FFFDF6 54px 72px)', 'band-edge': '#1E2A38' },
      css: '.th-travel .ep-panel{border-image:repeating-linear-gradient(-45deg,#D7263D 0 12px,#fff 12px 24px,#1F6FB2 24px 36px,#fff 36px 48px) 8}',
      emblem: '<circle cx="32" cy="32" r="26" fill="#7CC4E8" stroke="#1E2A38" stroke-width="3"/><path d="M18 18 Q26 14 30 22 Q26 30 18 30 Q14 24 18 18 Z M36 30 Q46 26 50 36 Q46 48 38 46 Q32 38 36 30 Z" fill="#6FA23A"/><path d="M6 32 H58 M32 6 Q20 32 32 58 M32 6 Q44 32 32 58" stroke="#1E2A38" stroke-width="1.5" fill="none"/>'
    },
    phone: {
      name: 'Social Feed', font: 'Baloo 2', gf: 'Baloo+2:wght@700;800',
      v: { bg: '#EEF0F8', ink: '#1A1B2E', muted: '#5B5E78', card: '#FFFFFF', 'card-ink': '#1A1B2E', 'card-head': '#5B5BD6', line: '#1A1B2E', panel: '#FFFFFF', 'panel-ink': '#1A1B2E', 'panel-dim': '#5B5E78', 'panel-frame': '10px solid #1A1B2E', accent: '#5B5BD6', 'accent-dark': '#3A3AA0', 'accent-ink': '#fff', accent2: '#FF6B8B', sign: '#5B5BD6', 'sign-shadow': '#FFB8C6', band: 'linear-gradient(90deg,#5B5BD6,#FF6B8B,#FFB86B)', 'band-edge': '#1A1B2E' },
      css: '.th-phone .ep-panel{border-radius:30px}',
      emblem: '<rect x="16" y="4" width="32" height="56" rx="7" fill="#1A1B2E"/><rect x="20" y="10" width="24" height="42" rx="2" fill="#fff"/><path d="M24 16 H40 M24 22 H36" stroke="#5B5BD6" stroke-width="3"/><path d="M26 30 Q32 24 38 30 Q38 38 32 42 Q26 38 26 30 Z" fill="#FF6B8B"/>'
    },
    studio: {
      name: 'Art Studio', font: 'Permanent Marker', gf: 'Permanent+Marker',
      v: { bg: '#FBF7EF', 'bg-img': 'repeating-linear-gradient(0deg,rgba(0,0,0,.025) 0 1px,transparent 1px 4px),repeating-linear-gradient(90deg,rgba(0,0,0,.025) 0 1px,transparent 1px 4px)', ink: '#29335C', muted: '#5E6690', card: '#FFFFFF', 'card-ink': '#29335C', 'card-head': '#E4572E', line: '#29335C', panel: '#FFFFFF', 'panel-ink': '#29335C', 'panel-dim': '#5E6690', 'panel-frame': '10px solid #8B5E34', accent: '#E4572E', 'accent-dark': '#9C3317', 'accent-ink': '#fff', accent2: '#F3A712', sign: '#E4572E', 'sign-shadow': '#29335C', band: 'repeating-linear-gradient(90deg,#E4572E 0 40px,#F3A712 40px 80px,#669BBC 80px 120px,#29335C 120px 160px,#A8C686 160px 200px)', 'band-edge': '#29335C' },
      emblem: '<path d="M32 6 Q58 6 58 30 Q58 44 46 42 Q38 40 40 48 Q42 58 30 58 Q6 56 6 32 Q6 6 32 6 Z" fill="#F3E3C0" stroke="#29335C" stroke-width="3"/><circle cx="20" cy="22" r="5" fill="#E4572E"/><circle cx="34" cy="16" r="5" fill="#F3A712"/><circle cx="46" cy="26" r="5" fill="#669BBC"/><circle cx="18" cy="38" r="5" fill="#A8C686"/>'
    },
    notebook: {
      name: 'Notebook', font: 'Kalam', gf: 'Kalam:wght@700',
      v: { bg: '#FFFDF5', 'bg-img': 'linear-gradient(90deg,transparent 54px,#F2A5A5 54px 56px,transparent 56px),repeating-linear-gradient(#FFFDF5 0 31px,#BFD7EA 31px 32px)', ink: '#1E2A4A', muted: '#4F5B7A', card: '#FFFFFF', 'card-ink': '#1E2A4A', 'card-head': '#2B59C3', line: '#1E2A4A', panel: '#FFF4A3', 'panel-ink': '#2B2A1E', 'panel-dim': '#5E5A3A', 'panel-frame': '0 solid transparent', accent: '#2B59C3', 'accent-dark': '#1A3A87', 'accent-ink': '#fff', accent2: '#F25F5C', sign: '#2B59C3', 'sign-shadow': '#F7C5C4', band: 'radial-gradient(circle at 50% 50%,#FFFDF5 6px,#6B7390 7px 9px,transparent 10px) 0 0/34px 100%,#E6E8EF', 'band-edge': '#6B7390' },
      css: '.th-notebook .ep-panel{transform:rotate(-.4deg);box-shadow:0 12px 20px rgba(0,0,0,.18)}',
      emblem: '<rect x="12" y="6" width="40" height="52" rx="3" fill="#FFF4A3" stroke="#1E2A4A" stroke-width="3"/><path d="M18 18 H46 M18 26 H46 M18 34 H46 M18 42 H36" stroke="#BFD7EA" stroke-width="2"/><path d="M52 10 L28 46 L26 54 L33 49 L57 13 Z" fill="#F25F5C" stroke="#1E2A4A" stroke-width="2"/>'
    },
    arcade: {
      name: 'Arcade', font: 'Silkscreen', gf: 'Silkscreen:wght@700',
      v: { bg: '#120B2E', 'bg-img': 'linear-gradient(rgba(54,241,205,.09) 1px,transparent 1px),linear-gradient(90deg,rgba(54,241,205,.09) 1px,transparent 1px)', 'bg-size': '32px 32px', ink: '#F2ECFF', muted: '#B9A9E8', card: '#1D1446', 'card-ink': '#F2ECFF', 'card-head': '#36F1CD', line: '#FF3CAC', panel: '#0A0620', 'panel-ink': '#F2ECFF', 'panel-dim': '#B9A9E8', 'panel-frame': '4px solid #36F1CD', accent: '#FF3CAC', 'accent-dark': '#A0126A', 'accent-ink': '#fff', accent2: '#36F1CD', sign: '#36F1CD', 'sign-shadow': '#FF3CAC', band: 'repeating-linear-gradient(90deg,#FF3CAC 0 16px,#36F1CD 16px 32px,#FFD23F 32px 48px,#7B61FF 48px 64px)', 'band-edge': '#36F1CD', r: '4px' },
      css: '.th-arcade .ep-panel{background-image:repeating-linear-gradient(rgba(255,255,255,.035) 0 2px,transparent 2px 4px)}',
      emblem: '<path d="M16 8 H24 V16 H40 V8 H48 V16 H56 V40 H48 V48 H40 V56 H24 V48 H16 V40 H8 V16 H16 Z" fill="#FF3CAC"/><rect x="20" y="24" width="8" height="8" fill="#0A0620"/><rect x="36" y="24" width="8" height="8" fill="#0A0620"/><rect x="24" y="40" width="16" height="4" fill="#36F1CD"/>'
    },
    shop: {
      name: 'MegaDeal Store', font: 'Luckiest Guy', gf: 'Luckiest+Guy',
      v: { bg: '#FFF8E1', ink: '#2A1A12', muted: '#6B5646', card: '#FFFFFF', 'card-ink': '#2A1A12', 'card-head': '#D62828', line: '#2A1A12', panel: '#FFFFFF', 'panel-ink': '#2A1A12', 'panel-dim': '#6B5646', 'panel-frame': '3px dashed #2A1A12', accent: '#D62828', 'accent-dark': '#8F1414', 'accent-ink': '#fff', accent2: '#F77F00', sign: '#D62828', 'sign-shadow': '#FCBF49', band: 'radial-gradient(circle at 50% 100%,#FFF8E1 12px,transparent 13px) 0 0/30px 100%,repeating-linear-gradient(90deg,#D62828 0 30px,#fff 30px 60px)', 'band-edge': '#8F1414' },
      emblem: '<path d="M6 30 L30 6 H56 V32 L32 56 Z" fill="#FCBF49" stroke="#2A1A12" stroke-width="3" stroke-linejoin="round"/><circle cx="46" cy="16" r="4" fill="#FFF8E1" stroke="#2A1A12" stroke-width="2"/><path d="M22 36 L36 22 M26 26 L28 28 M34 34 L36 36" stroke="#D62828" stroke-width="4" stroke-linecap="round"/>'
    }
  };
  return T;
}
if (typeof module !== 'undefined') module.exports = EscapeThemes;
