import { RiMoneyRupeeCircleFill } from "react-icons/ri";

export default function SellerTile() {
  return (
    <div className="p-3 shadow-2xl  rounded-full flex flex-row gap-5 min-w-fit w-[300px]">
      <div>
        <img
          src="ef"
          alt="IMG"
          className="h-[50px] w-[50px] rounded-full bg-gray-200"
        />
      </div>
      <div>
        <div>
          <div>Seller Name</div>
        </div>
        <div className="flex flex-row gap-7">
          <div>
            <span>i</span>
            <span>45</span>
          </div>
          <div>
            <span>i</span>
            <span>45</span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span>
              <RiMoneyRupeeCircleFill color="green" />
            </span>
            <span>45</span>
          </div>
        </div>
      </div>
    </div>
  );
}
