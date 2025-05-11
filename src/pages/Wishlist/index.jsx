import { getWishlist } from "@/apis/wishlist";
import EnrollNowCard from "@/components/Card/EnrollNowCard";
import { useEffect, useState } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await getWishlist();
      setWishlist(response);
    })();
  }, []);

  return (
    <div className="p-4 mx-12 mt-[4%] flex flex-col w-auto overflow-x-scroll no-scrollbar pb-12">
      <h1 className="text-3xl">Your Wishlist</h1>
      <div className="flex flex-row space-x-4">
        {wishlist.map((course) => (
          <EnrollNowCard {...course} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
