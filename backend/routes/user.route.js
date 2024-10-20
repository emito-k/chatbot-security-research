// routes/user.route.js
import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);            // GET all users
router.get("/:id", getUserById);         // GET user by ID
router.post("/", createUser);            // POST new user
router.put("/:id", updateUser);          // PUT update user
router.delete("/:id", deleteUser);       // DELETE user
router.post("/login", loginUser);

export default router;
