// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: "The user information with the specified ID does not exist",
      });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

server.post("/api/users", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    try {
      const newUser = await User.insert(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.remove(id);
    if (!deletedUser) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(deletedUser);
    }
  } catch {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const updatedUser = await User.update(id, changes);
      if (!updatedUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(updatedUser);
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
