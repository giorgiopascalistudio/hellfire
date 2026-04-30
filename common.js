// ===========================================================
// HELL-FIRE v2 - API client
// ===========================================================
const API = {
  status:    () => fetch('/api/status').then(r => r.json()),
  log:       () => fetch('/api/log').then(r => r.json()),
  arm:       (armed) => post('/api/arm', { armed }),
  safety:    (on) => post('/api/safety', { on }),
  emergency: (active) => post('/api/emergency', { active }),
  mode:      (mode) => post('/api/mode', { mode }),
  move:      (pan_deg, tilt_deg) => post('/api/move', { pan_deg, tilt_deg }),
  home:      () => post('/api/home', {}),
  zero:      () => post('/api/zero', {}),
  speed:     (speed) => post('/api/speed', { speed }),
  fire:      () => post('/api/fire', {}),
  fireConfig:(cfg) => post('/api/fire_config', cfg),
  aiConfig:  (cfg) => post('/api/ai_config', cfg),
  iffConfig: (cfg) => post('/api/iff_config', cfg),
  led:       (mode) => post('/api/led', { mode }),
  resetStats:() => post('/api/reset_stats', {}),
};

function post(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => r.json());
}

// === WebSocket manager ===
class TurretSocket {
  constructor(onStatus, onLog) {
    this.ws = null;
    this.onStatus = onStatus;
    this.onLog = onLog;
    this.reconnectDelay = 1000;
    this.connect();
  }

  connect() {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws';
    this.ws = new WebSocket(`${proto}://${location.host}/ws`);

    this.ws.onopen = () => { this.reconnectDelay = 1000; };

    this.ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === 'status' && this.onStatus) this.onStatus(msg.data);
        else if (msg.type === 'log' && this.onLog) this.onLog(msg.data);
      } catch (e) { console.error(e); }
    };

    this.ws.onclose = () => {
      setTimeout(() => this.connect(), this.reconnectDelay);
      this.reconnectDelay = Math.min(this.reconnectDelay * 1.5, 5000);
    };

    this.ws.onerror = (e) => console.error('[WS]', e);
  }

  send(obj) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(obj));
    }
  }

  joystick(x, y) { this.send({ type: 'joystick', x, y }); }
  fire() { this.send({ type: 'fire' }); }
  stop() { this.send({ type: 'stop' }); }
}

// === Update statusbar comune ===
function updateStatusBar(s) {
  const set = (id, val, cls) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = val;
    if (cls !== undefined) el.className = 'val ' + cls;
  };

  set('st-pan',  s.pan_deg.toFixed(1) + '°');
  set('st-tilt', s.tilt_deg.toFixed(1) + '°');
  set('st-speed', s.speed);
  set('st-mode', s.mode.toUpperCase(), s.mode === 'idle' ? '' : 'ok');
  set('st-armed', s.emergency ? 'E-STOP' : (s.armed ? 'ARMED' : 'SAFE'),
      s.emergency ? 'hot' : (s.armed ? 'warn' : ''));
  set('st-bb', s.fire_total_bb);
  set('st-uptime', formatUptime(s.uptime));

  const armDot = document.getElementById('arm-dot');
  if (armDot) {
    if (s.emergency) armDot.className = 'dot armed';
    else if (s.armed) armDot.className = 'dot armed';
    else if (s.hardware) armDot.className = 'dot on';
    else armDot.className = 'dot amber';
  }
}

function formatUptime(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  if (h > 0) return `${h}h${m}m`;
  if (m > 0) return `${m}m${ss}s`;
  return `${ss}s`;
}

// === Render log ===
function renderLog(entries, containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  entries.slice().reverse().forEach(e => {
    const d = new Date(e.ts * 1000);
    const t = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
    const div = document.createElement('div');
    div.className = 'log-entry ' + (e.level || 'info');
    div.innerHTML = `<span class="t">${t}</span><span class="m">${e.msg}</span>`;
    c.appendChild(div);
  });
}

// === Burst preview render ===
function renderBurstPreview(n, containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  for (let i = 0; i < Math.min(n, 25); i++) {
    const d = document.createElement('div');
    d.className = 'bb-dot';
    d.id = `bb-${i}`;
    c.appendChild(d);
  }
}

function flashBurst(n, total) {
  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const el = document.getElementById(`bb-${i}`);
      if (el) el.classList.add('fired');
    }, i * 80);
  }
  // reset dopo
  setTimeout(() => {
    document.querySelectorAll('.bb-dot.fired').forEach(d => d.classList.remove('fired'));
  }, total * 80 + 800);
}

// === Scan config ===
// Aggiunto per modalità AUTO scan
const APIext = {
  scanConfig: (cfg) => post('/api/scan_config', cfg),
  scan:       (active) => post('/api/scan', { active }),
};
Object.assign(API, APIext);
