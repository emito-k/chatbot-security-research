// routes/user.route.js
import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
// Add more routes like GET by ID, POST (create), PUT (update), DELETE (delete)

export default router;
