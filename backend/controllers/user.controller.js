import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "the_cake_is_a_lie";

// Generate an auth token
const generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

// Hash the password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] }
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { username, password, public_key, is_bot } = req.body;
    const hashedPassword = await hashPassword(password);
    const authToken = generateAuthToken(username);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      public_key,
      is_bot,
      auth_token: authToken
    });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      public_key: newUser.public_key,
      is_bot: newUser.is_bot,
      auth_token: newUser.auth_token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate new auth token on login
    const authToken = generateAuthToken(user.id);
    user.auth_token = authToken;
    await user.save();

    res.status(200).json({
      id: user.id,
      username: user.username,
      public_key: user.public_key,
      is_bot: user.is_bot,
      auth_token: user.auth_token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, public_key, is_bot } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username;
    user.public_key = public_key;
    user.is_bot = is_bot;

    if (password) {
      user.password = await hashPassword(password);
    }

    await user.save();
    res.status(200).json({
      id: user.id,
      username: user.username,
      public_key: user.public_key,
      is_bot: user.is_bot,
      auth_token: user.auth_token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
