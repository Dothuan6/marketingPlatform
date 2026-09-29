/* =========================================================================
   App shell + helper dùng chung cho mọi màn.
   ========================================================================= */
(function () {
  const D = window.MP_DATA;
  const KEY = 'mp-proto-state';

  /* ---------- Icon (nét 24px, tự vẽ theo phong cách outline) ---------- */
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
    brain: '<path d="M12 5a3 3 0 0 0-5.8-1A3 3 0 0 0 4 8a3 3 0 0 0 0 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1z"/><path d="M12 5a3 3 0 0 1 5.8-1A3 3 0 0 1 20 8a3 3 0 0 1 0 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1z"/><path d="M12 5v14"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6M9 9h2"/>',
    video: '<rect x="2.5" y="6" width="13" height="12" rx="2"/><path d="m15.5 10.5 6-3.5v10l-6-3.5"/>',
    chart: '<path d="M4 20V11M10 20V5M16 20v-6M21 20H3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    sparkles: '<path d="M11 3l1.8 4.9L17.5 9.5l-4.7 1.7L11 16l-1.8-4.8L4.5 9.5l4.7-1.6z"/><path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-4.5L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15"/><path d="M21 20v-5h-5"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',
    alert: '<path d="M10.3 4.3 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z"/><path d="M12 10v4M12 17.5v.01"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    grip: '<circle cx="9" cy="6" r=".8"/><circle cx="15" cy="6" r=".8"/><circle cx="9" cy="12" r=".8"/><circle cx="15" cy="12" r=".8"/><circle cx="9" cy="18" r=".8"/><circle cx="15" cy="18" r=".8"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.8"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    book: '<path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z"/><path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/>',
    package: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    smile: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01"/>',
    pencil: '<path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    sliders: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    message: '<path d="M4 5h16v11H9l-5 4z"/>',
    hash: '<path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-9 9"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="m5.7 5.7 12.6 12.6"/>',
    type: '<path d="M4 7V5h16v2M9 19h6M12 5v14"/>',
    save: '<path d="M5 3h11l5 5v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M7 3v5h8M7 21v-7h10v7"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    plug: '<path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/>',
    pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    branch: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 7v10M18 10c0 5-6 4-12 7"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    wand: '<path d="m15 4 5 5L9 20l-5-5z"/><path d="M13 6l5 5M4 4v3M2.5 5.5h3M19 16v3M17.5 17.5h3"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
    camera: '<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="4"/>',
    phone: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    report: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 17v-3M12 17v-6M15 17v-2"/>'
  };
  function icon(name, cls) { return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || P.info) + '</svg>'; }
  function hydrateIcons(root) {
    (root || document).querySelectorAll('i[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon, el.className); });
  }

  /* ---------- State (localStorage có try/catch, không có vẫn chạy) ---------- */
  let state = null;
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 5) return s; } catch (e) {}
    return D.initialState();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} state = D.initialState(); save(); }
  state = load();

  /* ---------- Tiện ích ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const WD = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  function fmtDate(iso, style) {
    const d = new Date(iso + 'T00:00:00');
    const dd = String(d.getDate()).padStart(2, '0'), mm = String(d.getMonth() + 1).padStart(2, '0');
    if (style === 'long') return (d.getDay() === 0 ? 'Chủ nhật' : 'Thứ ' + (d.getDay() + 1)) + ', ' + dd + '/' + mm + '/' + d.getFullYear();
    if (style === 'short') return dd + '/' + mm;
    return WD[d.getDay()] + ', ' + dd + '/' + mm;
  }
  function today() { return D.isoDate(new Date()); }
  function dayNo(iso) { return Math.round((new Date(iso + 'T00:00:00') - new Date(state.plan.start + 'T00:00:00')) / 864e5) + 1; }
  function ago(min) {
    min = Math.abs(min);
    if (min < 60) return min + ' phút trước';
    if (min < 1440) return Math.round(min / 60) + ' giờ trước';
    return Math.round(min / 1440) + ' ngày trước';
  }

  function items() {
    const byId = {}; state.plan.pool.forEach(p => { byId[p.id] = p; });
    const ch = state.plan.channels;
    return state.plan.schedule.map(s => {
      const it = Object.assign({}, byId[s.id], { date: s.date, day: dayNo(s.date) });
      if (!ch.includes(it.channel0)) it.channel = ch[0] || it.channel0; else it.channel = it.channel0;
      it.time = it.time || D.CHANNELS[it.channel].defaultTime;
      return it;
    }).sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
  }
  function poolItem(id) { return state.plan.pool.find(p => p.id === Number(id)); }
  function item(id) { return items().find(p => p.id === Number(id)); }

  function pillarBadge(pid, short) {
    const p = D.PILLARS[pid]; if (!p) return '';
    return '<span class="badge pillar-' + pid + '">' + icon(p.icon) + (short ? '' : esc(p.name)) + '</span>';
  }
  function channelBadge(cid) { const c = D.CHANNELS[cid]; return c ? '<span class="badge outline" title="' + c.name + '">' + esc(c.name) + '</span>' : ''; }
  function formatBadge(f) { const x = D.FORMATS[f]; return x ? '<span class="badge outline">' + icon(x.icon) + esc(x.name) + '</span>' : ''; }
  function statusBadge(s) { const x = D.STATUSES[s] || D.STATUSES.planned; return '<span class="badge ' + x.cls + '">' + icon(x.icon) + esc(x.name) + '</span>'; }
  function quoteHook(h) { h = String(h || ''); return /^[“"]/.test(h) ? h : '“' + h + '”'; }
  function angleName(aid) { const a = state.strategy.angles.find(a => a.id === aid); return a ? a.name : aid; }

  /* ---------- Gói, dùng thử, hạn mức (CL-19, CL-20) ---------- */
  function sub() { return state.sub; }
  function trialDaysLeft() { return Math.max(0, Math.round((new Date(state.sub.trialEnds + 'T00:00:00') - new Date(today() + 'T00:00:00')) / 864e5)); }
  // Dùng thử: chỉ 7 bài đầu (theo ngày) có nội dung
  function trialIds() { return items().slice(0, state.sub.trialPosts).map(i => i.id); }
  function isLocked(it) { return state.sub.mode === 'trial' && !trialIds().includes(it.id); }
  function quota() {
    const S = state.sub;
    return { mode: S.mode, posts: { used: S.postsUsed, max: S.postsMax, left: Math.max(0, S.postsMax - S.postsUsed) }, regen: { used: S.regenUsed, max: S.regenMax, left: Math.max(0, S.regenMax - S.regenUsed) } };
  }
  function regenLeft() { return state.sub.mode === 'trial' ? Math.max(0, 10 - state.sub.regenUsed) : Math.max(0, state.sub.regenMax - state.sub.regenUsed); }
  function useRegen() { if (regenLeft() <= 0) return false; state.sub.regenUsed++; save(); refreshQuota(); return true; }
  function usePosts(n) { state.sub.postsUsed += n; save(); refreshQuota(); }
  function postsLeft() { return state.sub.mode === 'trial' ? Math.max(0, state.sub.trialPosts - items().filter(i => i.content).length) : Math.max(0, state.sub.postsMax - state.sub.postsUsed); }

  /* ---------- Kênh nhắc (CL-25) ---------- */
  function notifyText() {
    const N = state.notify; const a = [];
    if (N.push) a.push('thông báo đẩy'); if (N.email) a.push('email'); if (N.telegram) a.push('Telegram');
    return a.join(' + ') || 'chưa bật kênh nhắc';
  }

  /* ---------- Kiểm từ ngữ 2 mức Cấm / Cảnh báo (CL-06) ---------- */
  function checkText(text) {
    const t = String(text || '').toLowerCase(); const out = { ban: [], warn: [] };
    (state.brand.forbidden || []).forEach(f => { if (f.on !== false && t.includes(f.w.toLowerCase())) out[f.level === 'ban' ? 'ban' : 'warn'].push(f); });
    return out;
  }
  function replaceWord(text, f) { return String(text).replace(new RegExp(f.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => m[0] === m[0].toUpperCase() ? f.alt.charAt(0).toUpperCase() + f.alt.slice(1) : f.alt); }

  /* ---------- Ảnh (CL-15) ---------- */
  function imageOf(it) { return it && it.imageId ? (state.brand.images || []).find(x => x.id === it.imageId) : null; }
  function imageTile(img, cls) {
    if (!img) return '<div class="img-tile empty ' + (cls || '') + '">' + icon('camera') + '<span>Chưa có ảnh</span></div>';
    return '<div class="img-tile ' + (cls || '') + '" style="--h:' + img.hue + '">' + icon('image') + '<span>' + esc(img.label) + '</span></div>';
  }
  function needsImage(it) { return !!(D.CHANNELS[it.channel] || {}).needImage; }

  /* "Đạt kiểm" (CL-13 dùng định nghĩa của CL-06): có nội dung · không có từ Cấm · cảnh báo đã xác nhận · có ảnh nếu kênh bắt buộc */
  function passCheck(it) {
    const p = poolItem(it.id); if (!p || !p.content) return { ok: false, reason: 'Chưa có nội dung', kind: 'none' };
    const w = checkText(p.content.caption + ' ' + p.hook); const ack = p.warnAck || [];
    const warn = w.warn.filter(f => !ack.includes(f.w));
    if (w.ban.length) return { ok: false, reason: 'Có từ Cấm: “' + w.ban[0].w + '”', kind: 'ban', ban: w.ban, warn };
    if (needsImage(it) && !it.imageId) return { ok: false, reason: 'Thiếu ảnh (' + D.CHANNELS[it.channel].name + ' bắt buộc)', kind: 'img', ban: [], warn };
    if (warn.length) return { ok: false, reason: 'Cảnh báo: “' + warn[0].w + '” chưa xác nhận', kind: 'warn', ban: [], warn };
    return { ok: true, reason: 'Đạt kiểm', kind: 'ok', ban: [], warn: [] };
  }

  /* ---------- Vì sao bài này? (CL-22) ---------- */
  function whyPost(it) {
    const a = state.strategy.angles.find(x => x.id === it.angle); const ps = state.strategy.personas;
    const per = ps[(it.id + (it.pillar === 'fun' ? 1 : 0)) % ps.length];
    const goal = state.brand.answers.q11 && state.brand.answers.q11.value;
    return 'Góc kể chuyện “' + (a ? a.name : it.angle) + '” · nói với ' + per.name + ' (' + per.age + ', ' + per.job.split(',')[0].toLowerCase() + ')' + (goal ? ' · phục vụ mục tiêu “' + goal.toLowerCase() + '”' : '');
  }

  /* ---------- Máy dò câu trả lời mơ hồ (CL-04) ---------- */
  function isVague(text) {
    const t = String(text || '').trim().toLowerCase(); if (!t) return false;
    const words = t.split(/\s+/).length; const hit = D.VAGUE_WORDS.filter(w => t.includes(w)).length;
    const specific = /\d/.test(t) || /[A-ZÀ-Ỹ][a-zà-ỹ]+/.test(String(text).slice(1));
    return (words <= 2 && !specific) || (hit >= 2 && words < 14) || (hit >= 1 && words <= 4);
  }

  /* ---------- Đo lường tối thiểu (CL-24) ---------- */
  function track(name, props) {
    state.events = state.events || [];
    state.events.unshift({ name, props: props || {}, at: new Date().toTimeString().slice(0, 8) });
    state.events = state.events.slice(0, 40); save();
  }

  /* ---------- Thuật ngữ + nút (i) (CL-21) ---------- */
  function term(key) { const t = D.TERMS[key]; return t ? t.name : key; }
  function termInfo(key) { return '<button type="button" class="info-btn" data-term="' + key + '" aria-label="Giải thích: ' + esc(term(key)) + '">i</button>'; }
  function termExample(key) {
    const S = state.strategy; const A = state.brand.answers; const it = items()[0] || {};
    return ({
      brain: 'Vd: tên “' + ((A.q1 && A.q1.value) || 'shop của bạn') + '”, giá ' + D.fmtPrice((A.q3 && A.q3.value) || '') + ' được nhắc đúng trong mọi bài.',
      usp: 'Của bạn: “' + String(S.usp.primary).split(/[—,]/)[0].trim() + '…”',
      angle: 'Của bạn: “' + (S.angles[0] || {}).name + '” — ' + String((S.angles[0] || {}).message || '').toLowerCase(),
      persona: 'Của bạn: ' + (S.personas[0] || {}).name + ', ' + (S.personas[0] || {}).age + ' — ' + String((S.personas[0] || {}).job || '').toLowerCase(),
      pillar: 'Vd: bài “Phiếu kiểm nghiệm da liễu” thuộc nhóm Chứng thực.',
      hook: 'Vd: ' + quoteHook(it.hook || ''),
      cta: 'Vd: ' + D.CHANNEL_CTA.facebook
    })[key] || '';
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-term]');
    document.querySelectorAll('.term-pop').forEach(p => { if (!b || p.dataset.for !== b.dataset.term) p.remove(); });
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    if (document.querySelector('.term-pop[data-for="' + b.dataset.term + '"]')) { document.querySelector('.term-pop').remove(); return; }
    const t = D.TERMS[b.dataset.term]; const pop = document.createElement('div'); pop.className = 'popover term-pop'; pop.dataset.for = b.dataset.term;
    pop.innerHTML = '<b>' + esc(t.name) + '</b><p class="mt-1">' + esc(t.tip) + '</p><p class="subtle mt-1">' + esc(termExample(b.dataset.term)) + '</p>';
    document.body.appendChild(pop); const r = b.getBoundingClientRect();
    pop.style.left = Math.min(window.innerWidth - 300, Math.max(12, r.left + window.scrollX - 20)) + 'px'; pop.style.top = (r.bottom + window.scrollY + 6) + 'px';
  }, true);

  /* Workflow sẽ làm gì với bài này (CL-10, CL-11, CL-15, CL-25) */
  function autoInfo(it) {
    const A = state.automation; const con = A.connections[it.channel] || {}; const C = D.CHANNELS[it.channel];
    const when = it.time + ' ' + fmtDate(it.date, 'short'); const ch = C.name;
    const level0 = C.level === 0 || !con.connected;
    if (it.status === 'published') return { kind: 'done', icon: 'checkCircle', cls: 'success', text: (it.manual ? 'Đã đăng tay' : 'Đã tự đăng') + ' lên ' + ch + (it.publishedAt ? ' · ' + fmtDate(it.publishedAt.slice(0, 10), 'short') + ' ' + it.publishedAt.slice(11) : '') };
    if (it.status === 'skipped') return { kind: 'skipped', icon: 'x', cls: '', text: 'Bạn đã bỏ qua bài này' };
    if (it.status === 'failed') return { kind: 'failed', icon: 'alert', cls: 'danger', text: 'Đăng lỗi sau 3 lần thử — cần xử lý trong Tự động đăng' };
    if (it.status === 'needcheck') return { kind: 'needcheck', icon: 'alert', cls: 'danger', text: 'Chưa rõ bài đã lên ' + ch + ' chưa — bấm kiểm tra (2 nút)' };
    if (it.status === 'received') return { kind: 'received', icon: 'message', cls: 'warning', text: 'Bạn đã mở gói nhận bài — đăng xong bấm “Tôi đã đăng”' };
    if (isLocked(it) && !it.content) return { kind: 'locked', icon: 'lock', cls: '', text: 'Nội dung khoá trong bản dùng thử — vẫn xem được khung bài' };
    if (!A.enabled) return { kind: 'off', icon: 'ban', cls: '', text: 'Tự động đăng đang tắt — bài sẽ không tự lên kênh' };
    const n = new Date(); const hm = String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0');
    if (it.date < today() || (it.date === today() && it.time < hm)) return { kind: 'missed', icon: 'clock', cls: 'warning', text: 'Đã qua giờ đăng ' + when + (it.status === 'approved' ? ' — bấm Đăng ngay hoặc đổi giờ' : ' — bài chưa được duyệt nên chưa đăng') };
    if (!it.content) return { kind: 'nocontent', icon: 'sparkles', cls: '', text: 'Chưa có nội dung — sinh bài trước ' + when };
    if (needsImage(it) && !it.imageId) return { kind: 'noimage', icon: 'camera', cls: 'warning', text: 'Thiếu ảnh — ' + ch + ' không đăng được bài không ảnh. Thêm ảnh trước ' + when };
    if (it.status !== 'approved') return { kind: 'approval', icon: 'clock', cls: 'warning', text: 'Chờ bạn duyệt — có trong Duyệt tuần, nhắc thêm 1 lần trước giờ đăng qua ' + notifyText() };
    if (level0) return { kind: 'manual', icon: 'phone', cls: 'warning', text: ch + ' đăng tay (Mức 0) — ' + when + ' gửi gói nhận bài qua ' + notifyText() + ', bạn đăng trong 5 chạm' };
    return { kind: 'auto', icon: 'zap', cls: 'primary', text: 'Đã hẹn ' + when + ' · tự đăng lên ' + ch + (con.account ? ' (' + con.account + ')' : '') };
  }
  const KIND_LABEL = { auto: 'Đã hẹn', approval: 'Chờ duyệt', manual: 'Đăng tay', nocontent: 'Chưa có bài', off: 'Tắt', missed: 'Quá giờ', failed: 'Lỗi', done: 'Đã đăng', received: 'Đã nhận', needcheck: 'Cần kiểm tra', noimage: 'Thiếu ảnh', locked: 'Khoá (dùng thử)', skipped: 'Bỏ qua' };

  function copy(text, btn) {
    const done = () => {
      toast('Đã sao chép');
      if (btn) { const o = btn.innerHTML; btn.classList.add('is-done'); btn.innerHTML = icon('check', 'sm') + 'Đã chép'; setTimeout(() => { btn.innerHTML = o; btn.classList.remove('is-done'); }, 1400); }
    };
    try { navigator.clipboard.writeText(text).then(done, () => { fallbackCopy(text); done(); }); } catch (e) { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (e) {} t.remove(); }

  function download(filename, content, mime) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mime || 'text/plain;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------- Toast ---------- */
  function toast(msg, ic) {
    let box = document.querySelector('.toasts');
    if (!box) { box = document.createElement('div'); box.className = 'toasts'; box.setAttribute('role', 'status'); box.setAttribute('aria-live', 'polite'); document.body.appendChild(box); }
    const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = icon(ic || 'checkCircle') + '<span>' + esc(msg) + '</span>';
    box.appendChild(t); setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .2s'; setTimeout(() => t.remove(), 220); }, 2200);
  }

  /* ---------- Modal ---------- */
  function modal(opts) {
    const bd = document.createElement('div'); bd.className = 'modal-backdrop';
    bd.innerHTML = '<div class="modal ' + (opts.wide ? 'wide' : '') + '" role="dialog" aria-modal="true" aria-labelledby="mdl-t">' +
      '<div class="modal-head"><div><h2 id="mdl-t">' + esc(opts.title) + '</h2>' + (opts.subtitle ? '<p class="muted mt-1">' + esc(opts.subtitle) + '</p>' : '') + '</div>' +
      (opts.dismissable === false ? '' : '<button class="btn ghost sm icon" data-close aria-label="Đóng">' + icon('x') + '</button>') + '</div>' +
      '<div class="modal-body">' + (opts.body || '') + '</div>' + (opts.foot ? '<div class="modal-foot">' + opts.foot + '</div>' : '') + '</div>';
    document.body.appendChild(bd);
    const close = () => { bd.remove(); document.removeEventListener('keydown', onKey); if (opts.onClose) opts.onClose(); };
    const onKey = e => { if (e.key === 'Escape' && opts.dismissable !== false) close(); };
    document.addEventListener('keydown', onKey);
    bd.addEventListener('click', e => { if ((e.target === bd && opts.dismissable !== false) || e.target.closest('[data-close]')) close(); });
    const f = bd.querySelector('textarea, input, .btn.primary'); if (f) setTimeout(() => f.focus(), 30);
    return { el: bd, close };
  }

  /* ---------- Popover tạo lại bằng chip định hướng (CL-07 + CL-20) ----------
     Nhóm chip loại trừ nhau, tối đa 2 chip; không chọn → chip mặc định; ô tự do ẩn sau "Khác…";
     chip "Sửa thông tin/giá" mở hồ sơ, không gọi AI; mỗi lần tạo lại trừ 1 lượt. */
  const REGEN_GROUPS = [
    { name: 'Độ dài', chips: ['Ngắn hơn', 'Dài hơn'] },
    { name: 'Giọng', chips: ['Vui hơn', 'Nghiêm túc hơn'] },
    { name: 'Nội dung', chips: ['Nhấn giá/ưu đãi', 'Kể chuyện khách hàng'] },
    { name: 'Chi tiết', chips: ['Bớt emoji', 'Thêm câu hỏi cuối bài'] }
  ];
  let regenBusy = false;
  function regenPopover(anchor, opts) {
    document.querySelectorAll('.popover.regen').forEach(p => p.remove());
    if (regenBusy) { toast('Đang viết lại — đợi lượt trước xong đã', 'clock'); return; }
    const groups = opts.groups || REGEN_GROUPS; const left = regenLeft();
    const pop = document.createElement('div'); pop.className = 'popover regen'; pop.setAttribute('role', 'dialog');
    pop.innerHTML = '<div class="stack sm"><div class="row between"><b>' + esc(opts.title || 'Tạo lại mục này') + '</b><span class="badge ' + (left ? '' : 'danger') + '">Còn ' + left + ' lần</span></div>' +
      '<p class="subtle">Chọn tối đa 2 hướng. Không chọn gì → dùng hướng mặc định “' + esc(opts.defaultChip || groups[0].chips[0]) + '”.</p>' +
      groups.map((g, gi) => '<div class="chip-group"><span class="subtle">' + esc(g.name) + '</span><div class="chips">' + g.chips.map(c => '<button class="chip sm" type="button" data-g="' + gi + '" data-c="' + esc(c) + '" aria-pressed="false">' + esc(c) + '</button>').join('') + '</div></div>').join('') +
      (opts.fixInfo === false ? '' : '<a class="chip sm fix-chip" href="brand.html#q3">' + icon('pencil', 'sm') + 'Sửa thông tin/giá <span class="subtle">· không tốn lượt</span></a>') +
      '<button type="button" class="btn ghost sm" data-other style="align-self:flex-start">Khác…</button>' +
      '<textarea class="textarea" rows="2" placeholder="Muốn khác thế nào?" hidden></textarea>' +
      '<div class="row between mt-2"><button class="btn ghost sm" data-x>Huỷ</button><button class="btn primary sm" data-go ' + (left ? '' : 'disabled title="Hết lượt tạo lại tháng này — liên hệ nâng gói"') + '>' + icon('refresh', 'sm') + 'Tạo lại</button></div>' +
      (left ? '' : '<p class="subtle" style="color:var(--danger)">Hết lượt tạo lại tháng này. Bạn vẫn sửa tay được, hoặc liên hệ nâng gói.</p>') + '</div>';
    document.body.appendChild(pop);
    const r = anchor.getBoundingClientRect();
    pop.style.left = Math.min(window.innerWidth - 356, Math.max(12, r.right + window.scrollX - 340)) + 'px'; pop.style.top = (r.bottom + window.scrollY + 6) + 'px';
    const ta = pop.querySelector('textarea');
    pop.querySelector('[data-other]').onclick = e => { ta.hidden = false; e.currentTarget.hidden = true; ta.focus(); };
    const picked = () => [...pop.querySelectorAll('[data-c][aria-pressed="true"]')];
    pop.querySelectorAll('[data-c]').forEach(c => c.onclick = () => {
      const on = c.getAttribute('aria-pressed') === 'true';
      if (!on) {
        pop.querySelectorAll('[data-g="' + c.dataset.g + '"]').forEach(x => x.setAttribute('aria-pressed', 'false'));
        if (picked().length >= 2) { toast('Tối đa 2 hướng mỗi lần', 'info'); return; }
      }
      c.setAttribute('aria-pressed', String(!on));
    });
    const close = () => { pop.remove(); document.removeEventListener('mousedown', outside); };
    const outside = e => { if (!pop.contains(e.target) && e.target !== anchor && !anchor.contains(e.target)) close(); };
    setTimeout(() => document.addEventListener('mousedown', outside), 0);
    pop.querySelector('[data-x]').onclick = close;
    pop.querySelector('[data-go]').onclick = () => {
      if (!useRegen()) return;
      let chips = picked().map(c => c.dataset.c); if (!chips.length && !ta.value.trim()) chips = [opts.defaultChip || groups[0].chips[0]];
      const note = chips.concat(ta.value.trim() ? [ta.value.trim()] : []).join(', ');
      track('regen', { chips: chips.join(' + ') || 'tự do', left: regenLeft() });
      close(); regenBusy = true; setTimeout(() => { regenBusy = false; }, 1500);
      opts.onGo(note, chips);
    };
  }

  /* ---------- GenerationProgress (tiến độ theo bước thật) ---------- */
  function runSteps(title, steps, onDone, subtitle) {
    const m = modal({ title, subtitle: subtitle || 'Bạn có thể đóng cửa sổ này, hệ thống vẫn chạy nền và báo khi xong.', dismissable: false,
      body: '<div class="gen-steps">' + steps.map((s, i) => '<div class="gen-step" data-i="' + i + '"><span class="st"></span><span>' + esc(s.label) + '</span><span class="meta"></span></div>').join('') + '</div><div class="progress lg mt-4"><span style="width:0"></span></div>' });
    const bar = m.el.querySelector('.progress > span');
    let i = 0; const t0 = Date.now();
    function next() {
      if (i >= steps.length) { setTimeout(() => { m.close(); onDone && onDone(); }, 450); return; }
      const row = m.el.querySelector('[data-i="' + i + '"]'); row.classList.add('running');
      const dur = steps[i].ms || 700; const ts = Date.now();
      setTimeout(() => {
        row.classList.remove('running'); row.classList.add('done'); row.querySelector('.st').innerHTML = icon('check', 'sm');
        row.querySelector('.meta').textContent = ((Date.now() - ts) / 1000).toFixed(1) + ' giây';
        i++; bar.style.width = Math.round(i / steps.length * 100) + '%'; next();
      }, dur);
    }
    next();
    return { elapsed: () => (Date.now() - t0) / 1000 };
  }

  /* ---------- Shell ---------- */
  const NAV = [
    { key: 'home', href: 'index.html', label: 'Tổng quan', icon: 'home' },
    { sep: 'Quy trình' },
    { key: 'onboarding', href: 'onboarding.html', label: 'Bắt đầu · 5 câu', step: 1 },
    { key: 'brand', href: 'brand.html', label: 'Hồ sơ thương hiệu', step: 2 },
    { key: 'strategy', href: 'strategy.html', label: 'Chiến lược', step: 3 },
    { key: 'plan', href: 'plan.html', label: 'Lịch 30 ngày', step: 4 },
    { key: 'post', href: 'post.html', label: 'Bài viết', step: 5 },
    { key: 'automation', href: 'automation.html', label: 'Tự động đăng', step: 6 },
    { sep: 'Hằng tuần · hằng tháng' },
    { key: 'review', href: 'review.html', label: 'Duyệt tuần', icon: 'checkCircle', badge: () => items().filter(i => i.content && ['generated', 'edited'].includes(i.status) && i.date >= today() && i.date <= D.addDays(today(), 6)).length },
    { key: 'publish', href: 'publish.html', label: 'Đăng bài này', icon: 'phone' },
    { key: 'report', href: 'report.html', label: 'Báo cáo tháng', icon: 'report' }
  ];

  const MAP = [
    { href: 'index.html', t: 'Tổng quan', us: 'US-504 · CL-05, 13, 16' },
    { href: 'onboarding.html?fresh=1', t: 'Bắt đầu: 5 câu + điền từ link/ảnh', us: 'US-101 → 104 · CL-01, 02, 04, 22' },
    { href: 'brand.html', t: 'Hồ sơ thương hiệu · từ cấm · kho ảnh', us: 'US-105 · 501 → 503 · CL-05, 06, 15' },
    { href: 'strategy.html', t: 'Chiến lược (tên tiếng Việt)', us: 'US-201 → 206 · CL-21, 22' },
    { href: 'plan.html', t: 'Lịch 30 ngày', us: 'US-301 → 307 · 403 · CL-12, 17, 19, 25' },
    { href: 'plan.html?first=1&ttfv=104', t: '↳ Lịch lần đầu (sau 5 câu)', us: 'QĐ-J · CL-22, 25' },
    { href: 'post.html', t: 'Bài viết', us: 'US-401 · 404 → 406 · CL-06, 07, 09, 11, 15, 16' },
    { href: 'review.html', t: 'Duyệt tuần trong 5 phút', us: 'CL-13 · mới' },
    { href: 'publish.html', t: 'Đăng bài này (điện thoại · Mức 0)', us: 'CL-10 v2 · mới' },
    { href: 'automation.html', t: 'Tự động đăng: hẹn giờ có mã hẹn', us: 'US-601 → 606 · CL-11 v3, 25' },
    { href: 'report.html', t: 'Báo cáo tháng', us: 'CL-18 · mới' }
  ];

  function quotaCard() {
    const S = state.sub;
    if (S.mode === 'trial') {
      const d = trialDaysLeft(); const done = items().filter(i => i.content).length;
      return '<div class="quota"><div class="row between"><b>Dùng thử</b><span class="badge ' + (d <= 2 ? 'warning' : 'primary') + '">còn ' + d + ' ngày</span></div>' +
        '<div class="quota-row"><div class="row between"><span class="muted">Bài dùng thử</span><b>' + Math.min(done, S.trialPosts) + ' / ' + S.trialPosts + '</b></div><div class="progress mt-1"><span style="width:' + Math.min(100, done / S.trialPosts * 100) + '%"></span></div></div>' +
        '<p class="subtle mt-2">Hết hạn vẫn xem được kế hoạch 30 ngày và 7 bài — không mất dữ liệu.</p><button class="btn sm primary block mt-2" data-upgrade>Tiếp tục dùng</button></div>';
    }
    const q = quota(); const pct = q.posts.used / q.posts.max; const rp = q.regen.used / q.regen.max;
    const warn = pct >= .8 || rp >= .8;
    return '<div class="quota"><div class="row between"><b>Gói ' + esc(S.planName) + '</b><span class="badge primary">' + esc(S.price) + '</span></div>' +
      '<p class="mt-2" style="font-weight:600">Còn ' + q.posts.left + ' bài · ' + q.regen.left + ' lần tạo lại</p><p class="subtle">tháng này</p>' +
      '<div class="progress mt-1 ' + (pct >= .8 ? 'warning' : '') + '"><span style="width:' + Math.min(100, pct * 100) + '%"></span></div>' +
      (warn ? '<p class="subtle mt-2" style="color:var(--warning)">' + icon('info', 'sm') + ' Đã dùng hơn 80% lượt tháng này. Hết lượt vẫn xem, sửa tay và đăng được.</p>' : '') +
      '<p class="subtle mt-2">Làm mới vào 01/' + String(new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2).padStart(2, '0') + '</p></div>';
  }
  function refreshQuota() { const f = document.querySelector('.sidebar-foot'); if (f) { f.innerHTML = quotaCard(); bindUpgrade(f); } }
  function bindUpgrade(root) {
    root.querySelectorAll('[data-upgrade]').forEach(b => b.onclick = () => {
      const m = modal({ title: 'Tiếp tục dùng Marketing Agent', subtitle: 'Chọn gói để mở nội dung 23 bài còn lại của kế hoạch 30 ngày.',
        body: '<div class="stack">' + [['Cơ bản', '299k', '30 bài · 15 lần tạo lại / tháng'], ['Chuyên nghiệp', '599k', '60 bài · 30 lần tạo lại / tháng · tự đăng FB/IG']].map((p, i) => '<label class="radio-card"><input type="radio" name="plan" ' + (i ? 'checked' : '') + '><span><b>' + p[0] + ' · ' + p[1] + '/tháng</b><div class="subtle">' + p[2] + '</div></span></label>').join('') +
          '<p class="subtle">Prototype: bấm tiếp tục sẽ chuyển sang trạng thái “đã trả phí”.</p></div>',
        foot: '<button class="btn" data-close>Để sau</button><button class="btn primary" data-ok>Tiếp tục</button>' });
      m.el.querySelector('[data-ok]').onclick = () => { state.sub.mode = 'paid'; state.sub.postsUsed = items().filter(i => i.content).length; save(); track('upgrade', { plan: 'Chuyên nghiệp' }); location.reload(); };
    });
  }

  /* Hỏi bật thông báo đẩy — 1 lần, sau khi thấy kế hoạch (CL-25) */
  function askPush(onDone) {
    const ios = /iPhone|iPad/.test(navigator.userAgent);
    const m = modal({ title: 'Cho phép nhắc bạn khi đến giờ đăng?', subtitle: 'Mỗi tuần 1 tin nhắc duyệt bài (tối Chủ nhật) và 1 tin khi bài cần bạn đăng tay. Không quảng cáo.',
      body: '<div class="stack"><div class="callout">' + icon('bell') + '<div>Đến giờ, thông báo hiện trên màn hình khoá → chạm là mở thẳng màn <b>Đăng bài này</b> hoặc <b>Duyệt tuần</b>.</div></div>' +
        (ios ? '<div class="callout warning">' + icon('phone') + '<div>iPhone: bấm <b>Chia sẻ</b> → <b>Thêm vào MH chính</b>, rồi mở app từ màn hình chính để bật thông báo.</div></div>' : '') + '</div>',
      foot: '<button class="btn" data-no>Không, cảm ơn</button><button class="btn primary" data-ok>' + icon('bell', 'sm') + 'Cho phép</button>', dismissable: false });
    const N = state.notify;
    m.el.querySelector('[data-ok]').onclick = () => { N.asked = true; N.push = true; N.pref = 'push'; save(); track('push_permission', { result: 'cho phép' }); m.close(); toast('Đã bật thông báo đẩy · email là kênh dự phòng', 'bell'); onDone && onDone(); };
    m.el.querySelector('[data-no]').onclick = () => {
      m.close(); N.asked = true; N.push = false; save(); track('push_permission', { result: 'từ chối' });
      const m2 = modal({ title: 'Dùng email thay thế?', subtitle: 'Bạn vẫn cần được nhắc khi có bài chờ duyệt hoặc cần đăng tay.',
        body: '<div class="field"><label for="em">Email nhận nhắc</label><input class="input" id="em" value="shop@moclan.vn"></div><p class="subtle">Đổi lại bất cứ lúc nào trong Tự động đăng → Báo lại.</p>',
        foot: '<button class="btn" data-close>Không nhắc</button><button class="btn primary" data-ok>Dùng email</button>' });
      m2.el.querySelector('[data-ok]').onclick = () => { N.email = true; N.pref = 'email'; save(); track('push_permission', { result: 'dùng email' }); m2.close(); toast('Sẽ nhắc qua email', 'mail'); onDone && onDone(); };
    };
  }

  function shell(opts) {
    const page = document.getElementById('page');
    const brandName = (state.brand.answers.q1 && state.brand.answers.q1.value) || 'Thương hiệu';
    const nav = NAV.map(n => {
      if (n.sep) return '<div class="nav-label">' + n.sep + '</div>';
      const cur = n.key === opts.active ? ' aria-current="page"' : '';
      const leadFix = n.step ? '<span class="step-dot">' + n.step + '</span>' : icon(n.icon);
      const bd = n.badge ? n.badge() : 0;
      return '<a href="' + n.href + '"' + cur + '>' + leadFix + '<span class="grow">' + n.label + '</span>' + (bd ? '<span class="badge warning">' + bd + '</span>' : '') + '</a>';
    }).join('');

    const wrap = document.createElement('div'); wrap.className = 'shell';
    wrap.innerHTML =
      '<aside class="sidebar" aria-label="Điều hướng chính">' +
        '<a class="logo" href="index.html" title="Marketing Agent — TuoiTreSoft"><img class="logo-img" src="assets/brand/tuoitresoft-mark.png" alt="TuoiTreSoft" width="44" height="30"><span>Marketing Agent<small>by TuoiTreSoft</small></span></a>' +
        '<button class="brand-switch" type="button" data-brand-switch><span class="avatar">' + esc(brandName.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()) + '</span><span class="grow"><b class="truncate" style="display:block">' + esc(brandName) + '</b><span class="subtle">' + esc((D.INDUSTRIES.find(i => i.id === state.brand.industry) || {}).name || '') + '</span></span>' + icon('down', 'sm') + '</button>' +
        '<nav class="nav">' + nav + '</nav>' +
        '<div class="sidebar-foot">' + quotaCard() + '</div>' +
      '</aside>' +
      '<div class="main"><header class="topbar">' +
        '<button class="btn ghost icon menu-btn" data-menu aria-label="Mở menu">' + icon('menu') + '</button>' +
        '<div class="crumbs">' + (opts.crumbs || []).map((c, i, a) => i === a.length - 1 ? '<b class="truncate">' + esc(c) + '</b>' : '<span class="hide-sm">' + esc(c) + '</span><span class="hide-sm">' + icon('right', 'sm') + '</span>').join('') + '</div>' +
        '<div class="grow"></div>' +
        (state.sub.mode === 'trial' ? '<span class="badge warning hide-sm">' + icon('clock') + 'Dùng thử · còn ' + trialDaysLeft() + ' ngày</span>' : '') +
        '<span class="badge success hide-sm" title="Mọi thay đổi được lưu tự động">' + icon('check') + 'Đã lưu</span>' +
        '<button class="btn ghost icon" data-theme-toggle aria-label="Đổi giao diện sáng/tối">' + icon(document.documentElement.getAttribute('data-theme') === 'dark' ? 'sun' : 'moon') + '</button>' +
        '<span class="avatar round" title="TTS">TT</span>' +
      '</header><div class="content ' + (opts.narrow ? 'narrow' : '') + '" id="content"></div></div>';
    page.parentNode.insertBefore(wrap, page);
    wrap.querySelector('#content').appendChild(page);
    page.hidden = false;

    wrap.querySelector('[data-menu]').onclick = () => document.body.classList.toggle('nav-open');
    document.addEventListener('click', e => { if (document.body.classList.contains('nav-open') && !e.target.closest('.sidebar') && !e.target.closest('[data-menu]')) document.body.classList.remove('nav-open'); });
    wrap.querySelector('[data-brand-switch]').onclick = () => toast('Nhiều brand có ở gói Chuyên nghiệp — prototype chỉ có 1 brand mẫu', 'info');
    bindThemeToggle(wrap); bindUpgrade(wrap);
    protoMap();
    hydrateIcons(page);
  }

  function bindThemeToggle(root) {
    const b = root.querySelector('[data-theme-toggle]'); if (!b) return;
    b.onclick = () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('mp-theme', next); } catch (e) {}
      b.innerHTML = icon(next === 'dark' ? 'sun' : 'moon');
    };
  }

  function protoMap() {
    const fab = document.createElement('button'); fab.className = 'btn fab'; fab.innerHTML = icon('map') + '<span class="hide-sm">Bản đồ prototype</span>';
    fab.setAttribute('aria-expanded', 'false');
    document.body.appendChild(fab);
    let panel = null;
    fab.onclick = () => {
      if (panel) { panel.remove(); panel = null; fab.setAttribute('aria-expanded', 'false'); return; }
      panel = document.createElement('div'); panel.className = 'card proto-panel';
      const here = location.pathname.split('/').pop() || 'index.html';
      const ev = (state.events || []).slice(0, 6);
      panel.innerHTML = '<div class="card-body"><div class="row between mb-2"><b>Các màn trong prototype</b><span class="badge">MVP · 21 ý Phase 1</span></div><div class="list">' +
        MAP.map(m => '<div class="list-item"><div class="grow"><a href="' + m.href + '"><b>' + esc(m.t) + '</b></a><div class="subtle">' + m.us + '</div></div>' + (here === m.href.split('?')[0] && !m.href.includes('first') ? '<span class="badge primary">Đang xem</span>' : icon('right', 'sm')) + '</div>').join('') +
        '</div><div class="divider"></div>' +
        '<div class="row between mb-2"><b>Xem như</b><div class="segmented" role="group"><button data-mode="trial" aria-pressed="' + (state.sub.mode === 'trial') + '">Dùng thử</button><button data-mode="paid" aria-pressed="' + (state.sub.mode === 'paid') + '">Đã trả phí</button></div></div>' +
        '<b>Sự kiện đo lường gần nhất</b> <span class="subtle">(CL-24)</span><div class="log mt-1" style="max-height:120px;overflow:auto">' + (ev.length ? ev.map(e => '<div class="subtle mono" style="font-size:11.5px">' + e.at + ' · ' + esc(e.name) + ' ' + esc(Object.entries(e.props).map(([k, v]) => k + '=' + v).join(' ')) + '</div>').join('') : '<div class="subtle">Chưa có — thử duyệt, sửa, tạo lại một bài.</div>') + '</div>' +
        '<div class="divider"></div><p class="subtle mb-3">Dữ liệu là bản mẫu, lưu trong trình duyệt của bạn. Không gọi AI thật, không gửi thông báo thật.</p><button class="btn sm block" data-reset>' + icon('undo', 'sm') + 'Đặt lại dữ liệu demo</button></div>';
      document.body.appendChild(panel); fab.setAttribute('aria-expanded', 'true');
      panel.querySelector('[data-reset]').onclick = () => { reset(); try { localStorage.removeItem('mp-onb-draft'); } catch (e) {} location.href = 'index.html'; };
      panel.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { state.sub.mode = b.dataset.mode; if (b.dataset.mode === 'trial') state.sub.trialEnds = D.addDays(today(), 5); save(); location.reload(); });
    };
  }

  /* ---------- DiffViewer: so sánh theo dòng (LCS) ---------- */
  function lineDiff(a, b) {
    const A = a.split('\n'), B = b.split('\n'), n = A.length, m = B.length;
    const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    const left = [], right = []; let i = 0, j = 0;
    while (i < n || j < m) {
      if (i < n && j < m && A[i] === B[j]) { left.push(['', A[i]]); right.push(['', B[j]]); i++; j++; }
      else if (j < m && (i >= n || L[i][j + 1] >= L[i + 1][j])) { right.push(['add', B[j]]); j++; }
      else { left.push(['del', A[i]]); i++; }
    }
    const html = arr => arr.map(x => '<div class="' + x[0] + '">' + (x[0] === 'add' ? '+ ' : x[0] === 'del' ? '− ' : '  ') + esc(x[1]) + '</div>').join('');
    return { left: html(left), right: html(right), changed: left.filter(x => x[0]).length + right.filter(x => x[0]).length };
  }
  function diffModal(title, oldText, newText, onPick) {
    const d = lineDiff(oldText, newText);
    const m = modal({ title, subtitle: d.changed + ' dòng thay đổi. Chọn bản bạn muốn giữ.', wide: true,
      body: '<div class="diff"><div class="diff-col"><h4><span>Bản hiện tại</span><span class="badge danger">− đã bỏ</span></h4><div class="diff-lines">' + d.left + '</div></div>' +
        '<div class="diff-col"><h4><span>Bản mới</span><span class="badge success">+ thêm vào</span></h4><div class="diff-lines">' + d.right + '</div></div></div>',
      foot: '<button class="btn" data-keep>Giữ bản cũ</button><button class="btn primary" data-use>' + icon('check', 'sm') + 'Dùng bản mới</button>' });
    m.el.querySelector('[data-keep]').onclick = () => { m.close(); onPick(false); };
    m.el.querySelector('[data-use]').onclick = () => { m.close(); onPick(true); };
  }

  window.MP = {
    lineDiff, diffModal,
    D, get state() { return state; }, save, reset, icon, hydrateIcons, esc, fmtDate, today, dayNo, ago, items, item, poolItem,
    quoteHook, pillarBadge, channelBadge, formatBadge, statusBadge, angleName, quota, autoInfo, KIND_LABEL, copy, download, toast, modal, regenPopover, runSteps,
    shell, bindThemeToggle, protoMap, params: new URLSearchParams(location.search),
    sub, trialDaysLeft, trialIds, isLocked, regenLeft, useRegen, usePosts, postsLeft, refreshQuota, notifyText, checkText, replaceWord,
    imageOf, imageTile, needsImage, passCheck, whyPost, isVague, track, term, termInfo, askPush
  };
})();
