// Trade off between query performance vs consistency

// Using referenes (Normalization) -> CONSISTENCY
let author = {
  name: "Late",
};

let course = {
  author: "id",
};

// Using Embedded documents (Denormalization) -> PERFORMANCE
let course = {
  author: {
    name: "Late",
  },
};

// Hybrid
let author = {
  name: "Late",
  // 50 other properties
};

let course = {
  author: {
    id: "ref",
    name: "Late",
  },
};
