import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

function handleOrder() {}

function PaypalButton({ product }) {
  console.log(product);
  return (
    <PayPalButtons
      style={{
        layout: "horizontal",
        color: "blue",
        shape: "pill",
        border: 0,
        tagline: false,
        height: 48,
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: product.name,
              amount: {
                value: product.price,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();

        handleOrder(order);
      }}
      onError={(err) => {
        console.log(err);
        alert("There was an error processing your payment");
      }}
      onCancel={(data) => {
        alert("Payment cancelled");
      }}
    />
  );
}

export default PaypalButton;
