const fs = require("fs").promises;
const express = require("express");
const app = express();
app.use(express.json())

let todo = []
async function readingFile(file) {
    const content = await fs.readFile(file, "utf-8");
    return JSON.parse(content);
}

app.get("/", function (req, res) {
    readingFile("tasks.json")
        .then((data)=>{
            todo.push(data);
            res.json(todo[0].name);
        })
        .catch((err)=>{res.json(err)})

})

app.listen(3000)
