import { getTransactions } from "@/apis/user";
import React from "react";
import moment from "moment";
import mappings from "../../../apis/currency_mappings";

function findSymbolByCurrency(currency) {
  for (const countryCode in mappings) {
    if (mappings.hasOwnProperty(countryCode)) {
      const countryData = mappings[countryCode];
      if (countryData.currency === currency) {
        return countryData.symbol;
      }
    }
  }
  return null; // Symbol not found for the given currency
}

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const transactions = await getTransactions();
      console.log(transactions);
      setPurchaseHistory(transactions);
    })();
  }, []);

  return (
    <div className=" mt-10 w-[1000px] overflow-x-auto">
      <h1 className="text-xl font-[600]">Purchase History</h1>
      <div className="flex flex-row mt-5  border py-1 rounded-t-[10px]">
        <div className="text-black font-[600] w-[20%] text-center ">
          Course Name
        </div>
        <div className="text-black font-[600] w-[20%] text-center">
          Date/ Time
        </div>
        <div className="text-black font-[600] w-[20%] text-center">
          Transaction Id
        </div>
        <div className="text-black font-[600] w-[20%] text-center">
          Amount Paid
        </div>
        <div className="text-black font-[600] w-[20%] text-center">
          Payment Method
        </div>
        <div className="text-black font-[600] w-[20%] text-center ">Status</div>
      </div>
      <div className="bg-[#F4F4F4]">
        {purchaseHistory.map((item) => (
          <div className="flex flex-row items-center rounded-b-[10px] py-1 bg-[#F4F4F4] ">
            <div className="flex flex-row w-full ">
              <div className="text-center w-[20%] ">
                {item.courses.map((course) => (
                  <p>
                    {course.title}
                    {item.courses.length >= 2 && ","} <br />
                  </p>
                ))}
              </div>
              <div className="text-center w-[20%]">
                {moment(item.createdAt).format("DD/MM/YYYY")}
              </div>
              <div className="text-center w-[20%]">
                {item.order_id.split("_")[1]}
              </div>
              <div className="text-center w-[20%]">
                {item.currency
                  ? findSymbolByCurrency(item.currency)
                  : findSymbolByCurrency("INR")}{" "}
                {item.amount}
              </div>
              <div className="text-center w-[20%]">{item.paymentMethod}</div>
              {/* <div className="text-center w-[20%]">{item.status}</div> */}
              <div
                className={`text-center w-[20%] ${
                  item.status === "success"
                    ? "text-green-500"
                    : item.status === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
