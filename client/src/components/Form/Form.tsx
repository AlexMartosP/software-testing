import { useState } from "react";
import { useCreateProduct } from "./usePostProduct";

export function Form() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
  });
  const { mutate, isLoading, error } = useCreateProduct();

  console.log(isLoading);

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault();

        mutate({
          name: formData.name,
          price: formData.price,
          createdAt: new Date().toISOString(),
        });
      }}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Name of the product"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Price
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                price: parseInt(e.target.value),
              }))
            }
          />
        </div>
      </div>
      <button className="mt-4 bg-slate-900 text-white px-10 py-2 rounded-md">
        Create
      </button>
      {isLoading && "Loading..."}
      {error}
    </form>
  );
}
