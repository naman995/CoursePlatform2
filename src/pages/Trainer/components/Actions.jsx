import React from "react";

function Actions({ handleCreateCoures, actionTitle }) {
  return (
    <div className="w-full flex items-center justify-center">
      <button
        onClick={handleCreateCoures}
        className="bg-[#4D5EDC] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#0b1a8a] active:border-none border-b-4 border-[#0b1a8a]"
      >
        {actionTitle || "Create Course"}
      </button>
    </div>
  );
}

export default Actions;
