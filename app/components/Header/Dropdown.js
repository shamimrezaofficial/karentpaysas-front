import { useState, useRef } from "react";
import Link from "next/link";

const Dropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay to avoid closing the dropdown immediately
  };

  return (
    <div
      className="relative z-[50]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="rounded p-1 hover:text-white hover:bg-blue-800 cursor-pointer">
        {label}
      </button>
      <div
        className={`${
          isOpen ? "absolute " : "hidden"
        } z-[50] mt-2 bg-white text-black rounded-lg shadow-lg transition duration-300 ease-in-out transform origin-top-right scale-95 w-48`}
      >
        {Array.isArray(items) ? (
          items?.map((item, index) => (
            <Link
              onClick={() => setIsOpen(false)}
              href={item?.href}
              key={index}
              prefetch={false}
              className="block px-4 py-2 hover:bg-gray-200 hover:scale-105 border-b border-gray-200 cursor-pointer text-base transition-colors duration-200 ease-in-out first:rounded-t-lg last:rounded-b-lg"
            >
              {item?.label}
            </Link>
          ))
        ) : (
          <p className="px-4 py-2 text-gray-500">No items</p>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
