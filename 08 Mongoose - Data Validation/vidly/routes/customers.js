const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 30 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 5 },
});

const Customer = mongoose.model("Customer", customerSchema);

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  try {
    customer = await customer.save();
    res.send(customer);
  } catch (ex) {
    console.log(ex.message);
    res.send(customer);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
      },
    },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("Customer with given id not found!");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer)
    return res.status(404).send("Customer with given id not found!");

  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id)
    .sort("name")
    .select("name phone isGold")
    .limit(10);

  if (!customer)
    return res.status(404).send("Customer with given id not found!");

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).required(),
  });

  return schema.validate(customer);
}

module.exports = router;
