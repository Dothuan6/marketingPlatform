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
    wand: '<path d="m15 4 5 5L9 20l-5-5z"/><path d="M13 6l5 5M4 4v3M2.5 5.5h3M19 16v3M17.5 17.5h3"/>'
  };
  function icon(name, cls) { return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || P.info) + '</svg>'; }
  function hydrateIcons(root) {
    (root || document).querySelectorAll('i[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon, el.className); });
  }

  /* ---------- State (localStorage có try/catch, không có vẫn chạy) ---------- */
  let state = null;
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 4) return s; } catch (e) {}
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

  /* Workflow sẽ làm gì với bài này */
  function autoInfo(it) {
    const A = state.automation; const con = A.connections[it.channel] || {};
    const when = fmtDate(it.date) + ' lúc ' + it.time; const ch = D.CHANNELS[it.channel].name;
    if (it.status === 'published') return { kind: 'done', icon: 'checkCircle', cls: 'success', text: (it.manual ? 'Đã đăng tay' : 'Đã tự động đăng') + ' lên ' + ch + (it.publishedAt ? ' · ' + fmtDate(it.publishedAt.slice(0, 10)) + ' ' + it.publishedAt.slice(11) : '') };
    if (it.status === 'failed') return { kind: 'failed', icon: 'alert', cls: 'danger', text: 'Đăng lỗi — cần xử lý trong Tự động đăng' };
    if (!A.enabled) return { kind: 'off', icon: 'ban', cls: '', text: 'Tự động đăng đang tắt — bài sẽ không tự lên kênh' };
    const n = new Date(); const hm = String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0');
    if (it.date < today() || (it.date === today() && it.time < hm)) return { kind: 'missed', icon: 'clock', cls: 'warning', text: 'Đã qua giờ đăng ' + when + (it.status === 'approved' ? ' — bấm Đăng ngay hoặc đổi giờ' : ' — bài chưa được duyệt nên chưa đăng') };
    if (!it.content) return { kind: 'nocontent', icon: 'sparkles', cls: '', text: 'Chưa có nội dung — sinh bài trước khi đến ' + when };
    if (!con.connected) return { kind: 'manual', icon: 'message', cls: 'warning', text: ch + ' chưa kết nối — đến ' + when + ' sẽ gửi nội dung qua Zalo để bạn đăng tay' };
    if (it.status !== 'approved' && A.approvalMode === 'manual') return { kind: 'approval', icon: 'clock', cls: 'warning', text: 'Chờ bạn duyệt — nhắc qua Zalo trước giờ đăng ' + (A.remindBefore / 60) + ' tiếng (' + when + ')' };
    return { kind: 'auto', icon: 'zap', cls: 'primary', text: 'Sẽ tự đăng lên ' + ch + ' ' + (con.account ? '(' + con.account + ') ' : '') + when };
  }

  function quota() {
    const pool = state.plan.pool;
    return {
      posts: { used: 42 + pool.filter(p => p.content).length - 12, max: 150 },
      autoposts: { used: 14 + pool.filter(p => p.status === 'published').length, max: 200 },
      plans: { used: 1, max: 4 }
    };
  }

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

  /* ---------- Popover "Tạo lại — muốn khác thế nào?" ---------- */
  function regenPopover(anchor, opts) {
    document.querySelectorAll('.popover').forEach(p => p.remove());
    const pop = document.createElement('div'); pop.className = 'popover'; pop.setAttribute('role', 'dialog');
    const sugg = opts.suggestions || ['Ngắn hơn', 'Cụ thể hơn', 'Bớt “bán hàng”', 'Thêm số liệu'];
    pop.innerHTML = '<div class="stack sm"><b>' + esc(opts.title || 'Tạo lại mục này') + '</b>' +
      '<p class="subtle">Chỉ mục này được tạo lại, các phần khác giữ nguyên.</p>' +
      '<textarea class="textarea" rows="2" placeholder="Muốn khác thế nào? (không bắt buộc)"></textarea>' +
      '<div class="chips">' + sugg.map(s => '<button class="chip" type="button" style="min-height:28px;padding:3px 10px;font-size:12px">' + esc(s) + '</button>').join('') + '</div>' +
      '<div class="row between mt-2"><button class="btn ghost sm" data-x>Huỷ</button><button class="btn primary sm" data-go>' + icon('refresh', 'sm') + 'Tạo lại</button></div></div>';
    document.body.appendChild(pop);
    const r = anchor.getBoundingClientRect();
    const left = Math.min(window.innerWidth - 336, Math.max(16, r.right + window.scrollX - 320));
    pop.style.left = left + 'px'; pop.style.top = (r.bottom + window.scrollY + 6) + 'px';
    const ta = pop.querySelector('textarea'); ta.focus();
    pop.querySelectorAll('.chip').forEach(c => c.onclick = () => { ta.value = (ta.value ? ta.value + ', ' : '') + c.textContent.toLowerCase(); c.setAttribute('aria-pressed', 'true'); });
    const close = () => { pop.remove(); document.removeEventListener('mousedown', outside); };
    const outside = e => { if (!pop.contains(e.target) && e.target !== anchor && !anchor.contains(e.target)) close(); };
    setTimeout(() => document.addEventListener('mousedown', outside), 0);
    pop.querySelector('[data-x]').onclick = close;
    pop.querySelector('[data-go]').onclick = () => { const note = ta.value.trim(); close(); opts.onGo(note); };
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
    { key: 'onboarding', href: 'onboarding.html', label: 'Onboarding', step: 1 },
    { key: 'brand', href: 'brand.html', label: 'Brand Brain', step: 2 },
    { key: 'strategy', href: 'strategy.html', label: 'Chiến lược', step: 3 },
    { key: 'plan', href: 'plan.html', label: 'Lịch đăng 30 ngày', step: 4 },
    { key: 'post', href: 'post.html', label: 'Bài viết', step: 5 },
    { key: 'automation', href: 'automation.html', label: 'Tự động đăng', step: 6 },
    { key: 'track', href: '#', label: 'Hiệu quả', icon: 'chart', locked: 'Sau' }
  ];

  const MAP = [
    { href: 'index.html', t: 'Tổng quan', us: 'US-504' },
    { href: 'onboarding.html', t: 'Onboarding 12 câu hỏi', us: 'US-101 → 104' },
    { href: 'brand.html', t: 'Brand Brain', us: 'US-105 · 501 → 503' },
    { href: 'strategy.html', t: 'Chiến lược: USP · Angle · Persona · Pillar', us: 'US-201 → 206' },
    { href: 'plan.html', t: 'Lịch đăng 30 ngày', us: 'US-301 → 307 · 403' },
    { href: 'post.html', t: 'Chi tiết bài viết', us: 'US-401 · 404 → 406' },
    { href: 'automation.html', t: 'Tự động đăng (workflow)', us: 'US-601 → 606 · mới' }
  ];

  function shell(opts) {
    const page = document.getElementById('page');
    const q = quota();
    const qRow = (l, x) => '<div class="quota-row"><div class="row between"><span class="muted">' + l + '</span><b>' + x.used + ' / ' + x.max + '</b></div><div class="progress mt-1 ' + (x.used / x.max > .85 ? 'warning' : '') + '"><span style="width:' + Math.min(100, x.used / x.max * 100) + '%"></span></div></div>';
    const brandName = (state.brand.answers.q1 && state.brand.answers.q1.value) || 'Thương hiệu';
    const nav = NAV.map(n => {
      if (n.sep) return '<div class="nav-label">' + n.sep + '</div>';
      const cur = n.key === opts.active ? ' aria-current="page"' : '';
      const leadFix = n.step ? '<span class="step-dot">' + n.step + '</span>' : icon(n.icon);
      if (n.locked) return '<a class="locked" href="#" aria-disabled="true" title="Đo hiệu quả bài đăng — làm sau Phase 1" onclick="return false">' + leadFix + '<span>' + n.label + '</span><span class="badge tag">' + icon('lock') + n.locked + '</span></a>';
      return '<a href="' + n.href + '"' + cur + '>' + leadFix + '<span>' + n.label + '</span></a>';
    }).join('');

    const wrap = document.createElement('div'); wrap.className = 'shell';
    wrap.innerHTML =
      '<aside class="sidebar" aria-label="Điều hướng chính">' +
        '<a class="logo" href="index.html" title="Marketing Agent — TuoiTreSoft"><img class="logo-img" src="assets/brand/tuoitresoft-mark.png" alt="TuoiTreSoft" width="44" height="30"><span>Marketing Agent<small>by TuoiTreSoft</small></span></a>' +
        '<button class="brand-switch" type="button" data-brand-switch><span class="avatar">' + esc(brandName.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()) + '</span><span class="grow"><b class="truncate" style="display:block">' + esc(brandName) + '</b><span class="subtle">' + esc((D.INDUSTRIES.find(i => i.id === state.brand.industry) || {}).name || '') + '</span></span>' + icon('down', 'sm') + '</button>' +
        '<nav class="nav">' + nav + '</nav>' +
        '<div class="sidebar-foot"><div class="quota"><div class="row between"><b>Gói Chuyên nghiệp</b><span class="badge primary">599k</span></div>' +
          qRow('Bài viết', q.posts) + qRow('Lượt tự động đăng', q.autoposts) + qRow('Kế hoạch / tháng', q.plans) +
          '<p class="subtle mt-2">Làm mới vào 01/' + String(new Date().getMonth() + 2 > 12 ? 1 : new Date().getMonth() + 2).padStart(2, '0') + '</p></div></div>' +
      '</aside>' +
      '<div class="main"><header class="topbar">' +
        '<button class="btn ghost icon menu-btn" data-menu aria-label="Mở menu">' + icon('menu') + '</button>' +
        '<div class="crumbs">' + (opts.crumbs || []).map((c, i, a) => i === a.length - 1 ? '<b class="truncate">' + esc(c) + '</b>' : '<span class="hide-sm">' + esc(c) + '</span><span class="hide-sm">' + icon('right', 'sm') + '</span>').join('') + '</div>' +
        '<div class="grow"></div>' +
        '<span class="badge success hide-sm" title="Mọi thay đổi được lưu tự động">' + icon('check') + 'Đã lưu</span>' +
        '<button class="btn ghost icon" data-theme-toggle aria-label="Đổi giao diện sáng/tối">' + icon(document.documentElement.getAttribute('data-theme') === 'dark' ? 'sun' : 'moon') + '</button>' +
        '<span class="avatar round" title="TTS">TT</span>' +
      '</header><div class="content" id="content"></div></div>';
    page.parentNode.insertBefore(wrap, page);
    wrap.querySelector('#content').appendChild(page);
    page.hidden = false;

    wrap.querySelector('[data-menu]').onclick = () => document.body.classList.toggle('nav-open');
    document.addEventListener('click', e => { if (document.body.classList.contains('nav-open') && !e.target.closest('.sidebar') && !e.target.closest('[data-menu]')) document.body.classList.remove('nav-open'); });
    wrap.querySelector('[data-brand-switch]').onclick = () => toast('Nhiều brand có ở gói Chuyên nghiệp — prototype chỉ có 1 brand mẫu', 'info');
    bindThemeToggle(wrap);
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
      panel.innerHTML = '<div class="card-body"><div class="row between mb-2"><b>Các màn trong prototype</b><span class="badge">MVP · GĐ 1</span></div><div class="list">' +
        MAP.map(m => '<div class="list-item"><div class="grow"><a href="' + m.href + '"><b>' + esc(m.t) + '</b></a><div class="subtle">' + m.us + '</div></div>' + (here === m.href ? '<span class="badge primary">Đang xem</span>' : icon('right', 'sm')) + '</div>').join('') +
        '</div><div class="divider"></div><p class="subtle mb-3">Dữ liệu là bản mẫu, lưu trong trình duyệt của bạn. Không gọi AI thật.</p><button class="btn sm block" data-reset>' + icon('undo', 'sm') + 'Đặt lại dữ liệu demo</button></div>';
      document.body.appendChild(panel); fab.setAttribute('aria-expanded', 'true');
      panel.querySelector('[data-reset]').onclick = () => { reset(); location.reload(); };
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
    quoteHook, pillarBadge, channelBadge, formatBadge, statusBadge, angleName, quota, autoInfo, copy, download, toast, modal, regenPopover, runSteps,
    shell, bindThemeToggle, protoMap, params: new URLSearchParams(location.search)
  };
})();
