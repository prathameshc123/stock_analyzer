# Stock Portfolio API

A RESTful API built with Node.js, Express, and PostgreSQL for managing users, companies, stocks, and portfolios. Users can register, login, buy/sell stocks, view holdings, transactions, and portfolio reports.

---

## Features

- **User Management**: Register, login, update, delete users.
- **Company Management**: Create, update, delete companies.
- **Portfolio Management**:
  - Buy and sell stocks
  - View holdings
  - View transactions
  - Get portfolio report
  - Calculate portfolio gain
- **Stock Prices**: Add and fetch stock prices for companies.

---

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: Basic email/password login with bcrypt
- **Database Access**: `pg` Node.js library

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/stock-portfolio-api.git
cd stock-portfolio-api
