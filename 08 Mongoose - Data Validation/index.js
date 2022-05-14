const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to db successfully..."))
  .catch((err) => console.error("Connection to db failed...", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Test Course",
    category: "-",
    author: "Late",
    tags: ["angular", "frontend"],
    isPublished: true,
    price: 469,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getCourses() {
  const pageNumber = 1;
  const pageSize = 10;

  const courses = await Course.find({ author: "Late", isPublished: true })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}

async function updateCourseQueryFirst(id) {
  const course = await Course.findById(id);
  if (!course) {
    console.log("course not found");
    return;
  }

  course.isPublished = true;
  course.author = "Another Author";
  const result = await course.save();
  console.log(result);
}
async function updateCourseUpdate(id) {
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Late6002",
        isPublished: false,
      },
    }
  );

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
    { new: true }
  );

  console.log(course);
}

createCourse();
