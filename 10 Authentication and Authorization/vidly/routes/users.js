const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Email already registered.");

  //   user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });
  // Note: for password complexity check joi-password-complexity package
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  await user.save();

  // res.send(user); // we dont want to send back password in response
  // first approach
  //   res.send({
  //     name: user.name,
  //     email: user.email,
  //   });
  // second approach (using lodash)
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
