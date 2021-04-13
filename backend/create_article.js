const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")

// create article
//createArticle
router.post('/admin/createArticle', cors(),function (req, res) {
    db.connect()
    let article= new db.Article(req.body.articleInformation)
    article.save(function (err) {
        if (err) {
            res.status(500).send()
            return
        }
        res.send(article._id)
    })
})

//updateArticle
router.post('/admin/updateArticle', cors(),function (req, res) {
    db.connect()
    let info = req.body.articleInformation
    db.Article.find({_id: info._id}, function (err, docs) {
        if (err) {
            return
        }
        docs[0].Tile = info.title
        docs[0].Text = info.text
        docs[0].Status = info.status
        docs[0].tag=info.tag
        docs[0].read=0
        docs[0].like=[]
        docs[0].collect=[]
        if (info.hasImage === "1"){
             docs[0].img.push(req.body.img_path)
        }else{
            docs[0].img.push("默认图片地址")  /// 要改
        }
        if(info.status){ //info.status:0 draft, 1 posted
            docs[0].Post_time=info.time
        }
        db.Article(docs[0]).save(function (err) {
            if (err) {
                res.status(500).send()
                return
            }
            res.send()
        })
    })
})

module.exports = router