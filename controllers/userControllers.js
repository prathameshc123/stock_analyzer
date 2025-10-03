import pool from "../config/db.js";
import bcrypt from "bcrypt";

// REGISTER USER
export const registerUser = async (req, res, next) => {
  try {
    console.log("Step 1: Received body", req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, statusCode: 400, message: "All fields are required" });
    }

    console.log("Step 2: Check existing user");

    // Check if user exists
    const existing = await pool.query("SELECT * FROM users WHERE email = $1 OR name = $2", [email, username]);

    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, statusCode: 400, message: "User already exists" });
    }

    console.log("Step 3: Hash password");

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Step 4: Insert user");

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id, name, email",
      [username, email, hashedPassword]
    );

    console.log("Step 5: User inserted successfully");

    return res.status(201).json({
      success: true,
      statusCode: 201,
      data: result.rows[0],
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
  }
};

// LOGIN USER
export const loginUser = async (req, res, next) => {
  try {
    console.log("Login: Received body", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, statusCode: 400, message: "Email and password are required" });
    }

    console.log("Login: Fetching user from DB");

    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ success: false, statusCode: 401, message: "Invalid email or password" });
    }

    console.log("Login: Comparing password");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ success: false, statusCode: 401, message: "Invalid email or password" });
    }

    console.log("Login: Successful");

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: { id: user.user_id, name: user.name, email: user.email },
      message: "Login successful",
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ success: false, statusCode: 500, message: "Internal Server Error" });
  }
};



// Get all users
export const getUsers = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users;");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// Get user by ID
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM users WHERE user_id=$1;", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const result = await pool.query(
      "UPDATE users SET username=$1, email=$2 WHERE user_id=$3 RETURNING *;",
      [username, email, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE user_id=$1;", [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
