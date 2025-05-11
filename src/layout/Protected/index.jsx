import { Outlet } from "react-router-dom";
import Navbar from "@/components/AuthNav";

export default function Protected() {
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
}
