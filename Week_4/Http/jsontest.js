const { json } = require("express");

const fs = require("fs").promises;

// const content = fs.readFile("tasks.json","utf-8", function(err, data){
//     if(err){
//         console.log(err);
//     }
//     console.log(data);
    
// })

// console.log(content);

let todo = []
async function fileReading(file) {
    const content = await fs.readFile(file,"utf-8");
    return content;
}

fileReading("tasks.json").then((data) => {
    const parsed = JSON.parse(data);
    todo.push(parsed);
    console.log(todo);
    // console.log("File content:", data);
}).catch((error) => {
    console.error("Error reading file:", error);
});

// console.log(todo);
