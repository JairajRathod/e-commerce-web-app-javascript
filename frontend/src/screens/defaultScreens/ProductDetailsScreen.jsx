import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentProductDetails } from "../../feature/products.store";
import { FullProductDetails } from "../../components/componentsExport";
import OrderScreen from "./OrderScreen";

export default function ProductDetailsScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProductDetails } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getCurrentProductDetails(id));
  }, []);

  return (
    <div className="p-5 flex flex-row justify-center items-center mt-10">
      <div>
        <FullProductDetails productDetails={currentProductDetails} id={id} />
      </div>
    </div>
  );
}
