import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "../../feature/products.store";
import NewProductCard from "../../components/cards/NewProductCard";
import { useEffect } from "react";

export default function DefaultHomeScreen() {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductsData());
  }, []);

  return (
    <div className="p-3 md:p-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {allProducts.map((product) => {
          const { name, price, stock, _id } = product;
          return (
            <NewProductCard
              key={_id}
              name={name}
              stock={stock}
              price={price}
              id={_id}
            />
          );
        })}
      </div>
    </div>
  );
}
