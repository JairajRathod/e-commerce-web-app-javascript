import { FaLongArrowAltRight } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { SellerDetailsForAdmin } from "../../componentsExport";
import { MdSell } from "react-icons/md";

export default function SellerMainCard({ displayData = [] }) {
  const descriptionDataArray = [
    {
      icon: <FaCartShopping color="gray" />,
      text: "Total Products Data",
    },
    {
      icon: <MdSell color="red" />,
      text: "Selled Products",
    },
    {
      icon: <RiMoneyRupeeCircleFill color="green" />,
      text: "Products Selled Revenue",
    },
  ];
  return (
    <div className="shadow p-5 bg-white min-w-fit w-[500px]">
      <div className="text-2xl font-bold">Seller Detail</div>
      <div className="mt-5">
        <div className="flex flex-col gap-2 ">
          {descriptionDataArray.map((data) => (
            <DescriptionData icon={data.icon} text={data.text} />
          ))}
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex flex-col gap-2">
        {displayData.map((user, index) => {
          console.log(user);
          return (
            <SellerDetailsForAdmin
              key={user.id}
              sellernmae={user.fullname}
              totalNumberOfProducts={user.totalNumberOfProducts}
              totalProductsSelled={user.totalProductsSelled}
              totalProductsSelledAmount={user.totalProductsSelledAmount}
            />
          );
        })}
      </div>
    </div>
  );
}

function DescriptionData({ icon = "", text = "" }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <span>{icon}</span>
      <span>
        <FaLongArrowAltRight />
      </span>
      <span>{text}</span>
    </div>
  );
}
