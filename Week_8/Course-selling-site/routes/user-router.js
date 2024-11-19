const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSchema } = require("../auth");
const { userModel } = require("../database");
require("dotenv").config();

const userRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET_USER;


userRouter.post("/signup", async (req, res) => {
    try {
        const validationResults = validateSchema.safeParse(req.body);
        if (!validationResults.success) {
            return res.status(404).send({
                mssg: "Validation error",
                error: validationResults.error.errors,
            });
        }

        const validatedInputs = validationResults.data;
        const encryptedPass = await bcrypt.hash(validatedInputs.password, 5);

        await userModel.create({
            name: validatedInputs.name,
            username: validatedInputs.username,
            email: validatedInputs.email,
            password: encryptedPass,
        });
        res.send({
            mssg: "Signed up success!",
        });
    } catch (error) {
        res.status(500).send({
            mssg: "Error in signing up.",
            error: error.message,
        });
    }
});

userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({
            mssg: "Username or Password invalid",
        });
    }

    try {
        const response = await userModel.findOne({ username });
        if (!response) {
            return res.status(404).send({ mssg: "User not found" });
        }

        const crrctPass = bcrypt.compare(password, response.password);
        if (!crrctPass) {
            return res.status(401).send({ mssg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: response._id.toString() }, JWT_SECRET);
        res.send({ mssg: "Signed in Success", token });
    } catch (error) {
        res.status(500).send({
            mssg: "Error occurred in signing in.",
            error: error.message,
        });
    }
});

module.exports = { userRouter };
