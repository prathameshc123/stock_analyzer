import pool from "../config/db.js";

export const createCompany = async (req, res, next) => {
  try {
    const { name, ticker } = req.body;
    const result = await pool.query(
      "INSERT INTO companies(name, ticker) VALUES($1,$2) RETURNING *;",
      [name, ticker]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM companies;");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, ticker } = req.body;
    const result = await pool.query(
      "UPDATE companies SET name=$1, ticker=$2 WHERE company_id=$3 RETURNING *;",
      [name, ticker, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM companies WHERE company_id=$1;", [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
