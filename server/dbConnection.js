const mongoose = require("mongoose");

// Connecting to database
mongoose.connect(
  "mongodb+srv://test:test123@cluster0.otedz.mongodb.net/todoapp?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String },
  status: { type: String },
});

const Todos = mongoose.model("Todos", TodoSchema);

module.exports = {
  Todos,
};