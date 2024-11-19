const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateCourse } = require("../auth");
const { authUser, authAdmin } = require("../auth");
const { courseModel } = require("../database");
require("dotenv").config();

const courseRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET;

courseRouter.post("/create", authAdmin, async function(req,res){
    const userID = req.userID;
    try {
        const validationRes = validateCourse.safeParse(req.body);
        if(!validationRes.success){
            return res.status(404).send({
                mssg: "Error in course validation.",
            });
        } else {
           const { title, description, price, imageUrl, difficulty } = validationRes.data;

           await courseModel.create({
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            difficulty: difficulty,
            creatorId: userID
           });
           res.send({
            mssg: "Course created successfully successfully."
           })
        }
    } catch (error) {
        res.status(404).send({
            mssg: "Error occurred in creating course.",
            error: error.message
        })
    }

});

courseRouter.get("/mine", authAdmin, async function (req,res){
    const userID = req.userID;
    try{
        const response = await courseModel.find({ creatorId: userID });
        if(response){
            res.send({ courses: response});
        }
    } catch (error){
        res.status(500).send({
            mssg: "Erorr in fetching course details:",
            error: error.message
        })
    }

})

courseRouter.get("/", authAdmin, async function (req,res){
    const userID = req.userID;
    try{
        const response = await courseModel.find();
        if(response){
            res.send({ courses: response});
        }
    } catch (error){
        res.status(500).send({
            mssg: "Erorr in fetching course details:",
            error: error.message
        })
    }

})

courseRouter.put("/update", authAdmin, async function(req,res){
    const userID = req.userID;
    const courseId = req.body.courseId;
    try {
        const validationRes = validateCourse.safeParse(req.body);
        if(!validationRes.success){
            return res.status(404).send({
                mssg: "Error in input validations!"
            })
        } else {
            const validatedInp = validationRes.data;
            const course = await courseModel.updateOne({
                _id: courseId,
                creatorId: userID
            },{
                title: validatedInp.title,
                description: validatedInp.description,
                price: validatedInp.price,
                imageUrl: validatedInp.imageUrl,
                difficulty: validatedInp.difficulty
            })

            res.send({
                mssg: "Course Updated Succsesfully.",
                course: course
            })
        }
    } catch (error) {
        res.status(500).send({
            mssg: "Error occurred in updating course.",
            error: error.message
        })
    }
});

courseRouter.delete("/delete", authAdmin, async function(req,res){
    const creatorId = req.userID;
    const courseId = req.body.courseId;
    if(!creatorId || !courseId){
        return res.status(404).send({
            mssg: "Course ID or cretor ID is invalid."
        });
    }
    try {
        await courseModel.deleteOne({ _id: courseId, creatorId: creatorId});
        res.send({
            mssg: "Course deleted successfully."
        })
    } catch (error) {
        res.status(500).send({
            mssg: "Error occurred in deleting course.",
            error: error.message
        })
    }
});

module.exports = { courseRouter };