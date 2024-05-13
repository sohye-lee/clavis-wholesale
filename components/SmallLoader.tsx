import React from 'react';

export default function SmallLoader({ ...rest }) {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-6 h-6 border-2 rounded-full border-slate-400 border-r-transparent animate-spin z-[100]"
        {...rest}
      ></div>
    </div>
  );
}
