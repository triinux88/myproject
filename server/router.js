const express = require("express");
const router = express.Router();
const { Todos } = require("./dbConnection");

router.get("/calc", function (req, res) {
  const a = 4;
  const b = 4;
  const result = a + b;
  res.send({ result });
});

// request === req ja response === res
router.get("/get-todos", async function (request, response) {
  const result = await Todos.find();
  console.log(result);
  response.send(result);
});

router.get("/get-todo/:id", async function (request, response) {
  const result = await Todos.findOne({ _id: request.params.id });
  console.log(result);
  response.send(result);
});

router.patch("/patch-todo/:id", async function (request, response) {
  let state = await Todos.findOne({ _id: request.params.id });
  let flipflop = "";
  if (state.status === "ACTIVE") {
    flipflop = "DONE";
  } else {
    flipflop = "ACTIVE";
  }
  const result = await Todos.updateOne(
    { _id: request.params.id },
    { $set: { status: flipflop } }
  );
  console.log("state Flipped to: ", flipflop);
  response.send(result);
});

router.post("/delete-todo/:id", async function (request, response) {
  const result = await Todos.deleteOne({ _id: request.params.id });
  console.log(result);
  response.send(result);
});

router.post("/add-todo", async function (request, response) {
  if (request.body.title) {
    await Todos.create(request.body);
    console.log("Lisa todo");
  }
  response.send("done");
});

module.exports = router;