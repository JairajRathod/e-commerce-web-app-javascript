import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { UserDetailsForAdmin } from "../../componentsExport";

export default function UserMainCard({
  displayData = [],
  cardText = "",
  moneyText = "",
}) {
  return (
    <div className="shadow p-5 bg-white min-w-fit w-[500px]">
      <div className="text-2xl font-bold">Users Detail</div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-row gap-2 items-center">
          <span>
            <FaCartShopping color="grey" />
          </span>
          <span>
            <FaLongArrowAltRight />
          </span>
          <span className="font-semibold">{cardText}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span>
            <RiMoneyRupeeCircleFill color="green" />
          </span>
          <span>
            <FaLongArrowAltRight />
          </span>
          <span className="font-semibold">{moneyText}</span>
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex flex-col gap-2">
        {displayData.map((user, index) => {
          console.log(user);
          return (
            <UserDetailsForAdmin
              key={user.id}
              username={user.fullname}
              totalOrders={user.totalOrders}
              totalAmount={user.totalOrderAmount}
            />
          );
        })}
      </div>
    </div>
  );
}

<RiMoneyRupeeCircleFill color="green" />;
