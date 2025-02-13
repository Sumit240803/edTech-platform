import express from "express"
import { auth } from "../middleware/authMiddleware.js";
import Courses from "../models/Courses.js";

const router = express.Router();

router.post("/course" , auth , async(req,res)=>{
    try {
        const {name} = req.body;
        const course =new Courses({
            name
        });
        await course.save();
        return res.status(200).json({"Message" : "Course Created Successfully"});
    } catch (error) {
        console.log(error);
    }
})

router.get("/allCourses", auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit;

        const courses = await Courses.find().skip(skip).limit(limit);
        const totalCourses = await Courses.countDocuments();

        res.json({
            totalCourses,
            totalPages: Math.ceil(totalCourses / limit),
            currentPage: page,
            courses
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/totalCourses" , auth , async(req,res)=>{
    try {
        const totalCourses = await Courses.countDocuments();
        res.json({
            totalCourses
        })
    } catch (error) {
        
    }
})

export default router