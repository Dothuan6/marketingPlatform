/* =========================================================================
   Dữ liệu mẫu cho prototype — thương hiệu mẫu "Phát Đạt Jewelry"
   (trang sức bạc nữ đính đá lấp lánh, giá mềm: nhẫn, lắc tay, bông tai, dây chuyền).
   Mọi nội dung "AI sinh" ở đây là viết sẵn / ghép mẫu, không gọi LLM thật.
   ========================================================================= */
(function () {
  const INDUSTRIES = [
    { id: 'jewelry', name: 'Trang sức & Phụ kiện', desc: 'Trang sức bạc, vàng, phụ kiện đeo', icon: 'sparkles', preset: true, tone: 'gan_gui', products: ['Nhẫn bạc S925 đính đá', 'Lắc tay bạc đính đá', 'Bông tai bạc nụ đá', 'Dây chuyền bạc mặt đá'] },
    { id: 'fashion_beauty', name: 'Thời trang & Mỹ phẩm', desc: 'Shop mỹ phẩm, quần áo, túi ví', icon: 'star', preset: true, tone: 'gan_gui', products: ['Serum phục hồi da 30ml', 'Kem chống nắng', 'Son dưỡng', 'Váy công sở'] },
    { id: 'spa', name: 'Spa & Beauty', desc: 'Spa, thẩm mỹ, nail, gội đầu dưỡng sinh', icon: 'smile', preset: true, tone: 'gan_gui', products: ['Gói chăm sóc da mụn 10 buổi', 'Gội đầu dưỡng sinh 60 phút', 'Nail gel'] },
    { id: 'fnb', name: 'F&B', desc: 'Quán cà phê, nhà hàng, đồ ăn online', icon: 'package', preset: false, tone: 'hai_huoc', products: ['Cà phê muối', 'Cơm văn phòng giao tận nơi', 'Bánh bông lan trứng muối'] },
    { id: 'edu', name: 'Giáo dục', desc: 'Trung tâm, khoá học, gia sư', icon: 'book', preset: false, tone: 'chuyen_nghiep', products: ['Khoá IELTS 6.5 cấp tốc', 'Lớp toán lớp 9 ôn thi vào 10'] },
    { id: 'realestate', name: 'BĐS & Nội thất', desc: 'Môi giới, dự án, đồ nội thất', icon: 'home', preset: false, tone: 'chuyen_nghiep', products: ['Sofa gỗ sồi 3 chỗ', 'Căn hộ 2PN dự án X'] }
  ];

  const TONES = [
    { id: 'gan_gui', name: 'Gần gũi', desc: 'Xưng mình – bạn, như bạn thân tư vấn', sample: 'Outfit đi làm hơi nhạt đúng không? Mình chỉ bạn cách “thắp sáng” nó bằng một chiếc nhẫn nè ✨' },
    { id: 'chuyen_nghiep', name: 'Chuyên nghiệp', desc: 'Rõ ràng, có số liệu, không dùng tiếng lóng', sample: 'Bạc S925 chứa 92,5% bạc. Dưới đây là 3 cách kiểm tra chất liệu trước khi bạn đặt mua.' },
    { id: 'hai_huoc', name: 'Hài hước', desc: 'Dí dỏm, bắt trend, nhiều cảm xúc', sample: 'Tay: “Tui trống trơn quá à” 😤 — Ví: “Tui cũng vậy” 😭. Yên tâm, 199k là lo được cả hai 😆' },
    { id: 'danh_thep', name: 'Đanh thép', desc: 'Câu ngắn, khẳng định, kêu gọi mạnh', sample: 'Bạc thật. Đá sáng. Bảo hành rõ. Đeo từ hôm nay.' }
  ];

  const PILLARS = {
    edu: { id: 'edu', cat: 1, name: 'Giáo dục', icon: 'book', desc: 'Kiến thức giúp khách hiểu vấn đề của mình' },
    prod: { id: 'prod', cat: 2, name: 'Sản phẩm', icon: 'package', desc: 'Giới thiệu sản phẩm, cách dùng, ưu đãi' },
    proof: { id: 'proof', cat: 3, name: 'Chứng thực', icon: 'star', desc: 'Feedback, ảnh khách đeo thật, giấy tờ' },
    fun: { id: 'fun', cat: 4, name: 'Giải trí', icon: 'smile', desc: 'Nội dung vui, bắt trend, gần gũi' }
  };

  const CHANNELS = {
    facebook: { id: 'facebook', name: 'Facebook', short: 'FB', account: 'Page', defaultTime: '19:30', level: 1, via: 'App Meta của công ty TTS' },
    instagram: { id: 'instagram', name: 'Instagram', short: 'IG', account: 'Business', defaultTime: '12:00', level: 1, via: 'App Meta của công ty TTS', needImage: true },
    zalo: { id: 'zalo', name: 'Zalo OA', short: 'Zalo', account: 'Official Account', defaultTime: '09:00', level: 0, via: 'Chưa có Zalo OA — đăng tay (Mức 0)' }
  };

  const FORMATS = {
    post: { name: 'Bài + ảnh', icon: 'image' },
    carousel: { name: 'Album ảnh', icon: 'grid' }
  };

  const STATUSES = {
    planned: { name: 'Đã lên khung', cls: '', icon: 'clock' },
    generated: { name: 'Đã sinh nội dung', cls: 'info', icon: 'sparkles' },
    edited: { name: 'Đã chỉnh sửa', cls: 'warning', icon: 'pencil' },
    approved: { name: 'Đã duyệt · đã hẹn giờ', cls: 'primary', icon: 'clock' },
    received: { name: 'Đã nhận · chờ bạn đăng', cls: 'warning', icon: 'message' },
    needcheck: { name: 'Cần kiểm tra', cls: 'danger', icon: 'alert' },
    skipped: { name: 'Đã bỏ qua', cls: '', icon: 'x' },
    published: { name: 'Đã đăng', cls: 'success', icon: 'checkCircle' },
    failed: { name: 'Đăng lỗi', cls: 'danger', icon: 'alert' }
  };

  /* ---------- 12 câu hỏi khai thác (bản nháp BA — việc 0.12) ---------- */
  const QUESTION_GROUPS = [
    { id: 'g1', title: 'Sản phẩm của bạn', desc: 'Những thông tin cơ bản nhất — hệ thống sẽ nhắc đúng tên, đúng giá trong mọi bài.' },
    { id: 'g2', title: 'Khách hàng của bạn', desc: 'Ai mua, mua ở đâu, và vì sao họ còn chần chừ.' },
    { id: 'g3', title: 'Điểm khác biệt', desc: 'Thứ làm bạn khác đối thủ — đây là nguyên liệu để tạo USP.' },
    { id: 'g4', title: 'Mục tiêu & giọng nói', desc: 'Bạn muốn 30 ngày tới đạt được gì, và nói chuyện với khách theo kiểu nào.' }
  ];

  const QUESTIONS = [
    { id: 'q1', group: 'g1', type: 'text', required: true, label: 'Tên thương hiệu hoặc tên shop', placeholder: 'Vd: Phát Đạt Jewelry', uses: ['②', '⑤'], tier: 1 },
    { id: 'q2', group: 'g1', type: 'text', required: true, label: 'Sản phẩm chủ lực bạn muốn bán nhiều nhất?', labelBy: { spa: 'Dịch vụ chủ lực bạn muốn đẩy mạnh?' }, placeholder: 'Vd: Nhẫn bạc S925 đính đá CZ', uses: ['②', '④', '⑤'], tier: 1 },
    { id: 'q3', group: 'g1', type: 'money', required: true, label: 'Giá bán', placeholder: 'Vd: 199000', hint: 'Nhập số, không cần dấu chấm.', uses: ['⑤'], tier: 1 },
    { id: 'q4', group: 'g1', type: 'textarea', required: true, label: 'Sản phẩm giải quyết vấn đề gì cho khách?', placeholder: 'Mô tả ngắn nỗi khổ của khách trước khi dùng sản phẩm', suggestBy: { jewelry: ['Sợ trang sức rẻ bị đen, xỉn màu', 'Muốn lấp lánh mà không tốn tiền triệu', 'Đeo đồ rẻ bị ngứa, đỏ tay', 'Không biết chọn quà tặng', 'Mua online sợ sai size'], fashion_beauty: ['Da mụn, nhạy cảm', 'Da kích ứng sau treatment', 'Da xỉn màu', 'Lão hoá sớm', 'Mặc gì cũng không vừa'], spa: ['Căng thẳng, mất ngủ', 'Mụn, thâm', 'Đau mỏi vai gáy', 'Muốn trẻ hoá'], _: ['Tiết kiệm thời gian', 'Tiết kiệm chi phí', 'Chất lượng ổn định'] }, uses: ['②', '③'] },
    { id: 'q5', group: 'g2', type: 'multi', required: true, label: 'Khách hàng chính của bạn là ai?', hint: 'Chọn tất cả nhóm phù hợp.', options: ['Nữ 18–24', 'Nữ 25–34', 'Nữ 35–44', 'Nam mua quà tặng', 'Sinh viên', 'Dân văn phòng', 'Mẹ bỉm sữa', 'Thu nhập khá'], uses: ['②'], tier: 1, other: 'Vd: Cặp đôi mua đồ đôi' },
    { id: 'q6', group: 'g2', type: 'multi', required: true, label: 'Khách thường thấy và mua hàng của bạn ở đâu?', options: ['Facebook', 'TikTok', 'Instagram', 'Shopee', 'Zalo', 'Website'], uses: ['③'], other: 'Vd: Lazada, cửa hàng' },
    { id: 'q7', group: 'g2', type: 'multi', required: false, label: 'Điều gì khiến khách còn chần chừ khi mua?', options: ['Sợ bạc giả, hàng xi mạ', 'Sợ đeo vài tuần bị đen', 'Sợ đá rơi, không bảo hành', 'Không chắc size / hợp tay', 'Chưa nghe tên thương hiệu', 'Ảnh mạng khác hàng thật'], uses: ['②', '④'], other: 'Vd: Chưa thấy ai quen đeo' },
    { id: 'q8', group: 'g3', type: 'textarea', required: true, label: 'Bạn khác đối thủ ở điểm nào?', placeholder: 'Chất liệu, tay nghề, bảo hành, dịch vụ… càng cụ thể càng tốt', uses: ['②'] },
    { id: 'q9', group: 'g3', type: 'text', required: false, label: 'Khách hay so sánh bạn với ai?', placeholder: 'Vd: shop cùng khu vực, thương hiệu lớn cùng loại', uses: ['②'] },
    { id: 'q10', group: 'g3', type: 'multi', required: false, label: 'Bạn đang có bằng chứng nào?', hint: 'Dùng cho nhóm bài Chứng thực.', options: ['Đánh giá 5★ trên sàn', 'Ký hiệu 925 / giấy kiểm định', 'Ảnh khách đeo thật', 'KOL/KOC đã đeo', 'Số lượng đã bán', 'Phiếu bảo hành / đổi trả'], uses: ['③', '⑤'], other: 'Vd: Giải thưởng, báo chí' },
    { id: 'q11', group: 'g4', type: 'single', required: true, label: 'Mục tiêu 30 ngày tới', options: [
      { v: 'Tăng đơn sản phẩm chủ lực', d: 'Ưu tiên nhóm Sản phẩm & Chứng thực', icon: 'zap' },
      { v: 'Ra mắt sản phẩm mới', d: 'Chuỗi teaser → ra mắt → review', icon: 'sparkles' },
      { v: 'Tăng nhận diện thương hiệu', d: 'Ưu tiên Giáo dục & Giải trí', icon: 'users' },
      { v: 'Xả hàng tồn', d: 'Ưu đãi có thời hạn, lời kêu gọi mạnh', icon: 'package' }
    ], uses: ['③', '④'], tier: 1, other: 'Vd: Kéo khách cũ quay lại' },
    { id: 'q12', group: 'g4', type: 'tone', required: true, label: 'Giọng thương hiệu', hint: 'Đổi được bất cứ lúc nào ở Hồ sơ thương hiệu.', uses: ['⑤'] }
  ];

  /* ---------- Lựa chọn theo ngành + "Khác…" (bổ sung 30/09) ---------- */
  const OPTIONS_BY = {
    q5: {
      fashion_beauty: ['Nữ 18–24', 'Nữ 25–34', 'Nữ 35–44', 'Nam 18–34', 'Sinh viên', 'Dân văn phòng', 'Mẹ bỉm sữa', 'Thu nhập khá'],
      spa: ['Nữ 25–34', 'Nữ 35–50', 'Dân văn phòng', 'Mẹ bỉm sữa', 'Nam 30+ đau mỏi vai gáy', 'Thu nhập khá'],
      fnb: ['Dân văn phòng gần quán', 'Sinh viên', 'Gia đình có con nhỏ', 'Khách đặt giao tận nơi', 'Nhóm bạn tụ tập', 'Khách du lịch'],
      edu: ['Phụ huynh có con cấp 1', 'Phụ huynh có con cấp 2–3', 'Sinh viên', 'Người đi làm cần chứng chỉ', 'Người mất gốc'],
      realestate: ['Vợ chồng trẻ mua nhà lần đầu', 'Nhà đầu tư', 'Chủ nhà cần làm nội thất', 'Người thuê căn hộ', 'Chủ quán cần setup']
    },
    q6: { fnb: ['Facebook', 'TikTok', 'Instagram', 'GrabFood/ShopeeFood', 'Zalo', 'Google Maps'], edu: ['Facebook', 'TikTok', 'Zalo', 'YouTube', 'Website', 'Giới thiệu truyền miệng'] },
    q7: { fashion_beauty: ['Giá cao hơn hàng bình dân', 'Sợ hàng giả trôi nổi', 'Không chắc hợp với mình', 'Chưa nghe tên thương hiệu', 'Phí ship', 'Sợ tác dụng phụ'], spa: ['Giá cao hơn hàng bình dân', 'Không chắc hợp với mình', 'Chưa nghe tên thương hiệu', 'Sợ tác dụng phụ'] },
    q10: { fashion_beauty: ['Đánh giá 5★ trên sàn', 'Giấy kiểm nghiệm / chứng nhận', 'Ảnh before/after', 'KOL/KOC đã dùng', 'Số lượng đã bán', 'Cam kết đổi trả'] }
  };
  const GOAL_EXTRA = {
    jewelry: { v: 'Bán quà dịp lễ', d: 'Chuỗi bài quà tặng, hộp quà, giao nhanh', icon: 'event' },
    spa: { v: 'Lấp lịch giờ vắng', d: 'Ưu đãi khung giờ trống, lời kêu gọi đặt lịch', icon: 'clock' },
    fnb: { v: 'Kéo khách quay lại quán', d: 'Món mới, ưu đãi khách quen, Giải trí', icon: 'smile' },
    edu: { v: 'Tuyển sinh khoá mới', d: 'Chứng thực học viên, lịch khai giảng', icon: 'book' },
    realestate: { v: 'Tìm khách xem nhà/xem mẫu', d: 'Chứng thực công trình, lời kêu gọi đặt lịch xem', icon: 'home' }
  };
  // Danh sách lựa chọn của một câu theo ngành (chuỗi với câu multi; {v,d,icon,label} với câu single/tone)
  function optionsOf(q, industry) {
    if (q.type === 'tone') return TONES.map(t => ({ v: t.id, label: t.name, d: t.desc }));
    if (q.type === 'single') return q.options.concat(GOAL_EXTRA[industry] && q.id === 'q11' ? [GOAL_EXTRA[industry]] : []);
    return (OPTIONS_BY[q.id] && OPTIONS_BY[q.id][industry]) || q.options || [];
  }
  // Mục tiêu tự gõ → cách lập kế hoạch gần nhất (AI chọn, người dùng sửa được)
  function goalTemplate(v) {
    const base = ['Tăng đơn sản phẩm chủ lực', 'Ra mắt sản phẩm mới', 'Tăng nhận diện thương hiệu', 'Xả hàng tồn'];
    const all = base.concat(Object.values(GOAL_EXTRA).map(g => g.v));
    if (!v || all.includes(v)) return null;
    const t = String(v).toLowerCase();
    if (/ra mắt|mới|launch/.test(t)) return base[1];
    if (/xả|tồn|thanh lý|sale/.test(t)) return base[3];
    if (/đơn|bán|doanh số|quay lại|khách cũ|tuyển|đặt lịch/.test(t)) return base[0];
    return base[2];
  }

  const SAMPLE_ANSWERS = {
    q1: { value: 'Phát Đạt Jewelry', source: 'scraped' },
    q2: { value: 'Nhẫn bạc S925 đính đá CZ Phát Đạt', source: 'scraped' },
    q3: { value: '199000', source: 'scraped' },
    q4: { value: 'Muốn đeo trang sức lấp lánh mỗi ngày mà không tốn tiền triệu như vàng; từng mua đồ rẻ trên sàn, đeo vài tuần đã đen và ngứa tay.', source: 'scraped' },
    q5: { value: ['Nữ 18–24', 'Nữ 25–34', 'Dân văn phòng', 'Sinh viên'], source: 'user' },
    q6: { value: ['Facebook', 'Zalo', 'Shopee'], source: 'user' },
    q7: { value: ['Sợ bạc giả, hàng xi mạ', 'Sợ đeo vài tuần bị đen', 'Không chắc size / hợp tay'], source: 'user' },
    q8: { value: 'Bạc S925 khắc ký hiệu 925 trên từng món, xi bạch kim hạn chế xỉn màu; đá CZ cắt 57 mặt sáng trong; bảo hành rơi đá 6 tháng, làm sáng miễn phí trọn đời.', source: 'user' },
    q9: { value: 'Trang sức bạc 50–100k trôi nổi trên sàn và các thương hiệu bạc lớn giá 800k–2 triệu', source: 'inferred' },
    q10: { value: ['Đánh giá 5★ trên sàn', 'Ký hiệu 925 / giấy kiểm định', 'Ảnh khách đeo thật'], source: 'user' },
    q11: { value: 'Tăng đơn sản phẩm chủ lực', source: 'user' },
    q12: { value: 'gan_gui', source: 'user' }
  };

  /* ---------- Tầng 2: câu hỏi hỏi đúng lúc (CL-01) — xếp theo tác động ---------- */
  const TIER2 = [
    { id: 'q8', impact: 'Mọi bài sẽ nêu đúng điểm khác của bạn thay vì câu chung chung', where: 'Lịch 30 ngày' },
    { id: 'q4', impact: 'Bài Giáo dục nói đúng vấn đề khách của bạn đang gặp', where: 'Lịch 30 ngày' },
    { id: 'q10', impact: 'Các bài Chứng thực có bằng chứng thật để dẫn', where: 'Bài Chứng thực' },
    { id: 'q7', impact: 'Góc kể chuyện trả lời đúng nỗi lo khiến khách chần chừ', where: 'Chiến lược' },
    { id: 'q6', impact: 'Ưu tiên đúng kênh khách hay xem', where: 'Chiến lược' },
    { id: 'q9', impact: 'So sánh hợp lý với đối thủ khách hay nhắc tới', where: 'Hồ sơ' },
    { id: 'q12', impact: 'Giọng bài giống cách bạn nói chuyện với khách', where: 'Hồ sơ' }
  ];
  // Nhóm độ đầy hồ sơ (CL-05): không tính % theo số trường
  const COMPLETENESS = {
    required: { name: 'Bắt buộc', ids: ['q1', 'q2', 'q3', 'q5', 'q11'] },
    high: { name: 'Tác động lớn', ids: ['q8', 'q4', 'q10', 'q7'] },
    extra: { name: 'Bổ sung', ids: ['q6', 'q9', 'q12'] }
  };
  // Máy dò câu trả lời mơ hồ (CL-04)
  const VAGUE_WORDS = ['chất lượng', 'uy tín', 'giá rẻ', 'giá hợp lý', 'giá tốt', 'tận tâm', 'đảm bảo', 'tốt nhất', 'hàng đẹp', 'nhiều mẫu', 'mẫu đẹp', 'trang sức', 'mỹ phẩm', 'quần áo', 'đồ ăn', 'sản phẩm tốt'];
  const VAGUE_FOLLOWUP = {
    q2: { ask: 'Cụ thể hơn một chút: món nào bạn muốn bán nhiều nhất?', chips: ind => (INDUSTRIES.find(i => i.id === ind) || INDUSTRIES[0]).products },
    q8: { ask: 'Bạn khác đối thủ ở chỗ nào?', chips: () => ['Chất liệu: ', 'Tay nghề / quy trình: ', 'Bảo hành/đổi trả: ', 'Người làm/tư vấn: '] },
    q4: { ask: 'Khách gặp chuyện gì trước khi mua của bạn?', chips: () => ['Đồ rẻ đeo vài tuần bị đen', 'Muốn lấp lánh mà không tốn tiền triệu', 'Mua nhẫn online sợ sai size'] }
  };

  /* ---------- Thuật ngữ hiển thị (CL-21) ---------- */
  const TERMS = {
    brain: { name: 'Hồ sơ thương hiệu', pro: 'Brand Brain', tip: 'Mọi thứ AI biết về shop của bạn. Bài viết lấy tên, giá, lợi ích từ đây.' },
    usp: { name: 'Lý do khách chọn bạn', pro: 'USP', tip: 'Câu trả lời cho câu hỏi “sao không mua chỗ khác?”.' },
    angle: { name: 'Góc kể chuyện', pro: 'Angle', tip: 'Một cách nói về sản phẩm, đánh vào một nỗi lo cụ thể của khách.' },
    persona: { name: 'Khách hàng điển hình', pro: 'Persona', tip: 'Một người mua cụ thể, để AI viết đúng giọng và đúng nỗi lo.' },
    pillar: { name: 'Nhóm nội dung', pro: 'Pillar', tip: '4 loại bài xen kẽ nhau: Giáo dục · Sản phẩm · Chứng thực · Giải trí.' },
    hook: { name: 'Câu mở đầu', pro: 'Hook', tip: 'Dòng đầu tiên của bài — quyết định khách có đọc tiếp hay lướt qua.' },
    cta: { name: 'Lời kêu gọi', pro: 'CTA', tip: 'Câu cuối bài bảo khách làm gì: nhắn tin, đặt hàng, lưu bài…' }
  };

  /* ---------- Từ Cấm / Cảnh báo theo ngành (CL-06) — BẢN MẪU ngành Trang sức, chờ người am hiểu quy định rà (H8) ---------- */
  const FORBIDDEN_PRESET = [
    { w: 'kim cương thật', level: 'ban', alt: 'đá CZ lấp lánh', why: 'Đá CZ không phải kim cương — gây nhầm lẫn về chất liệu' },
    { w: 'bạc nguyên chất 100%', level: 'ban', alt: 'bạc S925 (92,5% bạc)', why: 'Sai sự thật — bạc S925 là 92,5% bạc' },
    { w: 'không bao giờ đen', level: 'ban', alt: 'hạn chế xỉn màu', why: 'Hứa hẹn tuyệt đối, dễ bị khiếu nại' },
    { w: 'giải độc', level: 'ban', alt: 'đeo nhẹ, êm tay', why: 'Nói như công dụng sức khoẻ — trang sức không được quảng cáo chữa bệnh' },
    { w: 'hút gió độc', level: 'ban', alt: 'đeo êm tay mỗi ngày', why: 'Công dụng sức khoẻ chưa được chứng minh' },
    { w: 'cam kết 100%', level: 'ban', alt: 'nhiều khách phản hồi tốt', why: 'Hứa hẹn tuyệt đối, dễ bị gỡ bài' },
    { w: 'like auth', level: 'ban', alt: 'thiết kế riêng của shop', why: 'Ám chỉ hàng nhái thương hiệu — vi phạm sở hữu trí tuệ' },
    { w: 'thần thánh', level: 'warn', alt: 'được nhiều khách yêu thích', why: 'Phóng đại' },
    { w: 'rẻ nhất', level: 'warn', alt: 'giá dễ chịu', why: 'So sánh tuyệt đối, cần bằng chứng' },
    { w: 'không gây dị ứng', level: 'warn', alt: 'không pha niken, hạn chế kích ứng', why: 'Hứa hẹn tuyệt đối về sức khoẻ' },
    { w: 'Pandora', level: 'warn', alt: 'thương hiệu lớn', why: 'Nhắc/so sánh với đối thủ — dễ bị coi là hạ thấp' },
    { w: 'chiêu tài', level: 'warn', alt: 'mang ý nghĩa may mắn', why: 'Công dụng phong thuỷ không kiểm chứng được' }
  ];

  /* ---------- Kho ảnh của shop (CL-15) — không dùng ảnh mẫu theo ngành (H10) ---------- */
  const IMAGES = [
    { id: 'img1', label: 'Nhẫn đá trên nền nhung đen', tags: ['Sản phẩm', 'Nền tối'], hue: 220 },
    { id: 'img2', label: 'Cận đá CZ bắt sáng dưới đèn', tags: ['Sản phẩm', 'Cận cảnh'], hue: 200 },
    { id: 'img3', label: 'Phôi bạc S925 trên bàn chế tác', tags: ['Chất liệu'], hue: 45 },
    { id: 'img4', label: 'Ký hiệu 925 khắc trong nhẫn + phiếu bảo hành', tags: ['Giấy tờ', 'Chứng thực'], hue: 260 },
    { id: 'img5', label: 'Thợ gắn đá tại xưởng', tags: ['Chất liệu', 'Hậu trường'], hue: 30 },
    { id: 'img6', label: 'Ảnh khách gửi: nhẫn + lắc tay đeo thật', tags: ['Chứng thực', 'Khách hàng'], hue: 330 }
  ];
  const SHOT_LIST = {
    edu: [['Góc chụp', 'Tay đeo trang sức, nghiêng nhẹ để đá bắt sáng'], ['Nền', 'Bàn làm việc gọn, tay áo sơ mi hoặc áo len'], ['Ánh sáng', 'Gần cửa sổ + một đèn nhỏ chiếu xiên, không dùng flash']],
    prod: [['Góc chụp', 'Cận món trang sức, chiếm 2/3 khung'], ['Nền', 'Nhung đen, khay đá trắng hoặc hộp quà'], ['Ánh sáng', 'Đèn trắng chiếu xiên — flash làm đá bị chói']],
    proof: [['Góc chụp', 'Chụp thẳng phiếu bảo hành / ảnh khách gửi, không nghiêng'], ['Nền', 'Mặt bàn trơn'], ['Lưu ý', 'Che tên và số điện thoại của khách']],
    fun: [['Góc chụp', 'Khoảnh khắc đời thường có trang sức trong khung'], ['Nền', 'Quán cà phê, văn phòng, bàn trang điểm'], ['Ánh sáng', 'Tự nhiên, không cần đẹp — cần thật']]
  };

  /* ---------- 2 câu mở đầu thay thế theo góc (CL-09): câu hỏi · con số ---------- */
  const ALT_HOOKS = {
    A1: ['Outfit đi làm hôm nay có đang hơi “nhạt”?', '1 chiếc nhẫn, 3 giây đeo: cả set đồ sáng hẳn lên.'],
    A2: ['Chiếc nhẫn bạc bạn đang đeo có bao nhiêu phần bạc thật?', '92,5% bạc, 7,5% hợp kim — đây là con số trên từng món của tụi mình.'],
    A3: ['Đá rơi sau 2 tháng — bạn đã từng bỏ tủ bao nhiêu món như vậy?', '6 tháng bảo hành rơi đá, làm sáng miễn phí trọn đời.'],
    A4: ['Cùng lấp lánh, sao giá chênh nhau cả chục lần?', '199k cho cả năm đeo — chưa tới 600đ mỗi ngày.'],
    A5: ['Không biết size tay cô ấy, vẫn tặng nhẫn được không?', '3 bước chọn quà, 2 giờ giao tới — kịp cả khi bạn quên ngày.']
  };

  /* ---------- Đọc ảnh chụp màn hình (CL-02 v2) — kết quả giả lập ---------- */
  const SCREENSHOT_RESULT = {
    shop: 'Phát Đạt Jewelry',
    desc: 'Trang sức bạc S925 đính đá lấp lánh, giá mềm',
    rows: [
      { product: 'Nhẫn bạc S925 đính đá CZ Phát Đạt', price: '199000', on: true },
      { product: 'Lắc tay bạc đính đá tấm', price: '259000', on: false },
      { product: 'Bông tai bạc nụ đá 5 ly', price: '', on: false }
    ]
  };

  /* ---------- Lịch sự kiện & mùa vụ (CL-17) · ngày âm lịch tính bằng thư viện lịch, không để model đoán (H11) ---------- */
  const ALL_IND = ['jewelry', 'fashion_beauty', 'spa', 'fnb', 'edu', 'realestate'];
  const EVENTS = [
    { id: 'e-trungthu-26', name: 'Tết Trung thu', date: '2026-09-25', lunar: '15/8 âm lịch', industries: ['fnb', 'edu', 'fashion_beauty'], src: 'BA' },
    { id: 'e-2010-26', name: 'Ngày Phụ nữ Việt Nam', date: '2026-10-20', industries: ['jewelry', 'fashion_beauty', 'spa', 'fnb'], src: 'BA' },
    { id: 'e-halloween-26', name: 'Halloween', date: '2026-10-31', industries: ['fnb', 'fashion_beauty'], src: 'AI đề xuất' },
    { id: 'e-1111-26', name: 'Sale 11/11', date: '2026-11-11', industries: ['jewelry', 'fashion_beauty', 'fnb', 'realestate'], src: 'BA' },
    { id: 'e-2011-26', name: 'Ngày Nhà giáo Việt Nam', date: '2026-11-20', industries: ['jewelry', 'edu', 'fnb', 'fashion_beauty', 'spa'], src: 'BA' },
    { id: 'e-bf-26', name: 'Black Friday', date: '2026-11-27', industries: ALL_IND, src: 'BA' },
    { id: 'e-1212-26', name: 'Sale 12/12', date: '2026-12-12', industries: ['jewelry', 'fashion_beauty', 'fnb'], src: 'BA' },
    { id: 'e-noel-26', name: 'Giáng sinh', date: '2026-12-24', industries: ALL_IND, src: 'BA' },
    { id: 'e-tet-27', name: 'Tết Nguyên đán Đinh Mùi', date: '2027-02-06', lunar: 'Mùng 1 tháng Giêng', industries: ALL_IND, src: 'BA' },
    { id: 'e-valentine-27', name: 'Lễ Tình nhân (Valentine)', date: '2027-02-14', industries: ['jewelry', 'fashion_beauty', 'fnb'], src: 'AI đề xuất' },
    { id: 'e-0803-27', name: 'Quốc tế Phụ nữ 8/3', date: '2027-03-08', industries: ['jewelry', 'fashion_beauty', 'spa', 'fnb'], src: 'BA' }
  ];

  /* ---------- Chiến lược mẫu ---------- */
  const ANGLES = [
    { id: 'A1', name: 'Lấp lánh mỗi ngày, không cần đợi dịp', insight: 'Thích trang sức sáng nhưng nghĩ phải có dịp đặc biệt, phải đắt mới đeo.', message: '199k đã đủ lấp lánh cho outfit đi làm mỗi ngày.', formats: ['carousel', 'post'] },
    { id: 'A2', name: 'Bạc thật S925, không phải hợp kim xi', insight: 'Khách nghi đồ giá mềm là đồng xi bạc, đeo vài tuần là đen, ngứa tay.', message: 'Minh bạch chất liệu: bạc S925 khắc ký hiệu, xi bạch kim, đá CZ.', formats: ['post', 'carousel'] },
    { id: 'A3', name: 'Bảo hành rõ ràng — đá rơi gắn lại', insight: 'Sợ đá rơi, xỉn màu, mua về vài tháng là bỏ tủ.', message: 'Bảo hành rơi đá 6 tháng, làm sáng miễn phí trọn đời, có phiếu bảo hành.', formats: ['post'] },
    { id: 'A4', name: 'Lấp lánh sang, giá sinh viên', insight: 'Muốn trang sức nhìn sang như hàng hiệu vài triệu nhưng ngân sách dưới 300k.', message: 'Đá CZ cắt giác chuẩn, bắt sáng tốt — giá chỉ từ 129k.', formats: ['carousel', 'post'] },
    { id: 'A5', name: 'Quà tặng không lo chọn sai', insight: 'Muốn tặng quà người thương nhưng sợ sai size, sai gu, giao không kịp.', message: 'Hộp nhung sẵn, thiệp viết tay, đổi size miễn phí 7 ngày.', formats: ['carousel'] }
  ];

  const STRATEGY = {
    version: 2,
    versions: [
      { v: 1, label: 'v1 · bản AI đầu tiên', date: -3 },
      { v: 2, label: 'v2 · đã chỉnh USP', date: -2 }
    ],
    usp: {
      primary: 'Trang sức bạc S925 đính đá CZ lấp lánh — xi bạch kim hạn chế xỉn màu, bảo hành rơi đá 6 tháng, giá chỉ từ 129k.',
      secondary: [
        'Khắc ký hiệu 925 trên từng món — kiểm được ngay, không lo hợp kim xi bạc.',
        'Hơn 2.500 đánh giá 5★ trên Shopee, làm sáng miễn phí trọn đời.'
      ],
      rationale: 'Ba nỗi lo lớn nhất của khách (bạc giả, đeo bị đen, sai size) đều có câu trả lời trong dữ liệu bạn cung cấp: ký hiệu 925, lớp xi bạch kim kèm làm sáng trọn đời và chính sách bảo hành/đổi size. USP chính đánh vào điều khách cảm nhận ngay (lấp lánh, giá mềm) rồi mới tới độ bền, thay vì lời hứa chung chung “trang sức đẹp, chất lượng”.'
    },
    angles: ANGLES,
    personas: [
      { name: 'Vy', age: '24 tuổi', job: 'Nhân viên văn phòng, thu nhập ~10 triệu', pains: ['Thích đeo trang sức nhưng vàng quá đắt', 'Từng mua nhẫn rẻ trên sàn, 2 tuần đã đen', 'Muốn phối đồ đi làm nhẹ nhàng mà vẫn nổi'], objections: ['Sợ bạc giả, hàng xi mạ', 'Không biết size nhẫn của mình'], channels: ['TikTok', 'Shopee', 'Facebook'] },
      { name: 'Ngọc', age: '20 tuổi', job: 'Sinh viên năm 2, làm thêm cuối tuần', pains: ['Ngân sách phụ kiện dưới 300k/tháng', 'Muốn có đồ đôi, đồ nhóm với bạn thân'], objections: ['Chưa nghe tên shop', 'Sợ ảnh mạng lung linh, hàng thật khác xa'], channels: ['TikTok', 'Instagram'] }
    ],
    pillars: [
      { id: 'edu', ratio: 40 },
      { id: 'prod', ratio: 30 },
      { id: 'proof', ratio: 20 },
      { id: 'fun', ratio: 10 }
    ],
    edited: { usp: true }
  };

  /* ---------- Khung 30 ngày (pool) ---------- */
  // [pillar, angle, channel, format, title, hook]
  const RAW = [
    ['edu', 'A1', 'zalo', 'carousel', '5 cách phối trang sức bạc cho outfit đi làm', 'Đi làm mặc sơ mi trơn? Một chiếc nhẫn đá đổi hẳn cả set đồ.'],
    ['prod', 'A2', 'facebook', 'post', 'Từ phôi bạc S925 đến chiếc nhẫn trên tay bạn', 'Một chiếc nhẫn 199k đi qua 7 công đoạn. Đây là lý do.'],
    ['proof', 'A3', 'facebook', 'post', 'Chính sách bảo hành rơi đá 6 tháng — công khai từng điều', 'Chúng tôi không nói “bền”. Chúng tôi ghi rõ bảo hành gì, bao lâu.'],
    ['edu', 'A5', 'instagram', 'carousel', 'Đo size nhẫn tại nhà bằng một sợi chỉ', 'Mua nhẫn online sợ sai size? 2 phút với một sợi chỉ là xong.'],
    ['edu', 'A1', 'zalo', 'carousel', 'Đeo nhiều nhẫn một lúc: quy tắc 3 ngón cho người mới', 'Đeo 3 chiếc nhẫn mà không rối mắt? Chỉ cần nhớ 1 quy tắc.'],
    ['fun', 'A5', 'facebook', 'post', 'Khi người yêu hỏi “em thích quà gì?” (phiên bản thật)', '“Gì cũng được anh” — và 3 ngày sau là một cuộc chiến…'],
    ['prod', 'A4', 'instagram', 'carousel', 'Bảng so: nhẫn bạc đá CZ 199k và nhẫn hàng hiệu 3 triệu', 'Cùng lấp lánh, chênh 15 lần giá. Khác nhau ở đâu?'],
    ['edu', 'A2', 'facebook', 'post', 'Bạc S925, bạc ta, bạc xi: khác nhau thế nào?', 'Hai chữ trên nhãn khiến món trang sức rẻ hơn 60%.'],
    ['proof', 'A1', 'facebook', 'post', 'Chị Hằng, 28 tuổi: 6 tháng đeo nhẫn mỗi ngày đi làm', '“Mình đeo đi làm mỗi ngày, tới tháng thứ 6 thì…”'],
    ['edu', 'A3', 'facebook', 'post', '4 cách phân biệt bạc thật và bạc xi trôi nổi', 'Hàng xi bây giờ khắc cả ký hiệu. Trừ 4 chỗ này.'],
    ['prod', 'A1', 'facebook', 'post', 'Đá CZ bắt sáng dưới đèn văn phòng (ảnh cận)', 'Muốn lấp lánh mà không phô? Nhìn viên đá này dưới đèn.'],
    ['edu', 'A5', 'instagram', 'post', 'Quiz: Tay bạn hợp nhẫn mảnh hay nhẫn bản to?', 'Trả lời 3 câu, biết ngay kiểu nhẫn hợp tay bạn.'],
    ['proof', 'A4', 'instagram', 'carousel', '2.500 đánh giá 5★ nói gì — 8 bình luận thật', 'Chúng tôi đọc hết 2.500 đánh giá. Đây là 8 cái đáng đọc nhất.'],
    ['edu', 'A1', 'zalo', 'carousel', 'Đừng làm 3 điều này nếu muốn trang sức bạc luôn sáng', 'Điều số 2, 9/10 người đang làm mỗi tối.'],
    ['prod', 'A3', 'facebook', 'post', 'Làm sáng miễn phí trọn đời — mang tới là có', 'Mỗi món có một phiếu bảo hành. Mỗi phiếu dùng được mãi.'],
    ['fun', 'A2', 'facebook', 'post', 'Thử thách: đoán chiếc nào là bạc thật trong 3 chiếc', 'Nhìn 3 chiếc nhẫn. Chiếc nào 199k, chiếc nào 20k?'],
    ['edu', 'A4', 'facebook', 'carousel', 'Đọc ký hiệu mặt trong chiếc nhẫn trong 60 giây', 'Chỉ cần lật chiếc nhẫn lại.'],
    ['prod', 'A5', 'instagram', 'post', 'Set quà “nhẫn + bông tai” gói sẵn hộp nhung', '1 hộp, 2 món, 1 người vui cả tuần.'],
    ['proof', 'A2', 'zalo', 'post', 'Ảnh hậu trường bàn gắn đá — không chỉnh màu', 'Không filter, không dàn dựng. Đây là bàn làm việc của chúng tôi.'],
    ['edu', 'A1', 'instagram', 'carousel', 'Đá CZ là gì? Giải thích bằng một lăng kính', 'Viên đá trên nhẫn bạn là một lăng kính nhỏ — được cắt 57 mặt.'],
    ['prod', 'A4', 'facebook', 'post', '199k cho một chiếc nhẫn đeo cả năm — tính ra mỗi ngày bao nhiêu?', 'Chưa tới 600đ mỗi ngày — rẻ hơn một cốc trà đá.'],
    ['edu', 'A3', 'zalo', 'carousel', 'Mua trang sức trên sàn: 3 điều phải kiểm trước khi đặt', 'Đừng bấm “Mua ngay” khi chưa kiểm điều số 3.'],
    ['fun', 'A1', 'instagram', 'post', 'Mèo nhà mình cũng mê đồ lấp lánh (không, đừng đeo cho mèo)', 'Nhân vật chính hôm nay không phải chiếc nhẫn.'],
    ['proof', 'A5', 'facebook', 'post', 'Anh Khoa tặng bạn gái lắc tay — và tin nhắn sau đó', '“Em ấy gửi mình 5 tấm ảnh, tấm nào cũng giơ tay lên.”'],
    ['edu', 'A2', 'facebook', 'post', 'Vì sao bạc S925 xi bạch kim hợp người hay ngứa tay', 'Ngứa tay khi đeo trang sức rẻ? Thủ phạm thường là niken.'],
    ['prod', 'A1', 'facebook', 'post', 'Phối lắc tay đá với đồng hồ khi đi làm', 'Tay trái đồng hồ, tay phải lắc? Thử cách này xem.'],
    ['edu', 'A5', 'instagram', 'carousel', 'Checklist chọn quà trang sức cho người thương', 'Không biết size, không biết gu? 5 câu hỏi này là đủ.'],
    ['proof', 'A3', 'instagram', 'post', 'Hỏi đáp: 5 câu khách hỏi nhiều nhất tuần này', 'Câu thứ 4 chúng tôi được hỏi 37 lần.'],
    ['prod', 'A2', 'facebook', 'carousel', 'Một chiếc nhẫn ra đời thế nào — 7 bước', 'Từ lúc đúc phôi tới lúc gắn đá: 72 giờ.'],
    ['prod', 'A4', 'facebook', 'post', 'Trang sức đắt có bền hơn trang sức rẻ? Câu trả lời thật', 'Giá trang sức = chất liệu + tay nghề + … thương hiệu.']
  ];

  const INITIAL_STATUS = ['published', 'published', 'approved', 'edited', 'generated', 'generated', 'generated', 'generated', 'generated', 'generated', 'generated', 'generated'];

  /* ---------- Ngữ liệu để ghép nội dung ---------- */
  const ANGLE_POINTS = {
    A1: ['Chọn 1 món làm điểm nhấn — nhẫn đá hoặc bông tai nụ, đừng đeo cùng lúc hai món to.', 'Sơ mi trơn, áo len cổ tròn rất hợp dây chuyền mặt đá nhỏ.', 'Đi làm: đá 3–5 ly là đủ sáng mà không phô.', 'Đeo sau khi xịt nước hoa, thoa kem tay để đá luôn trong.'],
    A2: ['Bạc S925 = 92,5% bạc, 7,5% hợp kim để món trang sức cứng và giữ đá chắc.', 'Mặt trong mỗi món đều khắc chìm ký hiệu 925.', 'Phủ lớp xi bạch kim giúp hạn chế xỉn màu và giữ độ sáng.', 'Không pha niken — hạn chế ngứa, đỏ tay khi đeo lâu.'],
    A3: ['Bảo hành rơi đá 6 tháng — rơi đá gắn lại miễn phí.', 'Làm sáng, đánh bóng miễn phí trọn đời tại shop hoặc gửi qua bưu điện.', 'Đổi size nhẫn miễn phí trong 7 ngày.', 'Chỉ bán trên gian hàng Mall và fanpage chính thức, kèm phiếu bảo hành.'],
    A4: ['Đá CZ cắt giác 57 mặt, bắt sáng tốt dưới mọi loại đèn.', 'Xưởng làm trực tiếp, không qua nhiều tầng phân phối.', 'Nhẫn từ 129k, lắc tay từ 259k — đeo được cả năm.', 'Chỉ bằng một phần nhỏ giá trang sức vàng cùng kiểu dáng.'],
    A5: ['Mỗi đơn đều có hộp nhung và túi quà, không kèm hoá đơn giá.', 'Viết thiệp tay miễn phí theo lời bạn nhắn.', 'Chưa biết size? Chọn lắc tay hoặc dây chuyền có khoá điều chỉnh.', 'Giao nhanh 2 giờ nội thành cho đơn quà gấp.']
  };

  const ANGLE_VISUALS = {
    A1: ['Cổ tay áo sơ mi trắng, chiếc nhẫn đá lấp ló', 'Tay xếp 3 chiếc nhẫn lên bàn, chọn 1 chiếc', 'Xoay nhẹ bàn tay dưới đèn, đá lấp lánh', 'Người mẫu vén tóc, bông tai nụ bắt sáng, ánh sáng ấm'],
    A2: ['Cận ký hiệu 925 mặt trong nhẫn', 'Tay thợ đánh bóng phôi bạc, cận cảnh', 'Bể xi bạch kim trong xưởng', 'Chiếc nhẫn đặt cạnh phôi bạc trên khay'],
    A3: ['Cận phiếu bảo hành, lướt qua con dấu', 'Thợ gắn lại viên đá bằng nhíp', 'Máy làm sáng bạc chạy, món đồ sáng lên', 'Màn hình gian hàng Mall chính thức'],
    A4: ['Hai chiếc nhẫn đặt cạnh nhau trên nhung đen', 'Chữ chạy so sánh chất liệu từng dòng', 'Máy tính bấm 199.000 ÷ 365', 'Tay đeo nhẫn Phát Đạt giơ về phía camera'],
    A5: ['Hộp nhung mở ra, nhẫn và bông tai bên trong', 'Tay viết thiệp, cận nét chữ', 'Shipper trao túi quà trước cửa', 'Cô gái mở hộp, giơ tay khoe nhẫn']
  };

  const TONE_KIT = {
    gan_gui: { open: ['Bạn ơi, ', 'Kể bạn nghe nè — ', 'Nói thật với bạn, '], you: 'bạn', we: 'tụi mình', close: 'Thích mẫu nào cứ nhắn tụi mình nha ✨', bullet: '✨ ' },
    chuyen_nghiep: { open: ['', 'Theo kinh nghiệm tư vấn của chúng tôi, ', 'Lưu ý quan trọng: '], you: 'bạn', we: 'chúng tôi', close: 'Đội ngũ tư vấn của Phát Đạt Jewelry luôn sẵn sàng giúp bạn chọn mẫu và size phù hợp.', bullet: '• ' },
    hai_huoc: { open: ['Alo alo 📢 ', 'Plot twist: ', 'Nghe nè hội “tay trống” 😆 '], you: 'bạn', we: 'tụi mình', close: 'Tag ngay đứa bạn mê đồ lấp lánh vào đây 😆', bullet: '👉 ' },
    danh_thep: { open: ['', 'Nghe kỹ. ', 'Sự thật là: '], you: 'bạn', we: 'chúng tôi', close: 'Chọn mẫu ngay hôm nay. Đừng để tay trống thêm ngày nào.', bullet: '— ' }
  };

  const CHANNEL_CTA = {
    facebook: '👉 Inbox page để được tư vấn mẫu và đo size nhẫn miễn phí.',
    zalo: '👉 Nhắn OA để được tư vấn mẫu hợp tay bạn.',
    instagram: 'Lưu bài này lại để phối đồ dần 💾'
  };

  const HASHTAGS = {
    base: ['#phatdatjewelry', '#trangsucbac'],
    edu: ['#phoidotrangsuc', '#bacs925', '#meodeotrangsuc'],
    prod: ['#nhanbac', '#lactaybac', '#trangsucdinhda'],
    proof: ['#reviewthat', '#feedbackkhachhang', '#khachdeothat'],
    fun: ['#vanphongcongso', '#quatangnguoithuong', '#melaplanh']
  };

  function fmtPrice(v) {
    const n = Number(String(v).replace(/[^\d]/g, ''));
    return n ? n.toLocaleString('vi-VN') + 'đ' : v;
  }

  function rot(arr, k) { const n = arr.length; return arr.map((_, i) => arr[(i + k) % n]); }

  function genContent(item, brand, variant) {
    variant = variant || 0;
    const tone = TONE_KIT[brand.tone] || TONE_KIT.gan_gui;
    const product = (brand.answers.q2 && brand.answers.q2.value) || 'sản phẩm';
    const price = fmtPrice((brand.answers.q3 && brand.answers.q3.value) || '');
    const pts = rot(ANGLE_POINTS[item.angle] || ANGLE_POINTS.A1, variant).slice(0, 3);
    const open = tone.open[variant % tone.open.length];
    const lines = [];
    lines.push(open + (/, $/.test(open) ? item.hook.charAt(0).toLowerCase() + item.hook.slice(1) : item.hook));
    lines.push('');
    if (item.pillar === 'proof') {
      lines.push(variant % 2 ? `Không phải lời ${tone.we} tự khen — đây là điều khách thật chia sẻ:` : `${cap(tone.we)} để khách hàng tự nói:`);
    } else if (item.pillar === 'fun') {
      lines.push(variant % 2 ? 'Chuyện nhỏ thôi mà ai cũng gặp:' : 'Ai thấy mình trong này thì thả tim nha:');
    } else {
      lines.push(variant % 2 ? `${item.title}. Ghi nhớ 3 điều:` : `${item.title} — ${tone.you} chỉ cần nhớ:`);
    }
    pts.forEach(p => lines.push(tone.bullet + p));
    lines.push('');
    if (item.pillar === 'edu' || item.pillar === 'fun') {
      lines.push(`Nếu ${tone.you} đang tìm một món lấp lánh để đeo mỗi ngày, ${product} (${price}) làm từ bạc S925 xi bạch kim, đính đá CZ sáng trong.`);
    } else {
      lines.push(`${product} — ${price}, bảo hành rơi đá 6 tháng, làm sáng miễn phí trọn đời.`);
    }
    lines.push(CHANNEL_CTA[item.channel] || '');
    lines.push(tone.close);
    const tags = HASHTAGS.base.concat(HASHTAGS[item.pillar] || []);
    const nTags = item.channel === 'instagram' ? 5 : item.channel === 'zalo' ? 2 : 3;
    const briefs = {
      post: 'Ảnh vuông 1:1 — ' + (ANGLE_VISUALS[item.angle] || [])[3 - (variant % 2)] + '. Chữ trên ảnh ≤ 8 từ, lấy từ câu mở đầu.',
      carousel: 'Album 6 ảnh 4:5 — ảnh 1 là hook chữ to; ảnh 2–5 mỗi ảnh một ý; ảnh 6 là sản phẩm + giá.'
    };
    return { caption: lines.join('\n'), hashtags: rot(tags, variant).slice(0, nTags), imageBrief: briefs[item.format] || briefs.post };
  }

  function shorten(s, n) { const w = s.replace(/[“”"]/g, '').split(/\s+/); return w.length <= n ? s : w.slice(0, n).join(' ') + '…'; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function isoDate(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function addDays(iso, n) { const d = new Date(iso + 'T00:00:00'); d.setDate(d.getDate() + n); return isoDate(d); }

  function scheduleDates(start, freq) {
    const out = [];
    for (let i = 0; i < 30; i++) {
      const iso = addDays(start, i);
      const wd = new Date(iso + 'T00:00:00').getDay(); // 0=CN
      if (freq >= 7) out.push(iso);
      else if (freq === 5 && wd >= 1 && wd <= 5) out.push(iso);
      else if (freq === 3 && (wd === 1 || wd === 3 || wd === 5)) out.push(iso);
    }
    return out;
  }

  // Chọn mục từ pool theo tỷ lệ pillar, rồi gán ngày
  function buildSchedule(pool, pillars, freq, start) {
    const dates = scheduleDates(start, freq);
    const n = dates.length;
    const raw = pillars.map(p => ({ id: p.id, exact: p.ratio / 100 * n }));
    raw.forEach(r => { r.n = Math.floor(r.exact); r.rem = r.exact - r.n; });
    let left = n - raw.reduce((s, r) => s + r.n, 0);
    raw.slice().sort((a, b) => b.rem - a.rem).forEach(r => { if (left > 0) { r.n++; left--; } });
    const picked = [];
    raw.forEach(r => { picked.push(...pool.filter(it => it.pillar === r.id).slice(0, r.n)); });
    if (picked.length < n) picked.push(...pool.filter(it => !picked.includes(it)).slice(0, n - picked.length));
    picked.sort((a, b) => a.id - b.id);
    return picked.map((it, i) => ({ id: it.id, date: dates[i] }));
  }

  // Chọn ảnh trong kho cho bài (CL-15): trả null nếu không có ảnh hợp → cần chụp
  function pickImage(it) {
    if (it.pillar === 'fun') return null;
    if (it.angle === 'A3') return 'img4';
    if (it.pillar === 'proof') return it.id % 2 ? 'img6' : 'img4';
    if (it.angle === 'A2') return it.id % 2 ? 'img3' : 'img5';
    if (it.pillar === 'prod') return it.id % 2 ? 'img1' : 'img2';
    if (it.angle === 'A5') return null;
    return it.id % 3 === 0 ? null : 'img2';
  }

  function initialState() {
    const today = isoDate(new Date());
    const start = addDays(today, -2);
    const brand = {
      industry: 'jewelry',
      answers: JSON.parse(JSON.stringify(SAMPLE_ANSWERS)),
      tone: 'gan_gui',
      forbidden: FORBIDDEN_PRESET.map(f => Object.assign({ on: true, preset: true }, f)),
      images: IMAGES.map(x => Object.assign({}, x)),
      voiceSamples: [],
      voiceTraits: []
    };
    const pool = RAW.map((r, i) => {
      const it = { id: i + 1, pillar: r[0], angle: r[1], channel: r[2], channel0: r[2], format: r[3], title: r[4], hook: r[5], status: INITIAL_STATUS[i] || 'planned', regen: 0, edited: false };
      it.imageId = pickImage(it);
      if (it.status !== 'planned') it.content = genContent(it, brand, 0);
      if (it.status === 'edited') { it.edited = true; it.editKinds = ['Câu mở đầu']; }
      return it;
    });
    pool[13].flag = { similarTo: 1, score: 0.91 };
    // Bài ngày 11 có cụm từ Cấm để minh hoạ CL-06
    pool[10].content.caption = pool[10].content.caption.replace('\n\n', '\n\n✨ Bạc nguyên chất 100%, đeo không bao giờ đen.\n');
    // Ngày 1: Zalo OA là Mức 0 → gửi gói nhận bài, chủ shop đăng tay; ngày 2: tự đăng lên Facebook (Mức 1)
    pool[0].publishedAt = addDays(start, 0) + 'T09:14'; pool[0].manual = true; pool[0].feedback = { v: 'fire', at: addDays(start, 1) + 'T10:02' };
    pool[1].publishedAt = addDays(start, 1) + 'T19:30'; pool[1].url = 'https://facebook.com/phatdat.jewelry/posts/1029384756';
    const strategy = JSON.parse(JSON.stringify(STRATEGY));
    return {
      v: 6,
      onboarded: true,
      brand,
      strategy,
      plan: { start, frequency: 7, channels: ['facebook', 'instagram', 'zalo'], pool, schedule: buildSchedule(pool, strategy.pillars, 7, start), lot: 'L-0927-01' },
      // Gói & hạn mức (CL-19, CL-20) — tự tính trong app, không dùng chữ "credit" (H4)
      sub: { mode: 'paid', planName: 'Chuyên nghiệp', price: '599k', postsMax: 60, postsUsed: 48, regenMax: 30, regenUsed: 10, trialEnds: addDays(today, 5), trialPosts: 7 },
      notify: { push: true, email: true, telegram: false, pref: 'push', asked: true, weeklyTime: '20:00', stats: { enabled: 72, opened: 58, done: 41 } },
      seasonal: {},
      events: [],
      automation: {
        enabled: true,
        remindBefore: 120,
        retries: 3,
        connections: {
          facebook: { connected: true, account: 'Phát Đạt Jewelry', expiresIn: 45 },
          instagram: { connected: true, account: '@phatdat.jewelry', expiresIn: 58 },
          zalo: { connected: false }
        },
        runs: [
          { id: 'RUN-0002', itemId: 2, at: addDays(start, 1) + 'T19:30', channel: 'facebook', result: 'success', sec: 6.4, steps: [
            ['ok', 'Bài được duyệt → tạo mã hẹn, chờ tới 19:30', 'Duyệt lúc 16:02'], ['ok', 'Đọc lại bài: vẫn “Đã duyệt”, mã hẹn không đổi', ''], ['ok', 'Kiểm tra trước khi đăng', 'Không có từ Cấm · có ảnh'],
            ['ok', 'Kênh Mức 1 · Facebook Page · Phát Đạt Jewelry', 'Qua app Meta của công ty TTS'], ['warn', 'Khoá bài & đăng — lần 1', 'Facebook báo lỗi 503, chắc chắn chưa gửi → thử lại sau 30 giây'],
            ['ok', 'Đăng — lần 2', 'Thành công'], ['ok', 'Cập nhật lịch: Đã đăng', 'Lưu link bài'], ['ok', 'Báo lại', 'Thông báo đẩy + email cho chủ shop'] ] },
          { id: 'RUN-0001', itemId: 1, at: addDays(start, 0) + 'T09:00', channel: 'zalo', result: 'manual', sec: 2.1, steps: [
            ['ok', 'Bài được duyệt → tạo mã hẹn, chờ tới 09:00', 'Duyệt lúc 08:12'], ['ok', 'Đọc lại bài: đúng lịch hẹn', ''], ['ok', 'Kiểm tra trước khi đăng', 'Đạt'],
            ['warn', 'Zalo OA là Mức 0 (đăng tay)', 'Chưa có Zalo OA'], ['ok', 'Gửi gói nhận bài', 'Thông báo đẩy kèm link “Đăng bài này”'], ['ok', 'Chủ shop mở link → Đã nhận', '09:11'], ['ok', 'Chủ shop bấm “Tôi đã đăng”', '09:14'] ] }
        ]
      },
      activity: [
        { t: -5, icon: 'check', text: 'Duyệt bài ngày 3 · Chính sách bảo hành rơi đá 6 tháng' },
        { t: -900, icon: 'zap', text: 'Tự động đăng bài ngày 2 lên Facebook' },
        { t: -40, icon: 'pencil', text: 'Sửa câu mở đầu ngày 4 · Đo size nhẫn tại nhà' },
        { t: -180, icon: 'sparkles', text: 'Sinh nội dung 12 bài đầu tiên (lô L-0927-01)' },
        { t: -1500, icon: 'calendar', text: 'Tạo kế hoạch 30 ngày' },
        { t: -2900, icon: 'target', text: 'Chốt chiến lược v2' }
      ]
    };
  }

  /* Trạng thái của người mới vừa làm xong 5 câu (CL-01, CL-22, CL-19) */
  function freshState(answers, industry) {
    const s = initialState(); const today = isoDate(new Date());
    const ind = INDUSTRIES.find(i => i.id === industry) || INDUSTRIES[0];
    s.firstRun = true;
    s.brand.industry = ind.id;
    s.brand.answers = JSON.parse(JSON.stringify(answers));
    if (!s.brand.answers.q12 || !s.brand.answers.q12.value) s.brand.answers.q12 = { value: ind.tone, source: 'default' };
    s.brand.tone = s.brand.answers.q12.value;
    s.strategy.version = 1; s.strategy.versions = [{ v: 1, label: 'v1 · bản AI đầu tiên', date: 0 }]; s.strategy.edited = {};
    s.plan.start = today; s.plan.lot = 'L-' + today.slice(5).replace('-', '') + '-01';
    s.plan.pool.forEach(p => { p.status = 'planned'; delete p.content; delete p.flag; delete p.publishedAt; delete p.url; delete p.manual; delete p.feedback; p.edited = false; delete p.editKinds; p.regen = 0; });
    s.plan.schedule = buildSchedule(s.plan.pool, s.strategy.pillars, s.plan.frequency, today);
    // Bài đầu tiên là bài Sản phẩm (CL-22, phần giữ lại từ GE-01)
    const firstProd = s.plan.pool.find(p => p.pillar === 'prod');
    const a = s.plan.schedule.find(x => x.id === firstProd.id), b = s.plan.schedule.find(x => x.date === today);
    if (a && b && a !== b) { const d = a.date; a.date = b.date; b.date = d; }
    const byDate = s.plan.schedule.slice().sort((x, y) => x.date < y.date ? -1 : 1);
    byDate.slice(0, 2).forEach(x => { const p = s.plan.pool.find(q => q.id === x.id); p.content = genContent(p, s.brand, 0); p.status = 'generated'; });
    s.sub = Object.assign(s.sub, { mode: 'trial', trialEnds: addDays(today, 7), postsUsed: 2, regenUsed: 0 });
    s.notify.asked = false;
    s.automation.runs = [];
    s.activity = [{ t: 0, icon: 'sparkles', text: 'Viết bài đầu tiên (bài Sản phẩm) + 1 bài kế tiếp' }, { t: 0, icon: 'calendar', text: 'Tạo kế hoạch 30 ngày · lô ' + s.plan.lot }, { t: 0, icon: 'brain', text: 'Lưu hồ sơ thương hiệu từ 5 câu trả lời' }];
    return s;
  }

  window.MP_DATA = { optionsOf, goalTemplate, INDUSTRIES, TONES, PILLARS, CHANNELS, FORMATS, STATUSES, QUESTION_GROUPS, QUESTIONS, SAMPLE_ANSWERS, ANGLES, HASHTAGS, TIER2, COMPLETENESS, VAGUE_WORDS, VAGUE_FOLLOWUP, TERMS, FORBIDDEN_PRESET, IMAGES, SHOT_LIST, ALT_HOOKS, SCREENSHOT_RESULT, EVENTS, CHANNEL_CTA, genContent, buildSchedule, scheduleDates, initialState, freshState, pickImage, fmtPrice, isoDate, addDays };
})();
