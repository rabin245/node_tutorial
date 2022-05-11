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
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  const courses = await Course
    //   .find({ author: "Late", isPublished: true,})
    .find({ price: { $gt: 10 } }) // greater than 10
    .find({ price: { $gte: 10, $lte: 20 } }) // greater-equal to 10 and less-eqaul to 20
    .find({ price: { $in: [10, 15, 20] } }) // price equal to 10 or 15 or 20
    .limit(10)
    .sort({ name: 1 }) // 1=>ascending order, -1=>descending order
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

// createCourse();
getCourse();
