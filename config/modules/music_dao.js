let { pool } = require("../sqlconect/mysqlConf.js")

module.exports = {
  query: function (params, callback) {
    if (params.Type == 0) {
      pool.query(`SELECT * FROM musics ORDER BY id DESC`, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: result, msg: '' });
      });
    } else {
      pool.query(`SELECT * FROM musics WHERE Type = ${params.Type} ORDER BY id DESC`, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: result, msg: '' });
      });
    }
  },
  add: function (params, callback) {
    let sqlparam = [
      params.Title,
      params.Author,
      params.Cover,
      params.MusicUrl,
      params.Lyric,
      params.Type,
      new Date(),
    ]
    if (params.Title && params.Author && params.Cover && params.MusicUrl && params.Lyric && params.Type) {
      pool.query("INSERT INTO musics (Title , Author, Cover, MusicUrl, Lyric, Type, CreateTime ) VALUES (?, ?, ?, ?, ?, ?, ?);", sqlparam, function (error, result) {
        if (error) throw error;
        callback({ code: 0, data: result, msg: '添加成功' });
      });
    } else {
      callback({ code: 401, data: '', msg: '请检查参数' });
    }
  },
}