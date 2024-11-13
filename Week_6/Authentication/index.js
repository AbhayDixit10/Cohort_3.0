//Basic Authentication through Express server

const express = require("express");
const app = express();
app.use(express.json());

let users = [];

function generateToken() {
    const words = ["a", "b", "c", "d", "e", 0, 1, 2, 3, 4, 5]

    let token = ""
    for (let i = 0; i < 20; i++) {
        token += words[Math.floor(Math.random() * words.length)];
    };

    return token;
}

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })

    res.json({
        mssg: "SignUp Is Successs"
    })

    console.log(users);
});

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(u => u.username === username && u.password === password)

    if (user) {
        const token = generateToken();
        user.token = token;
        res.send({
            Your_Token: token,
            Mssg: "Sign In Is Success"
        })
    } else {
        res.status(404).send({
            mssg: "Invalid password or username"
        })
    }
    console.log(users);
    console.log(user);
})


app.listen(3000);