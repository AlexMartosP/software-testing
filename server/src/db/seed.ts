import { Database } from "sqlite3";

export function seed(db: Database): Promise<void> {
  return new Promise((resolve) => {
    db.serialize(() => {
      db.get(
        `SELECT EXISTS (SELECT name FROM sqlite_schema WHERE type="table" AND name="Products");`,
        (err, row) => {
          const exists = Object.values(row as Object)[0] === 1;

          if (!exists) {
            db.run(
              `
              CREATE TABLE Products 
              (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT, price DECIMAL(10,2), 
                created_at TEXT
              );
              `,
              () => {
                db.run(
                  `
                  INSERT INTO Products (name, price, created_at) VALUES 
                  ('Product 1', 19.99, '2024-01-16 12:00:00'),    
                  ('Product 2', 29.99, '2024-01-16 12:30:00'),
                  ('Product 3', 39.99, '2024-01-16 13:00:00'),
                  ('Product 4', 49.99, '2024-01-16 13:30:00'),
                  ('Product 5', 59.99, '2024-01-16 14:00:00');
                `,
                  () => {
                    resolve();
                  }
                );
              }
            );
          } else {
            resolve();
          }
        }
      );
    });
  });
}

const db = new Database("test_db");

seed(db);
