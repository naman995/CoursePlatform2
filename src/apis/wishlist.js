export async function getWishlist() {
    return await JSON.parse(localStorage.getItem("wishlist")) || [];
}

export async function addToWishlist(course) {
    const user = await JSON.parse(localStorage.getItem("current-user"));
    if (!user) {
        return window.location.href = '/login'
    }
    const wishlist = await getWishlist();

    if (wishlist.find((item) => item._id === course._id)) {
        //remove from wishlist
        const newWishlist = wishlist.filter((item) => item._id !== course._id);
        return await localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    }

    wishlist.push(course);
    await localStorage.setItem("wishlist", JSON.stringify(wishlist));
    //window.location.href = '/wishlist'
}

export async function removeFromWishlist(course) {
    const wishlist = await getWishlist();
    const newWishlist = wishlist.filter((item) => item._id !== course);
    console.log(newWishlist);
    await localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    return
}

export async function clearWishlist() {
    return await localStorage.setItem("wishlist", JSON.stringify([]));;
}

