import React from 'react'

const PaymentHistory = () => {
    const paymentHistory = [
        // {
        //     id: 1,
        //     date: "21 june 2022 , 9 : 00 Am",
        //     transactionId: "jhwdgjhvusbjcyfukhjw",
        //     amountPaid: "$1000",
        //     status: "Paid",
        // },
    ];

    return (
        <div className=" mt-10 w-[1000px] lg:w-auto overflow-x-auto">
            <div className="flex flex-row mt-5  border py-1 rounded-[10px]">
                <div className="text-black font-[600] w-[20%] text-center "></div>
                <div className="text-black font-[600] w-[20%] text-center ">
                    Date And Time
                </div>
                <div className="text-black font-[600] w-[20%] text-center">
                    Transaction Id
                </div>
                <div className="text-black font-[600] w-[20%] text-center">
                    Amount Paid
                </div>
                <div className="text-black font-[600] w-[20%] text-center">
                    Status
                </div>
            </div>
            <div className="pt-5 bg-[#F4F4F4]">

                {paymentHistory.map((item) => (
                    <div className="flex flex-row   py-1 bg-[#F4F4F4] ">
                        <div className="flex flex-row w-full ">
                            <div className="text-left pl-10 w-[20%] ">{item.id}</div>
                            <div className="text-center w-[20%]">{item.date}</div>
                            <div className="text-center w-[20%]">{item.transactionId}</div>
                            <div className="text-center w-[20%]">{item.amountPaid}</div>
                            {/* <div className="text-center w-[20%]">{item.status}</div> */}
                            <div className={`text-center w-[20%] ${item.status === "Paid" ? "text-green-500" : "text-red-500"}`}>{item.status}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PaymentHistory