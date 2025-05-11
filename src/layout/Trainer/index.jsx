import React from "react";
import { Outlet } from "react-router-dom";

function TrainerLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default TrainerLayout;
