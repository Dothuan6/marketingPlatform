/* =========================================================================
   Dữ liệu mẫu cho prototype — thương hiệu giả lập "Mộc Lan Cosmetics".
   Mọi nội dung "AI sinh" ở đây là viết sẵn / ghép mẫu, không gọi LLM thật.
   ========================================================================= */
(function () {
  const INDUSTRIES = [
    { id: 'fashion_beauty', name: 'Thời trang & Mỹ phẩm', desc: 'Shop mỹ phẩm, quần áo, phụ kiện', icon: 'sparkles', preset: true },
    { id: 'spa', name: 'Spa & Beauty', desc: 'Spa, thẩm mỹ, nail, gội đầu dưỡng sinh', icon: 'smile', preset: true },
    { id: 'fnb', name: 'F&B', desc: 'Quán cà phê, nhà hàng, đồ ăn online', icon: 'package', preset: false },
    { id: 'edu', name: 'Giáo dục', desc: 'Trung tâm, khoá học, gia sư', icon: 'book', preset: false },
    { id: 'realestate', name: 'BĐS & Nội thất', desc: 'Môi giới, dự án, đồ nội thất', icon: 'home', preset: false }
  ];

  const TONES = [
    { id: 'gan_gui', name: 'Gần gũi', desc: 'Xưng mình – bạn, như bạn thân tư vấn', sample: 'Da bạn dạo này hơi dỗi đúng không? Mình kể bạn nghe cách tụi mình “dỗ” da nè 🌿' },
    { id: 'chuyen_nghiep', name: 'Chuyên nghiệp', desc: 'Rõ ràng, có số liệu, không dùng tiếng lóng', sample: 'Da kích ứng sau treatment là phản ứng phổ biến. Dưới đây là 3 bước phục hồi được bác sĩ da liễu khuyến nghị.' },
    { id: 'hai_huoc', name: 'Hài hước', desc: 'Dí dỏm, bắt trend, nhiều cảm xúc', sample: 'Da: “Tui mệt rồi đó nha” 😤 — Bạn: bôi thêm 5 lớp. Thôi, dừng lại, nghe tụi mình nói nè 😆' },
    { id: 'danh_thep', name: 'Đanh thép', desc: 'Câu ngắn, khẳng định, kêu gọi mạnh', sample: 'Da đỏ rát. Đừng ngưng treatment. Phục hồi đúng cách. Bắt đầu từ tối nay.' }
  ];

  const PILLARS = {
    edu: { id: 'edu', name: 'Giáo dục', icon: 'book', desc: 'Kiến thức giúp khách hiểu vấn đề của mình' },
    prod: { id: 'prod', name: 'Sản phẩm', icon: 'package', desc: 'Giới thiệu sản phẩm, cách dùng, ưu đãi' },
    proof: { id: 'proof', name: 'Chứng thực', icon: 'star', desc: 'Feedback, before/after, giấy tờ' },
    fun: { id: 'fun', name: 'Giải trí', icon: 'smile', desc: 'Nội dung vui, bắt trend, gần gũi' }
  };

  const CHANNELS = {
    facebook: { id: 'facebook', name: 'Facebook', short: 'FB', account: 'Page', defaultTime: '19:30' },
    instagram: { id: 'instagram', name: 'Instagram', short: 'IG', account: 'Business', defaultTime: '12:00' },
    zalo: { id: 'zalo', name: 'Zalo OA', short: 'Zalo', account: 'Official Account', defaultTime: '09:00' }
  };

  const FORMATS = {
    post: { name: 'Bài + ảnh', icon: 'image' },
    carousel: { name: 'Album ảnh', icon: 'grid' }
  };

  const STATUSES = {
    planned: { name: 'Đã lên khung', cls: '', icon: 'clock' },
    generated: { name: 'Đã sinh nội dung', cls: 'info', icon: 'sparkles' },
    edited: { name: 'Đã chỉnh sửa', cls: 'warning', icon: 'pencil' },
    approved: { name: 'Đã duyệt · chờ đăng', cls: 'primary', icon: 'clock' },
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
    { id: 'q1', group: 'g1', type: 'text', required: true, label: 'Tên thương hiệu hoặc tên shop', placeholder: 'Vd: Mộc Lan Cosmetics', uses: ['②', '⑤'] },
    { id: 'q2', group: 'g1', type: 'text', required: true, label: 'Sản phẩm chủ lực bạn muốn bán nhiều nhất?', labelBy: { spa: 'Dịch vụ chủ lực bạn muốn đẩy mạnh?' }, placeholder: 'Vd: Serum rau má phục hồi da 30ml', uses: ['②', '④', '⑤'] },
    { id: 'q3', group: 'g1', type: 'money', required: true, label: 'Giá bán', placeholder: 'Vd: 289000', hint: 'Nhập số, không cần dấu chấm.', uses: ['⑤'] },
    { id: 'q4', group: 'g1', type: 'textarea', required: true, label: 'Sản phẩm giải quyết vấn đề gì cho khách?', placeholder: 'Mô tả ngắn nỗi khổ của khách trước khi dùng sản phẩm', suggestBy: { fashion_beauty: ['Da mụn, nhạy cảm', 'Da kích ứng sau treatment', 'Da xỉn màu', 'Lão hoá sớm', 'Mặc gì cũng không vừa'], spa: ['Căng thẳng, mất ngủ', 'Mụn, thâm', 'Đau mỏi vai gáy', 'Muốn trẻ hoá'], _: ['Tiết kiệm thời gian', 'Tiết kiệm chi phí', 'Chất lượng ổn định'] }, uses: ['②', '③'] },
    { id: 'q5', group: 'g2', type: 'multi', required: true, label: 'Khách hàng chính của bạn là ai?', hint: 'Chọn tất cả nhóm phù hợp.', options: ['Nữ 18–24', 'Nữ 25–34', 'Nữ 35–44', 'Nam 18–34', 'Sinh viên', 'Dân văn phòng', 'Mẹ bỉm sữa', 'Thu nhập khá'], uses: ['②'] },
    { id: 'q6', group: 'g2', type: 'multi', required: true, label: 'Khách thường thấy và mua hàng của bạn ở đâu?', options: ['Facebook', 'TikTok', 'Instagram', 'Shopee', 'Zalo', 'Website'], uses: ['③'] },
    { id: 'q7', group: 'g2', type: 'multi', required: false, label: 'Điều gì khiến khách còn chần chừ khi mua?', options: ['Giá cao hơn hàng bình dân', 'Sợ hàng giả trôi nổi', 'Không chắc hợp với mình', 'Chưa nghe tên thương hiệu', 'Phí ship', 'Sợ tác dụng phụ'], uses: ['②', '④'] },
    { id: 'q8', group: 'g3', type: 'textarea', required: true, label: 'Bạn khác đối thủ ở điểm nào?', placeholder: 'Nguyên liệu, quy trình, bảo hành, dịch vụ… càng cụ thể càng tốt', uses: ['②'] },
    { id: 'q9', group: 'g3', type: 'text', required: false, label: 'Khách hay so sánh bạn với ai?', placeholder: 'Vd: Serum rau má của các brand Hàn', uses: ['②'] },
    { id: 'q10', group: 'g3', type: 'multi', required: false, label: 'Bạn đang có bằng chứng nào?', hint: 'Dùng cho pillar Chứng thực.', options: ['Đánh giá 5★ trên sàn', 'Giấy kiểm nghiệm / chứng nhận', 'Ảnh before/after', 'KOL/KOC đã dùng', 'Số lượng đã bán', 'Cam kết đổi trả'], uses: ['③', '⑤'] },
    { id: 'q11', group: 'g4', type: 'single', required: true, label: 'Mục tiêu 30 ngày tới', options: [
      { v: 'Tăng đơn sản phẩm chủ lực', d: 'Ưu tiên pillar Sản phẩm & Chứng thực', icon: 'zap' },
      { v: 'Ra mắt sản phẩm mới', d: 'Chuỗi teaser → ra mắt → review', icon: 'sparkles' },
      { v: 'Tăng nhận diện thương hiệu', d: 'Ưu tiên Giáo dục & Giải trí', icon: 'users' },
      { v: 'Xả hàng tồn', d: 'Ưu đãi có thời hạn, CTA mạnh', icon: 'package' }
    ], uses: ['③', '④'] },
    { id: 'q12', group: 'g4', type: 'tone', required: true, label: 'Giọng thương hiệu', hint: 'Đổi được bất cứ lúc nào ở Brand Brain.', uses: ['⑤'] }
  ];

  const SAMPLE_ANSWERS = {
    q1: { value: 'Mộc Lan Cosmetics', source: 'scraped' },
    q2: { value: 'Serum rau má phục hồi da Mộc Lan 30ml', source: 'scraped' },
    q3: { value: '289000', source: 'scraped' },
    q4: { value: 'Da mụn, da nhạy cảm bị đỏ rát sau khi dùng treatment (BHA, retinol); muốn phục hồi nhanh mà không bí da.', source: 'scraped' },
    q5: { value: ['Nữ 18–24', 'Nữ 25–34', 'Dân văn phòng', 'Sinh viên'], source: 'user' },
    q6: { value: ['Facebook', 'Zalo', 'Shopee'], source: 'user' },
    q7: { value: ['Giá cao hơn hàng bình dân', 'Sợ hàng giả trôi nổi', 'Không chắc hợp với mình'], source: 'user' },
    q8: { value: 'Rau má tươi từ Hậu Giang, tự chưng cất tại xưởng; không cồn, không hương liệu; có phiếu kiểm nghiệm da liễu.', source: 'user' },
    q9: { value: 'Serum rau má của các brand Hàn giá 350–450k', source: 'inferred' },
    q10: { value: ['Đánh giá 5★ trên sàn', 'Giấy kiểm nghiệm / chứng nhận', 'Ảnh before/after'], source: 'user' },
    q11: { value: 'Tăng đơn sản phẩm chủ lực', source: 'user' },
    q12: { value: 'gan_gui', source: 'user' }
  };

  /* ---------- Chiến lược mẫu ---------- */
  const ANGLES = [
    { id: 'A1', name: 'Cứu da sau treatment', insight: 'Dùng BHA/retinol xong da đỏ rát, sợ phải bỏ ngang liệu trình.', message: 'Không cần bỏ treatment — chỉ cần phục hồi đúng cách.', formats: ['carousel', 'post'] },
    { id: 'A2', name: 'Rau má thật, không phải “hương rau má”', insight: 'Khách nghi ngờ thành phần “thiên nhiên” chỉ là chiêu marketing.', message: 'Minh bạch từ ruộng Hậu Giang tới chai serum.', formats: ['post', 'carousel'] },
    { id: 'A3', name: 'Chính hãng có giấy tờ', insight: 'Sợ mua phải hàng giả trôi nổi trên sàn.', message: 'Phiếu kiểm nghiệm công khai, mỗi chai có mã QR truy xuất.', formats: ['post'] },
    { id: 'A4', name: 'Chất Hàn, giá Việt', insight: 'Tiếc tiền mua serum Hàn 400k nhưng ngại hàng nội.', message: 'Thành phần tương đương, giá chỉ bằng 2/3.', formats: ['carousel', 'post'] },
    { id: 'A5', name: 'Routine 3 bước cho dân văn phòng', insight: 'Bận, lười skincare nhiều bước, ngồi máy lạnh cả ngày.', message: '3 bước, 3 phút, da vẫn ổn sau 8 tiếng máy lạnh.', formats: ['carousel'] }
  ];

  const STRATEGY = {
    version: 2,
    versions: [
      { v: 1, label: 'v1 · bản AI đầu tiên', date: -3 },
      { v: 2, label: 'v2 · đã chỉnh USP', date: -2 }
    ],
    usp: {
      primary: 'Serum rau má tươi tự chưng cất — làm dịu da kích ứng sau treatment, không cồn, không hương liệu, giá bằng 2/3 hàng Hàn.',
      secondary: [
        'Có phiếu kiểm nghiệm da liễu công khai — mua chính hãng, không lo hàng trôi nổi.',
        'Hơn 1.200 đánh giá 5★ trên Shopee từ khách da nhạy cảm.'
      ],
      rationale: 'Ba nỗi lo lớn nhất của khách (giá, hàng giả, không hợp da) đều có câu trả lời trong dữ liệu bạn cung cấp: nguồn rau má tự chưng cất, phiếu kiểm nghiệm và lượng đánh giá thật. USP chính đánh vào tình huống cụ thể (sau treatment) thay vì lời hứa chung chung “dưỡng da”.'
    },
    angles: ANGLES,
    personas: [
      { name: 'Linh', age: '26 tuổi', job: 'Nhân viên văn phòng, thu nhập ~12 triệu', pains: ['Da đỏ rát sau khi dùng BHA', 'Ngồi máy lạnh 8 tiếng, da khô căng', 'Không có thời gian skincare nhiều bước'], objections: ['Sợ mua nhầm hàng giả trên sàn', 'Đã thử nhiều serum “thiên nhiên” không hiệu quả'], channels: ['TikTok', 'Shopee', 'Facebook'] },
      { name: 'Trang', age: '22 tuổi', job: 'Sinh viên năm cuối, làm thêm', pains: ['Mụn nội tiết theo chu kỳ', 'Ngân sách skincare dưới 500k/tháng'], objections: ['Giá 289k hơi cao so với túi tiền', 'Chưa nghe tên thương hiệu'], channels: ['TikTok', 'Instagram'] }
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
    ['edu', 'A1', 'zalo', 'carousel', '3 dấu hiệu da đang “kêu cứu” sau khi dùng BHA', 'Da bạn đỏ rát sau BHA? Đừng vội bỏ — đọc hết bài này đã.'],
    ['prod', 'A2', 'facebook', 'post', 'Từ ruộng rau má Hậu Giang đến chai serum 30ml', 'Một chai serum cần 2kg rau má tươi. Đây là lý do.'],
    ['proof', 'A3', 'facebook', 'post', 'Phiếu kiểm nghiệm da liễu — công khai toàn bộ', 'Chúng tôi không nói “an toàn”. Chúng tôi cho bạn xem giấy.'],
    ['edu', 'A5', 'instagram', 'carousel', 'Routine 3 bước cho da mụn dân văn phòng', 'Không có thời gian skincare 10 bước? 3 bước là đủ.'],
    ['edu', 'A1', 'zalo', 'carousel', 'Retinol + rau má: dùng thế nào cho đúng thứ tự?', 'Thoa sai thứ tự, retinol mất một nửa tác dụng.'],
    ['fun', 'A5', 'facebook', 'post', 'Một ngày của làn da dân văn phòng (phiên bản thật)', '8 tiếng máy lạnh, 2 ly trà sữa và làn da của bạn…'],
    ['prod', 'A4', 'instagram', 'carousel', 'Bảng so thành phần: Mộc Lan và serum rau má Hàn', 'Cùng rau má, chênh 150k. Khác nhau ở đâu?'],
    ['edu', 'A2', 'facebook', 'post', 'Rau má chưng cất khác rau má chiết xuất thế nào?', 'Hai chữ trên nhãn khiến serum rẻ hơn 40%.'],
    ['proof', 'A1', 'facebook', 'post', 'Chị Hà, 27 tuổi: 7 ngày sau đợt treatment BHA', '“Mình đã định ngưng BHA, cho tới ngày thứ 3…”'],
    ['edu', 'A3', 'facebook', 'post', '4 cách phân biệt serum chính hãng và hàng trôi nổi', 'Hàng giả bây giờ giống tới cả mã vạch. Trừ 4 chỗ này.'],
    ['prod', 'A1', 'facebook', 'post', 'Texture serum rau má: thấm trong 30 giây (ảnh cận)', 'Da dầu sợ bí? Nhìn giọt serum này biến mất.'],
    ['edu', 'A5', 'instagram', 'post', 'Quiz: Da bạn đang thiếu nước hay thiếu dầu?', 'Trả lời 3 câu, biết ngay da đang thiếu gì.'],
    ['proof', 'A4', 'instagram', 'carousel', '1.200 đánh giá 5★ nói gì — 8 bình luận thật', 'Chúng tôi đọc hết 1.200 đánh giá. Đây là 8 cái đáng đọc nhất.'],
    ['edu', 'A1', 'zalo', 'carousel', 'Đừng làm 3 điều này khi da đang kích ứng', 'Điều số 2, 9/10 người đang làm mỗi tối.'],
    ['prod', 'A3', 'facebook', 'post', 'Quét mã QR — xem nguồn gốc lô hàng của bạn', 'Mỗi chai có một mã. Mỗi mã có một câu chuyện.'],
    ['fun', 'A2', 'facebook', 'post', 'Thử thách: nhận ra rau má thật bằng mũi', 'Bịt mắt, ngửi 3 chai serum. Ai đoán đúng?'],
    ['edu', 'A4', 'facebook', 'carousel', 'Đọc bảng thành phần serum trong 60 giây', 'Chỉ cần nhìn 5 dòng đầu tiên.'],
    ['prod', 'A5', 'instagram', 'post', 'Set phục hồi 7 ngày cho da sau đợt mụn', '7 ngày, 2 sản phẩm, 1 làn da bình yên.'],
    ['proof', 'A2', 'zalo', 'post', 'Ảnh hậu trường xưởng chưng cất — không chỉnh màu', 'Không filter, không dàn dựng. Đây là xưởng của chúng tôi.'],
    ['edu', 'A1', 'instagram', 'carousel', 'Hàng rào bảo vệ da là gì? Giải thích bằng một bức tường gạch', 'Da bạn là một bức tường. Và nó đang thiếu vữa.'],
    ['prod', 'A4', 'facebook', 'post', '289k cho 60 ngày dùng — tính ra mỗi ngày bao nhiêu?', 'Rẻ hơn một ly trà sữa mỗi tuần.'],
    ['edu', 'A3', 'zalo', 'carousel', 'Mua serum trên sàn: 3 điều phải kiểm trước khi đặt', 'Đừng bấm “Mua ngay” khi chưa kiểm điều số 3.'],
    ['fun', 'A1', 'instagram', 'post', 'Mèo nhà mình cũng mê rau má (không, đừng bôi cho mèo)', 'Nhân vật chính hôm nay không phải serum.'],
    ['proof', 'A5', 'facebook', 'post', 'Before/after 14 ngày của Minh Thư — da nhạy cảm', 'Ảnh không chỉnh. Ánh sáng giống nhau. Cách nhau 14 ngày.'],
    ['edu', 'A2', 'facebook', 'post', 'Vì sao serum không cồn, không hương liệu hợp da nhạy cảm', 'Mùi thơm dễ chịu có thể chính là thủ phạm.'],
    ['prod', 'A1', 'facebook', 'post', 'Cách dùng serum rau má sáng và tối', 'Sáng 2 giọt, tối 3 giọt. Nhưng thứ tự mới là mấu chốt.'],
    ['edu', 'A5', 'instagram', 'carousel', 'Checklist skincare khi ngồi máy lạnh cả ngày', 'Máy lạnh hút ẩm da nhanh hơn bạn nghĩ.'],
    ['proof', 'A3', 'instagram', 'post', 'Hỏi đáp: 5 câu khách hỏi nhiều nhất tuần này', 'Câu thứ 4 chúng tôi được hỏi 37 lần.'],
    ['prod', 'A2', 'facebook', 'carousel', 'Một chai serum ra đời thế nào — 6 bước', 'Từ lúc cắt rau má tới lúc đóng nắp: 48 giờ.'],
    ['prod', 'A4', 'facebook', 'post', 'Serum đắt có tốt hơn serum rẻ? Câu trả lời thật', 'Giá serum = thành phần + bao bì + … quảng cáo.']
  ];

  const INITIAL_STATUS = ['published', 'published', 'approved', 'edited', 'generated', 'generated', 'generated', 'generated', 'generated', 'generated', 'generated', 'generated'];

  /* ---------- Ngữ liệu để ghép nội dung ---------- */
  const ANGLE_POINTS = {
    A1: ['Đừng ngưng treatment ngay — giãn tần suất xuống 2–3 tối/tuần.', 'Bỏ hết sản phẩm có cồn, hương liệu trong 7 ngày.', 'Thêm một bước phục hồi dịu nhẹ ngay sau khi rửa mặt.', 'Chống nắng kỹ hơn bình thường — da đang “mỏng” hơn bạn nghĩ.'],
    A2: ['Rau má tươi thu hoạch buổi sáng, chưng cất trong 6 giờ.', 'Không pha hương rau má tổng hợp — mở nắp là mùi cỏ tươi, hơi hăng.', 'Mỗi lô đều có ngày thu hoạch in trên hộp.', 'Màu serum thay đổi nhẹ theo mùa — đó là dấu hiệu của nguyên liệu thật.'],
    A3: ['Phiếu kiểm nghiệm công khai trên website, tra theo số lô.', 'Mã QR dưới đáy chai dẫn về đúng lô sản xuất.', 'Tem niêm phong in chìm, xé là rách không dán lại được.', 'Chỉ bán trên gian hàng Mall và fanpage chính thức.'],
    A4: ['Cùng hoạt chất chính từ rau má, nồng độ tương đương.', 'Không tốn phí nhập khẩu và phân phối nhiều tầng.', 'Chai 30ml dùng được ~60 ngày với 2–3 giọt mỗi lần.', 'Giá 289k so với 400k+ của hàng Hàn cùng dung tích.'],
    A5: ['Bước 1: rửa mặt dịu nhẹ, không tạo bọt nhiều.', 'Bước 2: 2–3 giọt serum rau má, vỗ nhẹ tới khi thấm.', 'Bước 3: kem chống nắng — kể cả khi ngồi văn phòng.', 'Để một chai xịt khoáng trên bàn làm việc cho buổi chiều.']
  };

  const ANGLE_VISUALS = {
    A1: ['Cận mặt da đỏ nhẹ dưới ánh sáng tự nhiên', 'Tay xếp 3 lọ treatment lên bàn, gạt bớt 1 lọ', 'Nhỏ giọt serum lên mu bàn tay, quay chậm', 'Người mẫu chạm má, mỉm cười, ánh sáng ấm'],
    A2: ['Ruộng rau má buổi sáng, sương còn đọng', 'Tay công nhân cắt rau má, cận cảnh', 'Nồi chưng cất bốc hơi trong xưởng', 'Chai serum đặt cạnh bó rau má tươi'],
    A3: ['Cận phiếu kiểm nghiệm, lướt qua con dấu', 'Điện thoại quét mã QR dưới đáy chai', 'Xé tem niêm phong, cận cảnh', 'Màn hình gian hàng Mall chính thức'],
    A4: ['Hai chai serum đặt cạnh nhau trên nền trắng', 'Chữ chạy so sánh thành phần từng dòng', 'Máy tính bấm 289.000 ÷ 60', 'Tay cầm chai Mộc Lan giơ về phía camera'],
    A5: ['Bàn làm việc có laptop, ly cà phê, 3 sản phẩm', 'Rửa mặt ở bồn, quay góc nghiêng', 'Vỗ serum lên má, đồng hồ góc màn hình chạy', 'Xịt khoáng lúc 3 giờ chiều, nhân vật thở phào']
  };

  const TONE_KIT = {
    gan_gui: { open: ['Bạn ơi, ', 'Kể bạn nghe nè — ', 'Nói thật với bạn, '], you: 'bạn', we: 'tụi mình', close: 'Có gì thắc mắc cứ nhắn tụi mình nha 🌿', bullet: '🌿 ' },
    chuyen_nghiep: { open: ['', 'Theo kinh nghiệm tư vấn của chúng tôi, ', 'Lưu ý quan trọng: '], you: 'bạn', we: 'chúng tôi', close: 'Đội ngũ tư vấn của Mộc Lan luôn sẵn sàng hỗ trợ bạn chọn liệu trình phù hợp.', bullet: '• ' },
    hai_huoc: { open: ['Alo alo 📢 ', 'Plot twist: ', 'Nghe nè hội da “khó ở” 😆 '], you: 'bạn', we: 'tụi mình', close: 'Tag ngay đứa bạn da hay dỗi vào đây 😆', bullet: '👉 ' },
    danh_thep: { open: ['', 'Nghe kỹ. ', 'Sự thật là: '], you: 'bạn', we: 'chúng tôi', close: 'Bắt đầu từ tối nay. Đừng đợi da tệ hơn.', bullet: '— ' }
  };

  const CHANNEL_CTA = {
    facebook: '👉 Inbox page để được tư vấn theo đúng loại da của bạn.',
    zalo: '👉 Nhắn OA để được tư vấn miễn phí theo loại da.',
    instagram: 'Lưu bài này lại để làm theo dần 💾'
  };

  const HASHTAGS = {
    base: ['#moclan', '#serumrauma'],
    edu: ['#kienthucskincare', '#damun', '#phuchoida'],
    prod: ['#serumphuchoi', '#myphamviet', '#skincareviet'],
    proof: ['#reviewthat', '#feedbackkhachhang', '#beforeafter'],
    fun: ['#vanphongcongso', '#skincaretrend', '#dachuyenlai']
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
      lines.push(`Nếu da ${tone.you} đang cần phục hồi, ${product} (${price}) được chưng cất từ rau má tươi — không cồn, không hương liệu.`);
    } else {
      lines.push(`${product} — ${price}/chai, dùng khoảng 60 ngày.`);
    }
    lines.push(CHANNEL_CTA[item.channel] || '');
    lines.push(tone.close);
    const tags = HASHTAGS.base.concat(HASHTAGS[item.pillar] || []);
    const nTags = item.channel === 'instagram' ? 5 : item.channel === 'zalo' ? 2 : 3;
    const briefs = {
      post: 'Ảnh vuông 1:1 — ' + (ANGLE_VISUALS[item.angle] || [])[3 - (variant % 2)] + '. Chữ trên ảnh ≤ 8 từ, lấy từ hook.',
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

  function initialState() {
    const today = isoDate(new Date());
    const start = addDays(today, -2);
    const brand = {
      industry: 'fashion_beauty',
      answers: JSON.parse(JSON.stringify(SAMPLE_ANSWERS)),
      tone: 'gan_gui',
      forbidden: ['trị dứt điểm', 'cam kết 100%', 'thần thánh', 'hết mụn vĩnh viễn'],
      voiceSamples: [],
      voiceTraits: []
    };
    const pool = RAW.map((r, i) => {
      const it = { id: i + 1, pillar: r[0], angle: r[1], channel: r[2], channel0: r[2], format: r[3], title: r[4], hook: r[5], status: INITIAL_STATUS[i] || 'planned', regen: 0, edited: false };
      if (it.status !== 'planned') {
        it.content = genContent(it, brand, 0);
      }
      if (it.status === 'edited') it.edited = true;
      return it;
    });
    pool[13].flag = { similarTo: 1, score: 0.91 };
    // Ngày 1: Zalo OA chưa kết nối → workflow gửi nhắc đăng tay; ngày 2: đăng tự động lên Facebook
    pool[0].publishedAt = addDays(start, 0) + 'T09:14'; pool[0].manual = true;
    pool[1].publishedAt = addDays(start, 1) + 'T19:30'; pool[1].url = 'https://facebook.com/moclan.cosmetics/posts/1029384756';
    const strategy = JSON.parse(JSON.stringify(STRATEGY));
    return {
      v: 4,
      onboarded: true,
      brand,
      strategy,
      plan: { start, frequency: 7, channels: ['facebook', 'instagram', 'zalo'], pool, schedule: buildSchedule(pool, strategy.pillars, 7, start) },
      automation: {
        enabled: true,
        approvalMode: 'manual',
        remindBefore: 120,
        retries: 3,
        notify: { zalo: true, email: true },
        fallback: 'remind',
        connections: {
          facebook: { connected: true, account: 'Mộc Lan Cosmetics', expiresIn: 45 },
          instagram: { connected: true, account: '@moclan.cosmetics', expiresIn: 58 },
          zalo: { connected: false }
        },
        runs: [
          { id: 'RUN-0002', itemId: 2, at: addDays(start, 1) + 'T19:30', channel: 'facebook', result: 'success', sec: 6.4, steps: [
            ['ok', 'Đến giờ đăng 19:30', ''], ['ok', 'Bài đã duyệt', 'Duyệt lúc 16:02'], ['ok', 'Kiểm tra trước khi đăng', 'Không có từ cấm · có ảnh'],
            ['ok', 'Kênh đã kết nối', 'Facebook Page · Mộc Lan Cosmetics'], ['warn', 'Đăng lên Facebook — lần 1', 'Facebook báo lỗi tạm thời, thử lại sau 30 giây'],
            ['ok', 'Đăng lên Facebook — lần 2', 'Thành công'], ['ok', 'Cập nhật lịch: Đã đăng', 'Lưu link bài'], ['ok', 'Thông báo', 'Zalo + email cho chủ shop'] ] },
          { id: 'RUN-0001', itemId: 1, at: addDays(start, 0) + 'T09:00', channel: 'zalo', result: 'manual', sec: 2.1, steps: [
            ['ok', 'Đến giờ đăng 09:00', ''], ['ok', 'Bài đã duyệt', 'Duyệt lúc 08:12'], ['ok', 'Kiểm tra trước khi đăng', 'Đạt'],
            ['warn', 'Kênh chưa kết nối', 'Zalo OA chưa kết nối'], ['ok', 'Gửi nội dung để đăng tay', 'Đã gửi caption + ảnh qua Zalo cá nhân'], ['ok', 'Chủ shop xác nhận đã đăng', '09:14'] ] }
        ]
      },
      activity: [
        { t: -5, icon: 'check', text: 'Duyệt bài ngày 3 · Phiếu kiểm nghiệm da liễu' },
        { t: -900, icon: 'zap', text: 'Tự động đăng bài ngày 2 lên Facebook' },
        { t: -40, icon: 'pencil', text: 'Sửa caption ngày 4 · Routine 3 bước' },
        { t: -180, icon: 'sparkles', text: 'Sinh nội dung 12 bài đầu tiên' },
        { t: -1500, icon: 'calendar', text: 'Tạo lịch nội dung 30 ngày' },
        { t: -2900, icon: 'target', text: 'Chốt chiến lược v2' }
      ]
    };
  }

  window.MP_DATA = { INDUSTRIES, TONES, PILLARS, CHANNELS, FORMATS, STATUSES, QUESTION_GROUPS, QUESTIONS, SAMPLE_ANSWERS, ANGLES, HASHTAGS, genContent, buildSchedule, scheduleDates, initialState, fmtPrice, isoDate, addDays };
})();
