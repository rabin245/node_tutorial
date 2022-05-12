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

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
  //   const course = await Course.findByIdAndDelete(id);
  //   console.log(course);
}

removeCourse("627d37c1f906da2779a9b4e5");
