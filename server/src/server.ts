import express from "express";
import cors from "cors";
import { Database } from "sqlite3";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = new Database("test_db");

app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM Products", (err, rows) => {
    console.log(rows);
    res.end();
  });
});

// Formatter with test to and from body

app.listen(3000);
