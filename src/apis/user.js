import { axiosPrivate } from "./axios";

export async function getCurrentUser() {
    const { data: user } = await axiosPrivate.get("/auth/me");
    return user;
}

export async function getTransactions() {
    const { data: transactions } = await axiosPrivate.get("/transactions");
    return transactions;
}

export async function sendLink(link, to) {
    const { data } = await axiosPrivate.get(`/users/send-link?email=${to}&link=${link}`);
    return data;
}

export async function updateProfile(body) {
    const { data } = await axiosPrivate.put("/users/update", body);
    return data;
}

export async function getWallet() {
    const { data } = await axiosPrivate.get("/users/wallet");
    return data;
}