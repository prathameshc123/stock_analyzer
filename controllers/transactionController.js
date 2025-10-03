import pool from "../config/db.js";

export const getTransactions = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id=$1 ORDER BY created_at DESC;",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
