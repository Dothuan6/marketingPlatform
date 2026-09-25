/* Đặt theme sớm để tránh nháy màn hình. Không có storage vẫn chạy theo hệ điều hành. */
(function () {
  var t = null;
  try { t = localStorage.getItem('mp-theme'); } catch (e) {}
  if (!t) t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
})();
