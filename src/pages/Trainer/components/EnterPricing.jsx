import React from "react";
import { useFormik } from "formik";
import CoustomSelect from "./CoustomSelect";

const timePlans = [
  { value: "day", label: "per day" },
  { value: "week", label: "per week" },
  { value: "month", label: "per month" },
  { value: "year", label: "per year" },
  { value: "one-time", label: "one time" },
];

const currencies = [
  "AFN",
  "ALL",
  "DZD",
  "EUR",
  "AOA",
  "XCD",
  "ARS",
  "AMD",
  "AUD",
  "EUR",
  "AZN",
  "BSD",
  "BHD",
  "BDT",
  "BBD",
  "BYN",
  "EUR",
  "BZD",
  "XOF",
  "BTN",
  "BOB",
  "BAM",
  "BWP",
  "BRL",
  "BND",
  "BGN",
  "XOF",
  "BIF",
  "CVE",
  "KHR",
  "XAF",
  "CAD",
  "XAF",
  "XAF",
  "CLP",
  "CNY",
  "COP",
  "KMF",
  "XAF",
  "CDF",
  "CRC",
  "HRK",
  "CUC",
  "EUR",
  "CZK",
  "DKK",
  "DJF",
  "XCD",
  "DOP",
  "USD",
  "USD",
  "EGP",
  "USD",
  "XAF",
  "ERN",
  "EUR",
  "ETB",
  "FJD",
  "EUR",
  "EUR",
  "XAF",
  "GMD",
  "GEL",
  "EUR",
  "GHS",
  "EUR",
  "XCD",
  "GTQ",
  "GNF",
  "XOF",
  "GYD",
  "HTG",
  "HNL",
  "HUF",
  "ISK",
  "INR",
  "IDR",
  "IRR",
  "IQD",
  "EUR",
  "ILS",
  "EUR",
  "JMD",
  "JPY",
  "JOD",
  "KZT",
  "KES",
  "AUD",
  "KRW",
  "KWD",
  "KGS",
  "LAK",
  "EUR",
  "LBP",
  "LSL",
  "LRD",
  "LYD",
  "CHF",
  "EUR",
  "EUR",
  "MGA",
  "MWK",
  "MYR",
  "MVR",
  "XOF",
  "EUR",
  "USD",
  "MRO",
  "MUR",
  "MXN",
  "USD",
  "MDL",
  "EUR",
  "MNT",
  "EUR",
  "MAD",
  "MZN",
  "MMK",
  "NAD",
  "AUD",
  "NPR",
  "EUR",
  "NZD",
  "NIO",
  "XOF",
  "NGN",
  "NOK",
  "OMR",
  "PKR",
  "USD",
  "PAB",
  "PGK",
  "PYG",
  "PEN",
  "PHP",
  "PLN",
  "EUR",
  "QAR",
  "RON",
  "RUB",
  "RWF",
  "XCD",
  "XCD",
  "XCD",
  "WST",
  "EUR",
  "STN",
  "SAR",
  "XOF",
  "RSD",
  "SCR",
  "SLL",
  "SGD",
  "EUR",
  "EUR",
  "SBD",
  "SOS",
  "ZAR",
  "EUR",
  "LKR",
  "SDG",
  "SRD",
  "SZL",
  "SEK",
  "CHF",
  "SYP",
  "TJS",
  "TZS",
  "THB",
  "XOF",
  "TOP",
  "TTD",
  "TND",
  "TRY",
  "TMT",
  "AUD",
  "UGX",
  "UAH",
  "AED",
  "GBP",
  "USD",
  "UYU",
  "UZS",
  "VUV",
  "EUR",
  "VES",
  "VND",
  "YER",
  "ZMW",
  "ZWL",
];

const currencyMapping = currencies.map((currency) => ({
  value: currency,
  label: currency,
}));

function EnterPricing({ setPricing, values }) {
  const formik = useFormik({
    initialValues: {
      amt: values?.price.amt || "",
      per: values?.price.per || "one-time",
      discount: values?.discount || "",
      base: values?.price.base || "USD",
    },
    onSubmit: setPricing,
  });

  return (
    <div className="bg-white rounded-2xl mb-4 pb-4">
      <div className="p-6 lg:pl-8 flex flex-col">
        <div>
          <h1 className="font-semibold text-black text-3xl pb-5 ">
            Enter Price
          </h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col lg:flex-row items-center ">
            <input
              type="text"
              className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-400 mb-4 lg:mb-0 lg:w-1/6 w-[200px]"
              placeholder="Enter the Maximum Price"
              name="amt"
              value={formik.values.amt}
              onChange={formik.handleChange}
            />
            {/* <CoustomSelect
              name="per"
              options={timePlans}
              placeholder="Select Time Plan"
              value={formik.values.per}
              onChange={formik.handleChange}
              className={"lg:ml-4 lg:w-1/6 w-[200px]"}
            /> */}
            <CoustomSelect
              name="base"
              options={currencyMapping}
              placeholder="Select Base Currency"
              value={formik.values.base}
              onChange={formik.handleChange}
              className={"lg:ml-4 lg:w-1/6 w-[200px]"}
            />
            <input
              className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-gray-400 lg:ml-4 lg:w-1/6 w-[200px] lg:mt-0 mt-4"
              placeholder="Enter Discount Percentage"
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
              type="number"
            />
          </div>
          <div className="flex my-4 lg:items-start items-center lg:justify-start justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded-lg py-2 px-4 hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnterPricing;
