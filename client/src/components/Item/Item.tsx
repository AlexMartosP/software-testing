export function Item({
  id,
  name,
  price,
}: {
  id: string;
  name: string;
  price: string;
}) {
  return (
    <div className="flex justify-between" data-testid="item">
      <h3 className="font-bold">{name}</h3>
      <span className="text-slate-500">{price}</span>
      <button onClick={() => console.log(id)}>X</button>
    </div>
  );
}
