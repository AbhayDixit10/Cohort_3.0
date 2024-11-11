const express = require("express");
const app = express();
app.use(express.json())
let todo = []

app.post("/", function (req,res){
    const title = req.body.title;
    const id = req.body.id;
    todo.push({
        title: title,
        id: id
    });
    res.json({});
})

app.get("/", function(req,res){
    res.json(
        todo
    )
});

app.listen(3000);



