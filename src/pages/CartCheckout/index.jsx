import { useState, useEffect } from "react";
import CardTag from "@/components/CardTag";
import PaymentOption from "@/pages/User/component/PaymentOption/PaymentOption";
import { CiLock } from "react-icons/ci";

import CartItem from "./components/CartItem";
import PaypalButton from "@/components/PaypalButton";

import { Navigate, useLoaderData } from "react-router-dom";

import { getCart } from "@/apis/cart";
import { enrollCourses } from "@/apis/courses";
import { removeFromCart } from "@/apis/cart";
import { createOrder, verifyOrder } from "@/apis/payments";
import { toast } from "react-toastify";
import { clearCart } from "@/apis/cart";
import mappings from "../../apis/currency_mappings";
import { convertPrice } from "../../apis/courses";

export async function loader() {
  const cart = await getCart();
  return { cart };
}

const CartAndCheckout = () => {
  const DOLLAR_RATE = 82.06;
  const [amount, setAmount] = useState(0);
  const { cart } = useLoaderData();

  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [cartItems, setCartItems] = useState(cart ? cart : []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    //calculate total amount
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price.amt;
    });
    setAmount(total);
  }, [cartItems]);

  const handleChange = (evt) => {
    console.log(evt.target.value);
    setAmount(evt.target.value);
  };

  const handleRemove = (_id) => {
    (async () => {
      await removeFromCart(_id);
      setCartItems(cartItems.filter((item) => item._id !== _id));
      // window.location.reload();
    })();
  };

  const handleCreateOrder = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    (async () => {
      const { data } = await createOrder(amount, paymentMethod, getCurrencySymbol("CURR"));
      if (data) {
        if (data.code === "PAYMENT_METHOD_NOT_SUPPORTED") {
          toast.error("Payment method not supported");
          return;
        }

        if (paymentMethod === "razorpay") {
          openRazorPayModal(data);
        } else if (paymentMethod === "paypal") {
          // openPaypalModal(data);
        }
      }
    })();
  };

  const openRazorPayModal = async (data) => {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    const prefill = {
      name: `${currentUser.firstName} ${currentUser.lastName}`,
      email: currentUser.email,
      contact: currentUser.phone,
    };

    // const newPrice =
    //   getCurrencySymbol("CURR") !== "INR"
    //     ? await convertPrice({
    //         price: {
    //           amt: data.amount * 100,
    //           base: getCurrencySymbol("CURR"),
    //           to: "INR",
    //         },
    //       })
    //     : {
    //         country_price: data.amount * 100,
    //       };

    console.log(data.currency);

    const options = {
      key: "rzp_test_3LXvVaBxXFLW5P",
      amount: Number(data.amount * 100),
      currency: data.currency,
      name: "LearnxTech",
      description: "Course Payment",
      image: "http://localhost:5173/src/assets/Home/logo.png",
      order_id: data.id,
      handler: async function (response) {
        const d = await verifyOrder(response);
        if (d && d.data.signatureIsValid) {
          toast.promise(
            enrollCourses(
              cartItems.map((item) => item._id),
              response
            ),
            {
              pending: "Enrolling courses...",
              success: "Courses enrolled successfully",
              error: "Failed to enroll courses",
            }
          );

          setTimeout(async () => {
            await clearCart();
            setCartItems([]);
          }, 3000);
        } else {
          toast.error("Payment failed");
        }
      },
      prefill,
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open(options);
  };

  const calculateDiscount = (discount) => {
    return (amount * discount) / 100;
  };

  const getCurrencySymbol = (type) => {
    const country = JSON.parse(localStorage.getItem("user-location")) || "USD";

    if (type === "CURR") {
      return mappings[country.country_code]?.currency || "USD";
    }

    return mappings[country.country_code]?.symbol || "$";
  };

  return (
    <>
      <div className="lg:px-16 lg:py-6 sm:px-3 sm:py-2 bg-checkout-page-bg h-full shadow-sm lg:mt-[3%] ">
        {cartItems?.length > 0 ? (
          <div className="flex flex-col space-y-2">
            <h1 className="text-5xl font-semibold mb-5 text-center lg:text-left">
              You're Almost There! Complete Your Order
            </h1>
            {/* CARD ONE Width 1613px Height 275px */}
            {cartItems?.map((item) => (
              <CartItem
                key={item._id}
                {...item}
                handleRemove={() => handleRemove(item._id)}
                paymentMethod={paymentMethod}
                dollarRate={DOLLAR_RATE}
              />
            ))}
            <>
              <h1 className="text-5xl font-semibold  mb-5 py-9 text-center lg:text-left">
                Payment Methods
              </h1>

              <div className="flex  gap-1 md:flex-row flex-col">
                {/* Payment Options (left) */}
                <div className="flex   flex-col space-y-2">
                  <PaymentOption
                    border={paymentMethod === "paypal"}
                    title="Paypal"
                    img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/1280px-PayPal_logo.svg.png"
                    onClick={() => setPaymentMethod("paypal")}
                  />
                  <PaymentOption
                    title="Razorpay"
                    border={paymentMethod === "razorpay"}
                    img="https://www.drupal.org/files/project-images/razorpay.png"
                    onClick={() => setPaymentMethod("razorpay")}
                  />
                </div>
                {/* Payment Options End) */}

                {/* COURSE INFO AND TOTAL PAY CARD */}
                <div className="flex flex-col bg-white rounded-3xl lg:w-[931px] ml-4 space-y-4 px-10 py-7 ">
                  {cartItems?.map((item) => (
                    <div key={item._id} className="flex flex-col lg:flex-row gap-2">
                      <img
                        src={item.image}
                        alt="cardImage"
                        className=" w-auto lg:w-28 lg:h-[122px] rounded-2xl object-cover"
                      />
                      {/* DETAILS */}
                      <div className="flex justify-between w-full">
                        <div className="flex flex-col">
                          <h1 className="text-2xl font-semibold max-w-[250px] mb-1">
                            {item.title}
                          </h1>
                          <div className="flex">
                            <CardTag bg="bg-[#BFFC90]" title={item.category} />
                          </div>
                        </div>

                        <div className="lg:flex hidden  items-center pr-10">
                          <p className="font-medium text-2xl leading-none text-black">
                            {item.price.symbol}
                            {item.price.amt}
                          </p>
                          <p className="font-normal text-2xl leading-none text-gray-400 line-through ml-2">
                            {item.price.symbol}
                            {item.price.amt + item.price.amt * 0.01}
                          </p>
                        </div>
                      </div>
                      <div className=" mt-2 flex lg:hidden  items-center pr-10">
                        <p className="font-medium text-2xl leading-none text-black">
                          {item.price.symbol}
                          {item.price.amt}
                        </p>
                        <p className="font-normal text-2xl leading-none text-gray-400 line-through ml-2">
                          {item.price.symbol}
                          {item.price.amt + item.price.amt * 0.01}
                        </p>
                      </div>
                    </div>
                  ))}
                  {/* {course?.discount && (
                    <div className="flex justify-between items-center pt-5 ">
                      <p className="font-medium text-[24px] lg:text-2xl">
                        Planned Discount - {course.discount}%
                      </p>
                      <p className="font-normal text-2xl text-green-500 mr-3 mt-10 lg:mt-0">
                        -{calculateDiscount(course.discount)}{" "}
                        {paymentMethod === "razorpay" ? "₹" : "$"}
                      </p>
                    </div>
                  )} */}
                  {/* <div className="flex justify-between items-center">
                    <p className="font-medium text-2xl">
                      Taxes & Fees India &#169;
                    </p>
                    <p className="font-normal text-2xl mr-3">18$</p>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-[40px]">Total</p>
                    <p className="font-medium text-3xl mr-3">
                      {getCurrencySymbol()}
                      {amount}
                      <span className="font-normal text-2xl text-gray-300 line-through ml-2">
                        {getCurrencySymbol()}
                        {amount + amount * 0.01}
                      </span>
                    </p>
                  </div>

                  {/* Buttons  */}
                  <div className="flex flex-col lg:flex-row justify-between items-center py-5">
                    {paymentMethod == "razorpay" && (
                      <button
                        onClick={handleCreateOrder}
                        type="button"
                        class="max-w-[150px] max-h-[48px] h-[48px] text-white text-lg font-medium bg-[#0070ba] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-full text-center mr-2 mb-2 dark:bg-[#0070ba] dark:hover:bg-blue-700 dark:focus:ring-blue-800 px-4 flex flex-row items-center justify-center"
                      >
                        Pay Securely
                      </button>
                    )}

                    {paymentMethod == "paypal" && (
                      <PaypalButton
                        product={{
                          name: "LearnxTech",
                          description: "Course Payment",
                          image:
                            "http://localhost:5173/src/assets/Home/logo.png",
                          price: ((amount + 100) / DOLLAR_RATE).toFixed(2),
                        }}
                      />
                    )}

                    <div className="flex items-center mt-2 lg:mt-0">
                      <CiLock size={30} className="text-green-400" />
                      <p className="font-medium text-base mx-2 ">
                        Encrypted And Secure Payments
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-2xl text-gray-400">
                      By checking out you agree with our{" "}
                      <span className="text-blue-600 font-bold">
                        Terms of Service.
                      </span>{" "}
                      We will process your personal data for the fulfillment of
                      your order and other purposes as per our{" "}
                      <span className="text-blue-600 font-bold">
                        Privacy Policy.
                      </span>{" "}
                      You can cancel recurring payments at any time.
                    </p>
                  </div>
                </div>
                {/* COURSE INFO AND TOTAL PAY CARD END */}
              </div>
            </>
          </div>
        ) : (
          <Navigate to="/" />
        )}
      </div>
    </>
  );
};

export default CartAndCheckout;
