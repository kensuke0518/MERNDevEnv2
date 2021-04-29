const express = require('express');
const router = express.Router();

//表示確認用
router.get('/', (req, res) => res.json({ message: 'こんにちは、世界' }));

router.use('/item', require('./item'));

module.exports = router;