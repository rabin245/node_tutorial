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
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createCourse("Node Course", [
//   new Author({ name: "Late6002" }),
//   new Author({ name: "Late6002second" }),
// ]);

// addAuthor("6280d4f130e170ee69c761f0", new Author({ name: "Add author" }));

removeAuthor("6280d4f130e170ee69c761f0", "6280d5290dc2b46600a77d0b");

// async function updateAuthor(courseId) {
//   const course = await Course.findById(courseId);

//   course.author.name = "Late Updated";
//   course.save();
// }
// async function updateAuthor1(courseId) {
//   const course = await Course.updateOne(
//     { _id: courseId },
//     {
//       $set: {
//         "author.name": "Jonny Sins",
//       },
//       //   $unset: {
//       //     "author": "",
//       //   },
//     }
//   );
// }
// updateAuthor("6280c17a8666726baf5705d3");
// updateAuthor1("6280c17a8666726baf5705d3");
