import React from "react";
import dotsLoad from "../svg/3_dots_load.svg";

function Loading() {
  return (
    <div className="h-screen flex justify-around items-center
    bg-zinc-800 select-none">
      <img src={ dotsLoad } alt="Loading" className="h-52" />
    </div>
  );
}

export default Loading;