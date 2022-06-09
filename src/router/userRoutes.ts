import express from "express";
import { User } from "../mongoDb/models/user";

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { email } = req.body;

    if (await User.findOne({ email })) {
      throw { err: "User already exists" };
    } else {
      const user = await User.create(req.body);

      user.password = undefined;

      return res.send({ user, message: "New user created" });
    }
  } catch (message) {
    return res.status(400).send({ message: "Error creating new user" });
  }
});

router.delete("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      throw { err: "I need email for this!" };
    }
    const user = await User.findOneAndDelete(req.params);

    user.password = undefined;

    return res.send({ user, message: "User deleted" });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ err: "Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    return res.send({ users });
  } catch {
    return res.status(400).send({ message: "Error reading user" });
  }
});
router.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const users = await User.find({ email });

    return res.send({ user: users[0] });
  } catch {
    return res.status(400).send({ message: "Error reading user" });
  }
});

router.put("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const data = req.body;

    const user = await User.findOneAndUpdate({ email }, data);

    return res.send({ email, user });
  } catch {
    return res.status(400).send({ message: "Error updating user" });
  }
});

export default router;
