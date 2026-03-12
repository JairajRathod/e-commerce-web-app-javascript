export default function ProductCard({
  Name = "",
  price = "0",
  rating = "",
  id = "",
}) {
  return (
    <div className="p-3 rounded-2xl shadow-xl w-fit">
      <div className=" h-[200px] w-[150px]">
        <img
          src="asfs"
          alt="Image Not Found"
          className="w-full h-full bg-gray-100 rounded-xl"
        />
      </div>
      <div className="mt-3">
        <div className="">Product Name</div>
        <div>Rating</div>
        <div className="text-xl font-bold">$Price</div>
      </div>
    </div>
  );
}
