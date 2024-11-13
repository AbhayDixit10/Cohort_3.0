const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "secretKey"
const app = express();
app.use(express.json());

let accounts = [{
    username: "abhay",
    password: 123,
}, {
    username: "somit",
    password: 321
}]

function auth(req, res, next) {
    const token = req.headers.token;

    if (token) {
        const decode = jwt.verify(token, JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(404).send({
                    mssg: "Something wrong happend",
                    error: err.message
                })
            } else {
                req.user = decode;
                next();
            }
        })
    } else {
        res.status(404).send({
            mssg: "Token invalid"
        })
    }
}

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    accounts.push({
        username: username,
        password: password
    });
    res.send({
        mssg: "Sign up is Success!"
    });
    console.log(accounts);
});

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = accounts.find(u => u.username == username && u.password == password);

    if (user) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);
        user.token = token;
        res.send({
            token: token
        });
    } else {
        res.status(404).send({
            mssg: "Invalid username or password"
        })
    }
});

app.get("/me", auth, function (req, res) {
    const username = req.user;
    res.send({
        username: username.username
    })
})

// app.get("/", function(req,res){
//     res.sendFile(__dirname + "/todoSignup.html")
// })
// app.get("/", function(req,res){
//     res.sendFile(__dirname + "/style.css")
// })


// Todo backend

app.post("/addTodo", auth, function (req, res) {
    const data = req.user;
    const username = data.username;
    // console.log("From addTodo req.user", data.username)
    const todo = req.body.todo;

    const user = accounts.find(u => u.username == username);
    if (user) {
        if (Array.isArray(user.todo)) {
            user.todo.push(todo);
            res.send(user);
        } else {
            user.todo = []
            user.todo.push(todo);
            res.send(user);
        }
    } else {
        res.status(404).send({
            mssg: "User not found"
        })
    }
    // console.log("addTodo user",user)
    // console.log("accounts from addTodo",accounts)
});

app.delete("/deleteTodo",auth, function(req,res){
    const data = req.user;
    const username = data.username;
    const todo = req.body.todo;

    const user = accounts.find(u => u.username == username);

    if(user){
        const newTodoList = user.todo.filter(t => t !== todo);
        user.todo = newTodoList;
        res.send(user);
    } else {
        res.status(404).send({
            mssg: "User not found"
        })
    }
})

app.put("/editTodo",auth, function (req,res){
    const data = req.user;
    const username = data.username;
    const oldTodo = req.body.oldtodo;
    const newTodo = req.body.newtodo;

    const user = accounts.find(u => u.username == username);
    if(user){
        if (user.todo.includes(oldTodo)){
            const newTodoList = user.todo.filter(t => t !== oldTodo)
            user.todo = newTodoList;
            user.todo.push(newTodo) 
            res.send(user)
        } else {
            res.send({
                mssg: "No matching todo in database"
            })
        }

    } else {
        res.status(404).send({
            msssg: "User not found"
        })
    }
});


app.listen(3000);