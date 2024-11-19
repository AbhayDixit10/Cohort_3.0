const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user-router");
const { adminRouter } = require("./routes/admin-router");
const { courseRouter } = require("./routes/course-router");
require("dotenv").config();

const dbUrl = process.env.DB_URl;
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
    
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main(){
    await mongoose.connect(dbUrl);
    console.log("In index.js file")
    app.listen(port, () => console.log("Server running on port 3000"));
}

main();