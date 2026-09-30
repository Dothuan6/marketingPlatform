/* =========================================================================
   App shell + helper dùng chung cho mọi màn.
   ========================================================================= */
(function () {
  const D = window.MP_DATA;
  const KEY = 'mp-proto-state';

  /* ---------- Icon: Material Symbols Outlined (bản cắt gọn tự host, gọi theo mã ký tự) ---------- */
  const P = { home: 0xe88a, brain: 0xe10e, target: 0xe719, layers: 0xe53b, calendar: 0xebcc, file: 0xe873, video: 0xe04b, chart: 0xe26b, sun: 0xe518, moon: 0xe51c, sparkles: 0xe65f, refresh: 0xe5d5, copy: 0xe14d, download: 0xe171, check: 0xe5ca, checkCircle: 0xe86c, alert: 0xe002, x: 0xe14c, left: 0xe408, right: 0xe409, down: 0xe5cf, up: 0xe5ce, grip: 0xe945, lock: 0xe88d, link: 0xe157, clock: 0xe192, book: 0xea19, package: 0xf569, star: 0xe838, smile: 0xe0ed, pencil: 0xe150, plus: 0xe145, table: 0xf101, users: 0xe7ef, user: 0xe7fd, info: 0xe88e, play: 0xe037, mic: 0xe029, arrowRight: 0xe5c8, arrowLeft: 0xe5c4, zap: 0xea0b, menu: 0xe5d2, grid: 0xe9b0, sliders: 0xe429, message: 0xe0b7, hash: 0xe9ef, image: 0xe251, external: 0xe895, map: 0xe55b, shield: 0xe8e8, globe: 0xe80b, ban: 0xe033, type: 0xe262, save: 0xe161, undo: 0xe166, list: 0xe896, eye: 0xe417, trash: 0xe872, plug: 0xe63c, pause: 0xe034, bell: 0xe7f4, mail: 0xe0be, branch: 0xe97a, send: 0xe163, filter: 0xe152, wand: 0xe662, share: 0xe6b8, upload: 0xe2c6, camera: 0xe3b0, phone: 0xe0d4, report: 0xf071, search: 0xe8b6, settings: 0xe8b8, more: 0xe5d4, moreH: 0xe5d3, board: 0xeb7f, help: 0xe887, apps: 0xe5c3, caret: 0xe5c5, sortUp: 0xe5d8, sortDown: 0xe5db, event: 0xe24f, fire: 0xea05, neutral: 0xe812, thumb: 0xe817, bulb: 0xe0f0, store: 0xea12, history: 0xe28e, flag: 0xe153, task: 0xe2e6, dashboard: 0xe66b, preview: 0xe417, addCircle: 0xe147, dateRange: 0xe916, review: 0xf0c5, outward: 0xf8ce, photos: 0xe413, article: 0xef42, editSq: 0xf88d, dot: 0xe836, pending: 0xf1bb, cancel: 0xe5c9, forum: 0xe0bf, campaign: 0xef49, rocket: 0xeb9b, hub: 0xe9f4, note: 0xe745 };
  function icon(name, cls) { const cp = P[name] || P.info; return '<span class="ic ' + (cls || '') + '" aria-hidden="true">&#x' + cp.toString(16) + ';</span>'; }
  function hydrateIcons(root) {
    (root || document).querySelectorAll('i[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon, el.className); });
  }

  /* ---------- State (localStorage có try/catch, không có vẫn chạy) ---------- */
  let state = null;
  function load() {
    try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 6) return s; } catch (e) {}
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
    }).sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : a.time < b.time ? -1 : a.time > b.time ? 1 : 0);
  }
  function poolItem(id) { return state.plan.pool.find(p => p.id === Number(id)); }
  function item(id) { return items().find(p => p.id === Number(id)); }

  /* ---------- Khung giờ & chiến dịch ----------
     Quy tắc: trên MỘT kênh, mỗi khung giờ (1 tiếng, vd 19:00–19:59) chỉ có 1 bài.
     Một ngày được nhiều bài (khác khung giờ hoặc khác kênh). Chiến dịch tạo nhiều bài/ngày, vẫn theo quy tắc này.
     Bản thật: ràng buộc UNIQUE (kênh, ngày, khung giờ) trên Collection Bài viết + bước kiểm trong workflow trước khi đăng. */
  const SLOT_FROM = 6, SLOT_TO = 23;
  const pad2 = n => String(n).padStart(2, '0');
  const slotOf = t => Number(String(t || '00').slice(0, 2));
  const slotLabel = t => { const h = slotOf(t); return pad2(h) + ':00–' + pad2(h) + ':59'; };
  function slotTaken(date, channel, time, exceptId) {
    return items().find(i => i.id !== Number(exceptId) && i.date === date && i.channel === channel && slotOf(i.time) === slotOf(time) && i.status !== 'skipped') || null;
  }
  // Giờ trống gần nhất trên kênh đó (ưu tiên sau giờ mong muốn), null nếu cả ngày đã kín
  function freeTime(date, channel, pref, exceptId, taken) {
    const h0 = Math.min(SLOT_TO, Math.max(SLOT_FROM, slotOf(pref))); const mm = String(pref || '').slice(3, 5) || '00';
    const busy = h => (taken && taken.has(date + '|' + channel + '|' + h)) || slotTaken(date, channel, pad2(h) + ':00', exceptId);
    for (let d = 0; d <= SLOT_TO - SLOT_FROM; d++) for (const s of d ? [1, -1] : [1]) {
      const h = h0 + d * s; if (h < SLOT_FROM || h > SLOT_TO) continue;
      if (!busy(h)) return pad2(h) + ':' + (d ? '00' : mm);
    }
    return null;
  }
  function slotConflicts() {
    const map = {}; items().forEach(i => { if (i.status === 'skipped') return; const k = i.date + '|' + i.channel + '|' + slotOf(i.time); (map[k] = map[k] || []).push(i); });
    return Object.values(map).filter(g => g.length > 1);
  }
  function setTime(id, t) { const p = poolItem(id); if (p.time === t) return; p.time = t; if (p.status === 'approved') p.maHen = Math.random().toString(36).slice(2, 8); }
  function autoFixSlots() {
    let n = 0; slotConflicts().forEach(g => g.slice(1).forEach(it => { if (it.status === 'published') return; const t = freeTime(it.date, it.channel, it.time, it.id); if (t) { setTime(it.id, t); n++; } })); return n;
  }
  // Đặt bài vào ngày/giờ/kênh. strict: khung đã có bài → chặn; không strict → tự dời sang khung trống gần nhất
  function placeItem(id, date, time, opts) {
    opts = opts || {}; const it = item(id); const ch = opts.channel || it.channel; const want = time || it.time;
    const clash = slotTaken(date, ch, want, id);
    if (clash && opts.strict) return { ok: false, clash, channel: ch, time: want };
    const t = clash ? freeTime(date, ch, want, id) : want;
    if (!t) return { ok: false, full: true, clash, channel: ch, time: want };
    state.plan.schedule.find(x => x.id === Number(id)).date = date;
    if (opts.channel && opts.channel !== it.channel) poolItem(id).channel0 = opts.channel;
    setTime(id, t);
    return { ok: true, time: t, shifted: !!clash, clash, channel: ch };
  }
  function slotMsg(r) { return 'Khung ' + slotLabel(r.time) + ' trên ' + D.CHANNELS[r.channel].name + ' đã có bài “' + (r.clash ? r.clash.title : '') + '”. Mỗi khung giờ chỉ 1 bài/kênh.'; }

  const CAMP_COLORS = [6, 7, 5];
  function campaign(id) { return (state.campaigns || []).find(c => c.id === id); }
  function campaignTag(p) { const c = p && p.campaign && campaign(p.campaign); return c ? '<span class="tag cp c' + c.color + '" title="Chiến dịch">' + icon('campaign') + esc(c.name) + '</span>' : ''; }
  function newPost(f) {
    const pool = state.plan.pool; const id = pool.reduce((m, p) => Math.max(m, p.id), 0) + 1;
    const p = { id, pillar: f.pillar || 'prod', angle: f.angle || 'A1', channel: f.channel, channel0: f.channel, format: f.format || 'post', title: f.title, hook: f.hook || '', status: 'planned', regen: 0, edited: false, time: f.time, added: true };
    if (f.campaign) p.campaign = f.campaign;
    p.imageId = D.pickImage(p); pool.push(p); state.plan.schedule.push({ id, date: f.date }); return p;
  }
  function removeCampaign(cid) {
    const ids = state.plan.pool.filter(p => p.campaign === cid && p.status !== 'published').map(p => p.id);
    state.plan.pool = state.plan.pool.filter(p => !ids.includes(p.id)); state.plan.schedule = state.plan.schedule.filter(s => !ids.includes(s.id));
    state.plan.pool.forEach(p => { if (p.campaign === cid) p.campaign = null; });
    state.campaigns = state.campaigns.filter(c => c.id !== cid); return ids.length;
  }
  // Tiêu đề bài chiến dịch — xoay vòng theo vị trí trong ngày
  function campaignPosts(c, opts) {
    opts = opts || {}; const out = []; const taken = new Set(); let shifted = 0, dropped = 0;
    const product = (state.brand.answers.q2 && state.brand.answers.q2.value) || 'sản phẩm';
    const days = []; for (let d = c.from; d <= c.to; d = D.addDays(d, 1)) days.push(d);
    const OPEN = ['prod', 'Mở màn', [c.name + ': bắt đầu từ hôm nay — ' + c.offer, 'Chờ cả tháng cho đúng hôm nay: ' + c.offer + '.']];
    const LAST = ['prod', 'Chốt đơn', ['Giờ chót ' + c.name + ': ' + c.offer + ' đến 23:59', 'Tối nay là hết — chốt đơn trước 23:59 nha.']];
    const MID = [
      ['proof', 'Chứng thực', ['Khách nói gì về ' + product + ' — trước giờ ' + c.name, '“Mua dịp này năm ngoái, giờ mình quay lại mua thêm 2 món.”'], ['Ảnh khách thật đeo ' + product + ' mùa ' + c.name, 'Không filter — đây là ảnh khách gửi tụi mình tuần này.']],
      ['prod', 'Sản phẩm', [product + ' trong ' + c.name + ': ' + c.offer, 'Món đáng săn nhất ' + c.name + ' — xem vì sao.'], ['3 món bán chạy nhất ' + c.name + ' (kèm giá sau ưu đãi)', 'Chưa biết chọn gì? Bắt đầu từ 3 món này.']],
      ['fun', 'Tương tác', ['Bình luận “' + c.name + '” — nhận mã ưu đãi riêng', 'Chỉ 1 bình luận, mã ưu đãi gửi tận inbox.'], ['Mini game ' + c.name + ': đoán giá — trúng quà', 'Đoán đúng giá sau ưu đãi, nhận quà tận nhà.']],
      ['prod', 'Đếm ngược', ['Đếm ngược ' + c.name + ': ' + c.offer, 'Còn vài giờ nữa thôi — đừng để giỏ hàng chờ.'], ['Nhắc nhẹ: ' + c.name + ' vẫn đang chạy — ' + c.offer, 'Lưu bài này lại để không lỡ ưu đãi.']]
    ];
    const total = days.length * c.times.length;
    days.forEach((date, di) => {
      c.times.forEach((time, ti) => c.channels.forEach(ch => {
        let t = time; const k = date + '|' + ch + '|' + slotOf(time);
        const clash = taken.has(k) || slotTaken(date, ch, time);
        if (clash) { if (opts.onClash === 'skip') { dropped++; return; } t = freeTime(date, ch, time, null, taken); if (!t) { dropped++; return; } shifted++; }
        taken.add(date + '|' + ch + '|' + slotOf(t));
        const pos = di * c.times.length + ti; let tp;
        if (pos === 0 && total > 1) tp = [OPEN[0], OPEN[1], OPEN[2]];
        else if (pos === total - 1) tp = [LAST[0], LAST[1], LAST[2]];
        else { const m = MID[(pos - 1 + MID.length) % MID.length]; const v = Math.floor((pos - 1) / MID.length) % 2; tp = [m[0], m[1], m[2 + v]]; }
        const [title, hook] = tp[2];
        out.push({ date, time: t, channel: ch, pillar: tp[0], role: tp[1], title: c.channels.length > 1 && ch !== c.channels[0] ? title + ' · ' + D.CHANNELS[ch].short : title, hook, format: ch === 'instagram' ? 'carousel' : 'post', angle: 'A1', campaign: c.id });
      }));
    });
    return { posts: out, shifted, dropped };
  }
  function createCampaign(c, opts) {
    state.campaigns = state.campaigns || []; c.id = c.id || 'cp-' + Date.now().toString(36); c.color = c.color || CAMP_COLORS[state.campaigns.length % CAMP_COLORS.length];
    const r = campaignPosts(c, opts); r.posts.forEach(f => newPost(f)); c.count = r.posts.length; state.campaigns.push(c); return r;
  }
  // Chiến dịch mẫu (chỉ tạo 1 lần cho dữ liệu demo): 2 ngày cuối tuần, 3 bài/ngày trên Facebook
  if (!state.campaigns) {
    state.campaigns = [];
    if (!state.firstRun && state.plan && state.plan.pool) {
      let d = D.addDays(today(), 5); while (new Date(d + 'T00:00:00').getDay() !== 6) d = D.addDays(d, 1);
      if (d < D.addDays(state.plan.start, 29)) createCampaign({ name: 'Flash sale cuối tuần', from: d, to: D.addDays(d, 1), times: ['08:00', '12:00', '21:00'], channels: ['facebook'], offer: 'giảm 20% toàn bộ nhẫn bạc' });
    }
    save();
  }

  function pillarBadge(pid, short) {
    const p = D.PILLARS[pid]; if (!p) return '';
    return short ? '<span class="pill c' + p.cat + '" title="' + esc(p.name) + '">' + icon(p.icon, 'sm') + '</span>' : '<span class="pill c' + p.cat + '">' + esc(p.name) + '</span>';
  }
  function channelBadge(cid) { const c = D.CHANNELS[cid]; return c ? '<span class="tag" title="' + c.name + '">' + esc(c.name) + '</span>' : ''; }
  function formatBadge(f) { const x = D.FORMATS[f]; return x ? '<span class="tag">' + esc(x.name) + '</span>' : ''; }
  function statusBadge(s) { const x = D.STATUSES[s] || D.STATUSES.planned; return '<span class="badge dot ' + x.cls + '">' + esc(x.name) + '</span>'; }
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

  /* ---------- Ô chọn có "Khác…" (bổ sung 30/09) ----------
     Câu chọn nào cũng có "Khác…": gõ ngắn ≤ 60 ký tự, lưu nguyên văn, nguồn "Bạn nhập". */
  function choiceHtml(q, value, opts) {
    opts = opts || {}; const ind = opts.industry || state.brand.industry; const list = D.optionsOf(q, ind);
    const single = q.type !== 'multi'; const cards = !!opts.cards;
    const known = list.map(o => typeof o === 'string' ? o : o.v);
    const vals = single ? (value ? [value] : []) : (value || []);
    const custom = vals.filter(v => !known.includes(v));
    const item = (o, pressed, isCustom) => {
      const v = typeof o === 'string' ? o : o.v; const label = typeof o === 'string' ? o : (o.label || o.v);
      if (cards) return `<button type="button" class="option" data-v="${esc(v)}" aria-pressed="${pressed}"><span class="opt-ic">${icon(isCustom ? 'pencil' : (o.icon || 'check'))}</span><b>${esc(label)}</b><span>${esc(isCustom ? 'Bạn tự nhập' : (o.d || ''))}</span></button>`;
      return `<button type="button" class="chip ${opts.sm ? 'sm' : ''}" data-v="${esc(v)}" aria-pressed="${pressed}">${isCustom ? icon('pencil', 'sm') : ''}${esc(label)}</button>`;
    };
    const otherBtn = q.type === 'tone' ? '' : cards
      ? `<button type="button" class="option" data-other><span class="opt-ic">${icon('plus')}</span><b>Khác…</b><span>Không có trong danh sách? Gõ ngắn gọn</span></button>`
      : `<button type="button" class="chip ${opts.sm ? 'sm' : ''} other-chip" data-other>${icon('plus', 'sm')}Khác…</button>`;
    return `<div class="choice" data-choice="${q.id}" data-type="${single ? 'single' : 'multi'}"><div class="${cards ? 'options' : 'chips'}" role="group">` +
      list.map(o => item(o, vals.includes(typeof o === 'string' ? o : o.v), false)).join('') + custom.map(v => item(v, true, true)).join('') + otherBtn + '</div>' +
      (q.type === 'tone' ? '' : `<div class="row other-row mt-2" hidden><input class="input grow" maxlength="60" placeholder="${esc(q.other || 'Gõ câu trả lời của bạn')}" aria-label="Câu trả lời khác"><button type="button" class="btn sm" data-other-add>Thêm</button></div>`) + '</div>';
  }
  function readChoice(el) { const v = [...el.querySelectorAll('[data-v][aria-pressed="true"]')].map(b => b.dataset.v); return el.dataset.type === 'single' ? (v[0] || '') : v; }
  function bindChoice(el, onChange) {
    const single = el.dataset.type === 'single'; const row = el.querySelector('.other-row'); const cards = !!el.querySelector('.options');
    const fire = () => onChange && onChange(readChoice(el));
    const wire = b => b.onclick = () => {
      const on = b.getAttribute('aria-pressed') === 'true';
      if (single) el.querySelectorAll('[data-v]').forEach(x => x.setAttribute('aria-pressed', 'false'));
      b.setAttribute('aria-pressed', String(single ? true : !on)); fire();
    };
    el.querySelectorAll('[data-v]').forEach(wire);
    const ob = el.querySelector('[data-other]'); if (!ob || !row) return;
    const inp = row.querySelector('input');
    ob.onclick = () => { row.hidden = false; inp.focus(); };
    const add = () => {
      const v = inp.value.trim(); if (!v) return;
      const exist = [...el.querySelectorAll('[data-v]')].find(x => x.dataset.v.toLowerCase() === v.toLowerCase());
      if (single) el.querySelectorAll('[data-v]').forEach(x => x.setAttribute('aria-pressed', 'false'));
      if (exist) exist.setAttribute('aria-pressed', 'true');
      else {
        const t = document.createElement('div');
        t.innerHTML = cards ? `<button type="button" class="option" data-v="${esc(v)}" aria-pressed="true"><span class="opt-ic">${icon('pencil')}</span><b>${esc(v)}</b><span>Bạn tự nhập</span></button>` : `<button type="button" class="chip ${ob.classList.contains('sm') ? 'sm' : ''}" data-v="${esc(v)}" aria-pressed="true">${icon('pencil', 'sm')}${esc(v)}</button>`;
        const nb = t.firstChild; ob.parentNode.insertBefore(nb, ob); wire(nb);
      }
      track('other_used', { câu: el.dataset.choice, ký_tự: v.length });
      inp.value = ''; row.hidden = true; fire();
    };
    row.querySelector('[data-other-add]').onclick = add;
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); add(); } });
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
      pillar: 'Vd: bài “Chính sách bảo hành rơi đá 6 tháng” thuộc nhóm Chứng thực.',
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
    const sc = slotTaken(it.date, it.channel, it.time, it.id);
    if (sc && sc.id < it.id) return { kind: 'slot', icon: 'alert', cls: 'danger', text: 'Trùng khung ' + slotLabel(it.time) + ' trên ' + ch + ' với bài “' + sc.title + '” — bài này sẽ không tự đăng, đổi giờ giúp nhé' };
    if (it.status !== 'approved') return { kind: 'approval', icon: 'clock', cls: 'warning', text: 'Chờ bạn duyệt — có trong Duyệt tuần, nhắc thêm 1 lần trước giờ đăng qua ' + notifyText() };
    if (level0) return { kind: 'manual', icon: 'phone', cls: 'warning', text: ch + ' đăng tay (Mức 0) — ' + when + ' gửi gói nhận bài qua ' + notifyText() + ', bạn đăng trong 5 chạm' };
    return { kind: 'auto', icon: 'zap', cls: 'primary', text: 'Đã hẹn ' + when + ' · tự đăng lên ' + ch + (con.account ? ' (' + con.account + ')' : '') };
  }
  const KIND_LABEL = { auto: 'Đã hẹn', approval: 'Chờ duyệt', manual: 'Đăng tay', nocontent: 'Chưa có bài', off: 'Tắt', missed: 'Quá giờ', failed: 'Lỗi', done: 'Đã đăng', received: 'Đã nhận', needcheck: 'Cần kiểm tra', noimage: 'Thiếu ảnh', locked: 'Khoá (dùng thử)', skipped: 'Bỏ qua', slot: 'Trùng khung giờ' };

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
    { sep: 'Quy trình 6 bước' },
    { key: 'onboarding', href: 'onboarding.html', label: 'Bắt đầu · 5 câu', icon: 'rocket', n: 1 },
    { key: 'brand', href: 'brand.html', label: 'Hồ sơ thương hiệu', icon: 'brain', n: 2 },
    { key: 'strategy', href: 'strategy.html', label: 'Chiến lược', icon: 'target', n: 3 },
    { key: 'plan', href: 'plan.html', label: 'Lịch 30 ngày', icon: 'calendar', n: 4 },
    { key: 'post', href: 'post.html', label: 'Bài viết', icon: 'article', n: 5 },
    { key: 'automation', href: 'automation.html', label: 'Tự động đăng', icon: 'zap', n: 6 },
    { sep: 'Hằng tuần · hằng tháng' },
    { key: 'review', href: 'review.html', label: 'Duyệt tuần', icon: 'review', badge: () => reviewCount() },
    { key: 'publish', href: 'publish.html', label: 'Đăng bài này', icon: 'phone' },
    { key: 'report', href: 'report.html', label: 'Báo cáo tháng', icon: 'report' }
  ];
  function reviewCount() { return items().filter(i => i.content && ['generated', 'edited'].includes(i.status) && i.date >= today() && i.date <= D.addDays(today(), 6)).length; }

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
      const m = modal({ title: 'Tiếp tục dùng Digital Marketing', subtitle: 'Chọn gói để mở nội dung 23 bài còn lại của kế hoạch 30 ngày.',
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
        body: '<div class="field"><label for="em">Email nhận nhắc</label><input class="input" id="em" value="shop@phatdatjewelry.vn"></div><p class="subtle">Đổi lại bất cứ lúc nào trong Tự động đăng → Báo lại.</p>',
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
      const bd = n.badge ? n.badge() : 0;
      return '<a href="' + n.href + '"' + cur + ' title="' + esc(n.label) + '" aria-label="' + esc(n.label) + '">' + icon(n.icon) + '<span class="lbl grow">' + n.label + '</span>' +
        (bd ? '<span class="badge">' + bd + '</span>' : (n.n ? '<span class="n">' + n.n + '</span>' : '')) + '</a>';
    }).join('');
    const rc = reviewCount();
    const app = document.createElement('div'); app.className = 'app';
    app.innerHTML =
      '<header class="topbar">' +
        '<button class="tb-btn menu-btn" data-menu aria-label="Mở menu">' + icon('menu') + '</button>' +
        '<a class="brand" href="index.html" title="Digital Marketing — TuoiTreSoft"><img src="assets/brand/tuoitresoft-mark.png" alt="TuoiTreSoft" width="34" height="23"><span>Digital Marketing<small>by TuoiTreSoft</small></span></a>' +
        '<button class="tb-search" type="button" data-cmdk aria-label="Tìm kiếm hoặc gõ lệnh">' + icon('search') + '<span class="grow truncate">Tìm bài viết, màn hình…</span><kbd>Ctrl K</kbd></button>' +
        '<span class="grow"></span>' +
        (state.sub.mode === 'trial' ? '<span class="tb-pill hide-md">' + icon('clock', 'sm') + 'Dùng thử · còn ' + trialDaysLeft() + ' ngày</span>' : '') +
        '<span class="tb-saved hide-md" title="Mọi thay đổi được lưu tự động">' + icon('check', 'sm') + 'Đã lưu</span>' +
        '<button class="tb-btn outline hide-sm" data-create aria-haspopup="menu">' + icon('plus', 'sm') + 'Tạo</button>' +
        '<a class="tb-btn" href="review.html" title="Bài chờ duyệt tuần này" aria-label="Thông báo: ' + rc + ' bài chờ duyệt">' + icon('bell') + (rc ? '<span class="count">' + rc + '</span>' : '') + '</a>' +
        '<button class="tb-btn" data-theme-toggle aria-label="Đổi giao diện sáng/tối">' + icon(document.documentElement.getAttribute('data-theme') === 'dark' ? 'sun' : 'moon') + '</button>' +
        '<span class="avatar round" title="TTS">TT</span>' +
      '</header>' +
      '<aside class="sidebar" aria-label="Điều hướng chính">' +
        '<button class="brand-switch" type="button" data-brand-switch><span class="avatar">' + esc(brandName.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase()) + '</span><span class="grow"><b class="truncate" style="display:block;font-size:13px">' + esc(brandName) + '</b><span class="subtle">' + esc((D.INDUSTRIES.find(i => i.id === state.brand.industry) || {}).name || '') + '</span></span>' + icon('down', 'sm') + '</button>' +
        '<nav class="nav">' + nav + '</nav>' +
        '<div class="sidebar-foot">' + quotaCard() + '</div>' +
      '</aside>' +
      '<div class="main"><div class="frame t-' + (opts.template || 'config') + '" id="frame"><div class="content ' + (opts.narrow ? 'narrow' : '') + '" id="content"></div></div></div>';
    page.parentNode.insertBefore(app, page);
    app.querySelector('#content').appendChild(page);
    page.hidden = false;

    app.querySelector('[data-menu]').onclick = e => { e.stopPropagation(); document.body.classList.toggle('nav-open'); };
    document.addEventListener('click', e => { if (document.body.classList.contains('nav-open') && !e.target.closest('.sidebar') && !e.target.closest('[data-menu]')) document.body.classList.remove('nav-open'); });
    app.querySelector('[data-brand-switch]').onclick = () => toast('Nhiều brand có ở gói Chuyên nghiệp — prototype chỉ có 1 brand mẫu', 'info');
    app.querySelector('[data-cmdk]').onclick = cmdk;
    app.querySelector('[data-create]').onclick = e => menu(e.currentTarget, [
      { h: 'Tạo mới' },
      { icon: 'rocket', label: 'Kế hoạch mới (5 câu)', href: 'onboarding.html?fresh=1' },
      { icon: 'article', label: 'Viết bài cho một ngày', href: 'plan.html' },
      { icon: 'campaign', label: 'Chiến dịch (nhiều bài/ngày)', href: 'plan.html?camp=new' },
      { icon: 'photos', label: 'Thêm ảnh vào kho', href: 'brand.html#images' },
      { sep: 1 },
      { icon: 'review', label: 'Duyệt tuần', href: 'review.html' }
    ]);
    // Popover gắn body không chạy theo khung cuộn → đóng khi cuộn frame (bỏ qua 400ms đầu, §6.12)
    const fr = app.querySelector('#frame'); let opened = 0;
    new MutationObserver(() => { opened = Date.now(); }).observe(document.body, { childList: true });
    fr.addEventListener('scroll', () => { if (Date.now() - opened < 400) return; document.querySelectorAll('body > .popover.regen, body > .term-pop, body > .qf-pop, body > .popover.menu').forEach(p => p.remove()); }, { passive: true });
    bindThemeToggle(app); bindUpgrade(app);
    protoMap();
    hydrateIcons(page);
  }

  /* ---------- Menu gắn nút (§6.12): fixed theo nút, canh phải khi sát mép, lật lên khi thiếu chỗ ---------- */
  function menu(anchor, list) {
    document.querySelectorAll('.popover.menu').forEach(p => p.remove());
    const pop = document.createElement('div'); pop.className = 'popover menu'; pop.setAttribute('role', 'menu'); pop.style.position = 'fixed';
    pop.innerHTML = list.map(x => x.h ? '<div class="mh">' + esc(x.h) + '</div>' : x.sep ? '<div class="msep"></div>' :
      (x.href ? '<a class="mi" role="menuitem" href="' + x.href + '">' : '<button type="button" class="mi" role="menuitem">') + icon(x.icon || 'right') + '<span class="grow">' + esc(x.label) + '</span>' + (x.href ? '</a>' : '</button>')).join('');
    document.body.appendChild(pop);
    const r = anchor.getBoundingClientRect(); const w = pop.offsetWidth, h = pop.offsetHeight;
    pop.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.right - w)) + 'px';
    pop.style.top = (r.bottom + 6 + h > window.innerHeight ? Math.max(8, r.top - h - 6) : r.bottom + 6) + 'px';
    anchor.setAttribute('aria-expanded', 'true');
    let i = 0; pop.querySelectorAll('button.mi').forEach(bt => { const x = list.filter(y => !y.h && !y.sep && !y.href)[i++]; bt.onclick = () => { close(); x.onClick && x.onClick(); }; });
    const close = () => { pop.remove(); anchor.setAttribute('aria-expanded', 'false'); document.removeEventListener('mousedown', out); document.removeEventListener('keydown', key); };
    const out = e => { if (!pop.contains(e.target) && !anchor.contains(e.target)) close(); };
    const key = e => { if (e.key === 'Escape') { close(); anchor.focus(); } };
    setTimeout(() => { document.addEventListener('mousedown', out); document.addEventListener('keydown', key); }, 0);
    return { el: pop, close };
  }

  /* ---------- Panel phải (§6.10): 460px phủ + scrim, hoặc dock 400px trong vùng nội dung ---------- */
  function drawer(opts) {
    document.querySelectorAll('.drawer, .drawer-scrim').forEach(x => x.remove());
    const dock = !!opts.dock && window.innerWidth >= 1240;
    const d = document.createElement('aside'); d.className = 'drawer' + (dock ? ' dock' : ''); d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', opts.title);
    d.innerHTML = '<div class="drawer-head"><h2>' + esc(opts.title) + '</h2>' + (opts.headExtra || '') + '<button class="btn ghost sm icon" data-dclose aria-label="Đóng">' + icon('x') + '</button></div>' +
      '<div class="drawer-body">' + (opts.body || '') + '</div>' + (opts.foot ? '<div class="drawer-foot">' + opts.foot + '</div>' : '');
    let sc = null;
    if (!dock) { sc = document.createElement('div'); sc.className = 'drawer-scrim'; document.body.appendChild(sc); sc.onclick = () => close(); }
    document.body.appendChild(d);
    const content = document.getElementById('content'); if (dock && content) content.style.paddingRight = '408px';
    const close = () => { d.remove(); if (sc) sc.remove(); if (dock && content) content.style.paddingRight = ''; document.removeEventListener('keydown', key); opts.onClose && opts.onClose(); };
    const key = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', key);
    d.querySelector('[data-dclose]').onclick = close;
    setTimeout(() => { const f = d.querySelector('[data-dclose]'); f && f.focus(); }, 30);
    return { el: d, close };
  }

  /* ---------- Command palette (§6.17): Ctrl+K ---------- */
  function cmdk() {
    if (document.querySelector('.cmdk')) return;
    const bd = document.createElement('div'); bd.className = 'cmdk-bd';
    const box = document.createElement('div'); box.className = 'cmdk'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Tìm kiếm');
    box.innerHTML = '<input type="text" placeholder="Tìm bài viết, màn hình… (vd: routine, duyệt, ảnh)" aria-label="Tìm"><div class="res" role="listbox"></div>';
    document.body.appendChild(bd); document.body.appendChild(box);
    const inp = box.querySelector('input'); const res = box.querySelector('.res'); let sel = 0, rows = [];
    const pages = NAV.filter(n => !n.sep).map(n => ({ icon: n.icon, t: n.label, href: n.href, r: 'Màn hình' }));
    const norm = x => String(x).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
    function draw() {
      const q = norm(inp.value.trim());
      const pg = pages.filter(p => !q || norm(p.t).includes(q));
      const posts = items().filter(i => q && (norm(i.title).includes(q) || norm(i.hook).includes(q))).slice(0, 8).map(i => ({ icon: 'article', t: 'Ngày ' + i.day + ' · ' + i.title, href: 'post.html?id=' + i.id, r: fmtDate(i.date, 'short') }));
      rows = pg.concat(posts); if (sel >= rows.length) sel = 0;
      res.innerHTML = (pg.length ? '<div class="mh">Đi tới</div>' + pg.map((x, k) => row(x, k)).join('') : '') +
        (posts.length ? '<div class="mh">Bài viết</div>' + posts.map((x, k) => row(x, k + pg.length)).join('') : '') +
        (!rows.length ? '<div class="subtle" style="padding:12px 10px">Không tìm thấy — thử từ khác.</div>' : '');
    }
    const row = (x, k) => '<a class="it ' + (k === sel ? 'on' : '') + '" role="option" href="' + x.href + '">' + icon(x.icon) + '<span class="truncate">' + esc(x.t) + '</span><span class="r">' + esc(x.r) + '</span></a>';
    const close = () => { bd.remove(); box.remove(); document.removeEventListener('keydown', key); };
    const key = e => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(rows.length - 1, sel + 1); draw(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); draw(); }
      else if (e.key === 'Enter' && rows[sel]) { location.href = rows[sel].href; }
    };
    inp.oninput = () => { sel = 0; draw(); }; bd.onclick = close; document.addEventListener('keydown', key);
    draw(); inp.focus();
  }
  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k' && document.querySelector('.app')) { e.preventDefault(); cmdk(); } });

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
    D, get state() { return state; }, save, reset, icon, SLOT_FROM, SLOT_TO, pad2, slotOf, slotLabel, slotTaken, freeTime, slotConflicts, autoFixSlots, placeItem, slotMsg, setTime, campaign, campaignTag, newPost, removeCampaign, campaignPosts, createCampaign, hydrateIcons, esc, fmtDate, today, dayNo, ago, items, item, poolItem,
    quoteHook, pillarBadge, channelBadge, formatBadge, statusBadge, angleName, quota, autoInfo, KIND_LABEL, copy, download, toast, modal, regenPopover, runSteps,
    shell, menu, drawer, cmdk, bindThemeToggle, protoMap, params: new URLSearchParams(location.search),
    sub, trialDaysLeft, trialIds, isLocked, regenLeft, useRegen, usePosts, postsLeft, refreshQuota, notifyText, checkText, replaceWord,
    choiceHtml, readChoice, bindChoice, imageOf, imageTile, needsImage, passCheck, whyPost, isVague, track, term, termInfo, askPush
  };
})();
