const mongoose = require("mongoose")

const courseSchema = mongoose({
    name : {type : String}
})

module.exports = mongoose.model("Courses" , courseSchema);