const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: { type: authorSchema, required: true },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);

  course.author.name = "Late Updated";
  course.save();
}
async function updateAuthor1(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "Jonny Sins",
      },
      //   $unset: {
      //     "author": "",
      //   },
    }
  );
}

// createCourse("Node Course", new Author({ name: "Late6002" }));
// updateAuthor("6280c17a8666726baf5705d3");
updateAuthor1("6280c17a8666726baf5705d3");
