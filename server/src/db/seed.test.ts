import { beforeEach, describe } from "node:test";
import { Database } from "sqlite3";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { seed } from "./seed";
import { unlink } from "node:fs/promises";
import path from "node:path";

describe("database seed", () => {
  test("should create 5 products in the database if table DON'T exist", async () => {
    const db = new Database(":memory:");

    await seed(db);

    const rows = await count(db);

    expect(rows).toBe(5);
  });

  test("should not create table and insert products if table EXISTS", async () => {
    const db = new Database(":memory:");

    await createTable(db);
    await seed(db);

    const rows = await count(db);

    expect(rows).toBe(0);
  });
});

function createTable(db: Database): Promise<void> {
  return new Promise((resolve) => {
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
        resolve();
      }
    );
  });
}

function count(db: Database): Promise<number> {
  return new Promise((resolve) => {
    db.get("SELECT COUNT(*) as count FROM Products;", (err, row: any) => {
      resolve(row.count);
    });
  });
}
