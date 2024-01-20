export function responseFormatter<
  Dir extends "to-db" | "from-db",
  R = Dir extends "to-db"
    ? { id: number; name: string; price: string; created_at: string }[]
    : { id: number; name: string; price: string; createdAt: string }[]
>(data: any[], direction: Dir): R {
  if (direction === "to-db") {
    return data.map((d) => ({
      id: d.id,
      name: d.name,
      price: d.price,
      created_at: d.createdAt,
    })) as R;
  }

  return data.map((d) => ({
    id: d.id,
    name: d.name,
    price: d.price,
    createdAt: d.created_at,
  })) as R;
}
