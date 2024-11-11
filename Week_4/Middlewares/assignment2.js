// Error handling middleware;

const express = require("express");
const app = express();  

app.get("/user/:id", function (req, res, next) {
    const userId = req.params.id;
    if (isNaN(userId)) {
        const error = new Error("Something is wrong!");
        error.status = 404;
        return next(error);
    } else {
        res.send("Everything is fine")
    }
});

app.use(function (err, req, res, next) {
    res.status(404).json({
        "error": err.message,
        "status": err.status
    })
})

app.listen(3000);