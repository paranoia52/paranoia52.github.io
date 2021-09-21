// 格式化时间（参数时间戳） Y-m-d H:i:s
module.exports.formatTime = (time) => {
  if ((time + '').length === 10) {
    time = time * 1000
  }
  const date = new Date(time);
  const Y = date.getFullYear();
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1);
  const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return (
    Y + "-" +
    M + "-" +
    D + " " +
    (h.toString().length === 1 ? "0" + h + ":" : h + ":") +
    (m.toString().length === 1 ? "0" + m + ":" : m + ":") +
    (s.toString().length === 1 ? "0" + s : s)
  );
}