import pool from "../config/db.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Buy stocks
export const buyStock = async (req, res, next) => {
  try {
    const { user_id, company_id, quantity, price } = req.body;

    if (!user_id || !company_id || !quantity || !price) {
      throw new ApiError(400, "All fields are required");
    }

    await pool.query("CALL buy_stock($1, $2, $3, $4)", [
      user_id,
      company_id,
      quantity,
      price,
    ]);

    res.json(new ApiResponse(200, null, "Stock purchased successfully"));
  } catch (err) {
    next(err);
  }
};

// Sell stocks
export const sellStock = async (req, res, next) => {
  try {
    const { user_id, company_id, quantity, price } = req.body;

    if (!user_id || !company_id || !quantity || !price) {
      throw new ApiError(400, "All fields are required");
    }

    await pool.query("CALL sell_stock($1, $2, $3, $4)", [
      user_id,
      company_id,
      quantity,
      price,
    ]);

    res.json(new ApiResponse(200, null, "Stock sold successfully"));
  } catch (err) {
    next(err);
  }
};

// Get holdings for a user
export const getHoldings = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      `SELECT h.holding_id, c.name AS company, h.quantity, h.avg_buy_price
       FROM holdings h
       JOIN companies c ON h.company_id = c.company_id
       WHERE h.user_id = $1`,
      [user_id]
    );

    res.json(new ApiResponse(200, result.rows, "Holdings fetched successfully"));
  } catch (err) {
    next(err);
  }
};

// Get transactions for a user
export const getTransactions = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      `SELECT t.transaction_id, c.name AS company, t.price, t.recorded_at
       FROM transactions t
       JOIN companies c ON t.company_id = c.company_id
       WHERE t.user_id = $1
       ORDER BY t.recorded_at DESC`,
      [user_id]
    );

    res.json(new ApiResponse(200, result.rows, "Transactions fetched successfully"));
  } catch (err) {
    next(err);
  }
};
export const getPortfolioReport = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Call the Postgres function
    const result = await pool.query(
      "SELECT * FROM portfolio_report_frontend($1);",
      [userId]
    );

    res.status(200).json({
      success: true,
      data: result.rows, // array of rows returned by the function
    });
  } catch (error) {
    next(error); // pass to error middleware
  }
};

export const getPortfolioGain = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      "SELECT calculate_portfolio_gain($1) AS total_gain;",
      [userId]
    );

    res.status(200).json({
      success: true,
      total_gain: result.rows[0].total_gain,
    });
  } catch (error) {
    next(error);
  }
};
