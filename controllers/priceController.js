import pool from "../config/db.js";

export const addPrice = async (req, res, next) => {
  try {
    const { companyId, price } = req.body;
    const result = await pool.query(
      "INSERT INTO stock_prices(company_id, price, recorded_at) VALUES($1, $2, NOW()) RETURNING *;",
      [companyId, price]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getPrices = async (req, res, next) => {
  try {
    const { companyId } = req.params;
    const result = await pool.query(
      "SELECT * FROM stock_prices WHERE company_id=$1 ORDER BY recorded_at DESC;",
      [companyId]
    );
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
