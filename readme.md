# Todo App Walkthrough README

This README provides a step-by-step walkthrough of the code for a simple Todo app using the Express.js framework. The app features a basic RESTful API to manage a list of todos with operations such as Create, Read, Update, and Delete (CRUD).

## Prerequisites

Ensure that you have Node.js and npm installed on your machine. If not, you can download and install them from the official website.

## Project setup

1. Create a new directory for your project and navigate to it in the terminal.
2. Run npm init -y to create a package.json file with default settings.
3. Install Express.js by running npm install express.

## Code walkthrough

The code can be divided into different sections to better understand its functionality:

### Imports and setup

```js
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
```

1. Import the Express.js module.
2. Create an instance of the Express application.
3. Set the port number on which the app will listen.
4. Use express.json() middleware to parse incoming JSON data in request bodies.

### Initial data

```js
const todos = [
  { id: 1, text: "Hello", status: "ONGOING" },
  { id: 2, text: "Hey", status: "COMPLETED" },
  { id: 3, text: "I need to chop", status: "CANCELLED" },
];
```

Create an initial list of todos as an array of objects. Each todo has an `id`, `text`, and `status`.

## Routes

### 1. GET all todos:

```js
app.get("/", (request, response) => {
  response.json(todos);
});
```

Respond with the full list of todos when a GET request is made to the root URL.

### 2. GET a todo by ID:

```js
app.get("/:id", (request, response) => {
  const { id } = request.params;
  const item = todos.find((value) => {
    return value.id == id;
  });
  console.log(item);
  if (!item) response.json({ message: "no item found" });
  else response.json(item);
});
```

Find a todo by ID and return it. If no item is found, respond with an appropriate message.

### 3. Create a new todo:

```js
app.post("/createTodo", (request, response) => {
  const lastItem = todos[todos.length - 1];
  const newId = lastItem.id + 1;
  const body = request.body;
  const newItem = { text: body.text, id: newId, status: "ONGOING" };
  todos.push(newItem);
  response.json({ message: "Todo added successfully" });
});
```

Create a new todo using the provided text in the request body. Assign a new ID and a default status of "ONGOING". Push the new todo to the list and return a success message.

### 4. Update a todo's status:

```js
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
res.json({ message: Todo with id :${id} updated successfully });
});
```

Update the status of a todo by ID, which is provided in the request body along with the new status. Find the todo in the list and update its status. Return a success message.

5. **Delete a todo by ID**:

```javascript
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
```

Delete a todo by ID, which is provided as a route parameter. Find the todo in the list and remove it. Return a success message.

### Start the server

```js
app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
```
