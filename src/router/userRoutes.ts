import express from "express";
import { User } from "../mongoDb/models/user";

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { name } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    if (!name) throw new Error("I need Name for this!");

    if (!email) throw new Error("I need Email for this!");

    if (!password) throw new Error("I need Password for this!");

    if (await User.findOne({ email }))
      throw new Error("This Email already exists");

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user, message: "New user created" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

router.delete("/users/", async (req, res) => {
  try {
    throw new Error("I need Email for this!");
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Server Error");
  }
});

router.delete("/users/:email", async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) throw new Error("I need email for this!");

    if (!(await User.findOne({ email })))
      throw new Error("This email does not exist");

    await User.deleteOne({ email });

    return res.send({ message: "User deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Server Error");
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
