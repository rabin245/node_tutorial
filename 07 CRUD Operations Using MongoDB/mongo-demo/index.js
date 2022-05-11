const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Late",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourse() {
  const courses = await Course.find({
    author: "Late",
    isPublished: true,
  })
    .limit(10)
    .sort({ name: 1 }) // 1=>ascending order, -1=>descending order
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// createCourse();
getCourse();
