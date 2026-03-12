import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductForSeller,
  getAllSellerProducts,
  updateProductForSeller,
} from "../../feature/seller.store";
import { Popup } from "../../components/componentsExport";
import InputFieldSecond from "../../components/inputs/InputFieldSecond";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteProductByID } from "../../feature/products.store";

export default function SellerProducts() {
  const dispatch = useDispatch();
  const { allProducts = [] } = useSelector((state) => state.seller);
  const { currentUser } = useSelector((state) => state.user);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
    color: "",
    stock: 0,
  });
  const [currentEditProduct, setCurrentEditProduct] = useState({});

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const tableHeaderText = [
    "S.No",
    "Name",
    "Price",
    "Stock",
    "Total Sold",
    "action",
  ];

  useEffect(() => {
    dispatch(getAllSellerProducts({ sellerId: currentUser._id }));
  }, [currentUser]);

  async function deleteProductFunction(id) {
    await dispatch(deleteProductByID(id));
    await dispatch(getAllSellerProducts({ sellerId: currentUser._id }));
  }

  async function editProductFuction(product) {
    setCurrentEditProduct(product);
    setIsEditOpen(true);
  }

  async function onSubmitActionAdd(event) {
    setIsAddOpen(false);
    event.preventDefault();
    const productData = {
      ...newProduct,
      sellerId: currentUser._id,
    };
    await dispatch(addProductForSeller(productData));
    await dispatch(getAllSellerProducts({ sellerId: currentUser._id }));
  }

  async function onSubmitActionEdit(event) {
    event.preventDefault();
    setIsEditOpen(false);
    console.log("Current Edit Product: ", currentEditProduct);
    await dispatch(updateProductForSeller(currentEditProduct));
    await dispatch(getAllSellerProducts({ sellerId: currentUser._id }));
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-5">
        <button
          onClick={() => {
            setIsAddOpen(true);
          }}
          className=" w-fit bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg transition"
        >
          Add Product
        </button>
      </div>

      <ProductPopup
        isOpen={isAddOpen}
        setIsOpen={setIsAddOpen}
        onSubmitAction={onSubmitActionAdd}
        product={newProduct}
        setProduct={setNewProduct}
      />

      <ProductPopup
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        onSubmitAction={onSubmitActionEdit}
        product={currentEditProduct}
        setProduct={setCurrentEditProduct}
      />

      <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            {tableHeaderText.map((text, index) => (
              <th
                key={index + 1}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                {text}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {allProducts.map((product, index) => (
            <ProductTableRow
              key={product._id}
              sno={index + 1}
              name={product.name}
              price={product.price}
              stock={product.stock}
              totalSold={product.totalSelled}
              id={product._id}
              editAction={() => {
                editProductFuction(product);
              }}
              deleteAction={() => {
                deleteProductFunction(product._id);
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductTableRow({
  sno,
  name,
  price,
  stock,
  totalSold,
  deleteAction,
  editAction,
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-700">{sno}</td>
      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{name}</td>
      <td className="px-6 py-4 text-sm text-gray-700">${price}</td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 text-xs font-medium ${
            stock > 0
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          }  rounded-full`}
        >
          {/*    */}
          {stock > 0 ? "In Stock" : "Out of Stock"} : {stock}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-700">{totalSold}</td>
      <td className="px-6 py-4 text-center flex flex-row gap-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-1 py-1 rounded-lg transition duration-200"
          onClick={editAction}
        >
          <MdEdit fontSize={"20px"} />
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-1 py-1 rounded-lg transition duration-200"
          onClick={deleteAction}
        >
          <MdDelete fontSize={"20px"} />
        </button>
      </td>
    </tr>
  );
}

function ProductPopup({
  isOpen,
  setIsOpen,
  onSubmitAction,
  product,
  setProduct,
}) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={"Add Product"}
    >
      <form action="" onSubmit={onSubmitAction}>
        <InputFieldSecond
          label="Name"
          name="name"
          type="text"
          defaultValue={product?.name}
          placeholderText={"Enter Name"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, name: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="Description"
          name="description"
          type="textarea"
          defaultValue={product?.description}
          placeholderText={"Enter Description"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({
              ...prev,
              description: event.target.value,
            }));
          }}
        />
        <InputFieldSecond
          label="Price"
          name="price"
          type="number"
          defaultValue={product?.price}
          placeholderText={"Enter Price"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, price: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="Brand"
          name="brand"
          type="text"
          defaultValue={product?.brand}
          placeholderText={"Enter Brand"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, brand: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="Color"
          name="color"
          type="text"
          defaultValue={product?.color}
          placeholderText={"Enter Color"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, color: event.target.value }));
          }}
        />
        <InputFieldSecond
          label="Stock"
          name="stock"
          type="number"
          defaultValue={product?.stock}
          placeholderText={"Enter Stock"}
          required={true}
          disable={false}
          updaterFunction={(event) => {
            setProduct((prev) => ({ ...prev, stock: event.target.value }));
          }}
        />
        <button
          type="submit"
          className=" w-fit bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg transition"
        >
          submit
        </button>
      </form>
    </Popup>
  );
}
