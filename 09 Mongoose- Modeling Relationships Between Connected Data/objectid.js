// _id: 627d37c1f906da2779a9b4e5

// 12 bytes

// 4 bytes: timestamp
// 3 bytes: machine identifier
// 2 bytes: process identifier
// 3 bytes: counter

// Driver -> MongoDB

const mongoose = require("mongoose");

// this creates object id showing we dont need to connect to mongodb to create id
const id = new mongoose.Types.ObjectId();

console.log(id);
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid("abcd");
console.log(isValid);
