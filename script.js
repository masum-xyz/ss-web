// --- THEME & BACKGROUND DEFINITIONS ---
const themes = [
    { id: 'macos-dark', name: 'macOS Dark', icon: 'ph-apple-logo' },
    { id: 'macos-light', name: 'macOS Light', icon: 'ph-sun' },
    { id: 'arc-glass', name: 'Arc Glass', icon: 'ph-Sidebar' },
    { id: 'neo-brutal', name: 'Brutalist', icon: 'ph-square-logo' },
    { id: 'cyber-neon', name: 'Cyber Glow', icon: 'ph-terminal' },
    { id: 'win11-mica', name: 'Windows 11', icon: 'ph-windows-logo' },
    { id: 'minimal-float', name: 'Borderless', icon: 'ph-frame-corners' }
];

const backgrounds = [
    { id: 'zinc', name: 'Carbon Dark', css: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)' },
    { id: 'tailwind', name: 'Tailwind Sky', css: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #1e1b4b 100%)' },
    { id: 'emerald', name: 'Supabase', css: 'linear-gradient(135deg, #059669 0%, #065f46 50%, #09090b 100%)' },
    { id: 'sunset', name: 'Raycast', css: 'linear-gradient(135deg, #f97316 0%, #e11d48 50%, #4c0519 100%)' },
    { id: 'silver', name: 'Silver Matte', css: 'linear-gradient(135deg, #e4e4e7 0%, #a1a1aa 100%)' },
    { id: 'violet', name: 'Linear', css: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #09090b 100%)' },
    { id: 'amber', name: 'Solar', css: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' },
    { id: 'transparent', name: 'Transparent', css: 'transparent' }
];

// --- APPLICATION STATE ---
let state = {
    theme: 'macos-dark',
    studioTab: 'frame',
    sidebarOpen: true,
    bgMode: 'preset',
    bgCss: backgrounds[1].css,
    bgId: 'tailwind',
    viewportHeight: 420,
    padding: 32,
    radius: 12,
    shadow: '2xl',
    tilt: 'none',
    displayUrl: 'https://tailwindcss.com',
    showUrlBar: true,
    showWatermark: true
};

// --- SIDEBAR & NAVIGATION ---
function toggleSidebar(forceState) {
    state.sidebarOpen = typeof forceState === 'boolean' ? forceState : !state.sidebarOpen;
    const sidebar = document.getElementById('studioSidebar');
    const floatingBtn = document.getElementById('floatingOpenBtn');
    const headerLabel = document.getElementById('sidebarBtnLabel');

    if (state.sidebarOpen) {
        sidebar.classList.remove('translate-x-full');
        sidebar.classList.add('translate-x-0');
        floatingBtn.classList.add('hidden');
        floatingBtn.classList.remove('flex');
        if (headerLabel) headerLabel.innerText = 'Hide Panel';
        return;
    }

    sidebar.classList.remove('translate-x-0');
    sidebar.classList.add('translate-x-full');
    floatingBtn.classList.remove('hidden');
    floatingBtn.classList.add('flex');
    if (headerLabel) headerLabel.innerText = 'Customize';
}

function switchStudioTab(tabId) {
    state.studioTab = tabId;
    if (!state.sidebarOpen) toggleSidebar(true);

    const tabs = ['frame', 'background', 'geometry', 'effects'];
    tabs.forEach(t => {
        const btn = document.getElementById(`dockTab-${t}`);
        const panel = document.getElementById(`studioPanel-${t}`);
        if (!btn || !panel) return;

        const isActive = t === tabId;
        btn.className = isActive
            ? 'py-1.5 px-2 rounded text-[11px] font-mono font-medium bg-zinc-800 text-zinc-100 flex items-center justify-center gap-1.5 transition shadow-sm'
            : 'py-1.5 px-2 rounded text-[11px] font-mono font-medium text-zinc-400 hover:text-zinc-200 flex items-center justify-center gap-1.5 transition';
        panel.classList.toggle('hidden', !isActive);
    });
}

function updateSummaryText() {
    const summaryEl = document.getElementById('activeConfigSummary');
    const badgeHeightEl = document.getElementById('badgeHeightIndicator');
    const foundTheme = themes.find(t => t.id === state.theme);

    if (summaryEl) {
        const themeName = foundTheme ? foundTheme.name : state.theme;
        summaryEl.innerText = `${themeName} • H:${state.viewportHeight}px • pad ${state.padding}px • tilt ${state.tilt}`;
    }
    if (badgeHeightEl) {
        badgeHeightEl.innerText = `H: ${state.viewportHeight}px`;
    }
}

// --- DEFAULT LOCAL MOCKUP ---
function generateTailwindMockupURI() {
    const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800" width="1280" height="800">
        <defs>
            <radialGradient id="twMesh" cx="50%" cy="0%" r="70%">
                <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.28"/>
                <stop offset="50%" stop-color="#6366f1" stop-opacity="0.1"/>
                <stop offset="100%" stop-color="#0b1120" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#1e293b"/>
                <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
        </defs>
        <rect width="1280" height="800" fill="#0b1120"/>
        <rect width="1280" height="800" fill="url(#twMesh)"/>
        <line x1="0" y1="72" x2="1280" y2="72" stroke="#1e293b" stroke-width="1"/>
        <line x1="80" y1="0" x2="80" y2="800" stroke="#1e293b" stroke-width="1" stroke-dasharray="4 4"/>
        <line x1="1200" y1="0" x2="1200" y2="800" stroke="#1e293b" stroke-width="1" stroke-dasharray="4 4"/>
        <path d="M120 34 C126 26, 136 26, 142 34 C148 42, 158 42, 164 34" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" fill="none"/>
        <text x="180" y="42" font-family="Inter, sans-serif" font-size="20" font-weight="700" fill="#f8fafc" letter-spacing="-0.5">tailwindcss</text>
        <rect x="305" y="25" width="44" height="22" rx="11" fill="#0ea5e9" fill-opacity="0.15" stroke="#0ea5e9" stroke-opacity="0.4"/>
        <text x="327" y="40" text-anchor="middle" font-family="monospace" font-size="11" font-weight="600" fill="#38bdf8">v4.0</text>
        <text x="900" y="41" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#cbd5e1">Docs</text>
        <text x="960" y="41" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#cbd5e1">Components</text>
        <text x="1070" y="41" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#cbd5e1">Blog</text>
        <text x="1125" y="41" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="#cbd5e1">Showcase</text>
        <text x="640" y="185" text-anchor="middle" font-family="Inter, sans-serif" font-size="60" font-weight="800" fill="#f8fafc" letter-spacing="-1.5">Rapidly build modern websites</text>
        <text x="640" y="255" text-anchor="middle" font-family="Inter, sans-serif" font-size="60" font-weight="800" fill="#38bdf8" letter-spacing="-1.5">without ever leaving your HTML.</text>
        <text x="640" y="315" text-anchor="middle" font-family="Inter, sans-serif" font-size="19" fill="#94a3b8">A utility-first CSS framework packed with classes like <tspan fill="#38bdf8" font-family="monospace">flex</tspan>, <tspan fill="#38bdf8" font-family="monospace">pt-4</tspan>, <tspan fill="#38bdf8" font-family="monospace">text-center</tspan> and</text>
        <text x="640" y="345" text-anchor="middle" font-family="Inter, sans-serif" font-size="19" fill="#94a3b8"><tspan fill="#38bdf8" font-family="monospace">rotate-90</tspan> that can be composed to build any design, directly in your markup.</text>
        <rect x="435" y="385" width="160" height="46" rx="8" fill="#0ea5e9"/>
        <text x="515" y="413" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="600" fill="#0f172a">Get started</text>
        <rect x="610" y="385" width="235" height="46" rx="8" fill="#1e293b" stroke="#334155"/>
        <text x="635" y="413" font-family="Inter, sans-serif" font-size="14" fill="#94a3b8">Quick search...</text>
        <text x="805" y="413" font-family="monospace" font-size="12" fill="#64748b">⌘K</text>
        <rect x="130" y="480" width="480" height="260" rx="12" fill="url(#cardGrad)" stroke="#334155" stroke-width="1.5"/>
        <rect x="155" y="505" width="150" height="210" rx="8" fill="#0ea5e9" fill-opacity="0.15" stroke="#38bdf8" stroke-opacity="0.3"/>
        <circle cx="230" cy="585" r="32" fill="#38bdf8" fill-opacity="0.3"/>
        <rect x="330" y="515" width="240" height="22" rx="4" fill="#f8fafc"/>
        <rect x="330" y="550" width="160" height="14" rx="4" fill="#38bdf8"/>
        <rect x="330" y="585" width="250" height="10" rx="3" fill="#475569"/>
        <rect x="330" y="605" width="210" height="10" rx="3" fill="#475569"/>
        <rect x="330" y="655" width="110" height="36" rx="6" fill="#0ea5e9"/>
        <rect x="455" y="655" width="110" height="36" rx="6" fill="#1e293b" stroke="#475569"/>
        <rect x="640" y="480" width="510" height="260" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
        <line x1="640" y1="520" x2="1150" y2="520" stroke="#1e293b"/>
        <circle cx="665" cy="500" r="5" fill="#475569"/>
        <circle cx="682" cy="500" r="5" fill="#475569"/>
        <circle cx="699" cy="500" r="5" fill="#475569"/>
        <text x="725" y="504" font-family="monospace" font-size="12" fill="#94a3b8">index.html</text>
        <text x="665" y="555" font-family="monospace" font-size="14" fill="#64748b">1</text>
        <text x="695" y="555" font-family="monospace" font-size="14" fill="#38bdf8">&lt;div <tspan fill="#cbd5e1">class=</tspan><tspan fill="#a5f3fc">"flex p-6 rounded-xl bg-slate-900"</tspan>&gt;</text>
        <text x="665" y="585" font-family="monospace" font-size="14" fill="#64748b">2</text>
        <text x="715" y="585" font-family="monospace" font-size="14" fill="#38bdf8">&lt;div <tspan fill="#cbd5e1">class=</tspan><tspan fill="#a5f3fc">"flex-none w-48 relative"</tspan>&gt;</text>
        <text x="665" y="615" font-family="monospace" font-size="14" fill="#64748b">3</text>
        <text x="735" y="615" font-family="monospace" font-size="14" fill="#f472b6">&lt;img <tspan fill="#cbd5e1">src=</tspan><tspan fill="#a5f3fc">"/hero.jpg"</tspan> <tspan fill="#cbd5e1">class=</tspan><tspan fill="#a5f3fc">"rounded-lg"</tspan> /&gt;</text>
        <text x="665" y="645" font-family="monospace" font-size="14" fill="#64748b">4</text>
        <text x="715" y="645" font-family="monospace" font-size="14" fill="#38bdf8">&lt;/div&gt;</text>
        <text x="665" y="675" font-family="monospace" font-size="14" fill="#64748b">5</text>
        <text x="715" y="675" font-family="monospace" font-size="14" fill="#38bdf8">&lt;form <tspan fill="#cbd5e1">class=</tspan><tspan fill="#a5f3fc">"flex-auto pl-6"</tspan>&gt;...&lt;/form&gt;</text>
        <text x="665" y="705" font-family="monospace" font-size="14" fill="#64748b">6</text>
        <text x="695" y="705" font-family="monospace" font-size="14" fill="#38bdf8">&lt;/div&gt;</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgContent.trim());
}

// --- UI CONTROLS INITIALIZATION ---
function initControls() {
    const themeGrid = document.getElementById('themeSelectorGrid');
    if (themeGrid) {
        themeGrid.innerHTML = themes.map(t => `
            <button 
                onclick="selectTheme('${t.id}')" 
                class="text-left px-3 py-2 rounded-md border transition-all flex items-center gap-2 ${state.theme === t.id ? 'bg-zinc-800 border-zinc-500 text-zinc-100' : 'bg-zinc-900/50 border-zinc-800/90 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
            >
                <i class="ph ${t.icon} text-sm ${state.theme === t.id ? 'text-zinc-100' : 'text-zinc-500'}"></i>
                <span class="font-medium text-xs truncate">${t.name}</span>
            </button>
        `).join('');
    }

    const bgGrid = document.getElementById('bgPanelPreset');
    if (bgGrid) {
        bgGrid.innerHTML = backgrounds.map(b => `
            <button 
                onclick="selectBackground('${b.id}')"
                title="${b.name}"
                class="h-8 rounded border transition-all relative overflow-hidden flex items-center justify-center ${state.bgMode === 'preset' && state.bgId === b.id ? 'border-zinc-100 ring-1 ring-zinc-100' : 'border-zinc-700/70 hover:border-zinc-500'} ${b.id === 'transparent' ? 'bg-checkerboard' : ''}"
                style="${b.id !== 'transparent' ? `background: ${b.css}` : ''}"
            >
                ${state.bgMode === 'preset' && state.bgId === b.id ? '<i class="ph-bold ph-check text-xs text-white drop-shadow"></i>' : ''}
            </button>
        `).join('');
    }
}

// --- BACKGROUND STYLING HANDLERS ---
function switchBgTab(mode) {
    state.bgMode = mode;
    const tabs = ['preset', 'gradient', 'solid'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        if (!btn) return;
        btn.className = (t === mode)
            ? 'py-1 rounded bg-zinc-800 text-zinc-100 transition'
            : 'py-1 rounded text-zinc-400 hover:text-zinc-200 transition';
    });

    document.getElementById('bgPanelPreset').classList.toggle('hidden', mode !== 'preset');
    document.getElementById('bgPanelGradient').classList.toggle('hidden', mode !== 'gradient');
    document.getElementById('bgPanelSolid').classList.toggle('hidden', mode !== 'solid');

    if (mode === 'gradient') applyCustomGradient();
    if (mode === 'solid') applyCustomSolid();
}

function applyCustomGradient() {
    const c1 = document.getElementById('gradColor1').value;
    const c2 = document.getElementById('gradColor2').value;
    const angle = document.getElementById('gradAngleSlider').value;

    document.getElementById('gradHex1').value = c1;
    document.getElementById('gradHex2').value = c2;
    document.getElementById('gradAngleVal').innerText = `${angle}°`;

    const css = `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 100%)`;
    state.bgCss = css;
    state.bgId = 'custom-gradient';
    document.getElementById('exportCanvas').style.background = css;
    initControls();
}

function applyCustomSolid() {
    const c = document.getElementById('solidColorPicker').value;
    document.getElementById('solidColorHex').value = c;
    state.bgCss = c;
    state.bgId = 'custom-solid';
    document.getElementById('exportCanvas').style.background = c;
    initControls();
}

function syncHexToColor(target) {
    if (target === 'grad1') {
        const val = document.getElementById('gradHex1').value;
        if (!/^#[0-9A-F]{6}$/i.test(val)) return;
        document.getElementById('gradColor1').value = val;
        applyCustomGradient();
        return;
    }
    if (target === 'grad2') {
        const val = document.getElementById('gradHex2').value;
        if (!/^#[0-9A-F]{6}$/i.test(val)) return;
        document.getElementById('gradColor2').value = val;
        applyCustomGradient();
        return;
    }
    if (target === 'solid') {
        const val = document.getElementById('solidColorHex').value;
        if (!/^#[0-9A-F]{6}$/i.test(val)) return;
        document.getElementById('solidColorPicker').value = val;
        applyCustomSolid();
    }
}

function formatSafeUrl(url, maxLen = 36) {
    const clean = (url || 'https://tailwindcss.com').trim();
    if (clean.length <= maxLen) return clean;
    return clean.substring(0, maxLen - 1) + '…';
}

// --- BROWSER FRAME RENDERING ---
function renderBrowserFrame() {
    const headerEl = document.getElementById('browserHeader');
    const windowEl = document.getElementById('browserWindow');
    if (!headerEl || !windowEl) return;

    const urlText = formatSafeUrl(state.displayUrl, 38);
    const shortUrlText = formatSafeUrl((state.displayUrl || 'https://tailwindcss.com').replace(/^https?:\/\//, ''), 32);
    const showUrl = state.showUrlBar;

    windowEl.classList.remove('neo-brutal-shadow', 'neon-glow-frame', 'p-2.5', 'bg-white/15', 'backdrop-blur-xl', 'border', 'border-white/25', 'border-zinc-800');

    // Inline SVGs guarantee identical rasterization without cross-origin asset resolution in canvas
    const lockSvgDark = `<svg width="10" height="10" viewBox="0 0 256 256" fill="#71717a" style="flex-shrink:0; display:block;"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM104,56a24,24,0,0,1,48,0V80H104Z"/></svg>`;
    const lockSvgLight = `<svg width="10" height="10" viewBox="0 0 256 256" fill="#a1a1aa" style="flex-shrink:0; display:block;"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM104,56a24,24,0,0,1,48,0V80H104Z"/></svg>`;
    const plusSvg = `<svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" style="display:block;"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/></svg>`;

    if (state.theme === 'macos-dark') {
        windowEl.classList.add('border', 'border-zinc-800');
        headerEl.innerHTML = `
            <div class="h-10 bg-[#141417] border-b border-zinc-800 px-4 flex items-center justify-between select-none">
                <div class="flex items-center gap-2 w-16 shrink-0">
                    <span class="w-3 h-3 rounded-full bg-[#ff5f56] block"></span>
                    <span class="w-3 h-3 rounded-full bg-[#ffbd2e] block"></span>
                    <span class="w-3 h-3 rounded-full bg-[#27c93f] block"></span>
                </div>
                ${showUrl ? `
                <div class="flex-1 max-w-sm mx-2 h-6 px-3 rounded bg-[#0c0c0e] border border-zinc-800 flex items-center justify-center gap-1.5">
                    ${lockSvgDark}
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1; color: #a1a1aa; white-space: nowrap; display: block; letter-spacing: 0;">${urlText}</span>
                </div>` : '<div></div>'}
                <div class="w-16 shrink-0 flex justify-end text-zinc-600">
                    ${plusSvg}
                </div>
            </div>
        `;
        return;
    }

    if (state.theme === 'macos-light') {
        headerEl.innerHTML = `
            <div class="h-10 bg-zinc-100 border-b border-zinc-200 px-4 flex items-center justify-between select-none">
                <div class="flex items-center gap-2 w-16 shrink-0">
                    <span class="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10 block"></span>
                    <span class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10 block"></span>
                    <span class="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10 block"></span>
                </div>
                ${showUrl ? `
                <div class="flex-1 max-w-sm mx-2 h-6 px-3 rounded bg-white border border-zinc-200 flex items-center justify-center gap-1.5">
                    ${lockSvgLight}
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1; color: #52525b; white-space: nowrap; display: block; letter-spacing: 0;">${urlText}</span>
                </div>` : '<div></div>'}
                <div class="w-16 shrink-0 flex justify-end text-zinc-400">
                    ${plusSvg}
                </div>
            </div>
        `;
        return;
    }

    if (state.theme === 'arc-glass') {
        windowEl.classList.add('p-2.5', 'bg-white/15', 'backdrop-blur-xl', 'border', 'border-white/25');
        headerEl.innerHTML = `
            <div class="h-8 mb-2 px-3 rounded-md bg-black/40 flex items-center justify-between text-white/90 select-none">
                <div class="flex items-center gap-2 w-12 shrink-0">
                    <div class="flex gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-white/40 block"></span>
                        <span class="w-2 h-2 rounded-full bg-white/40 block"></span>
                        <span class="w-2 h-2 rounded-full bg-white/40 block"></span>
                    </div>
                </div>
                ${showUrl ? `
                <div class="flex items-center justify-center">
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1; color: rgba(255,255,255,0.85); white-space: nowrap; display: block;">${shortUrlText}</span>
                </div>` : '<div></div>'}
                <div class="w-12 shrink-0"></div>
            </div>
        `;
        return;
    }

    if (state.theme === 'neo-brutal') {
        windowEl.classList.add('neo-brutal-shadow');
        headerEl.innerHTML = `
            <div class="h-11 bg-[#facc15] border-b-[2.5px] border-black px-4 flex items-center justify-between select-none text-black">
                <div class="flex items-center gap-1.5 w-12 shrink-0">
                    <span class="w-3 h-3 bg-white border-2 border-black block"></span>
                    <span class="w-3 h-3 bg-black block"></span>
                </div>
                ${showUrl ? `
                <div class="flex-1 max-w-sm mx-3 h-6 px-3 bg-white border-2 border-black flex items-center justify-between">
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; line-height: 1; color: #000000; white-space: nowrap; display: block;">${urlText}</span>
                    <span style="font-family: monospace; font-size: 11px; font-weight: 700; line-height: 1; color: #000000;">↗</span>
                </div>` : '<div></div>'}
                <div class="w-12 shrink-0 flex justify-end">
                    <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 10px; line-height: 1; padding: 3px 6px; background: #000; color: #fff; display: block;">RAW</span>
                </div>
            </div>
        `;
        return;
    }

    if (state.theme === 'cyber-neon') {
        windowEl.classList.add('neon-glow-frame');
        headerEl.innerHTML = `
            <div class="h-10 bg-[#070709] border-b border-cyan-500/30 px-4 flex items-center justify-between select-none">
                <div class="flex items-center gap-2 w-16 shrink-0">
                    <span class="w-2 h-2 bg-cyan-400 block"></span>
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; line-height: 1; color: #22d3ee; letter-spacing: 0.08em;">TTY//01</span>
                </div>
                ${showUrl ? `
                <div class="flex-1 max-w-sm mx-2 h-6 px-3 rounded bg-zinc-950 border border-cyan-500/30 flex items-center justify-center">
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1; color: #67e8f9; white-space: nowrap; display: block;">${urlText}</span>
                </div>` : '<div></div>'}
                <div class="w-16 shrink-0 flex justify-end">
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 10px; line-height: 1; color: #71717a;">200_OK</span>
                </div>
            </div>
        `;
        return;
    }

    if (state.theme === 'win11-mica') {
        headerEl.innerHTML = `
            <div class="h-9 bg-[#1f1f1f] border-b border-[#2d2d2d] pl-3 flex items-center justify-between select-none text-zinc-300">
                <div class="flex items-center gap-2 h-full pt-1.5">
                    <div class="bg-[#2b2b2b] px-3 h-full rounded-t border-t border-x border-[#383838] flex items-center gap-2">
                        <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1; color: #d4d4d8; white-space: nowrap; display: block;">${showUrl ? shortUrlText : 'Tab'}</span>
                    </div>
                </div>
                <div class="flex items-center h-full text-zinc-400 pr-2 gap-3" style="font-family: monospace; font-size: 12px; line-height: 1;">
                    <span>─</span>
                    <span>□</span>
                    <span>✕</span>
                </div>
            </div>
        `;
        return;
    }

    if (state.theme === 'minimal-float') {
        headerEl.innerHTML = '';
    }
}

// --- INTERACTION & SETTINGS HANDLERS ---
function selectTheme(themeId) {
    state.theme = themeId;
    const found = themes.find(t => t.id === themeId);
    const badge = document.getElementById('activeThemeBadge');
    if (badge) badge.innerText = found ? found.name : themeId;

    initControls();
    renderBrowserFrame();
    updateSummaryText();
}

function selectBackground(bgId) {
    const found = backgrounds.find(b => b.id === bgId);
    if (!found) return;

    state.bgMode = 'preset';
    state.bgId = bgId;
    state.bgCss = found.css;
    document.getElementById('exportCanvas').style.background = found.css;
    initControls();
}

function updateFrameSettings() {
    const viewportHeight = parseInt(document.getElementById('heightSlider').value, 10);
    const padding = document.getElementById('paddingSlider').value;
    const radius = document.getElementById('radiusSlider').value;
    const displayUrl = document.getElementById('displayUrlInput').value;
    const showUrlBar = document.getElementById('toggleUrlBar').checked;
    const showWatermark = document.getElementById('toggleWatermark').checked;

    state.viewportHeight = viewportHeight;
    state.padding = padding;
    state.radius = radius;
    state.displayUrl = displayUrl;
    state.showUrlBar = showUrlBar;
    state.showWatermark = showWatermark;

    document.getElementById('heightVal').innerText = `${viewportHeight}px`;
    document.getElementById('paddingVal').innerText = `${padding}px`;
    document.getElementById('radiusVal').innerText = `${radius}px`;

    document.getElementById('viewportContainer').style.height = `${viewportHeight}px`;
    document.getElementById('exportCanvas').style.padding = `${padding}px`;
    document.getElementById('browserWindow').style.borderRadius = `${radius}px`;
    document.getElementById('watermarkBadge').style.display = showWatermark ? 'flex' : 'none';

    renderBrowserFrame();
    updateSummaryText();
}

function setHeightPreset(heightPx, label) {
    const slider = document.getElementById('heightSlider');
    slider.value = heightPx;
    updateFrameSettings();
    showToast(`height preset: ${label} (${heightPx}px)`, 'success');
}

function setShadow(level) {
    state.shadow = level;
    const browserWindow = document.getElementById('browserWindow');
    browserWindow.classList.remove('shadow-none', 'shadow-md', 'shadow-xl', 'shadow-2xl');
    browserWindow.classList.add(`shadow-${level}`);
    document.getElementById('shadowVal').innerText = level;

    document.querySelectorAll('.shadow-btn').forEach(btn => {
        const isSelected = btn.dataset.shadow === level;
        btn.className = isSelected
            ? 'shadow-btn py-1.5 text-[11px] font-mono rounded bg-zinc-800 text-zinc-100 font-medium transition'
            : 'shadow-btn py-1.5 text-[11px] font-mono rounded text-zinc-400 hover:text-zinc-100 transition';
    });
    updateSummaryText();
}

function setTilt(tiltMode) {
    state.tilt = tiltMode;
    const browserWindow = document.getElementById('browserWindow');
    browserWindow.classList.remove('tilt-none', 'tilt-left', 'tilt-right', 'tilt-top', 'tilt-isometric');
    browserWindow.classList.add(`tilt-${tiltMode}`);

    document.querySelectorAll('.tilt-btn').forEach(btn => {
        const isSelected = btn.dataset.tilt === tiltMode;
        btn.className = isSelected
            ? 'tilt-btn py-1.5 text-[10px] font-mono rounded bg-zinc-800 text-zinc-100 font-medium transition'
            : 'tilt-btn py-1.5 text-[10px] font-mono rounded text-zinc-400 hover:text-zinc-100 transition';
    });
    updateSummaryText();
}

// --- CAPTURE WEBSITE LOGIC ---
async function captureWebsite() {
    const inputEl = document.getElementById('urlInput');
    let rawUrl = inputEl.value.trim();

    if (!rawUrl) {
        showToast('error: url input is empty', 'warning');
        return;
    }

    if (!/^https?:\/\//i.test(rawUrl)) {
        rawUrl = 'https://' + rawUrl;
        inputEl.value = rawUrl;
    }

    document.getElementById('displayUrlInput').value = rawUrl;
    state.displayUrl = rawUrl;
    renderBrowserFrame();

    const loader = document.getElementById('captureLoader');
    const subtext = document.getElementById('loaderSubtext');
    const captureHeight = Math.max(600, Math.round(state.viewportHeight * 2.1));
    if (subtext) subtext.innerText = `rendering headless chromium 1280x${captureHeight}`;

    loader.classList.remove('hidden');
    loader.classList.add('flex');

    try {
        const apiEndpoint = `https://api.microlink.io/?url=${encodeURIComponent(rawUrl)}&screenshot=true&meta=false&viewport.width=1280&viewport.height=${captureHeight}`;
        const response = await fetch(apiEndpoint);
        const data = await response.json();

        if (!data || data.status !== 'success' || !data.data?.screenshot?.url) {
            throw new Error('Capture failed');
        }

        const shotUrl = data.data.screenshot.url;
        const imgEl = document.getElementById('screenshotImg');

        // Converting the image to a Base64 data URI prevents tainted-canvas export failures
        try {
            const imgResp = await fetch(shotUrl);
            const blob = await imgResp.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                imgEl.src = reader.result;
                loader.classList.add('hidden');
                loader.classList.remove('flex');
                showToast(`captured: ${rawUrl}`, 'success');
            };
            reader.readAsDataURL(blob);
        } catch (corsErr) {
            imgEl.onload = () => {
                loader.classList.add('hidden');
                loader.classList.remove('flex');
                showToast(`captured: ${rawUrl}`, 'success');
            };
            imgEl.onerror = () => {
                loader.classList.add('hidden');
                loader.classList.remove('flex');
                imgEl.src = generateTailwindMockupURI();
                showToast('cors fallback: loaded local preview', 'warning');
            };
            imgEl.src = shotUrl;
        }
    } catch (error) {
        loader.classList.add('hidden');
        loader.classList.remove('flex');
        document.getElementById('screenshotImg').src = generateTailwindMockupURI();
        showToast('rate-limit / fallback preview loaded', 'warning');
    }
}

// --- CLIPBOARD PASTE SUPPORT ---
window.addEventListener('paste', (e) => {
    const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
    if (!items) return;

    for (const item of items) {
        if (item.type.indexOf('image') !== 0) continue;

        const blob = item.getAsFile();
        if (!blob) continue;

        const reader = new FileReader();
        reader.onload = (event) => {
            document.getElementById('screenshotImg').src = event.target.result;
            showToast('clipboard image mounted', 'success');
        };
        reader.readAsDataURL(blob);
        break;
    }
});

// --- CANVAS EXPORT ENGINE ---
async function generateCanvasDataUrl() {
    const element = document.getElementById('exportCanvas');
    const browserWindow = document.getElementById('browserWindow');

    const prevTransition = browserWindow.style.transition;
    browserWindow.style.transition = 'none';

    try {
        if (document.fonts?.ready) {
            await document.fonts.ready;
        }

        let dataUrl = null;

        // htmlToImage SVG foreignObject accurately renders CSS 3D transforms, box shadows, and borders
        if (window.htmlToImage) {
            try {
                dataUrl = await window.htmlToImage.toPng(element, {
                    pixelRatio: 2,
                    cacheBust: true,
                    style: { transform: 'none' }
                });
            } catch (svgErr) {
                console.warn('htmlToImage fallback triggered:', svgErr);
            }
        }

        // Secondary fallback uses html2canvas with homography 3D matrix projection
        if (!dataUrl) {
            dataUrl = await renderFallbackWith3DMesh(element, browserWindow);
        }

        return dataUrl;
    } finally {
        browserWindow.style.transition = prevTransition;
    }
}

async function copyImage() {
    const copyBtn = document.getElementById('copyBtn');
    const originalHtml = copyBtn.innerHTML;

    copyBtn.innerHTML = `<i class="ph ph-spinner animate-spin text-xs"></i><span>Copying...</span>`;
    copyBtn.disabled = true;

    try {
        const dataUrl = await generateCanvasDataUrl();
        const res = await fetch(dataUrl);
        const blob = await res.blob();

        if (!navigator.clipboard || !window.ClipboardItem) {
            throw new Error('ClipboardItem API not supported');
        }

        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);

        copyBtn.innerHTML = `<i class="ph-bold ph-check text-emerald-400 text-xs"></i><span>Copied!</span>`;
        showToast('copied 2x retina png to clipboard!', 'success');
        setTimeout(() => {
            copyBtn.innerHTML = originalHtml;
            copyBtn.disabled = false;
        }, 1800);
    } catch (err) {
        showToast('browser memblokir clipboard, gunakan tombol Export PNG', 'warning');
        copyBtn.innerHTML = originalHtml;
        copyBtn.disabled = false;
    }
}

async function exportImage() {
    const exportBtn = document.getElementById('exportBtn');
    const exportBtnMobile = document.getElementById('exportBtnMobile');
    const originalHtml = exportBtn.innerHTML;

    exportBtn.innerHTML = `<i class="ph ph-spinner animate-spin text-sm"></i><span>Rendering...</span>`;
    exportBtn.disabled = true;
    if (exportBtnMobile) exportBtnMobile.disabled = true;

    try {
        const dataUrl = await generateCanvasDataUrl();
        const link = document.createElement('a');
        link.download = `snapframe-${state.theme}-${state.tilt !== 'none' ? state.tilt + '-' : ''}${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        showToast('exported 2x retina png', 'success');
    } catch (err) {
        showToast('export error: gagal merender kanvas', 'warning');
    } finally {
        exportBtn.innerHTML = originalHtml;
        exportBtn.disabled = false;
        if (exportBtnMobile) exportBtnMobile.disabled = false;
    }
}

// 3D Homography fallback renderer when SVG foreignObject is unsupported
async function renderFallbackWith3DMesh(exportCanvasEl, browserWindowEl) {
    const rect = exportCanvasEl.getBoundingClientRect();
    const scale = 2;
    const outCanvas = document.createElement('canvas');
    outCanvas.width = rect.width * scale;
    outCanvas.height = rect.height * scale;
    const ctx = outCanvas.getContext('2d');

    // 1. Draw Background Canvas
    if (state.bgId !== 'transparent') {
        const bgClone = exportCanvasEl.cloneNode(false);
        bgClone.style.width = `${rect.width}px`;
        bgClone.style.height = `${rect.height}px`;
        bgClone.style.position = 'fixed';
        bgClone.style.left = '-9999px';
        document.body.appendChild(bgClone);
        const bgCanvas = await html2canvas(bgClone, { scale, backgroundColor: null });
        ctx.drawImage(bgCanvas, 0, 0);
        document.body.removeChild(bgClone);
    }

    // 2. Capture Flat Window at high scale
    const savedClass = browserWindowEl.className;
    browserWindowEl.classList.remove('tilt-left', 'tilt-right', 'tilt-top', 'tilt-isometric');
    browserWindowEl.classList.add('tilt-none');

    const winCanvas = await html2canvas(browserWindowEl, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null
    });

    browserWindowEl.className = savedClass;

    // 3. Project onto canvas
    const pad = parseFloat(state.padding) * scale;
    const targetW = outCanvas.width - pad * 2;
    const targetH = outCanvas.height - pad * 2;
    const centerX = outCanvas.width / 2;
    const centerY = outCanvas.height / 2;

    if (state.tilt === 'none') {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.55)';
        ctx.shadowBlur = state.shadow === 'none' ? 0 : 40 * scale;
        ctx.shadowOffsetY = state.shadow === 'none' ? 0 : 18 * scale;
        ctx.drawImage(winCanvas, pad, pad, targetW, targetH);
        ctx.restore();
    } else {
        drawPerspectiveImage(ctx, winCanvas, centerX, centerY, targetW, targetH, state.tilt, scale);
    }

    return outCanvas.toDataURL('image/png');
}

// Strip-based homography texture mapper for pseudo-3D perspective projection
function drawPerspectiveImage(ctx, imgCanvas, cx, cy, w, h, tiltMode, scale) {
    const rad = Math.PI / 180;
    let rx = 0, ry = 0, rz = 0, s = 0.94;
    if (tiltMode === 'left') { ry = 12 * rad; rx = 4 * rad; s = 0.94; }
    else if (tiltMode === 'right') { ry = -12 * rad; rx = 4 * rad; s = 0.94; }
    else if (tiltMode === 'top') { rx = 14 * rad; s = 0.94; }
    else if (tiltMode === 'isometric') { rx = 18 * rad; rz = -6 * rad; ry = 10 * rad; s = 0.90; }

    const fov = 1600 * scale;
    function project(x, y) {
        const px = x * s;
        const py = y * s;
        const pz = 0;
        const x1 = px * Math.cos(rz) - py * Math.sin(rz);
        const y1 = px * Math.sin(rz) + py * Math.cos(rz);
        const y2 = y1 * Math.cos(rx) - pz * Math.sin(rx);
        const z2 = y1 * Math.sin(rx) + pz * Math.cos(rx);
        const x3 = x1 * Math.cos(ry) + z2 * Math.sin(ry);
        const z3 = -x1 * Math.sin(ry) + z2 * Math.cos(ry);

        const perspectiveScale = fov / (fov - z3);
        return {
            x: cx + x3 * perspectiveScale,
            y: cy + y2 * perspectiveScale
        };
    }

    const strips = 80;
    ctx.save();
    for (let i = 0; i < strips; i++) {
        const t0 = i / strips;
        const t1 = (i + 1) / strips;
        const y0 = -h / 2 + t0 * h;
        const y1 = -h / 2 + t1 * h;

        const pTL = project(-w / 2, y0);
        const pTR = project(w / 2, y0);
        const pBL = project(-w / 2, y1);
        const pBR = project(w / 2, y1);

        const sy = t0 * imgCanvas.height;
        const sh = (1 / strips) * imgCanvas.height;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(pTL.x, pTL.y);
        ctx.lineTo(pTR.x, pTR.y);
        ctx.lineTo(pBR.x, pBR.y);
        ctx.lineTo(pBL.x, pBL.y);
        ctx.closePath();
        ctx.clip();

        const dx = (pTR.x - pTL.x) / imgCanvas.width;
        const dy = (pTR.y - pTL.y) / imgCanvas.width;
        const ex = (pBL.x - pTL.x) / sh;
        const ey = (pBL.y - pTL.y) / sh;

        ctx.transform(dx, dy, ex, ey, pTL.x - ex * sy, pTL.y - ey * sy);
        ctx.drawImage(imgCanvas, 0, 0);
        ctx.restore();
    }
    ctx.restore();
}

// --- MODAL & TOAST NOTIFICATIONS ---
function toggleTechModal() {
    const modal = document.getElementById('techModal');
    if (!modal) return;
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
}

let toastTimeout;
function showToast(message, type = 'success') {
    const toast = document.getElementById('toastMessage');
    const text = document.getElementById('toastText');
    const dot = document.getElementById('toastDot');
    if (!toast || !text || !dot) return;

    text.innerText = message;
    dot.className = type === 'warning' ? 'w-2 h-2 rounded-full bg-amber-400' : 'w-2 h-2 rounded-full bg-emerald-400';

    toast.classList.remove('hidden');
    toast.classList.add('flex');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
    }, 3500);
}

// --- INIT ON DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    if (urlInput) {
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') captureWebsite();
        });
    }

    const canvas = document.getElementById('exportCanvas');
    if (canvas) {
        canvas.style.background = state.bgCss;
    }

    initControls();
    renderBrowserFrame();

    const img = document.getElementById('screenshotImg');
    if (img) {
        img.src = generateTailwindMockupURI();
    }
});
