import React from "react";
import Loader from "./Loader/Loader";


function FullPageLoader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <Loader />
    </div>
  );
}

export default FullPageLoader;
