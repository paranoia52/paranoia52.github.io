let { pool } = require("../sqlconect/mysqlConf.js")

module.exports = {
  query: function (params, callback) {
    pool.query(`SELECT * FROM musics WHERE Type = ${params.Type} ORDER BY id DESC`, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: result, msg: '' });
    });
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
    pool.query("INSERT INTO musics (Title , Author, Cover, MusicUrl, Lyric, Type, CreateTime ) VALUES (?, ?, ?, ?, ?, ?, ?);", sqlparam, function (error, result) {
      if (error) throw error;
      callback({ code: 0, data: '', msg: '添加成功' });
    });
  },
}