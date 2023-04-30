const express = require("express");
const CustomError = require("../core/error");

const router = express.Router();

router.get("/", async (request, response) => {
  const todos = await TodoModel.find({});
  response.json(todos);
});

router.get("/todo/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const todo = await TodoModel.findById(id);
    if (!todo) return next(new Error("Todo not found"));
    return response.json(todo);
  } catch (err) {
    next(new CustomError(err.message, 400));
  }
});

router.put("/updateTodo", async (req, res) => {
  const { status, id, text } = req.body;
  await TodoModel.updateOne(
    { status: "ONGOING" },
    {
      status,
      text,
    }
  );
  res.json({ message: `Todo with id :${id} updated successfully` });
});
router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const todo = await TodoModel.findOne({ _id: id });
  if (!todo) return response.json({ message: "no todo found" });
  await TodoModel.deleteOne({ _id: id });
  response.json({ message: `Todo with id :${id} deleted successfully` });
});

module.exports = router;
