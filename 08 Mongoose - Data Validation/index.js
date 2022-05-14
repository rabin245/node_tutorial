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
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: (v) =>
        new Promise((resolve, reject) => {
          // validation fails if promise is rejected
          // or if promise is resolved to false

          // if (v && v.length > 0) resolve(true);
          // else reject(new Error("A course should at least have one tag"));

          setTimeout(() => {
            // do some async work
            const result = v && v.length > 0;
            resolve(result);
          }, 3000);
        }),
      message: "A course should at least have one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Test Course",
    category: " WEB  ",
    author: "Late",
    tags: ["test"],
    isPublished: true,
    price: 69.7,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}

async function getCourses() {
  const courses = await Course.find({ _id: "627fca0d7e4f9695b21bc420" })
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, date: 1, price: 1 });
  // console.log(courses);
  console.log(courses[0].price); // testing getter for price
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

// createCourse();
getCourses();
