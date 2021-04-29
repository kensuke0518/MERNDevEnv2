const mongoose = require('mongoose'); //mongoDBに接続するためのライブラリ
const moment = require('moment');

//プロジェクトに合わせて変更する。
const ItemSchema = new mongoose.Schema({ //mongoDBのスキーマを作る
    comment: String,
});

// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = mongoose.model('ItemModel', ItemSchema);