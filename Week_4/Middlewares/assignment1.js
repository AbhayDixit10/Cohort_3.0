const express = require("express");
const app = express();
app.use(express.json())

let requestCounter = 0;
// Middleware👇
app.use(function(req,res,next){
    requestCounter += 1;
    next();
});

app.get("/user1", function(req,res){
    res.json({
        "content": "I am user1"
    })
});
app.get("/user2", function(req,res){
    res.json({
        "content": "I am user2"
    })
});
app.get("/req", function(req,res){
    res.json({
        "Request Count": requestCounter
    })
})

app.listen(3000);
