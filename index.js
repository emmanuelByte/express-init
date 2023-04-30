const express = require("express");
const connectDB = require("./config/db");
const TodoModel = require("./models/todoModel");
const { default: listEndpoints } = require("list_end_points");
const router = require("./routes/index.routes");
const app = express();
const port = 3000;
require("dotenv").config();
app.use(express.json());

app.use("", router);

app.post("/createTodo", async (request, response) => {
  const body = request.body;
  await TodoModel.create({
    text: body.text,
    status: "ONGOING",
  });
  response.json({ message: "Todo added successfully" });
});
app.use((request, response, next) => {
  next(new Error("404"));
});
app.use((error, req, res, next) => {
  if (error.message == "404") {
    return res.status(404).json({ message: "Page not found" });
  }
  console.log(error);
  res.status(error.statusCode || 500).json({
    message: error.message || "an error occur",
    body: req.body,
    stack: error.stack,
  });
});
// CRUD
// CREATE,READ,UPDATE and DELETE
connectDB().then(() => {
  // server start listening
  app.listen(port, () => {
    listEndpoints(app);
    console.log(`Todo app listening on port ${port}`);
  });
});
