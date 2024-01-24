import React from "react";

function Loading() {
  return (
    <div className="justify-center items-center flex min-h-[100vh]">
      <div className="w-16 h-16 border-8  rounded-full animate-spin border-t-blue-600"></div>
    </div>
  );
}

export default Loading;
