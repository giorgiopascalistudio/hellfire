/**
 * HELL-FIRE v2 — settings.js
 * Modal impostazioni unificato per manual.html e auto.html
 * Include: login a sessione, tab Motori / AI+IFF / Fuoco / Calibrazione / Sistema / Log
 */

// ═══════════════════════════════════════════════════════════════
//  CONFIGURAZIONE LOGIN
// ═══════════════════════════════════════════════════════════════
const SETTINGS_USER = 'admin';
const SETTINGS_PASS = 'hellfire';
const SESSION_KEY   = 'hf_settings_auth';  // sessionStorage key

// ═══════════════════════════════════════════════════════════════
//  INJECT HTML — login + modal impostazioni
// ═══════════════════════════════════════════════════════════════
(function injectSettingsHTML() {
  const html = `

<!-- ── MODAL LOGIN ──────────────────────────────────────────── -->
<div id="settingsLoginModal" class="hidden-force fixed inset-0 z-[150] items-center justify-center">
  <div class="modal-backdrop absolute inset-0"></div>
  <div class="relative z-10 w-[380px] max-w-[92vw] rounded-[28px] border border-white/10 bg-[#0f1114]/95 p-7 shadow-2xl backdrop-blur-2xl">
    <div class="text-center mb-6">
      <div class="flex items-center justify-center w-16 h-16 rounded-2xl border border-primary/30 bg-primary/10 text-primary mx-auto mb-4">
        <span class="material-symbols-outlined" style="font-size:32px">lock</span>
      </div>
      <h2 class="font-display text-[18px] font-bold uppercase tracking-[0.14em] text-primary">Accesso impostazioni</h2>
      <p class="font-display text-[9px] uppercase tracking-[0.2em] text-textMuted mt-1">Inserire le credenziali per continuare</p>
    </div>
    <div class="space-y-3">
      <div>
        <label class="font-display text-[9px] uppercase tracking-[0.18em] text-textMuted block mb-1">Username</label>
        <input id="sl-user" type="text" placeholder="admin" autocomplete="off"
          class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 font-display text-[13px] uppercase tracking-[0.14em] text-textMain placeholder:text-textMuted outline-none focus:border-primary/50 transition"/>
      </div>
      <div>
        <label class="font-display text-[9px] uppercase tracking-[0.18em] text-textMuted block mb-1">Password</label>
        <input id="sl-pass" type="password" placeholder="••••••••"
          class="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 font-display text-[13px] tracking-[0.14em] text-textMain placeholder:text-textMuted outline-none focus:border-primary/50 transition"/>
      </div>
      <p id="sl-error" class="hidden-force font-display text-[10px] uppercase tracking-[0.16em] text-danger text-center">Credenziali non valide</p>
      <button id="sl-submit"
        class="w-full mt-2 rounded-2xl border border-primary/30 bg-primary px-5 py-3.5 font-display text-[13px] font-black uppercase tracking-[0.2em] text-black hover:brightness-110 active:scale-[.98] transition">
        Accedi
      </button>
      <button id="sl-cancel"
        class="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-textMuted active:scale-[.98] transition">
        Annulla
      </button>
    </div>
  </div>
</div>

<!-- ── MODAL IMPOSTAZIONI ────────────────────────────────────── -->
<div id="settingsModal" class="hidden-force fixed inset-0 z-[100] items-start justify-center pt-4 pb-4">
  <div class="modal-backdrop absolute inset-0"></div>
  <div class="relative z-10 w-[840px] max-w-[97vw] rounded-[28px] border border-white/10 bg-[#0f1114]/95 shadow-2xl backdrop-blur-2xl flex flex-col" style="max-height:92vh">

    <!-- Header -->
    <div class="flex-shrink-0 flex items-center justify-between gap-4 px-6 py-4 border-b border-white/08">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
          <span class="material-symbols-outlined" style="font-size:20px">settings</span>
        </div>
        <div>
          <h2 class="font-display text-[18px] font-bold uppercase tracking-[0.12em] text-primary">Impostazioni</h2>
          <p class="font-display text-[8px] uppercase tracking-[0.2em] text-textMuted mt-0.5">
            Motori · AI/IFF · Fuoco · Calibrazione · Sistema · Log
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="s-logout"
          class="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-display text-[9px] font-bold uppercase tracking-[0.14em] text-textMuted hover:border-danger/40 hover:text-danger transition">
          <span class="material-symbols-outlined" style="font-size:14px">lock</span>ESCI
        </button>
        <button id="closeSettings"
          class="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:border-danger/40 hover:text-danger transition">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>

    <!-- Tab bar -->
    <div class="flex-shrink-0 flex gap-1 px-5 pt-3 pb-0 border-b border-white/06 overflow-x-auto">
      <button class="set-tab active-tab" data-tab="motori">
        <span class="material-symbols-outlined" style="font-size:15px">settings</span>Motori
      </button>
      <button class="set-tab" data-tab="ai">
        <span class="material-symbols-outlined" style="font-size:15px">robot_2</span>AI / IFF
      </button>
      <button class="set-tab" data-tab="fuoco">
        <span class="material-symbols-outlined" style="font-size:15px">local_fire_department</span>Fuoco
      </button>
      <button class="set-tab" data-tab="calibrazione">
        <span class="material-symbols-outlined" style="font-size:15px">straighten</span>Calibrazione
      </button>
      <button class="set-tab" data-tab="sistema">
        <span class="material-symbols-outlined" style="font-size:15px">monitor_heart</span>Sistema
      </button>
      <button class="set-tab" data-tab="log">
        <span class="material-symbols-outlined" style="font-size:15px">terminal</span>Log
      </button>
    </div>

    <!-- Contenuto scrollabile -->
    <div class="flex-1 overflow-y-auto px-5 pb-5 pt-4">

      <!-- ══ MOTORI ════════════════════════════════════════════ -->
      <div class="tab-pane" id="tab-motori">
        <div class="grid grid-cols-2 gap-3">

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">Velocità motori</p>
            <div class="flex justify-between items-center mb-2 mt-3">
              <span class="set-label">SLOW ←→ FAST</span>
              <span class="font-display text-[14px] font-bold text-primary" id="s-speed-val">1500</span>
            </div>
            <input type="range" id="s-speed" min="200" max="4000" step="100" value="1500">
            <p class="set-hint mt-2">Velocità motori in modalità manuale (step/s)</p>
          </div>

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">Joystick — snap assiale</p>
            <div class="flex justify-between items-center mb-2 mt-3">
              <span class="set-label">Zona snap (°)</span>
              <span class="font-display text-[14px] font-bold text-primary" id="s-joy-snap-val">20°</span>
            </div>
            <input type="range" id="s-joy-snap" min="0" max="45" value="20">
            <p class="set-hint mt-2">Entro ±N° dagli assi l'asse perpendicolare si azzera. 0 = disattivato.</p>
          </div>

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">Limiti corsa PAN</p>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <label class="block"><span class="set-label">Min (°)</span><input id="s-pan-min" type="number" min="-180" max="0" value="-135" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Max (°)</span><input id="s-pan-max" type="number" min="0" max="180" value="135" class="set-input mt-1"/></label>
            </div>
          </div>

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">Limiti corsa TILT</p>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <label class="block"><span class="set-label">Min (°)</span><input id="s-tilt-min" type="number" min="-90" max="0" value="-45" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Max (°)</span><input id="s-tilt-max" type="number" min="0" max="90" value="45" class="set-input mt-1"/></label>
            </div>
          </div>

          <div class="panel rounded-2xl p-4 col-span-2">
            <p class="set-section-title">Posizione attuale & comandi rapidi</p>
            <div class="grid grid-cols-4 gap-3 mt-3 mb-4">
              <div class="text-center"><div class="set-label">PAN</div><div class="font-display text-[26px] font-bold text-primary mt-1" id="s-pos-pan">0.0°</div></div>
              <div class="text-center"><div class="set-label">TILT</div><div class="font-display text-[26px] font-bold text-primary mt-1" id="s-pos-tilt">0.0°</div></div>
              <div class="text-center"><div class="set-label">VELOCITÀ</div><div class="font-display text-[20px] font-bold text-textMain mt-1" id="s-sys-speed">—</div></div>
              <div class="text-center"><div class="set-label">MODO</div><div class="font-display text-[20px] font-bold text-textMuted mt-1" id="s-sys-mode">—</div></div>
            </div>
            <div class="grid grid-cols-4 gap-2">
              <button id="s-btn-home"  class="set-btn-success">⌂ HOME</button>
              <button id="s-btn-zero"  class="set-btn-neutral">SET ZERO</button>
              <button id="s-btn-arm"   class="rounded-2xl border-2 border-primary/60 bg-primary/10 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.18em] text-primary active:scale-[.97] transition">ARM</button>
              <button id="s-btn-safety" class="rounded-2xl border border-amber-400/60 bg-amber-400/10 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400 active:scale-[.97] transition">SICURA ON</button>
            </div>
          </div>

        </div>
      </div>

      <!-- ══ AI / IFF ══════════════════════════════════════════ -->
      <div class="tab-pane hidden" id="tab-ai">
        <div class="grid grid-cols-2 gap-3">

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">AI Engine</p>
            <div class="grid grid-cols-2 gap-2 mt-3">
              <button class="s-engine-btn active" data-engine="coco">COCO-SSD<br><span style="font-size:9px;opacity:.6">~5-8 fps</span></button>
              <button class="s-engine-btn" data-engine="yolo">YOLO v8n<br><span style="font-size:9px;opacity:.6">~2-4 fps</span></button>
            </div>
          </div>

          <div class="panel rounded-2xl p-4 space-y-3">
            <p class="set-section-title">Parametri modello</p>
            <div class="mt-2">
              <div class="flex justify-between items-center mb-1.5"><span class="set-label">Confidenza rilevamento</span><span class="font-display text-[11px] font-bold text-primary" id="s-conf-val">0.50</span></div>
              <input type="range" id="s-conf" min="10" max="95" value="50">
            </div>
            <div>
              <div class="flex justify-between items-center mb-1.5"><span class="set-label">Sensibilità inseguimento (PID Kp)</span><span class="font-display text-[11px] font-bold text-primary" id="s-kp-val">0.40</span></div>
              <input type="range" id="s-kp" min="5" max="200" value="40">
            </div>
            <div>
              <div class="flex justify-between items-center mb-1.5"><span class="set-label">Smorzamento (smoothing)</span><span class="font-display text-[11px] font-bold text-primary" id="s-sm-val">0.30</span></div>
              <input type="range" id="s-sm" min="0" max="95" value="30">
            </div>
          </div>

          <div class="panel rounded-2xl p-4 space-y-3">
            <p class="set-section-title">Tracking avanzato</p>
            <div>
              <div class="flex justify-between items-center mb-1.5"><span class="set-label">Zona morta (px)</span><span class="font-display text-[11px] font-bold text-primary" id="s-dz-val">15</span></div>
              <input type="range" id="s-dz" min="0" max="80" value="15">
            </div>
            <div>
              <div class="flex justify-between items-center mb-1.5"><span class="set-label">Max step/frame (°)</span><span class="font-display text-[11px] font-bold text-primary" id="s-ms-val">5</span></div>
              <input type="range" id="s-ms" min="1" max="20" value="5">
            </div>
            <div>
              <div class="flex justify-between items-center mb-1.5"><span class="set-label">Frame conferma prima del fuoco</span><span class="font-display text-[11px] font-bold text-primary" id="s-fc-val">5</span></div>
              <input type="range" id="s-fc" min="1" max="30" value="5">
            </div>
            <div>
              <div class="flex justify-between items-center mb-1.5"><span class="set-label">Cooldown post-fuoco (s)</span><span class="font-display text-[11px] font-bold text-primary" id="s-cd-val">2.0</span></div>
              <input type="range" id="s-cd" min="5" max="100" step="5" value="20">
            </div>
          </div>

          <div class="panel rounded-2xl p-4 space-y-3">
            <p class="set-section-title">Opzioni tracking</p>
            <div class="space-y-2 mt-2">
              <label class="flex items-center justify-between cursor-pointer">
                <span class="set-label">Fuoco automatico su aggancio</span>
                <div class="tog-row" id="s-tog-autofire"><div class="tog-sw"></div></div>
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="set-label">Riprendi scan dopo fuoco</span>
                <div class="tog-row tog-on" id="s-tog-retrack"><div class="tog-sw"></div></div>
              </label>
              <label class="flex items-center justify-between cursor-pointer">
                <span class="set-label">Scan auto su ARM</span>
                <div class="tog-row" id="s-tog-scan-auto"><div class="tog-sw"></div></div>
              </label>
            </div>
          </div>

          <!-- IFF colori amico -->
          <div class="panel rounded-2xl p-4 space-y-3" style="border-color:rgba(56,210,122,.18)">
            <p class="set-section-title text-success">✓ Amici — non ingaggiare</p>
            <p class="set-hint">Casacca che identifica un alleato</p>
            <div class="flex gap-2 flex-wrap mt-2" id="s-friend-swatches"></div>
            <div class="grid grid-cols-2 gap-2 mt-1">
              <label class="block"><span class="set-label">H min (°)</span><input id="s-fr-hmin" type="number" min="0" max="360" value="25" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">H max (°)</span><input id="s-fr-hmax" type="number" min="0" max="360" value="45" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Saturazione min %</span><input id="s-fr-smin" type="number" min="0" max="100" value="50" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Copertura min %</span><input id="s-fr-cov" type="number" min="1" max="80" value="10" class="set-input mt-1"/></label>
            </div>
          </div>

          <!-- IFF colori nemico -->
          <div class="panel rounded-2xl p-4 space-y-3" style="border-color:rgba(255,59,48,.18)">
            <p class="set-section-title text-danger">✕ Nemici — ingaggia</p>
            <p class="set-hint">Casacca/fascia che identifica un nemico</p>
            <div class="flex gap-2 flex-wrap mt-2" id="s-enemy-swatches"></div>
            <div class="grid grid-cols-2 gap-2 mt-1">
              <label class="block"><span class="set-label">H min (°)</span><input id="s-en-hmin" type="number" min="0" max="360" value="0" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">H max (°)</span><input id="s-en-hmax" type="number" min="0" max="360" value="15" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Saturazione min %</span><input id="s-en-smin" type="number" min="0" max="100" value="60" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Copertura min %</span><input id="s-en-cov" type="number" min="1" max="80" value="8" class="set-input mt-1"/></label>
            </div>
            <div class="border-t border-white/08 pt-2 mt-1">
              <label class="flex items-center justify-between cursor-pointer mb-2">
                <span class="set-label">Abilita 2° colore nemico</span>
                <div class="tog-row" id="s-tog-en2"><div class="tog-sw"></div></div>
              </label>
              <div class="grid grid-cols-2 gap-2">
                <label class="block"><span class="set-label">H min 2° (°)</span><input id="s-en2-hmin" type="number" min="0" max="360" value="340" class="set-input mt-1"/></label>
                <label class="block"><span class="set-label">H max 2° (°)</span><input id="s-en2-hmax" type="number" min="0" max="360" value="360" class="set-input mt-1"/></label>
              </div>
            </div>
          </div>

          <!-- Scan -->
          <div class="panel rounded-2xl p-4 col-span-2">
            <p class="set-section-title">Scan mode — parametri</p>
            <div class="grid grid-cols-3 gap-4 mt-3">
              <div class="space-y-3">
                <div><div class="flex justify-between items-center mb-1.5"><span class="set-label">Pan min (°)</span><span class="font-display text-[11px] font-bold text-primary" id="s-pmin-val">-135°</span></div><input type="range" id="s-pmin" min="-180" max="0" value="-135"></div>
                <div><div class="flex justify-between items-center mb-1.5"><span class="set-label">Pan max (°)</span><span class="font-display text-[11px] font-bold text-primary" id="s-pmax-val">135°</span></div><input type="range" id="s-pmax" min="0" max="180" value="135"></div>
                <div><div class="flex justify-between items-center mb-1.5"><span class="set-label">Tilt scan (°)</span><span class="font-display text-[11px] font-bold text-primary" id="s-stilt-val">0°</span></div><input type="range" id="s-stilt" min="-30" max="30" value="0"></div>
              </div>
              <div class="space-y-3">
                <div><div class="flex justify-between items-center mb-1.5"><span class="set-label">Velocità scan</span><span class="font-display text-[11px] font-bold text-primary" id="s-sv-val">800</span></div><input type="range" id="s-sv" min="100" max="3000" step="50" value="800"></div>
                <div><div class="flex justify-between items-center mb-1.5"><span class="set-label">Pausa ai bordi (ms)</span><span class="font-display text-[11px] font-bold text-primary" id="s-sp-val">300</span></div><input type="range" id="s-sp" min="0" max="2000" step="100" value="300"></div>
              </div>
              <div class="space-y-3 pt-1">
                <label class="flex items-center justify-between cursor-pointer"><span class="set-label">Scan continuo (loop)</span><div class="tog-row tog-on" id="s-tog-scan-loop"><div class="tog-sw"></div></div></label>
                <label class="flex items-center justify-between cursor-pointer"><span class="set-label">Home prima scan</span><div class="tog-row" id="s-tog-scan-home"><div class="tog-sw"></div></div></label>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ══ FUOCO ══════════════════════════════════════════════ -->
      <div class="tab-pane hidden" id="tab-fuoco">
        <div class="grid grid-cols-2 gap-3">

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">Modalità fuoco</p>
            <div class="flex items-center rounded-full border border-white/10 bg-black/25 p-1 mt-3">
              <button id="s-singleBtn" class="switch-pill active flex-1 rounded-full px-3 py-2.5 font-display text-[10px] font-bold uppercase tracking-[0.2em]">Singolo</button>
              <button id="s-burstBtn" class="switch-pill flex-1 rounded-full px-3 py-2.5 font-display text-[10px] font-bold uppercase tracking-[0.2em] text-textMuted">Raffica</button>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span class="set-label">Autorepeat raffica</span>
              <div class="tog-row" id="s-tog-autorepeat"><div class="tog-sw"></div></div>
            </div>
          </div>

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">Stato canna</p>
            <div class="flex items-center justify-between mt-3 mb-2"><span class="set-label">Calore</span><span class="font-display text-[13px] font-bold text-primary" id="s-heat-val">0%</span></div>
            <div class="heat-bar mb-3"><div class="heat-fill" id="s-heat-fill"></div></div>
            <div class="set-label mb-2">Anteprima raffica</div>
            <div class="flex flex-wrap gap-1.5 p-2 bg-black/20 rounded-xl min-h-[20px]" id="s-burst-prev"></div>
          </div>

          <div class="panel rounded-2xl p-4 col-span-2">
            <p class="set-section-title">Parametri raffica</p>
            <div class="grid grid-cols-3 gap-4 mt-3">
              <div><div class="flex justify-between items-center mb-1.5"><span class="set-label">Burst (BB)</span><span class="font-display text-[13px] font-bold text-primary" id="s-burst-val">3</span></div><input type="range" id="s-burst" min="1" max="25" value="3"></div>
              <div><div class="flex justify-between items-center mb-1.5"><span class="set-label">Cadenza (BB/s)</span><span class="font-display text-[13px] font-bold text-primary" id="s-rate-val">10</span></div><input type="range" id="s-rate" min="1" max="15" value="10"></div>
              <div><div class="flex justify-between items-center mb-1.5"><span class="set-label">Delay tra raffiche (s)</span><span class="font-display text-[13px] font-bold text-primary" id="s-delay-val">3.0</span></div><input type="range" id="s-delay" min="5" max="300" step="5" value="30"></div>
            </div>
          </div>

          <div class="panel rounded-2xl p-4 col-span-2 flex items-center justify-between">
            <div><div class="set-label">BB totali sparati</div><div class="font-display text-[32px] font-bold text-primary mt-1" id="s-sys-bb">0</div></div>
            <button id="s-btn-reset-stats" class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-textMuted active:scale-[.97] transition">Reset</button>
          </div>

        </div>
      </div>

      <!-- ══ CALIBRAZIONE ═══════════════════════════════════════ -->
      <div class="tab-pane hidden" id="tab-calibrazione">
        <div class="grid grid-cols-2 gap-3">

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">Trasmissione PAN</p>
            <p class="set-hint mt-1 mb-3">Rapporto pulegge/cinghia asse PAN</p>
            <div class="space-y-2">
              <label class="block"><span class="set-label">Denti puleggia motore (driver)</span><input id="cal-pan-teeth-motor" type="number" min="1" max="200" value="20" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Denti puleggia torretta (driven)</span><input id="cal-pan-teeth-turret" type="number" min="1" max="500" value="120" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Step/giro motore (NEMA 17 = 200)</span><input id="cal-pan-steps-rev" type="number" min="1" max="800" value="200" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Microstepping</span>
                <select id="cal-pan-micro" class="set-input mt-1">
                  <option value="1">Full step (×1)</option><option value="2">Half (×2)</option>
                  <option value="4">1/4 (×4)</option><option value="8">1/8 (×8)</option>
                  <option value="16" selected>1/16 (×16)</option><option value="32">1/32 (×32)</option>
                </select>
              </label>
            </div>
            <div class="mt-3 p-3 bg-black/30 rounded-xl border border-white/08">
              <div class="set-label mb-1">Step/grado PAN</div>
              <div class="font-display text-[22px] font-bold text-primary" id="cal-pan-result">—</div>
              <div class="set-hint">Rapporto riduzione: <span id="cal-pan-ratio">—</span></div>
            </div>
          </div>

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">Trasmissione TILT</p>
            <p class="set-hint mt-1 mb-3">Rapporto pulegge/cinghia asse TILT</p>
            <div class="space-y-2">
              <label class="block"><span class="set-label">Denti puleggia motore (driver)</span><input id="cal-tilt-teeth-motor" type="number" min="1" max="200" value="20" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Denti puleggia torretta (driven)</span><input id="cal-tilt-teeth-turret" type="number" min="1" max="500" value="60" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Step/giro motore (NEMA 17 = 200)</span><input id="cal-tilt-steps-rev" type="number" min="1" max="800" value="200" class="set-input mt-1"/></label>
              <label class="block"><span class="set-label">Microstepping</span>
                <select id="cal-tilt-micro" class="set-input mt-1">
                  <option value="1">Full step (×1)</option><option value="2">Half (×2)</option>
                  <option value="4">1/4 (×4)</option><option value="8">1/8 (×8)</option>
                  <option value="16" selected>1/16 (×16)</option><option value="32">1/32 (×32)</option>
                </select>
              </label>
            </div>
            <div class="mt-3 p-3 bg-black/30 rounded-xl border border-white/08">
              <div class="set-label mb-1">Step/grado TILT</div>
              <div class="font-display text-[22px] font-bold text-primary" id="cal-tilt-result">—</div>
              <div class="set-hint">Rapporto riduzione: <span id="cal-tilt-ratio">—</span></div>
            </div>
          </div>

          <div class="panel rounded-2xl p-4 col-span-2">
            <p class="set-section-title">Homing automatico — Microswitch 0°</p>
            <p class="set-hint mt-1 mb-4">La torretta si muove lentamente fino a premere il microswitch, poi azzera la posizione software. Il microswitch deve essere montato fisicamente sul punto 0° meccanico.</p>
            <div class="grid grid-cols-4 gap-3 mb-4">
              <div class="panel rounded-xl p-3"><div class="set-label mb-1">PIN µswitch PAN</div><input id="cal-sw-pan-pin" type="number" min="1" max="40" value="5" class="set-input"/><div class="set-hint mt-1">GPIO BCM</div></div>
              <div class="panel rounded-xl p-3"><div class="set-label mb-1">PIN µswitch TILT</div><input id="cal-sw-tilt-pin" type="number" min="1" max="40" value="6" class="set-input"/><div class="set-hint mt-1">GPIO BCM</div></div>
              <div class="panel rounded-xl p-3"><div class="set-label mb-1">Velocità homing</div><input id="cal-home-speed" type="number" min="50" max="1000" step="50" value="300" class="set-input"/><div class="set-hint mt-1">step/s</div></div>
              <div class="panel rounded-xl p-3"><div class="set-label mb-1">Offset PAN post-home (°)</div><input id="cal-home-pan-offset" type="number" min="-10" max="10" step="0.5" value="0" class="set-input"/><div class="set-hint mt-1">Aggiustamento fine</div></div>
            </div>
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="panel rounded-xl p-3"><div class="set-label mb-1">Direzione homing PAN</div><select id="cal-home-pan-dir" class="set-input"><option value="-1">Verso negativo (−)</option><option value="1">Verso positivo (+)</option></select></div>
              <div class="panel rounded-xl p-3"><div class="set-label mb-1">Direzione homing TILT</div><select id="cal-home-tilt-dir" class="set-input"><option value="-1">Verso negativo (−)</option><option value="1">Verso positivo (+)</option></select></div>
            </div>
            <div class="grid grid-cols-3 gap-3 mb-4">
              <div class="p-3 bg-black/30 rounded-xl border border-white/08 flex items-center gap-3">
                <div class="w-4 h-4 rounded-full bg-textMuted flex-shrink-0" id="sw-pan-dot"></div>
                <div><div class="set-label">µswitch PAN</div><div class="font-display text-[11px] font-bold text-textMuted" id="sw-pan-label">NON PREMUTO</div></div>
              </div>
              <div class="p-3 bg-black/30 rounded-xl border border-white/08 flex items-center gap-3">
                <div class="w-4 h-4 rounded-full bg-textMuted flex-shrink-0" id="sw-tilt-dot"></div>
                <div><div class="set-label">µswitch TILT</div><div class="font-display text-[11px] font-bold text-textMuted" id="sw-tilt-label">NON PREMUTO</div></div>
              </div>
              <div class="p-3 bg-black/30 rounded-xl border border-white/08">
                <div class="set-label mb-1">Posizione post-homing</div>
                <div class="font-display text-[11px] font-bold text-primary" id="cal-home-pos">PAN — · TILT —</div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <button id="btn-home-pan" class="rounded-2xl border border-primary/50 bg-primary/10 px-4 py-3 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-primary active:scale-[.97] transition flex items-center justify-center gap-2"><span class="material-symbols-outlined" style="font-size:16px">my_location</span>HOMING PAN</button>
              <button id="btn-home-tilt" class="rounded-2xl border border-primary/50 bg-primary/10 px-4 py-3 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-primary active:scale-[.97] transition flex items-center justify-center gap-2"><span class="material-symbols-outlined" style="font-size:16px">my_location</span>HOMING TILT</button>
              <button id="btn-home-full" class="rounded-2xl border-2 border-primary bg-primary/15 px-4 py-3 font-display text-[11px] font-bold uppercase tracking-[0.16em] text-primary active:scale-[.97] transition flex items-center justify-center gap-2"><span class="material-symbols-outlined" style="font-size:16px">home_pin</span>HOMING COMPLETO</button>
            </div>
          </div>

          <div class="col-span-2 flex justify-end">
            <button id="btn-cal-apply" class="rounded-2xl border border-primary/30 bg-primary px-6 py-3 font-display text-[12px] font-bold uppercase tracking-[0.18em] text-black hover:brightness-110 transition">Applica calibrazione al sistema</button>
          </div>

        </div>
      </div>

      <!-- ══ SISTEMA ═════════════════════════════════════════════ -->
      <div class="tab-pane hidden" id="tab-sistema">
        <div class="grid grid-cols-2 gap-3">

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">Statistiche sistema</p>
            <div class="grid grid-cols-2 gap-3 mt-3">
              <div><div class="set-label">UPTIME</div><div class="font-display text-[22px] font-bold text-textMain mt-1" id="s-sys-up">—</div></div>
              <div><div class="set-label">BB TOTALI</div><div class="font-display text-[22px] font-bold text-primary mt-1" id="s-sys-bb2">0</div></div>
              <div><div class="set-label">HARDWARE</div><div class="font-display text-[14px] font-bold text-success mt-1" id="s-sys-hw">—</div></div>
              <div><div class="set-label">CAMERA</div><div class="font-display text-[14px] font-bold text-success mt-1" id="s-sys-cam">—</div></div>
            </div>
          </div>

          <div class="panel rounded-2xl p-4">
            <p class="set-section-title">LED stato</p>
            <div class="grid grid-cols-2 gap-2 mt-3">
              <button class="led-btn border-white/20 text-textMuted" onclick="API.led('off')">⬤ OFF</button>
              <button class="led-btn border-danger/50 text-danger"   onclick="API.led('red')">⬤ ROSSO</button>
              <button class="led-btn border-success/50 text-success" onclick="API.led('green')">⬤ VERDE</button>
              <button class="led-btn border-primary/50 text-primary" onclick="API.led('both')">⬤ ENTRAMBI</button>
            </div>
          </div>

          <div class="panel rounded-2xl p-4 col-span-2">
            <p class="set-section-title mb-3">Sicurezza sistema</p>
            <button id="s-btn-emergency" class="w-full rounded-2xl border border-danger/40 bg-danger/10 px-4 py-3.5 font-display text-[12px] font-bold uppercase tracking-[0.18em] text-danger active:bg-danger active:text-white transition">⚠ EMERGENCY STOP</button>
          </div>

        </div>
      </div>

      <!-- ══ LOG ════════════════════════════════════════════════ -->
      <div class="tab-pane hidden" id="tab-log">
        <div class="panel rounded-2xl p-4">
          <div class="flex items-center justify-between mb-3">
            <p class="set-section-title">Event Log</p>
            <div class="flex gap-2">
              <button id="s-btn-log-pause" class="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-display text-[9px] font-bold uppercase tracking-[0.14em] text-textMuted active:scale-[.97] transition">⏸ PAUSA</button>
              <button id="s-btn-log-clear" class="rounded-xl border border-danger/30 px-3 py-1.5 font-display text-[9px] font-bold uppercase tracking-[0.14em] text-danger active:scale-[.97] transition">✕ SVUOTA</button>
            </div>
          </div>
          <div class="flex gap-2 mb-3 flex-wrap">
            <button class="log-filter active-filter" data-level="all">Tutti</button>
            <button class="log-filter" data-level="ok">OK</button>
            <button class="log-filter" data-level="warn">WARN</button>
            <button class="log-filter" data-level="err">ERR</button>
            <button class="log-filter" data-level="info">INFO</button>
          </div>
          <div class="log-list-full" id="s-log-list"></div>
        </div>
      </div>

    </div><!-- /scrollable -->
  </div>
</div>
`;
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
})();

// ═══════════════════════════════════════════════════════════════
//  CSS AGGIUNTIVO (iniettato se non già presente)
// ═══════════════════════════════════════════════════════════════
(function injectCSS() {
  if (document.getElementById('settings-css')) return;
  const style = document.createElement('style');
  style.id = 'settings-css';
  style.textContent = `
    .set-tab{display:flex;align-items:center;gap:5px;padding:8px 14px;border-radius:12px 12px 0 0;font-family:'Space Grotesk',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#8f98a3;background:transparent;border:none;border-bottom:2px solid transparent;cursor:pointer;transition:all 0.15s;white-space:nowrap;}
    .set-tab:hover{color:#e6e8eb;background:rgba(255,255,255,.04);}
    .set-tab.active-tab{color:#ff6b00;border-bottom:2px solid #ff6b00;background:rgba(255,107,0,.06);}
    .tab-pane.hidden{display:none}
    .set-section-title{font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#ff6b00;}
    .set-section-title.text-success{color:#38d27a}
    .set-section-title.text-danger{color:#ff3b30}
    .set-label{font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#8f98a3;display:block;}
    .set-hint{font-family:'Space Grotesk',sans-serif;font-size:8px;letter-spacing:0.08em;color:#4a5568;line-height:1.4;}
    .set-input{width:100%;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.10);border-radius:10px;padding:8px 10px;font-family:'Space Grotesk',sans-serif;font-size:12px;color:#e6e8eb;outline:none;transition:border-color 0.15s;}
    .set-input:focus{border-color:rgba(255,107,0,.45);}
    .set-btn-success{border-radius:12px;border:1px solid rgba(56,210,122,.5);background:rgba(56,210,122,.10);padding:8px;font-family:'Space Grotesk',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#38d27a;transition:all 0.1s;cursor:pointer;}
    .set-btn-success:active{background:#38d27a;color:#000;transform:scale(.97);}
    .set-btn-neutral{border-radius:12px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);padding:8px;font-family:'Space Grotesk',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8f98a3;transition:all 0.1s;cursor:pointer;}
    .set-btn-neutral:active{background:rgba(255,255,255,.12);transform:scale(.97);}
    .led-btn{border-radius:12px;padding:8px;font-family:'Space Grotesk',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.12em;border:1px solid;cursor:pointer;background:rgba(0,0,0,.2);transition:all 0.1s;color:inherit;}
    .led-btn:active{transform:scale(.97);}
    .log-list-full{max-height:380px;overflow-y:auto;font-family:'Courier New',monospace;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:6px;}
    .log-list-full::-webkit-scrollbar{width:3px;}
    .log-list-full::-webkit-scrollbar-thumb{background:rgba(255,107,0,.3);border-radius:3px;}
    .log-filter{padding:4px 10px;border-radius:8px;font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#8f98a3;cursor:pointer;transition:all 0.1s;}
    .log-filter.active-filter{background:rgba(255,107,0,.15);border-color:rgba(255,107,0,.4);color:#ff6b00;}
    .s-engine-btn{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:9px;color:#8f98a3;font-family:'Space Grotesk',sans-serif;font-size:10px;letter-spacing:0.14em;text-align:center;cursor:pointer;font-weight:700;text-transform:uppercase;transition:all 0.12s;}
    .s-engine-btn.active{background:#ff6b00;color:#000;border-color:#ff6b00;box-shadow:0 0 10px rgba(255,107,0,.35);}
    .tog-row{display:inline-flex;cursor:pointer;}
    /* tog-sw già definito nelle pagine — riusa */
    .heat-bar{height:6px;background:rgba(255,255,255,.06);border-radius:999px;overflow:hidden;border:1px solid rgba(255,255,255,.04);}
    .heat-fill{height:100%;background:linear-gradient(90deg,#38d27a,#ffaa20,#ff3b30);width:0%;transition:width 0.3s;border-radius:999px;}
    .color-swatch{width:28px;height:28px;border-radius:8px;border:2px solid rgba(255,255,255,.12);cursor:pointer;flex-shrink:0;transition:border-color 0.15s;}
    .color-swatch.active{border-color:#ff6b00;box-shadow:0 0 8px rgba(255,107,0,.5);}
    .bb-dot{width:7px;height:7px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:50%;display:inline-block;}
  `;
  document.head.appendChild(style);
})();

// ═══════════════════════════════════════════════════════════════
//  AUTENTICAZIONE — sessione in memoria (no localStorage)
// ═══════════════════════════════════════════════════════════════
let _settingsAuthenticated = false;

function isAuth() { return _settingsAuthenticated; }

function doLogin(user, pass) {
  if (user.trim().toLowerCase() === SETTINGS_USER && pass === SETTINGS_PASS) {
    _settingsAuthenticated = true;
    return true;
  }
  return false;
}

function doLogout() {
  _settingsAuthenticated = false;
}

// ═══════════════════════════════════════════════════════════════
//  APERTURA IMPOSTAZIONI (con gate login)
// ═══════════════════════════════════════════════════════════════
function openSettings() {
  if (isAuth()) {
    showSettingsModal();
  } else {
    showLoginModal();
  }
}

function showLoginModal() {
  const m = document.getElementById('settingsLoginModal');
  m.classList.remove('hidden-force'); m.classList.add('flex');
  document.getElementById('sl-user').value = '';
  document.getElementById('sl-pass').value = '';
  document.getElementById('sl-error').classList.add('hidden-force');
  setTimeout(() => document.getElementById('sl-user').focus(), 100);
}

function hideLoginModal() {
  const m = document.getElementById('settingsLoginModal');
  m.classList.add('hidden-force'); m.classList.remove('flex');
}

function showSettingsModal() {
  const m = document.getElementById('settingsModal');
  m.classList.remove('hidden-force'); m.classList.add('flex');
}

function hideSettingsModal() {
  const m = document.getElementById('settingsModal');
  m.classList.add('hidden-force'); m.classList.remove('flex');
}

// Login form
document.getElementById('sl-submit').onclick = () => {
  const u = document.getElementById('sl-user').value;
  const p = document.getElementById('sl-pass').value;
  if (doLogin(u, p)) {
    hideLoginModal();
    showSettingsModal();
  } else {
    document.getElementById('sl-error').classList.remove('hidden-force');
    document.getElementById('sl-pass').value = '';
    document.getElementById('sl-pass').focus();
  }
};

// Enter key on password
document.getElementById('sl-pass').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('sl-submit').click();
});
document.getElementById('sl-user').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('sl-pass').focus();
});

document.getElementById('sl-cancel').onclick = hideLoginModal;

// Click backdrop login
document.getElementById('settingsLoginModal').addEventListener('click', e => {
  if (e.target === document.getElementById('settingsLoginModal') || e.target.classList.contains('modal-backdrop')) {
    hideLoginModal();
  }
});

// Chiudi modal impostazioni
document.getElementById('closeSettings').onclick   = hideSettingsModal;
document.getElementById('s-logout').onclick = () => { doLogout(); hideSettingsModal(); };
document.getElementById('settingsModal').addEventListener('click', e => {
  if (e.target === document.getElementById('settingsModal') || e.target.classList.contains('modal-backdrop')) {
    hideSettingsModal();
  }
});

// Hook il bottone openSettings della pagina
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('openSettings');
  if (btn) btn.onclick = openSettings;
});
// Anche se DOMContentLoaded già passato
const _openBtn = document.getElementById('openSettings');
if (_openBtn) _openBtn.onclick = openSettings;

// ═══════════════════════════════════════════════════════════════
//  TAB SWITCHING
// ═══════════════════════════════════════════════════════════════
document.querySelectorAll('.set-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.set-tab').forEach(t => t.classList.remove('active-tab'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
    tab.classList.add('active-tab');
    document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
  });
});

// ═══════════════════════════════════════════════════════════════
//  TAB MOTORI
// ═══════════════════════════════════════════════════════════════
const sSpeed = document.getElementById('s-speed');
sSpeed.oninput  = () => document.getElementById('s-speed-val').textContent = sSpeed.value;
sSpeed.onchange = () => API.speed(parseInt(sSpeed.value));

const sJoySnap = document.getElementById('s-joy-snap');
sJoySnap.oninput = () => {
  const v = parseInt(sJoySnap.value);
  document.getElementById('s-joy-snap-val').textContent = v + '°';
  window.JOY_AXIAL_SNAP = v;
};

document.getElementById('s-btn-home').onclick  = () => API.home();
document.getElementById('s-btn-zero').onclick  = () => { if(confirm('Imposta posizione corrente come ZERO?')) API.zero(); };
document.getElementById('s-btn-arm').onclick   = async () => { const s = await API.status(); await API.arm(!s.armed); };

let _safetyOn = true;
document.getElementById('s-btn-safety').onclick = async () => {
  _safetyOn = !_safetyOn;
  await API.safety(_safetyOn);
  const b = document.getElementById('s-btn-safety');
  b.textContent = _safetyOn ? 'SICURA ON' : 'SICURA OFF';
  b.className = _safetyOn
    ? 'rounded-2xl border border-amber-400/60 bg-amber-400/10 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400 active:scale-[.97] transition'
    : 'rounded-2xl border border-danger/60 bg-danger/10 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-danger active:scale-[.97] transition';
};

// ═══════════════════════════════════════════════════════════════
//  TAB AI / IFF
// ═══════════════════════════════════════════════════════════════
// Engine buttons
document.querySelectorAll('.s-engine-btn').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.s-engine-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    API.aiConfig({ engine: b.dataset.engine });
  };
});

// AI sliders
function aiSlider(id, valId, scale, key) {
  const el = document.getElementById(id);
  if (!el) return;
  el.oninput  = () => document.getElementById(valId).textContent = scale ? (el.value/scale).toFixed(2) : el.value;
  el.onchange = () => { const cfg = {}; cfg[key] = scale ? parseFloat(el.value)/scale : parseFloat(el.value); API.aiConfig(cfg); };
}
aiSlider('s-conf','s-conf-val',100,'confidence');
aiSlider('s-kp',  's-kp-val',  100,'pid_kp');
aiSlider('s-sm',  's-sm-val',  100,'smoothing');
aiSlider('s-dz',  's-dz-val',  null,'dead_zone');
aiSlider('s-ms',  's-ms-val',  null,'max_step');
aiSlider('s-fc',  's-fc-val',  null,'fire_confirm_frames');
aiSlider('s-cd',  's-cd-val',  10,  'fire_cooldown');

// Scan sliders
function scanSl(id, valId, suffix, key) {
  const el = document.getElementById(id);
  if (!el) return;
  el.oninput  = () => document.getElementById(valId).textContent = el.value + (suffix||'');
  el.onchange = () => { const cfg = {}; cfg[key] = parseFloat(el.value); API.scanConfig(cfg); };
}
scanSl('s-pmin', 's-pmin-val','°','pan_min');
scanSl('s-pmax', 's-pmax-val','°','pan_max');
scanSl('s-stilt','s-stilt-val','°','tilt');
scanSl('s-sv',   's-sv-val',   '','speed');
scanSl('s-sp',   's-sp-val',   '','pause_ms');

// Toggles AI
function settingToggle(id, apiMethod, key) {
  const el = document.getElementById(id);
  if (!el) return;
  el.onclick = () => {
    const on = !el.classList.contains('tog-on');
    el.classList.toggle('tog-on', on);
    const sw = el.querySelector('.tog-sw');
    if (sw) { sw.style.background = on ? 'rgba(255,107,0,.18)' : ''; sw.style.borderColor = on ? '#ff6b00' : ''; }
    const cfg = {}; cfg[key] = on;
    if (apiMethod === 'aiConfig') API.aiConfig(cfg);
    else if (apiMethod === 'scanConfig') API.scanConfig(cfg);
  };
}
settingToggle('s-tog-autofire',   'aiConfig',   'autofire');
settingToggle('s-tog-retrack',    'aiConfig',   'retrack_after_fire');
settingToggle('s-tog-scan-auto',  'aiConfig',   'tracking');
settingToggle('s-tog-scan-loop',  'scanConfig', 'loop');
settingToggle('s-tog-scan-home',  'scanConfig', 'home_before_scan');
settingToggle('s-tog-en2',        'iffConfig',  'enemy2_enabled');

// IFF swatches
const SWATCHES = [
  { name:'Giallo',   css:'#f5c518', hmin:25,  hmax:45  },
  { name:'Rosso',    css:'#e03030', hmin:0,   hmax:15  },
  { name:'Blu',      css:'#2563eb', hmin:200, hmax:245 },
  { name:'Verde',    css:'#16a34a', hmin:100, hmax:145 },
  { name:'Arancio',  css:'#f97316', hmin:15,  hmax:30  },
  { name:'Viola',    css:'#7c3aed', hmin:250, hmax:290 },
  { name:'Bianco',   css:'#e5e5e5', hmin:0,   hmax:360 },
  { name:'Marrone',  css:'#7c5c3e', hmin:20,  hmax:35  },
];

function buildSwatches(containerId, defaultSw, onSelect) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  SWATCHES.forEach(sw => {
    const d = document.createElement('div');
    d.className = 'color-swatch' + (sw.name === defaultSw.name ? ' active' : '');
    d.style.background = sw.css;
    d.title = sw.name;
    d.onclick = () => {
      c.querySelectorAll('.color-swatch').forEach(x => x.classList.remove('active'));
      d.classList.add('active');
      onSelect(sw);
    };
    c.appendChild(d);
  });
}

function pushIFF() {
  API.iffConfig({
    friend_hmin: parseInt(document.getElementById('s-fr-hmin').value),
    friend_hmax: parseInt(document.getElementById('s-fr-hmax').value),
    friend_smin: parseInt(document.getElementById('s-fr-smin').value),
    friend_cov:  parseInt(document.getElementById('s-fr-cov').value),
    enemy_hmin:  parseInt(document.getElementById('s-en-hmin').value),
    enemy_hmax:  parseInt(document.getElementById('s-en-hmax').value),
    enemy_smin:  parseInt(document.getElementById('s-en-smin').value),
    enemy_cov:   parseInt(document.getElementById('s-en-cov').value),
    enemy2_enabled: document.getElementById('s-tog-en2').classList.contains('tog-on'),
    enemy2_hmin: parseInt(document.getElementById('s-en2-hmin').value),
    enemy2_hmax: parseInt(document.getElementById('s-en2-hmax').value),
  });
}

buildSwatches('s-friend-swatches', SWATCHES[0], sw => {
  document.getElementById('s-fr-hmin').value = sw.hmin;
  document.getElementById('s-fr-hmax').value = sw.hmax;
  pushIFF();
});
buildSwatches('s-enemy-swatches', SWATCHES[1], sw => {
  document.getElementById('s-en-hmin').value = sw.hmin;
  document.getElementById('s-en-hmax').value = sw.hmax;
  pushIFF();
});
['s-fr-hmin','s-fr-hmax','s-fr-smin','s-fr-cov','s-en-hmin','s-en-hmax','s-en-smin','s-en-cov','s-en2-hmin','s-en2-hmax']
  .forEach(id => { const el = document.getElementById(id); if(el) el.onchange = pushIFF; });

// ═══════════════════════════════════════════════════════════════
//  TAB FUOCO
// ═══════════════════════════════════════════════════════════════
const sBurst = document.getElementById('s-burst');
const sRate  = document.getElementById('s-rate');
const sDelay = document.getElementById('s-delay');
sBurst.oninput  = () => { document.getElementById('s-burst-val').textContent = sBurst.value; renderBurstPreviewS(parseInt(sBurst.value)); };
sBurst.onchange = () => API.fireConfig({ burst: parseInt(sBurst.value) });
sRate.oninput   = () => document.getElementById('s-rate-val').textContent = sRate.value;
sRate.onchange  = () => API.fireConfig({ rate: parseInt(sRate.value) });
sDelay.oninput  = () => document.getElementById('s-delay-val').textContent = (sDelay.value/10).toFixed(1);
sDelay.onchange = () => API.fireConfig({ delay: parseFloat(sDelay.value)/10 });

function renderBurstPreviewS(n) {
  const c = document.getElementById('s-burst-prev');
  if (!c) return;
  c.innerHTML = '';
  for (let i = 0; i < Math.min(n, 25); i++) {
    const d = document.createElement('div');
    d.className = 'bb-dot';
    c.appendChild(d);
  }
}
renderBurstPreviewS(3);

[document.getElementById('s-singleBtn'), document.getElementById('s-burstBtn')].forEach(btn => {
  btn.addEventListener('click', () => {
    [document.getElementById('s-singleBtn'), document.getElementById('s-burstBtn')].forEach(b => { b.classList.remove('active'); b.classList.add('text-textMuted'); });
    btn.classList.add('active'); btn.classList.remove('text-textMuted');
    API.fireConfig({ single: btn.id === 's-singleBtn' });
  });
});

settingToggle('s-tog-autorepeat', 'fireConfig', 'autorepeat');

document.getElementById('s-btn-reset-stats').onclick = () => { if(confirm('Reset statistiche?')) API.resetStats(); };

// ═══════════════════════════════════════════════════════════════
//  TAB CALIBRAZIONE
// ═══════════════════════════════════════════════════════════════
function calcStepsPerDeg(axis) {
  const motor  = parseFloat(document.getElementById(`cal-${axis}-teeth-motor`).value)  || 1;
  const turret = parseFloat(document.getElementById(`cal-${axis}-teeth-turret`).value) || 1;
  const stepsR = parseFloat(document.getElementById(`cal-${axis}-steps-rev`).value)    || 200;
  const micro  = parseFloat(document.getElementById(`cal-${axis}-micro`).value)         || 16;
  const ratio  = turret / motor;
  const spd    = (stepsR * micro * ratio) / 360;
  document.getElementById(`cal-${axis}-result`).textContent = spd.toFixed(2) + ' step/°';
  document.getElementById(`cal-${axis}-ratio`).textContent  = ratio.toFixed(3) + ':1';
  return spd;
}
['pan','tilt'].forEach(ax => {
  ['teeth-motor','teeth-turret','steps-rev','micro'].forEach(f => {
    const el = document.getElementById(`cal-${ax}-${f}`);
    if (el) el.addEventListener('input', () => calcStepsPerDeg(ax));
  });
  calcStepsPerDeg(ax);
});

document.getElementById('btn-cal-apply').onclick = () => {
  const cfg = {
    pan_steps_per_deg:  calcStepsPerDeg('pan'),
    tilt_steps_per_deg: calcStepsPerDeg('tilt'),
    switch_pan_pin:     parseInt(document.getElementById('cal-sw-pan-pin').value),
    switch_tilt_pin:    parseInt(document.getElementById('cal-sw-tilt-pin').value),
    home_speed:         parseInt(document.getElementById('cal-home-speed').value),
    home_pan_dir:       parseInt(document.getElementById('cal-home-pan-dir').value),
    home_tilt_dir:      parseInt(document.getElementById('cal-home-tilt-dir').value),
    home_pan_offset:    parseFloat(document.getElementById('cal-home-pan-offset').value),
  };
  fetch('/api/calibration', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(cfg) })
    .then(r => r.json())
    .then(d => d.ok ? alert('✅ Calibrazione applicata!') : alert('⚠ Errore: ' + (d.error||'sconosciuto')))
    .catch(() => alert('⚠ Server non raggiungibile'));
};

function homingBtn(id, apiPath, extraData) {
  document.getElementById(id).onclick = async () => {
    if (!confirm('Avviare homing? La torretta si muoverà lentamente.')) return;
    const r = await fetch(apiPath, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(extraData()) });
    const d = await r.json().catch(() => ({}));
    if (d.ok) {
      ['pan','tilt'].forEach(ax => {
        const dot = document.getElementById(`sw-${ax}-dot`);
        const lbl = document.getElementById(`sw-${ax}-label`);
        if (dot && lbl) { dot.style.background='#38d27a'; lbl.textContent='TROVATO ✓'; lbl.style.color='#38d27a'; }
      });
      document.getElementById('cal-home-pos').textContent =
        `PAN ${d.pan_final?.toFixed(1) ?? '—'}° · TILT ${d.tilt_final?.toFixed(1) ?? '—'}°`;
    }
  };
}
homingBtn('btn-home-pan',  '/api/home_axis', () => ({ axis:'pan',  dir:parseInt(document.getElementById('cal-home-pan-dir').value),  speed:parseInt(document.getElementById('cal-home-speed').value), offset:parseFloat(document.getElementById('cal-home-pan-offset').value) }));
homingBtn('btn-home-tilt', '/api/home_axis', () => ({ axis:'tilt', dir:parseInt(document.getElementById('cal-home-tilt-dir').value), speed:parseInt(document.getElementById('cal-home-speed').value), offset:0 }));
homingBtn('btn-home-full', '/api/home_full', () => ({ pan_dir:parseInt(document.getElementById('cal-home-pan-dir').value), tilt_dir:parseInt(document.getElementById('cal-home-tilt-dir').value), speed:parseInt(document.getElementById('cal-home-speed').value), pan_offset:parseFloat(document.getElementById('cal-home-pan-offset').value) }));

setInterval(() => {
  fetch('/api/switch_state').then(r => r.json()).then(d => {
    ['pan','tilt'].forEach(ax => {
      const dot = document.getElementById(`sw-${ax}-dot`);
      const lbl = document.getElementById(`sw-${ax}-label`);
      if (dot && lbl) {
        const on = d[ax];
        dot.style.background = on ? '#38d27a' : '#8f98a3';
        lbl.textContent = on ? 'PREMUTO ✓' : 'NON PREMUTO';
        lbl.style.color = on ? '#38d27a' : '#8f98a3';
      }
    });
  }).catch(() => {});
}, 500);

// ═══════════════════════════════════════════════════════════════
//  TAB SISTEMA — emergency
// ═══════════════════════════════════════════════════════════════
let _emergencyFromSettings = false;
document.getElementById('s-btn-emergency').onclick = async () => {
  _emergencyFromSettings = !_emergencyFromSettings;
  await API.emergency(_emergencyFromSettings);
  const b = document.getElementById('s-btn-emergency');
  b.textContent = _emergencyFromSettings ? '⚠ E-STOP ACTIVE — TAP TO RESET' : '⚠ EMERGENCY STOP';
};

// ═══════════════════════════════════════════════════════════════
//  TAB LOG — filtro, pausa, svuota
// ═══════════════════════════════════════════════════════════════
let _logPaused = false;
let _logFilter = 'all';
let _logEntries = [];

document.getElementById('s-btn-log-pause').onclick = () => {
  _logPaused = !_logPaused;
  const b = document.getElementById('s-btn-log-pause');
  b.textContent = _logPaused ? '▶ RIPRENDI' : '⏸ PAUSA';
  b.style.color = _logPaused ? '#ff6b00' : '';
};
document.getElementById('s-btn-log-clear').onclick = () => { _logEntries = []; renderSettingsLog(); };

document.querySelectorAll('.log-filter').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.log-filter').forEach(b => b.classList.remove('active-filter'));
    btn.classList.add('active-filter');
    _logFilter = btn.dataset.level;
    renderSettingsLog();
  };
});

function renderSettingsLog() {
  const c = document.getElementById('s-log-list');
  if (!c) return;
  const filtered = _logFilter === 'all' ? _logEntries : _logEntries.filter(e => e.level === _logFilter);
  c.innerHTML = '';
  filtered.slice().reverse().forEach(e => {
    const d = new Date(e.ts * 1000);
    const t = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
    const div = document.createElement('div');
    div.className = 'log-entry ' + (e.level || 'info');
    div.innerHTML = `<span class="t">${t}</span><span class="m">${e.msg}</span>`;
    c.appendChild(div);
  });
}

// ═══════════════════════════════════════════════════════════════
//  AGGIORNAMENTO DATI DAL WS (chiamato dalle pagine)
// ═══════════════════════════════════════════════════════════════
window.updateSettingsFromStatus = function(s) {
  // motori
  const setT = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = v; };
  setT('s-pos-pan',   s.pan_deg.toFixed(1)  + '°');
  setT('s-pos-tilt',  s.tilt_deg.toFixed(1) + '°');
  setT('s-sys-speed', s.speed);
  setT('s-sys-mode',  s.mode.toUpperCase());
  setT('s-sys-up',    formatUptime(s.uptime));
  setT('s-sys-bb',    s.fire_total_bb);
  setT('s-sys-bb2',   s.fire_total_bb);
  if (s.cpu_percent !== undefined) setT('s-sys-hw', s.hardware ? 'RPi' : 'SIM');
  setT('s-sys-cam', s.camera ? 'OK' : 'OFF');

  // fuoco
  setT('s-heat-val', s.fire_heat.toFixed(0) + '%');
  const hf = document.getElementById('s-heat-fill');
  if (hf) hf.style.width = s.fire_heat + '%';

  // sync speed slider (se diverso)
  const spEl = document.getElementById('s-speed');
  if (spEl && parseInt(spEl.value) !== s.speed) {
    spEl.value = s.speed;
    setT('s-speed-val', s.speed);
  }
  // sync burst
  const brEl = document.getElementById('s-burst');
  if (brEl && parseInt(brEl.value) !== s.fire_burst) {
    brEl.value = s.fire_burst;
    setT('s-burst-val', s.fire_burst);
    renderBurstPreviewS(s.fire_burst);
  }
  // ARM button
  const armBtn = document.getElementById('s-btn-arm');
  if (armBtn) {
    if (s.armed) { armBtn.classList.add('bg-primary','text-black'); armBtn.textContent = 'DISARM'; }
    else { armBtn.classList.remove('bg-primary','text-black'); armBtn.textContent = 'ARM'; }
  }
  // Safety button
  _safetyOn = s.safety;
  const sB = document.getElementById('s-btn-safety');
  if (sB) {
    sB.textContent = _safetyOn ? 'SICURA ON' : 'SICURA OFF';
    sB.className = _safetyOn
      ? 'rounded-2xl border border-amber-400/60 bg-amber-400/10 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-amber-400 active:scale-[.97] transition'
      : 'rounded-2xl border border-danger/60 bg-danger/10 px-3 py-2 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-danger active:scale-[.97] transition';
  }
};

window.updateSettingsLog = function(entries) {
  if (!_logPaused) {
    _logEntries = entries;
    renderSettingsLog();
  }
};
