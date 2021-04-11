// This is some naive design for database related coding

// Connect to mongodb
const mongoose = require('mongoose');
const url = "mongodb+srv://yaohaishu:YHS123456@cluster0.4ccqg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// define schema of the database



// define basic functions
// insert
const db = {
    User : mongoose.model("User",{
            uname:String,
            pwd:String,
            email:String,
            profile:{
                user_name:String,
                gender:String,
                birth:Date,
                introduction:String,
                picture:{}
            },
            liked:[],
            collected:[],
            post:[],
            message:{
                sender:String,
                type:Number,   //(like,collect,comment,announce,complain)
                text:String,
                mstatus:String
            },
            black_list:[],
            is_admin:Boolean,
            is_banned:Boolean
        }
    ),

    Article : mongoose.model("Article", {
        author: {
            _id: String,
            uname: String
        },
        img: {},
        text: String,
        post_time: Date,
        read: Number,
        like: [],
        collect: Number,
        tag: [],
        status: Number,
        comments: {
            author_id: String,  // there may include all info that need to be displayed
            time: Date,
            text: String
        }
    }),

    Tag : mongoose.model("Tag",{
        name:String
    }),
    connect : function () {
        mongoose.connect(url, {useUnifiedTopology: true}, function (err) {
            if (err) {
                console.log('[CONNECT ERROR] - ', err.message);
                return;
            }
            console.log("Connection is successful!");
        });
    },
    my_insert :function (collection,doc) {   //e.g. my_insert("Tag",{name:"fancy"})
        if (collection === "User"){
            var insertObj = new User(doc)
        }
        if (collection === "Article"){
            var insertObj = new Article(doc)
        }
        if (collection === "Tag"){
            var insertObj = new Tag(doc)
        }
        insertObj.save()
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log("insert failed" + err)
                return false
            })
    },


// find
    my_find : function (collection, filter, projection) {  // e.g. filter = {uname:"Allen2"}, filter = {uname:/Allen/}
        if (collection === "User"){               // e.g. projection = {uname:1, pwd:1}
            var f = User
        }
        if (collection === "Article"){
            var f = Article
        }
        if (collection === "Tag"){
            var f = Tag
        }
        f.findOne(filter,projection)
                .then(res => {
                    console.log(res)
                    return res
                })
                .catch(err => {
                    console.log("find failed" + err)
                    return false
                })

    },

// update
    my_update : function (collection, filter, update) {
        if (collection === "User"){
            var up = User
        }
        if (collection === "Article"){
            var up = Article
        }
        if (collection === "Tag"){
            var up = Tag
        }
        up.updateOne(filter, update)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                    console.log("update failed" + err)
                    return false
                }
            )
    },


// delete
    my_delete : function (filter) {
        Article.deleteOne(filter)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                    console.log("delete failed" + err)
                    return false
                }
            )
    }
}
module.exports = db
