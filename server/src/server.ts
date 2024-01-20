import express from "express";
import cors from "cors";
import { Database } from "sqlite3";
import { responseFormatter } from "./utils/responseFormatter";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = new Database("test_db");

app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM Products", (err, rows) => {
    const products = responseFormatter(rows, "from-db");

    res.json(products);
  });
});

app.post("/api/products", (req, res) => {
  const body = req.body;

  const [product] = responseFormatter([body], "to-db");
  db.run(
    "INSERT INTO Products (name, price, created_at) (?,?,?)",
    [product.name, product.price, product.created_at],
    () => {
      res.status(201).json({
        status: "CREATED",
      });
    }
  );
});

// Formatter with test to and from body

app.listen(3000);
