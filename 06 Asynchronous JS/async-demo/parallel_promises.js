const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
    // reject(new Error("because something failed..."));
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

// if catches error, rejects all promises else fulfills all promises
Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log("Error", err.message));

// races promises, returns first resolved promise
Promise.races([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log("Error", err.message));
