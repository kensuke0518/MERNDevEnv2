const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB設定
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ExpressAPI'); // Production時はMongoDB Atlasを使用する。
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

// Express基本設定
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/../docs'));

// ルーティング
const router = require('./routes/'); //routes/index.js
app.use('/api/', router); // routes/index.jsをURLの/api/にアクセスした際に使うという処理。

// サーバー待ち受け
app.listen(port, () => console.log(port + '番で待ち受けています'));
