const TodoModel = require("../models/todo.model");

class TodoController {
  async index(req, res) {
    const {
      headers: {
        loggedUser: { _id: userId },
      },
    } = req;
    
    const data = await TodoModel.find({ userId });

    res.send({ data });
  }

  async store(req, res) {
    const {
      body: data,
      headers: {
        loggedUser: { _id: userId },
      },
    } = req;

    data.userId = userId;

    const newTodo = await TodoModel.create(data);

    res.send({ data: newTodo });
  }

  async getOne(req, res) {
    const { id } = req.params;

    try {
      const data = await TodoModel.findById(id);
      res.send({ data });
    } catch (e) {
      res.status(400).send({ message: "Todo not exists" });
    }
  }

  async update(req, res) {
    const {
      params: { id },
      body,
    } = req;

    const todo = await TodoModel.findOneAndUpdate(id, body).lean();

    res.send({
      data: {
        ...todo,
        ...body,
      },
    });
  }

  async remove(req, res) {
    const { id } = req.params;

    try {
      const todo = await TodoModel.findByIdAndDelete(id);
      if (todo) {
        res.send({ message: "Todo removed" });
      }
      throw new Error("Todo not exist");
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new TodoController();
