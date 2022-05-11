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

async function getCourses() {
  const pageNumber = 1;
  const pageSize = 10;
  // /api/courses?pageNumber=1&pageSize=10

  const courses = await Course.find({ author: "Late", isPublished: true })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize) // pagination starts from 0
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// createCourse();
getCourses();
