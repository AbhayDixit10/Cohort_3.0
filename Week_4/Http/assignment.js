// const fs = require("fs");
// const express = require("express");
// const app = express();

// app.get("/file", function(req,res){
//     const content = fs.readFile("b.txt", "utf-8", function(err, data){
//         console.log(data);
//         res.json({"content": data})
//     })

// })

// app.listen("3000");


const fs = require("fs");
const express = require("express");
const app = express();

app.get("/file/:fileName", function (req, res) {
    let name = req.params.fileName;
    fs.readFile(name, "utf-8", function (err, data) {
        if (err) {
            console.log("Error");
        }
        res.json({ content: data });
    })
});

app.listen(3000, () => {
    console.log("Server running on http:/localhost:3000");
});
