 import React, { useState } from "react";

 function RatingStar({ max = 5 }) {
   const [rating, setRating] = useState(0);

   return (
     <div className="text-yellow-500 mx-1">
        
       {Array.from({ length: max }, (_, i) => (
         <span key={i} onClick={() => setRating(i + 1)}>
           {rating > i ? "★" : "☆"}
         </span>
       ))}
     </div>
   );
 }

 export default RatingStar;

