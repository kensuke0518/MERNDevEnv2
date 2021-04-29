const express = require('express');
const itemModel = require('../models/itemModel');
const router = express.Router();
const ItemModel = require('../models/itemModel');

//CREATE（POSTリクエストに対処）
router.post('/', (req, res) => {
    const { comment } = req.body; //分割代入、{comment:〇〇, なんとか:〇〇}の同名の変数に同名のプロパティを追加するというもの、該当しないプロパティは無視されるというものだったと思う。
    const Item = new ItemModel();
    //プロジェクトに合わせて変更する。
    Item.comment = comment;
    Item.save(err => {
        if (err) {
            res.send(err);
        }
        else {
            //res.json({ message: 'DBと接続成功' });
            //res.status(200).send(`「${comment}」はDBに追加されました`); //クライアント側にステータスコード(200:成功)をレスポンスする。
            ItemModel.find({}, (findErr, characterArr) => {
                if (findErr) res.status(500).send()
                else res.status(200).send(characterArr);
            })
        }
    })
})

//READ（GETリクエストに対処）
router.get('/', (req, res) => {
    ItemModel
        .find({}, (err, characterArray) => {
            if (err) res.status(500), send()
            else res.send(characterArray);
        });
});

//UPDATE（PUTリクエストに対処）

//DELETE（DELETEリクエストに対処）
router.delete('/', (req, res) => {
    const { id } = req.body;
    ItemModel
        .findByIdAndDelete(id, err => {
            if (err) res.status(500).send()
            else {
                itemModel.find({}, (findErr, characterArray) => {
                    if (findErr) res.status(500).send()
                    else res.status(200).send(characterArray);
                });
            }
        });
})

module.exports = router;