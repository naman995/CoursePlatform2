import { toast } from "react-toastify";

export async function getCart() {
    return await JSON.parse(localStorage.getItem("cart")) || [];
}

export async function addToCart(product) {
    const user = await JSON.parse(localStorage.getItem("current-user"));
    if (!user) {
        return window.location.href = '/login'
    }
    const cart = await getCart();

    if (cart.find((item) => item._id === product._id)) {
        //remove from cart
        const newCart = cart.filter((item) => item._id !== product._id);
        return await localStorage.setItem("cart", JSON.stringify(newCart));
    }

    cart.push(product);
    toast.success("Course added to cart");
    await localStorage.setItem("cart", JSON.stringify(cart));
    //window.location.href = '/cart'
}

export async function removeFromCart(product) {
    const cart = await getCart();
    const newCart = cart.filter((item) => item._id !== product);
    toast.success("Course removed from cart");
    await localStorage.setItem("cart", JSON.stringify(newCart));
}

export async function clearCart() {
    toast.success("Cart cleared");
    return await localStorage.setItem("cart", JSON.stringify([]));;
}

