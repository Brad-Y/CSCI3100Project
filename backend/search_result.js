const express = require('express')
const router = express.Router()
const db = require('./database/db')
const mail = require('./mail')
cors = require("cors")
let img = require("./img")


// search result
//search
router.post('/admin/search', cors(),function (req, res) {
    db.connect()
    let info = req.body
    var blacklist
    var result=new Array()
    db.User.find({_id: info._id}, function (err,docs) {
        if (err) {
            return
        }
    })
    blacklist=docs[0].black_list
    if(info.tag){
        db.Article.find({tag:info.tag},{sort: {read:-1}}, function (err,docs_2) {
            if (err) {
                return
            }
            for(var i=0; i<docs.length; i++){
                if(!(blacklist.filter(item=>(docs[i].tag).includes(item)))){
                    result.push(docs_2[i])
                }
            }
            res.send(result)
        })
    }else if(info.user_name){
        db.Article.find({author:info.user_name},{sort: {read:-1}}, function (err,docs_2) {
            if (err) {
                return
            }
            for(var i=0; i<docs.length; i++){
                if(!(blacklist.filter(item=>(docs[i].tag).includes(item)))){
                    result.push(docs_2[i])
                }
            }
            res.send(result)
        })
    }else{
        db.Article.find({title:info.title},{sort: {read:-1}}, function (err,docs_2) {
            if (err) {
                return
            }
            for(var i=0; i<docs.length; i++){
                if(!(blacklist.filter(item=>(docs[i].tag).includes(item)))){
                    result.push(docs_2[i])
                }
            }
            res.send(result)
        })
    }
})

module.exports = router