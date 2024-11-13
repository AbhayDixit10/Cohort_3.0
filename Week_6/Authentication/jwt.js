    //Basic Authentication through Express server - Backend of index.html

    const express = require("express");
    const jwt = require("jsonwebtoken");
    const app = express();
    app.use(express.json());
    const JWT_SECRET = "randomstrings"

    let users = [];

    // function generateToken() {
    //     const words = ["a", "b", "c", "d", "e", 0, 1, 2, 3, 4, 5]

    //     let token = ""
    //     for (let i = 0; i < 20; i++) {
    //         token += words[Math.floor(Math.random() * words.length)];
    //     };

    //     return token;
    // }

    function auth(req, res, next) {
        const token = req.headers.token;
        console.log(token);
        const decoded = jwt.verify(token, JWT_SECRET, (err, decode) => {
            if (err) {
                res.send({
                    mssg: "Something wrong happend in auth",
                    error: err.message
                });
            } else {
                req.un = decode;    
                next();
            };
        });


    };

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
            const token = jwt.sign({
                username: username
            }, JWT_SECRET);

            user.token = token;
            // res.send({
            //     Your_Token: token,
            //     Mssg: "Sign In Is Success"
            // })
            res.send(token);
        } else {
            res.status(404).send({
                mssg: "Invalid password or username"
            })
        }
        // console.log(users);
        // console.log(user);
    })

    app.get("/me", auth, function (req, res) {
        const data = req.un;

        res.send({
            mssg: data.username
        })
    });

    app.get("/", function(req,res){
        res.sendFile(__dirname + "/index.html")
    })
    app.listen(3000);