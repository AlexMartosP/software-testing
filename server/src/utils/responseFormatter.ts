export function responseFormatter(data: any[]) {
  return data.map((d) => ({
    id: d.id,
    name: d.name,
    price: d.price,
    createdAt: d.created_at,
  }));
}
