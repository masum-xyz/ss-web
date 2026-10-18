// --- DEVICE MOCKUPS & THEME DEFINITIONS ---
const devices = [
    // Phones
    { id: 'iphone-15-pro', name: 'iPhone 15 Pro', category: 'phone', icon: 'ph-device-mobile-camera', tag: 'Titanium Dynamic Island', defaultHeight: 738, containerWidth: 'max-w-[340px]' },
    { id: 'pixel-8', name: 'Pixel 8 Pro', category: 'phone', icon: 'ph-device-mobile', tag: 'Center Punch Hole', defaultHeight: 720, containerWidth: 'max-w-[340px]' },
    { id: 's24-ultra', name: 'Galaxy S24 Ultra', category: 'phone', icon: 'ph-device-mobile', tag: 'Sharp Titanium Edge', defaultHeight: 720, containerWidth: 'max-w-[340px]' },
    { id: 'clay-phone', name: 'Clay Phone', category: 'phone', icon: 'ph-device-mobile', tag: 'Minimalist 3D Bezel', defaultHeight: 720, containerWidth: 'max-w-[340px]' },

    // Laptops
    { id: 'macbook-pro', name: 'MacBook Pro 16"', category: 'laptop', icon: 'ph-laptop', tag: 'Display Notch & Lip', defaultHeight: 420, containerWidth: 'max-w-[760px]' },
    { id: 'thinkpad-laptop', name: 'Modern Ultrabook', category: 'laptop', icon: 'ph-laptop', tag: 'Matte Carbon & Base', defaultHeight: 420, containerWidth: 'max-w-[760px]' },

    // Monitors
    { id: 'studio-display', name: 'Studio Display', category: 'monitor', icon: 'ph-desktop', tag: 'Aluminum Chin & Stand', defaultHeight: 400, containerWidth: 'max-w-[760px]' },
    { id: 'minimal-monitor', name: 'Pro Display XDR', category: 'monitor', icon: 'ph-desktop-tower', tag: 'Slim Border & Desk Stand', defaultHeight: 400, containerWidth: 'max-w-[760px]' },

    // Tablets
    { id: 'ipad-pro', name: 'iPad Pro 12.9"', category: 'tablet', icon: 'ph-device-tablet-camera', tag: 'Liquid Retina Uniform', defaultHeight: 480, containerWidth: 'max-w-[560px]' },
    { id: 'ipad-mini', name: 'iPad Mini', category: 'tablet', icon: 'ph-device-tablet', tag: 'Compact Handheld Frame', defaultHeight: 520, containerWidth: 'max-w-[420px]' },

    // Browsers
    { id: 'macos-dark', name: 'macOS Dark', category: 'browser', icon: 'ph-apple-logo', tag: 'Traffic Lights Titlebar', defaultHeight: 420, containerWidth: 'w-full' },
    { id: 'macos-light', name: 'macOS Light', category: 'browser', icon: 'ph-sun', tag: 'Clean Light Titlebar', defaultHeight: 420, containerWidth: 'w-full' },
    { id: 'arc-glass', name: 'Arc Glass', category: 'browser', icon: 'ph-sidebar', tag: 'Frosted Translucent Bar', defaultHeight: 420, containerWidth: 'w-full' },
    { id: 'win11-mica', name: 'Windows 11', category: 'browser', icon: 'ph-windows-logo', tag: 'Fluent Mica Tab', defaultHeight: 420, containerWidth: 'w-full' },
    { id: 'neo-brutal', name: 'Neo-Brutalist', category: 'browser', icon: 'ph-square-logo', tag: 'Bold Yellow Offset', defaultHeight: 420, containerWidth: 'w-full' },
    { id: 'cyber-neon', name: 'Cyber Glow', category: 'browser', icon: 'ph-terminal', tag: 'HUD Cyan Monospace', defaultHeight: 420, containerWidth: 'w-full' },

    // Pure Screen / Borderless
    { id: 'minimal-float', name: 'Borderless Float', category: 'screen', icon: 'ph-frame-corners', tag: 'Zero Chrome Floating', defaultHeight: 420, containerWidth: 'w-full' },
    { id: 'glass-card', name: 'Glass Card', category: 'screen', icon: 'ph-sparkle', tag: 'Acrylic Glow Border', defaultHeight: 420, containerWidth: 'w-full' }
];

// Alias for backward compatibility
const themes = devices;

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

const STORAGE_KEY = 'snapframe_studio_config_v1';
let isCustomImage = false;

// --- APPLICATION STATE ---
let state = {
    theme: 'macos-dark',
    deviceCategory: 'all',
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

// --- NATIVE MOBILE APP SVG MOCKUP (393x852 iPhone 15 Pro Ratio) ---
function generateMobileMockupURI() {
    const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393 852" width="393" height="852">
        <defs>
            <radialGradient id="mobMesh" cx="50%" cy="0%" r="85%">
                <stop offset="0%" stop-color="#0284c7" stop-opacity="0.35"/>
                <stop offset="40%" stop-color="#4f46e5" stop-opacity="0.18"/>
                <stop offset="100%" stop-color="#060911" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="mobCardGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#141c2c"/>
                <stop offset="100%" stop-color="#0b101c"/>
            </linearGradient>
            <linearGradient id="mobBtnGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#0ea5e9"/>
                <stop offset="100%" stop-color="#2563eb"/>
            </linearGradient>
            <linearGradient id="barGradActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#38bdf8"/>
                <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>
        </defs>
        
        <!-- Base Screen Canvas -->
        <rect width="393" height="852" fill="#070a13"/>
        <rect width="393" height="852" fill="url(#mobMesh)"/>
        
        <!-- Top App Navigation Bar (Starts cleanly below iOS 58pt safe area) -->
        <g id="appHeader">
            <rect x="24" y="66" width="36" height="36" rx="10" fill="#0ea5e9" fill-opacity="0.2" stroke="#38bdf8" stroke-opacity="0.35"/>
            <path d="M33 84 C37 80, 42 80, 45 84 C48 88, 53 88, 56 84" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <text x="70" y="90" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="18" font-weight="800" fill="#f8fafc" letter-spacing="-0.5">snapframe</text>
            
            <circle cx="347" cy="84" r="17" fill="#141c2c" stroke="#25334a"/>
            <circle cx="347" cy="84" r="5" fill="#94a3b8"/>
            <circle cx="352" cy="78" r="3" fill="#38bdf8"/>
        </g>

        <!-- Product Badge -->
        <g id="heroBadge">
            <rect x="24" y="122" width="138" height="26" rx="13" fill="#0ea5e9" fill-opacity="0.15" stroke="#0ea5e9" stroke-opacity="0.35"/>
            <circle cx="38" cy="135" r="3.5" fill="#38bdf8"/>
            <text x="49" y="139" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="11" font-weight="600" fill="#38bdf8" letter-spacing="0.2">STUDIO PRO v4.2</text>
        </g>

        <!-- Hero Headline -->
        <g id="heroText">
            <text x="24" y="188" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="33" font-weight="800" fill="#f8fafc" letter-spacing="-1.2">Design stunning</text>
            <text x="24" y="228" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="33" font-weight="800" fill="#38bdf8" letter-spacing="-1.2">mockups faster.</text>
            <text x="24" y="266" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="13.5" fill="#94a3b8">Turn screenshots into studio-grade retina visuals</text>
            <text x="24" y="287" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="13.5" fill="#94a3b8">ready for App Store &amp; product launches.</text>
        </g>

        <!-- Call to Action Buttons -->
        <g id="ctaButtons">
            <rect x="24" y="318" width="202" height="46" rx="12" fill="url(#mobBtnGrad)"/>
            <text x="125" y="346" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="14" font-weight="700" fill="#ffffff">Get Started Free</text>
            
            <rect x="236" y="318" width="133" height="46" rx="12" fill="#141c2c" stroke="#2a374d"/>
            <text x="302" y="346" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="13" font-weight="600" fill="#cbd5e1">Demo →</text>
        </g>

        <!-- Retina Analytics Glass Card -->
        <g id="analyticsCard">
            <rect x="24" y="386" width="345" height="154" rx="18" fill="url(#mobCardGrad)" stroke="#24334a" stroke-width="1.2"/>
            <text x="44" y="416" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="11" font-weight="600" fill="#94a3b8" letter-spacing="0.5">MONTHLY RETINA EXPORTS</text>
            <text x="44" y="454" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="32" font-weight="800" fill="#f8fafc">148,290</text>
            
            <rect x="232" y="432" width="117" height="26" rx="13" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-opacity="0.4"/>
            <text x="290" y="449" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="11" font-weight="700" fill="#34d399">↗ +34.2% MoM</text>
            
            <!-- Proportional Sparkline Columns -->
            <rect x="44" y="488" width="26" height="30" rx="4" fill="#0ea5e9" fill-opacity="0.35"/>
            <rect x="76" y="478" width="26" height="40" rx="4" fill="#0ea5e9" fill-opacity="0.5"/>
            <rect x="108" y="468" width="26" height="50" rx="4" fill="#0ea5e9" fill-opacity="0.7"/>
            <rect x="140" y="458" width="26" height="60" rx="4" fill="url(#barGradActive)"/>
            <rect x="172" y="472" width="26" height="46" rx="4" fill="#0ea5e9" fill-opacity="0.6"/>
            <rect x="204" y="452" width="26" height="66" rx="4" fill="url(#barGradActive)"/>
            <rect x="236" y="442" width="26" height="76" rx="4" fill="url(#barGradActive)"/>
            <rect x="268" y="432" width="26" height="86" rx="4" fill="#60a5fa"/>
            <rect x="300" y="420" width="26" height="98" rx="4" fill="url(#barGradActive)"/>
        </g>

        <!-- Feature Item 1 -->
        <g id="featureItem1">
            <rect x="24" y="556" width="345" height="64" rx="14" fill="#0e1524" stroke="#1c2638"/>
            <circle cx="56" cy="588" r="16" fill="#0ea5e9" fill-opacity="0.15"/>
            <text x="56" y="593" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="15" fill="#38bdf8">⚡</text>
            <text x="86" y="583" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="13.5" font-weight="700" fill="#f8fafc">Ultra-Crisp 3x Retina</text>
            <text x="86" y="601" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="11" fill="#64748b">Pixel-perfect zero downsampling export</text>
        </g>

        <!-- Feature Item 2 -->
        <g id="featureItem2">
            <rect x="24" y="630" width="345" height="64" rx="14" fill="#0e1524" stroke="#1c2638"/>
            <circle cx="56" cy="662" r="16" fill="#8b5cf6" fill-opacity="0.15"/>
            <text x="56" y="667" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="15" fill="#a78bfa">💎</text>
            <text x="86" y="657" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="13.5" font-weight="700" fill="#f8fafc">Grade 5 Titanium Bezels</text>
            <text x="86" y="675" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="11" fill="#64748b">Dynamic Island &amp; physical hardware buttons</text>
        </g>

        <!-- Bottom Tab Bar (Cleanly floating above 34pt iOS bottom safe area) -->
        <g id="bottomTabBar">
            <rect x="0" y="736" width="393" height="116" fill="#080c16" fill-opacity="0.95" stroke="#1c2638" stroke-width="1"/>
            
            <circle cx="62" cy="764" r="3.5" fill="#38bdf8"/>
            <text x="62" y="781" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="10" font-weight="600" fill="#38bdf8">Studio</text>
            
            <circle cx="152" cy="764" r="3.5" fill="#64748b"/>
            <text x="152" y="781" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748b">Presets</text>
            
            <circle cx="242" cy="764" r="3.5" fill="#64748b"/>
            <text x="242" y="781" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748b">Exports</text>
            
            <circle cx="332" cy="764" r="3.5" fill="#64748b"/>
            <text x="332" y="781" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748b">Settings</text>
        </g>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgContent.trim());
}

function isVectorMockup(src) {
    return Boolean(src && (src.startsWith('data:image/svg+xml') || src.includes('<svg')));
}

// --- CONFIG PERSISTENCE (LOCAL STORAGE) ---
function saveConfigToStorage() {
    try {
        const imgEl = document.getElementById('screenshotImg');
        const isCustom = Boolean(isCustomImage && imgEl && imgEl.src && !isVectorMockup(imgEl.src));
        const imgSrc = (isCustom && imgEl.src.length < 1500000) ? imgEl.src : null;

        const payload = {
            theme: state.theme,
            deviceCategory: state.deviceCategory,
            bgMode: state.bgMode,
            bgId: state.bgId,
            bgCss: state.bgCss,
            viewportHeight: state.viewportHeight,
            padding: state.padding,
            radius: state.radius,
            shadow: state.shadow,
            tilt: state.tilt,
            displayUrl: state.displayUrl,
            showUrlBar: state.showUrlBar,
            showWatermark: state.showWatermark,
            grad1: document.getElementById('gradColor1')?.value || '#0ea5e9',
            grad2: document.getElementById('gradColor2')?.value || '#6366f1',
            gradAngle: document.getElementById('gradAngleSlider')?.value || '135',
            solidColor: document.getElementById('solidColorPicker')?.value || '#18181b',
            isCustomImage: isCustom,
            customImageSrc: imgSrc
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
        console.warn('LocalStorage save failed:', e);
    }
}

function loadConfigFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const saved = JSON.parse(raw);
        if (!saved || typeof saved !== 'object') return false;

        if (saved.theme && devices.some(d => d.id === saved.theme)) state.theme = saved.theme;
        if (saved.deviceCategory) state.deviceCategory = saved.deviceCategory;
        if (saved.bgMode) state.bgMode = saved.bgMode;
        if (saved.bgId) state.bgId = saved.bgId;
        if (saved.bgCss) state.bgCss = saved.bgCss;
        if (saved.viewportHeight) state.viewportHeight = parseInt(saved.viewportHeight, 10);
        if (state.theme === 'iphone-15-pro' && state.viewportHeight < 680) {
            state.viewportHeight = 738;
        }
        if (saved.padding) state.padding = parseInt(saved.padding, 10);
        if (saved.radius) state.radius = parseInt(saved.radius, 10);
        if (saved.shadow) state.shadow = saved.shadow;
        if (saved.tilt) state.tilt = saved.tilt;
        if (saved.displayUrl) state.displayUrl = saved.displayUrl;
        if (typeof saved.showUrlBar === 'boolean') state.showUrlBar = saved.showUrlBar;
        if (typeof saved.showWatermark === 'boolean') state.showWatermark = saved.showWatermark;

        const heightSlider = document.getElementById('heightSlider');
        const heightVal = document.getElementById('heightVal');
        if (heightSlider) heightSlider.value = state.viewportHeight;
        if (heightVal) heightVal.innerText = `${state.viewportHeight}px`;

        const paddingSlider = document.getElementById('paddingSlider');
        const paddingVal = document.getElementById('paddingVal');
        if (paddingSlider) paddingSlider.value = state.padding;
        if (paddingVal) paddingVal.innerText = `${state.padding}px`;

        const radiusSlider = document.getElementById('radiusSlider');
        const radiusVal = document.getElementById('radiusVal');
        if (radiusSlider) radiusSlider.value = state.radius;
        if (radiusVal) radiusVal.innerText = `${state.radius}px`;

        const displayUrlInput = document.getElementById('displayUrlInput');
        if (displayUrlInput) displayUrlInput.value = state.displayUrl;

        const toggleUrlBar = document.getElementById('toggleUrlBar');
        if (toggleUrlBar) toggleUrlBar.checked = state.showUrlBar;

        const toggleWatermark = document.getElementById('toggleWatermark');
        if (toggleWatermark) toggleWatermark.checked = state.showWatermark;

        if (saved.grad1) {
            const c1 = document.getElementById('gradColor1');
            const h1 = document.getElementById('gradHex1');
            if (c1) c1.value = saved.grad1;
            if (h1) h1.value = saved.grad1;
        }
        if (saved.grad2) {
            const c2 = document.getElementById('gradColor2');
            const h2 = document.getElementById('gradHex2');
            if (c2) c2.value = saved.grad2;
            if (h2) h2.value = saved.grad2;
        }
        if (saved.gradAngle) {
            const ang = document.getElementById('gradAngleSlider');
            const angVal = document.getElementById('gradAngleVal');
            if (ang) ang.value = saved.gradAngle;
            if (angVal) angVal.innerText = `${saved.gradAngle}°`;
        }
        if (saved.solidColor) {
            const sol = document.getElementById('solidColorPicker');
            const solHex = document.getElementById('solidColorHex');
            if (sol) sol.value = saved.solidColor;
            if (solHex) solHex.value = saved.solidColor;
        }

        const urlInput = document.getElementById('urlInput');
        if (urlInput) urlInput.value = state.displayUrl;

        switchBgTab(state.bgMode, false);

        if (saved.isCustomImage && saved.customImageSrc && !isVectorMockup(saved.customImageSrc)) {
            isCustomImage = true;
            const imgEl = document.getElementById('screenshotImg');
            if (imgEl) imgEl.src = saved.customImageSrc;
        } else {
            isCustomImage = false;
        }

        return true;
    } catch (e) {
        console.warn('LocalStorage load error:', e);
        return false;
    }
}

// --- UI CONTROLS INITIALIZATION ---
function filterDeviceCategory(category, save = true) {
    state.deviceCategory = category;

    document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        const isMatch = btn.dataset.cat === category;
        btn.className = isMatch
            ? 'cat-filter-btn px-2 py-1 rounded bg-zinc-800 text-zinc-100 border border-zinc-700 whitespace-nowrap transition'
            : 'cat-filter-btn px-2 py-1 rounded text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 whitespace-nowrap transition';
    });

    initControls();
    if (save) saveConfigToStorage();
}

function initControls() {
    const themeGrid = document.getElementById('themeSelectorGrid');
    if (themeGrid) {
        const filtered = state.deviceCategory === 'all'
            ? devices
            : devices.filter(d => d.category === state.deviceCategory);

        themeGrid.innerHTML = filtered.map(t => {
            const isSelected = state.theme === t.id;
            return `
                <button 
                    onclick="selectTheme('${t.id}')" 
                    class="text-left px-2.5 py-2 rounded-md border transition-all flex flex-col gap-0.5 ${isSelected ? 'bg-zinc-800 border-zinc-500 text-zinc-100 shadow-sm' : 'bg-zinc-900/50 border-zinc-800/90 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'}"
                >
                    <div class="flex items-center gap-1.5 w-full">
                        <i class="ph ${t.icon} text-sm shrink-0 ${isSelected ? 'text-zinc-100' : 'text-zinc-500'}"></i>
                        <span class="font-medium text-[11px] truncate text-zinc-200">${t.name}</span>
                    </div>
                    <span class="text-[9px] font-mono text-zinc-500 truncate pl-5">${t.tag}</span>
                </button>
            `;
        }).join('');
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
function switchBgTab(mode, save = true) {
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

    if (mode === 'gradient') applyCustomGradient(save);
    if (mode === 'solid') applyCustomSolid(save);
    if (save) saveConfigToStorage();
}

function applyCustomGradient(save = true) {
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
    if (save) saveConfigToStorage();
}

function applyCustomSolid(save = true) {
    const c = document.getElementById('solidColorPicker').value;
    document.getElementById('solidColorHex').value = c;
    state.bgCss = c;
    state.bgId = 'custom-solid';
    document.getElementById('exportCanvas').style.background = c;
    initControls();
    if (save) saveConfigToStorage();
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

// --- BROWSER & DEVICE FRAME RENDERING ---
function renderBrowserFrame() {
    const headerEl = document.getElementById('browserHeader');
    const windowEl = document.getElementById('browserWindow');
    const footerEl = document.getElementById('browserFooter');
    const standEl = document.getElementById('deviceStand');
    const wrapperEl = document.getElementById('deviceWrapper');
    const viewportEl = document.getElementById('viewportContainer');
    const buttonsEl = document.getElementById('hardwareButtons');

    if (!headerEl || !windowEl) return;

    const currentDevice = devices.find(d => d.id === state.theme) || devices[0];
    const urlText = formatSafeUrl(state.displayUrl, 38);
    const shortUrlText = formatSafeUrl((state.displayUrl || 'https://tailwindcss.com').replace(/^https?:\/\//, ''), 32);
    const showUrl = state.showUrlBar;

    // Reset container wrapper sizing and tilt
    if (wrapperEl) {
        wrapperEl.className = `relative z-10 transition-all duration-300 flex flex-col items-center justify-center w-full ${currentDevice.containerWidth || 'w-full'} tilt-${state.tilt}`;
    }

    // Reset window styling & classes
    windowEl.className = `w-full relative overflow-hidden transition-all duration-300 shadow-${state.shadow}`;
    windowEl.style.border = '';
    windowEl.style.borderTop = '';
    windowEl.style.borderBottom = '';
    windowEl.style.borderRadius = `${state.radius}px`;
    windowEl.style.boxShadow = '';
    windowEl.style.background = '';

    if (viewportEl) {
        viewportEl.style.height = `${state.viewportHeight}px`;
        viewportEl.style.borderRadius = '0';
    }

    headerEl.className = 'relative z-20';
    headerEl.innerHTML = '';
    if (footerEl) {
        footerEl.className = 'relative z-20';
        footerEl.innerHTML = '';
    }
    if (standEl) {
        standEl.className = 'w-full flex flex-col items-center pointer-events-none';
        standEl.innerHTML = '';
    }
    if (buttonsEl) {
        buttonsEl.innerHTML = '';
    }

    // Standard inline icons for identical rasterization across headless/cross-origin engines
    const lockSvgDark = `<svg width="10" height="10" viewBox="0 0 256 256" fill="#71717a" style="flex-shrink:0; display:block;"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM104,56a24,24,0,0,1,48,0V80H104Z"/></svg>`;
    const lockSvgLight = `<svg width="10" height="10" viewBox="0 0 256 256" fill="#a1a1aa" style="flex-shrink:0; display:block;"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM104,56a24,24,0,0,1,48,0V80H104Z"/></svg>`;
    const plusSvg = `<svg width="12" height="12" viewBox="0 0 256 256" fill="currentColor" style="display:block;"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/></svg>`;

    // --- 1. PHONES (Authentic hardware chassis, buttons & floating status overlays) ---
    if (state.theme === 'iphone-15-pro') {
        if (buttonsEl) {
            buttonsEl.innerHTML = `
                <!-- Left Side: Action Button, Volume Up, Volume Down -->
                <div class="phone-btn-left" style="top: 110px; height: 26px;" title="Action Button"></div>
                <div class="phone-btn-left" style="top: 155px; height: 50px;" title="Volume Up"></div>
                <div class="phone-btn-left" style="top: 220px; height: 50px;" title="Volume Down"></div>
                <!-- Right Side: Power / Siri Button -->
                <div class="phone-btn-right" style="top: 165px; height: 75px;" title="Side / Power Button"></div>
            `;
        }

        windowEl.style.borderRadius = '52px';
        windowEl.style.border = '7px solid #3c3a42';
        windowEl.style.boxShadow = '0 0 0 1px #595761, 0 0 0 3px #050507, 0 25px 65px -15px rgba(0, 0, 0, 0.85)';
        windowEl.style.background = '#000000';

        if (viewportEl) {
            viewportEl.style.borderRadius = '42px';
            viewportEl.style.overflow = 'hidden';
        }

        headerEl.className = 'absolute top-0 left-0 right-0 z-30 pointer-events-none';
        headerEl.innerHTML = `
            <!-- Micro Speaker Ear-Piece on Bezel -->
            <div class="absolute -top-[5px] left-1/2 -translate-x-1/2 w-12 h-[2.5px] bg-[#1a1a1e] rounded-full z-40"></div>

            <!-- iOS 17 Status Bar: Time Left, Dynamic Island Center, Status Icons Right -->
            <div class="h-11 px-6 pt-1.5 flex items-center justify-between text-white select-none">
                <!-- Left: 9:41 Time -->
                <span class="font-semibold text-[13px] tracking-tight text-white/95 w-14 select-none">9:41</span>
                
                <!-- Center: Floating Dynamic Island (Free-floating pill with TrueDepth & camera lens) -->
                <div class="w-[104px] h-[28px] bg-black rounded-full flex items-center justify-between px-2.5 shadow-[0_0_0_0.5px_rgba(255,255,255,0.12)]">
                    <!-- TrueDepth IR Sensor -->
                    <div class="w-2.5 h-2.5 rounded-full bg-[#0a0a0f] flex items-center justify-center">
                        <span class="w-1 h-1 rounded-full bg-[#141420]"></span>
                    </div>
                    <!-- FaceTime Optical Lens -->
                    <div class="w-3 h-3 rounded-full bg-[#080d1a] ring-1 ring-white/10 flex items-center justify-center">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#182844]"></span>
                    </div>
                </div>

                <!-- Right: Cellular 4-bar, 5G, and iOS Battery Capsule -->
                <div class="flex items-center justify-end gap-1.5 text-white/90 text-xs w-14 select-none">
                    <svg class="w-3.5 h-2.5 fill-current" viewBox="0 0 640 512">
                        <rect x="0" y="384" width="90" height="128" rx="20"/>
                        <rect x="160" y="256" width="90" height="256" rx="20"/>
                        <rect x="320" y="128" width="90" height="384" rx="20"/>
                        <rect x="480" y="0" width="90" height="512" rx="20"/>
                    </svg>
                    <span class="font-bold text-[9px] font-mono leading-none">5G</span>
                    <div class="flex items-center">
                        <div class="w-5 h-2.5 rounded-[4px] border border-white/80 p-0.5 flex items-center">
                            <div class="w-full h-full bg-white rounded-[2px]"></div>
                        </div>
                        <div class="w-0.5 h-1 bg-white/60 rounded-r-xs"></div>
                    </div>
                </div>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'absolute bottom-0 left-0 right-0 z-30 pointer-events-none';
            footerEl.innerHTML = `
                <div class="h-6 flex items-center justify-center pb-1.5 select-none">
                    <div class="w-32 h-1 bg-white/60 rounded-full backdrop-blur-sm shadow-sm"></div>
                </div>
            `;
        }
        return;
    }

    if (state.theme === 'pixel-8') {
        if (buttonsEl) {
            buttonsEl.innerHTML = `
                <!-- Right Side: Pixel Power Button & Volume Rocker -->
                <div class="phone-btn-right" style="top: 135px; height: 35px;" title="Power Button"></div>
                <div class="phone-btn-right" style="top: 190px; height: 65px;" title="Volume Rocker"></div>
            `;
        }

        windowEl.style.borderRadius = '46px';
        windowEl.style.border = '6px solid #28282b';
        windowEl.style.boxShadow = '0 0 0 1px #48484e, 0 0 0 2.5px #050507, 0 25px 65px -15px rgba(0, 0, 0, 0.85)';
        windowEl.style.background = '#000000';

        if (viewportEl) {
            viewportEl.style.borderRadius = '38px';
            viewportEl.style.overflow = 'hidden';
        }

        headerEl.className = 'absolute top-0 left-0 right-0 z-30 pointer-events-none';
        headerEl.innerHTML = `
            <div class="h-10 px-6 pt-1 flex items-center justify-between text-white select-none">
                <span class="text-[12px] font-medium text-zinc-200 w-12">10:08</span>
                <div class="w-3.5 h-3.5 rounded-full bg-[#0a0a0c] ring-1 ring-zinc-700/80 flex items-center justify-center shadow-sm">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#1a2333]"></span>
                </div>
                <div class="flex items-center justify-end gap-1.5 text-zinc-200 text-xs w-12">
                    <span class="font-bold text-[10px]">5G</span>
                    <i class="ph-fill ph-battery-full text-xs"></i>
                </div>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'absolute bottom-0 left-0 right-0 z-30 pointer-events-none';
            footerEl.innerHTML = `
                <div class="h-6 flex items-center justify-center pb-1.5 select-none">
                    <div class="w-24 h-1 bg-white/50 rounded-full"></div>
                </div>
            `;
        }
        return;
    }

    if (state.theme === 's24-ultra') {
        if (buttonsEl) {
            buttonsEl.innerHTML = `
                <!-- Right Side: Galaxy S24 Ultra Volume and Power Buttons -->
                <div class="phone-btn-right" style="top: 140px; height: 60px;" title="Volume Rocker"></div>
                <div class="phone-btn-right" style="top: 220px; height: 40px;" title="Power Button"></div>
            `;
        }

        windowEl.style.borderRadius = '12px';
        windowEl.style.border = '5px solid #2f3035';
        windowEl.style.boxShadow = '0 0 0 1px #505259, 0 0 0 2.5px #050507, 0 25px 65px -15px rgba(0, 0, 0, 0.85)';
        windowEl.style.background = '#000000';

        if (viewportEl) {
            viewportEl.style.borderRadius = '6px';
            viewportEl.style.overflow = 'hidden';
        }

        headerEl.className = 'absolute top-0 left-0 right-0 z-30 pointer-events-none';
        headerEl.innerHTML = `
            <div class="h-8 px-5 pt-1 flex items-center justify-between text-white select-none">
                <span class="text-[11px] font-medium text-zinc-200 w-12">12:45</span>
                <div class="w-3 h-3 rounded-full bg-[#050507] ring-1 ring-zinc-700 flex items-center justify-center">
                    <span class="w-1 h-1 rounded-full bg-[#182030]"></span>
                </div>
                <div class="flex items-center justify-end gap-1 text-zinc-200 text-[10px] w-12">
                    <span class="font-bold">5G</span>
                    <i class="ph-fill ph-battery-charging text-xs text-emerald-400"></i>
                </div>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'absolute bottom-0 left-0 right-0 z-30 pointer-events-none';
            footerEl.innerHTML = `
                <div class="h-6 flex items-center justify-center pb-1 select-none">
                    <div class="w-28 h-0.5 bg-white/50 rounded-full"></div>
                </div>
            `;
        }
        return;
    }

    if (state.theme === 'clay-phone') {
        windowEl.style.borderRadius = '46px';
        windowEl.style.border = '12px solid #27272a';
        windowEl.style.boxShadow = '0 30px 60px -15px rgba(0,0,0,0.6)';

        headerEl.className = 'absolute top-0 left-0 right-0 z-30 pointer-events-none';
        headerEl.innerHTML = `
            <div class="h-8 flex items-center justify-center select-none pt-1">
                <div class="w-14 h-1.5 bg-[#18181b] rounded-full shadow-inner"></div>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'absolute bottom-0 left-0 right-0 z-30 pointer-events-none';
            footerEl.innerHTML = `
                <div class="h-7 flex items-center justify-center pb-2 bg-gradient-to-t from-black/40 to-transparent select-none">
                    <div class="w-20 h-1 bg-white/30 rounded-full"></div>
                </div>
            `;
        }
        return;
    }

    // --- 2. LAPTOPS ---
    if (state.theme === 'macbook-pro') {
        windowEl.style.borderRadius = '16px 16px 0 0';
        windowEl.style.border = '8px solid #141416';
        windowEl.style.borderBottom = 'none';

        headerEl.className = 'relative z-20';
        headerEl.innerHTML = `
            <div class="h-7 bg-[#141416] px-4 flex items-center justify-between select-none relative z-20">
                <div class="flex items-center gap-2 text-zinc-400 text-[10px] font-mono">
                    <i class="ph-fill ph-apple-logo text-zinc-300 text-xs"></i>
                    <span class="hidden sm:inline text-zinc-400">File</span>
                    <span class="hidden sm:inline text-zinc-400">Edit</span>
                    <span class="hidden sm:inline text-zinc-400">View</span>
                </div>
                <div class="absolute left-1/2 -translate-x-1/2 top-0 h-4 px-3 bg-[#141416] rounded-b-md flex items-center justify-center gap-1.5 border-x border-b border-zinc-800/80 shadow-xs pointer-events-none">
                    <div class="w-2 h-2 rounded-full bg-[#0a0a0c] ring-1 ring-zinc-700/50 flex items-center justify-center">
                        <span class="w-0.5 h-0.5 rounded-full bg-emerald-400/80"></span>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-zinc-400 text-[10px] font-mono">
                    <i class="ph ph-wifi-high text-xs"></i>
                    <i class="ph ph-battery-charging text-xs text-emerald-400"></i>
                    <span>9:41 AM</span>
                </div>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'relative z-20';
            footerEl.innerHTML = `
                <div class="h-3.5 bg-[#141416] flex items-center justify-center select-none">
                    <span style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 8px; letter-spacing: 0.15em; color: #52525b; text-transform: uppercase;">MacBook Pro</span>
                </div>
            `;
        }

        if (standEl) {
            standEl.innerHTML = `
                <div class="w-[103%] h-4 bg-gradient-to-b from-[#2a2a2d] to-[#18181a] rounded-b-xl border-t border-zinc-700/70 shadow-2xl flex justify-center items-start relative select-none">
                    <div class="w-16 h-1.5 bg-[#101012] rounded-b-md shadow-inner"></div>
                </div>
                <div class="w-[96%] h-1 bg-black/40 blur-xs rounded-full"></div>
            `;
        }
        return;
    }

    if (state.theme === 'thinkpad-laptop') {
        windowEl.style.borderRadius = '10px 10px 0 0';
        windowEl.style.border = '7px solid #1a1a1c';
        windowEl.style.borderBottom = 'none';

        headerEl.className = 'relative z-20';
        headerEl.innerHTML = `
            <div class="h-6 bg-[#1a1a1c] px-3 flex items-center justify-between select-none relative z-20">
                <span class="text-[9px] font-mono text-zinc-500">1080p FHD</span>
                <div class="w-2.5 h-2.5 rounded-full bg-black ring-1 ring-zinc-700 flex items-center justify-center pointer-events-none">
                    <span class="w-1 h-1 rounded-full bg-red-500/80"></span>
                </div>
                <span class="text-[9px] font-mono text-zinc-500">IR</span>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'hidden';
            footerEl.innerHTML = '';
        }

        if (standEl) {
            standEl.innerHTML = `
                <div class="w-[104%] h-4.5 bg-gradient-to-b from-[#252528] to-[#141416] rounded-b-lg border-t border-zinc-700 shadow-2xl flex justify-between items-center px-6 relative select-none">
                    <span class="w-2 h-1 bg-red-600 rounded-xs"></span>
                    <div class="w-20 h-1 bg-[#0c0c0e] rounded-b-sm"></div>
                    <span class="text-[8px] font-mono text-zinc-500">ULTRA</span>
                </div>
                <div class="w-[96%] h-1 bg-black/40 blur-xs rounded-full"></div>
            `;
        }
        return;
    }

    // --- 3. MONITORS ---
    if (state.theme === 'studio-display') {
        windowEl.style.borderRadius = '14px 14px 0 0';
        windowEl.style.border = '8px solid #101012';
        windowEl.style.borderBottom = 'none';

        headerEl.className = 'relative z-20';
        headerEl.innerHTML = `
            <div class="h-5 bg-[#101012] flex items-center justify-center select-none">
                <div class="w-2.5 h-2.5 rounded-full bg-[#08080a] ring-1 ring-zinc-800 flex items-center justify-center pointer-events-none">
                    <span class="w-1 h-1 rounded-full bg-blue-900/60"></span>
                </div>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'relative z-20';
            footerEl.innerHTML = `
                <div class="h-10 bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 flex items-center justify-center border-t border-zinc-400/40 select-none shadow-xs">
                    <i class="ph-fill ph-apple-logo text-zinc-500/80 text-base"></i>
                </div>
            `;
        }

        if (standEl) {
            standEl.innerHTML = `
                <div class="flex flex-col items-center select-none w-full">
                    <div class="w-20 h-12 bg-gradient-to-b from-zinc-400 via-zinc-300 to-zinc-400 shadow-md border-x border-zinc-400/60 relative"></div>
                    <div class="w-48 h-3.5 bg-gradient-to-r from-zinc-300 via-zinc-200 to-zinc-300 rounded-sm shadow-2xl border border-zinc-400/60 flex items-center justify-center">
                        <div class="w-44 h-0.5 bg-white/40 rounded-full"></div>
                    </div>
                    <div class="w-44 h-1 bg-black/40 blur-xs rounded-full"></div>
                </div>
            `;
        }
        return;
    }

    if (state.theme === 'minimal-monitor') {
        windowEl.style.borderRadius = '8px 8px 0 0';
        windowEl.style.border = '5px solid #141416';
        windowEl.style.borderBottom = 'none';

        headerEl.className = 'relative z-20';
        headerEl.innerHTML = `
            <div class="h-4 bg-[#141416] flex items-center justify-center select-none">
                <div class="w-2 h-2 rounded-full bg-[#08080a] ring-1 ring-zinc-800"></div>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'hidden';
            footerEl.innerHTML = '';
        }

        if (standEl) {
            standEl.innerHTML = `
                <div class="flex flex-col items-center select-none w-full mt-0.5">
                    <div class="w-12 h-10 bg-zinc-800 border-x border-zinc-700/80 shadow-md"></div>
                    <div class="w-40 h-2.5 bg-zinc-700 rounded-xs shadow-xl border border-zinc-600/70"></div>
                    <div class="w-36 h-1 bg-black/40 blur-xs rounded-full"></div>
                </div>
            `;
        }
        return;
    }

    // --- 4. TABLETS ---
    if (state.theme === 'ipad-pro') {
        windowEl.style.borderRadius = '28px';
        windowEl.style.border = '11px solid #1c1c1f';
        windowEl.style.boxShadow = '0 25px 60px -15px rgba(0, 0, 0, 0.75)';

        headerEl.className = 'absolute top-0 left-0 right-0 z-20 pointer-events-none';
        headerEl.innerHTML = `
            <div class="h-8 px-5 flex items-center justify-between text-white select-none bg-gradient-to-b from-black/60 to-transparent">
                <span class="text-[11px] font-semibold text-white/95">9:41</span>
                <div class="flex items-center gap-1.5 text-white/80 text-[10px]">
                    <i class="ph ph-wifi-high text-xs"></i>
                    <span>100%</span>
                    <i class="ph-fill ph-battery-full text-xs text-emerald-400"></i>
                </div>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'absolute bottom-0 left-0 right-0 z-20 pointer-events-none';
            footerEl.innerHTML = `
                <div class="h-7 flex items-center justify-center pb-2 bg-gradient-to-t from-black/40 to-transparent select-none">
                    <div class="w-36 h-1 bg-white/50 rounded-full"></div>
                </div>
            `;
        }
        return;
    }

    if (state.theme === 'ipad-mini') {
        windowEl.style.borderRadius = '22px';
        windowEl.style.border = '9px solid #232326';
        windowEl.style.boxShadow = '0 25px 60px -15px rgba(0, 0, 0, 0.75)';

        headerEl.className = 'absolute top-0 left-0 right-0 z-20 pointer-events-none';
        headerEl.innerHTML = `
            <div class="h-7 px-4 flex items-center justify-between text-white select-none bg-gradient-to-b from-black/60 to-transparent">
                <span class="text-[10px] font-semibold text-white/95">9:41</span>
                <div class="flex items-center gap-1 text-white/80 text-[10px]">
                    <i class="ph-fill ph-battery-full text-xs text-emerald-400"></i>
                </div>
            </div>
        `;

        if (footerEl) {
            footerEl.className = 'absolute bottom-0 left-0 right-0 z-20 pointer-events-none';
            footerEl.innerHTML = `
                <div class="h-6 flex items-center justify-center pb-1.5 bg-gradient-to-t from-black/40 to-transparent select-none">
                    <div class="w-28 h-1 bg-white/40 rounded-full"></div>
                </div>
            `;
        }
        return;
    }

    // --- 5. BROWSERS ---
    if (state.theme === 'macos-dark') {
        windowEl.style.borderRadius = `${state.radius}px`;
        windowEl.style.border = '1px solid #27272a';
        if (viewportEl) viewportEl.style.borderRadius = `0 0 ${state.radius}px ${state.radius}px`;

        headerEl.innerHTML = `
            <div class="h-10 bg-[#141417] border-b border-zinc-800 px-4 flex items-center justify-between select-none" style="border-radius: ${state.radius}px ${state.radius}px 0 0;">
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
        windowEl.style.borderRadius = `${state.radius}px`;
        windowEl.style.border = '1px solid #e4e4e7';
        if (viewportEl) viewportEl.style.borderRadius = `0 0 ${state.radius}px ${state.radius}px`;

        headerEl.innerHTML = `
            <div class="h-10 bg-zinc-100 border-b border-zinc-200 px-4 flex items-center justify-between select-none" style="border-radius: ${state.radius}px ${state.radius}px 0 0;">
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
        windowEl.style.borderRadius = `${state.radius}px`;
        windowEl.classList.add('p-2.5', 'bg-white/15', 'backdrop-blur-xl', 'border', 'border-white/25');
        if (viewportEl) viewportEl.style.borderRadius = `${Math.max(0, state.radius - 4)}px`;

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
        windowEl.style.borderRadius = `${state.radius}px`;
        windowEl.classList.add('neo-brutal-shadow');
        if (viewportEl) viewportEl.style.borderRadius = `0 0 ${state.radius}px ${state.radius}px`;

        headerEl.innerHTML = `
            <div class="h-11 bg-[#facc15] border-b-[2.5px] border-black px-4 flex items-center justify-between select-none text-black" style="border-radius: ${state.radius}px ${state.radius}px 0 0;">
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
        windowEl.style.borderRadius = `${state.radius}px`;
        windowEl.classList.add('neon-glow-frame');
        if (viewportEl) viewportEl.style.borderRadius = `0 0 ${state.radius}px ${state.radius}px`;

        headerEl.innerHTML = `
            <div class="h-10 bg-[#070709] border-b border-cyan-500/30 px-4 flex items-center justify-between select-none" style="border-radius: ${state.radius}px ${state.radius}px 0 0;">
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
        windowEl.style.borderRadius = `${state.radius}px`;
        windowEl.style.border = '1px solid #2d2d2d';
        if (viewportEl) viewportEl.style.borderRadius = `0 0 ${state.radius}px ${state.radius}px`;

        headerEl.innerHTML = `
            <div class="h-9 bg-[#1f1f1f] border-b border-[#2d2d2d] pl-3 flex items-center justify-between select-none text-zinc-300" style="border-radius: ${state.radius}px ${state.radius}px 0 0;">
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

    // --- 6. PURE SCREENS ---
    if (state.theme === 'glass-card') {
        windowEl.style.borderRadius = `${parseInt(state.radius) + 8}px`;
        windowEl.classList.add('p-3', 'bg-white/10', 'backdrop-blur-xl', 'border', 'border-white/20');
        if (viewportEl) viewportEl.style.borderRadius = `${state.radius}px`;
        headerEl.innerHTML = '';
        return;
    }

    if (state.theme === 'minimal-float') {
        windowEl.style.borderRadius = `${state.radius}px`;
        if (viewportEl) viewportEl.style.borderRadius = `${state.radius}px`;
        headerEl.innerHTML = '';
    }
}

// --- INTERACTION & SETTINGS HANDLERS ---
function selectTheme(themeId) {
    const prev = devices.find(d => d.id === state.theme);
    const found = devices.find(d => d.id === themeId);
    if (!found) return;

    state.theme = themeId;

    // Automatically adapt viewport height when switching between phone and wider devices
    if (found.category === 'phone') {
        if (state.viewportHeight < 680 || !prev || prev.category !== 'phone') {
            state.viewportHeight = found.defaultHeight;
        }
    } else if (prev && prev.category === 'phone' && found.category !== 'phone') {
        state.viewportHeight = found.defaultHeight;
    }
    const heightSlider = document.getElementById('heightSlider');
    const heightVal = document.getElementById('heightVal');
    if (heightSlider) heightSlider.value = state.viewportHeight;
    if (heightVal) heightVal.innerText = `${state.viewportHeight}px`;

    const viewportEl = document.getElementById('viewportContainer');
    if (viewportEl) viewportEl.style.height = `${state.viewportHeight}px`;

    const badge = document.getElementById('activeThemeBadge');
    if (badge) badge.innerText = found.name;

    // Automatically toggle between native mobile and desktop mockups if user hasn't mounted custom image
    const img = document.getElementById('screenshotImg');
    const isCustom = Boolean(isCustomImage && img && img.src && !isVectorMockup(img.src));
    if (!isCustom && img) {
        img.src = (found.category === 'phone')
            ? generateMobileMockupURI()
            : generateTailwindMockupURI();
    }

    initControls();
    renderBrowserFrame();
    updateSummaryText();
    saveConfigToStorage();
}

function selectBackground(bgId) {
    const found = backgrounds.find(b => b.id === bgId);
    if (!found) return;

    state.bgMode = 'preset';
    state.bgId = bgId;
    state.bgCss = found.css;
    document.getElementById('exportCanvas').style.background = found.css;
    initControls();
    saveConfigToStorage();
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
    saveConfigToStorage();
}

function setHeightPreset(heightPx, label) {
    const slider = document.getElementById('heightSlider');
    slider.value = heightPx;
    updateFrameSettings();
    showToast(`height preset: ${label} (${heightPx}px)`, 'success');
}

function setShadow(level, save = true) {
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
    if (save) saveConfigToStorage();
}

function setTilt(tiltMode, save = true) {
    state.tilt = tiltMode;
    const deviceWrapper = document.getElementById('deviceWrapper') || document.getElementById('browserWindow');
    const browserWindow = document.getElementById('browserWindow');

    if (browserWindow) {
        browserWindow.classList.remove('tilt-none', 'tilt-left', 'tilt-right', 'tilt-top', 'tilt-isometric');
    }
    if (deviceWrapper) {
        deviceWrapper.classList.remove('tilt-none', 'tilt-left', 'tilt-right', 'tilt-top', 'tilt-isometric');
        deviceWrapper.classList.add(`tilt-${tiltMode}`);
    }

    document.querySelectorAll('.tilt-btn').forEach(btn => {
        const isSelected = btn.dataset.tilt === tiltMode;
        btn.className = isSelected
            ? 'tilt-btn py-1.5 text-[10px] font-mono rounded bg-zinc-800 text-zinc-100 font-medium transition'
            : 'tilt-btn py-1.5 text-[10px] font-mono rounded text-zinc-400 hover:text-zinc-100 transition';
    });
    updateSummaryText();
    if (save) saveConfigToStorage();
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
                isCustomImage = true;
                saveConfigToStorage();
                loader.classList.add('hidden');
                loader.classList.remove('flex');
                showToast(`captured: ${rawUrl}`, 'success');
            };
            reader.readAsDataURL(blob);
        } catch (corsErr) {
            imgEl.onload = () => {
                isCustomImage = true;
                saveConfigToStorage();
                loader.classList.add('hidden');
                loader.classList.remove('flex');
                showToast(`captured: ${rawUrl}`, 'success');
            };
            imgEl.onerror = () => {
                isCustomImage = false;
                loader.classList.add('hidden');
                loader.classList.remove('flex');
                const curr = devices.find(d => d.id === state.theme);
                imgEl.src = (curr && curr.category === 'phone') ? generateMobileMockupURI() : generateTailwindMockupURI();
                showToast('cors fallback: loaded local preview', 'warning');
            };
            imgEl.src = shotUrl;
        }
    } catch (error) {
        isCustomImage = false;
        loader.classList.add('hidden');
        loader.classList.remove('flex');
        const curr = devices.find(d => d.id === state.theme);
        document.getElementById('screenshotImg').src = (curr && curr.category === 'phone') ? generateMobileMockupURI() : generateTailwindMockupURI();
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
            isCustomImage = true;
            saveConfigToStorage();
            showToast('clipboard image mounted', 'success');
        };
        reader.readAsDataURL(blob);
        break;
    }
});

// --- RESET TO VECTOR MOCKUP ---
function resetDefaultMockup() {
    isCustomImage = false;
    const curr = devices.find(d => d.id === state.theme);
    const img = document.getElementById('screenshotImg');
    if (img) {
        img.src = (curr && curr.category === 'phone')
            ? generateMobileMockupURI()
            : generateTailwindMockupURI();
    }
    saveConfigToStorage();
    showToast('restored default vector mockup', 'success');
}

// --- CANVAS EXPORT ENGINE ---
async function generateCanvasDataUrl() {
    const element = document.getElementById('exportCanvas');
    const browserWindow = document.getElementById('browserWindow');
    const deviceWrapper = document.getElementById('deviceWrapper');

    const prevWinTransition = browserWindow ? browserWindow.style.transition : '';
    const prevWrapTransition = deviceWrapper ? deviceWrapper.style.transition : '';
    if (browserWindow) browserWindow.style.transition = 'none';
    if (deviceWrapper) deviceWrapper.style.transition = 'none';

    try {
        if (document.fonts?.ready) {
            await document.fonts.ready;
        }

        let dataUrl = null;

        // High-density supersampling (3x Retina): captures exact live DOM with 3D perspective,
        // shadows, and borders with zero aliasing, zero seams, and without any UI jumping
        if (window.htmlToImage) {
            try {
                dataUrl = await window.htmlToImage.toPng(element, {
                    pixelRatio: 3,
                    cacheBust: true,
                    style: {
                        transform: 'none'
                    }
                });
            } catch (svgErr) {
                console.warn('htmlToImage primary export error:', svgErr);
            }
        }

        // Secondary fallback to html2canvas directly if htmlToImage is unavailable
        if (!dataUrl && window.html2canvas) {
            const canvas = await window.html2canvas(element, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null
            });
            dataUrl = canvas.toDataURL('image/png');
        }

        return dataUrl;
    } finally {
        if (browserWindow) browserWindow.style.transition = prevWinTransition;
        if (deviceWrapper) deviceWrapper.style.transition = prevWrapTransition;
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

    // 1. Restore configuration from localStorage
    loadConfigFromStorage();

    // 2. Apply restored canvas and container dimensions
    const canvas = document.getElementById('exportCanvas');
    if (canvas) {
        canvas.style.background = state.bgCss;
        canvas.style.padding = `${state.padding}px`;
    }

    const viewportEl = document.getElementById('viewportContainer');
    if (viewportEl) {
        viewportEl.style.height = `${state.viewportHeight}px`;
    }

    const watermarkBadge = document.getElementById('watermarkBadge');
    if (watermarkBadge) {
        watermarkBadge.style.display = state.showWatermark ? 'flex' : 'none';
    }

    // 3. Apply active shadow & tilt without triggering redundant re-save
    setShadow(state.shadow, false);
    setTilt(state.tilt, false);

    // 4. Update device category filter UI without re-saving
    filterDeviceCategory(state.deviceCategory, false);

    // 5. Update active badge and frame
    const activeBadge = document.getElementById('activeThemeBadge');
    const currentDevice = devices.find(d => d.id === state.theme);
    if (activeBadge && currentDevice) activeBadge.innerText = currentDevice.name;

    renderBrowserFrame();
    updateSummaryText();

    // 6. Set initial SVG mockup if user hasn't restored/mounted a custom image
    const img = document.getElementById('screenshotImg');
    const isCustom = Boolean(isCustomImage && img && img.src && !isVectorMockup(img.src));
    if (!isCustom && img) {
        img.src = (currentDevice && currentDevice.category === 'phone')
            ? generateMobileMockupURI()
            : generateTailwindMockupURI();
    }
});
