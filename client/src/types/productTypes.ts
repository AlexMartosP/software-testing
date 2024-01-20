export type TProduct = {
  id: string;
  name: string;
  price: number;
  createdAt: string;
};

export type TCreateProductBody = Omit<TProduct, "id">;
