const { z } = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateSchema = z.object({
    name: z.string().min(3).max(10),
    username: z.string().min(3).max(20),
    password: z.string().min(5).max(10),
    email: z.string().email(),
    confirm_password: z.string().min(5).max(10),
}).refine((data) => data.password === data.confirm_password, {
    message: "Confirm Password must match",
    path: ["confirm_password"],
});

const validateCourse = z.object({
    title: z.string().min(3).max(50),
    description: z.string(),
    price: z.number().min(2),
    imageUrl: z.string(),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced"])
});

function authUser(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).send({
            mssg: "Token is missing.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
        req.userID = decoded.id;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        res.status(403).send({
            mssg: "Invalid or expired token.",
            error: error.message,
        });
    }
}

function authAdmin(req, res, next) {
    const token = req.headers.token;
    console.log(token)
    if (!token) {
        return res.status(401).send({
            mssg: "Token is missing.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        req.userID = decoded.id;
        next();
    } catch (error) {
        console.error("JWT verification error:", error.message);
        res.status(403).send({
            mssg: "Invalid or expired token.",
            error: error.message,
        });
    }
};

module.exports = {
    validateSchema,
    authUser,
    validateCourse,
    authAdmin,
}
