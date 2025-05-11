import { axiosPrivate } from './axios';

export async function createOrder(amt, paymentMethod, currency) {
    console.log("createOrder", currency);
    const { data } = await axiosPrivate.post("/payments/create-order", {
        amount: amt,
        paymentMethod,
        currency
    });
    return { data };
}

export async function verifyOrder(order) {
    const { data } = await axiosPrivate.post("/payments/verify-payment", order);
    return { data };
}