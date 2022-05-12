const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to db successfully..."))
  .catch((err) => console.error("Connection to db failed...", err));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Test Course",
    author: "Late",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 69,
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

async function updateCourseQueryFirst(id) {
  // Approach: Query first
  // findById()
  // Modify its properties
  // save()

  const course = await Course.findById(id);
  if (!course) {
    console.log("course not found");
    return;
  }

  course.isPublished = true;
  course.author = "Another Author";
  // course.set({
  //   isPublished: true,
  //   author: "Another Author",
  // });
  const result = await course.save();
  console.log(result);
}
async function updateCourseUpdate(id) {
  // Approach: Update first
  // Update firectly
  // Optionally: get the updated document

  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Late6002",
        isPublished: false,
      },
    }
  );
  // .updateOne({ _id: id }, { author: "Late another", isPublished: true });

  console.log(result);
}

async function updateCourseFindandUpdate(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Late6002 late",
        isPublished: true,
      },
    },
    { new: true } // without new option, above query returns old document before updating
  );

  console.log(course);
}

// updateCourseQueryFirst("627d37c1f906da2779a9b4e5");
// updateCourseUpdate("627d37c1f906da2779a9b4e5");
updateCourseFindandUpdate("627d37c1f906da2779a9b4e5");
