import { Item } from "../Item/Item";
import { useGetProducts } from "./useGetProducts";

export function List() {
  const { data } = useGetProducts();

  return data?.map((product) => (
    <Item
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price.toString()}
    />
  ));
}
