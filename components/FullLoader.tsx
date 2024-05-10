import React from "react";

export default function FullLoader() {
  return (
    <div className="w-full py-40 flex items-center justify-center">
      <div className="w-12 h-12 border-3 border-slate-400 rounded-full border-r-transparent animate-spin"></div>
    </div>
  );
}
