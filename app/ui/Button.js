import React from "react";
import { FaSpinner } from "react-icons/fa";

function Button({ text, onclickFunction, cssClass, loading, disabled, ref }) {
  return (
    <button
      onClick={onclickFunction}
      disabled={disabled}
      ref={ref}
      className={`w-full py-2 flex items-center gap-2 justify-center text-white rounded ${cssClass} ${
        loading || disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" /> Loading...
        </>
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
