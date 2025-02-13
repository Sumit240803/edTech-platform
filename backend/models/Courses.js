import mongoose from "mongoose";

const courseSchema =new mongoose.Schema({
    name : {type : String}
})

export default mongoose.model("Courses" , courseSchema);