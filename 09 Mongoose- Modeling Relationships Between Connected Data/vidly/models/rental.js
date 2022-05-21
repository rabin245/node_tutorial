const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi); // move to index.js
const mongoose = require("mongoose");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        // didnot reuse customer schema because we only want the bare minimum in rental schema
        name: { type: String, required: true, minlength: 5, maxlength: 30 },
        isGold: { type: Boolean, default: false },
        phone: { type: String, required: true, minlength: 5 },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        //  only need two properties from movieSchema
        title: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255,
        },
        dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      dafault: Date.now,
      required: true,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

exports.Rental = Rental;
exports.validate = validateRental;
