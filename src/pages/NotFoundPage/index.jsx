import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <p className="text-gray-500 mb-8">
        <i>{error?.statusText || error?.message || "The page you're looking for doesn't exist"}</i>
      </p>
      <button 
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFoundPage;
