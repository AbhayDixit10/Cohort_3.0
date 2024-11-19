const db = require("mongoose");
const Schema = db.Schema;
const ObjectId = db.ObjectId;

const user = new Schema({
    name: String,
    username: String,
    email: { type: String, unique: true },
    password: String,
})

const admin = new Schema({
    name: String,
    username: String,
    email: { type: String, unique: true },
    password: String,
})

const course = new Schema({
    title: String,
    descritpion: String,
    price: Number,
    imageUrl: String,
    difficulty: String,
    creatorId: ObjectId
})

const purchase = new Schema({
    courseId: ObjectId,
    userId: ObjectId
});

const userModel = db.model("users", user);
const adminModel = db.model("admin", admin);
const courseModel = db.model("course", course);
const purchaseModel = db.model("purchase", purchase);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
