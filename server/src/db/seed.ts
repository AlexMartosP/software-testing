import { Database } from "sqlite3";

const db = new Database("test_db");

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS Products 
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      name TEXT, price DECIMAL(10,2), 
      created_at TEXT
    );
    `
  );

  db.run(
    `
    INSERT INTO Products (name, price, created_at) VALUES 
    ('Product 1', 19.99, '2024-01-16 12:00:00'),    
    ('Product 2', 29.99, '2024-01-16 12:30:00'),
    ('Product 3', 39.99, '2024-01-16 13:00:00'),
    ('Product 4', 49.99, '2024-01-16 13:30:00'),
    ('Product 5', 59.99, '2024-01-16 14:00:00');
  `
  );
});
