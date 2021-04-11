const express = require('express'),
    app = express()
    expressPort = 3000
    routes = require("./test-route")
    cors = require("cors")

app.listen(expressPort,()=>{
    console.log("listening on " + expressPort)
})

app.use("/test",routes)