import pool from "../config/db.js";

export const getHoldings = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      "SELECT * FROM holdings WHERE user_id=$1;",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
