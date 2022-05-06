const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  // const schema = Joi.object({
  //     name: Joi.string().min(3).required()
  // });

  // const result = schema.validate(req.body);
  // console.log(result);

  // if (result.error) {
  //     // 400 Bad Request
  //     // res.status(400).send(result.error);
  //     res.status(400).send(result.error.details[0].message);
  //     return;
  // }
  const { error } = validateCourse(req.body); // result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(req.params);
  res.send(req.query);
});

// update
app.put("/api/courses/:id", (req, res) => {
  // Look up the course
  // if doesnot exist, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  // validate
  // if invalid, reutrn 400 - bad request
  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body); // result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // update course
  course.name = req.body.name;
  // return the updated course
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  // look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // return the course
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
