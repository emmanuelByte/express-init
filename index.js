const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const todos = [
  { id: 1, text: "Hello", status: "ONGOING" },
  { id: 2, text: "Hey", status: "COMPLETED" },
  { id: 3, text: "I need to chop", status: "CANCELLED" },
];

app.get("/", (request, response) => {
  response.json(todos);
});
app.get("/:id", (request, response) => {
  const { id } = request.params;
  const item = todos.find((value) => {
    return value.id == id;
  });
  console.log(item);
  if (!item) response.json({ message: "no item found" });
  else response.json(item);
});
app.post("/createTodo", (request, response) => {
  const lastItem = todos[todos.length - 1];
  const newId = lastItem.id + 1;
  const body = request.body;
  const newItem = { text: body.text, id: newId, status: "ONGOING" };
  todos.push(newItem);
  response.json({ message: "Todo added successfully" });
});
app.put("/updateTodo", (req, res) => {
  const { status, id } = req.body;
  let index = -1;
  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];
    if (item.id == id) index = i;
  }

  if (index < 0) return response.json({ message: "no item found" });
  todos[index] = {
    ...todos[index],
    status,
  };
  res.json({ message: `Todo with id :${id} updated successfully` });
});
app.delete("/:id", (request, response) => {
  const { id } = request.params;
  let index = -1;
  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];
    if (item.id == id) index = i;
  }

  if (index < 0) return response.json({ message: "no item found" });
  todos.splice(index, 1);
  response.json({ message: `Todo with id :${id} deleted successfully` });
});
// CRUD
// CREATE,READ,UPDATE and DELETE
app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
