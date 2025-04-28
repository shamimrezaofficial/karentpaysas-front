import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function SelectDrpodownManu({
  showDeopDownManu,
  setShowDeopDownManu,
  showData,
  setShowData,
  label,
  children,
  id,
  required,
  error,
  disabled,
}) {
  return (
    <div>
      <label
        htmlFor="device_id"
        className="mb-2 inline-block text-sm sm:text-base cursor-pointer text-[#09090B]"
      >
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <div
        id={id}
        onClick={() => {
          if (!disabled) {
            setShowDeopDownManu(!showDeopDownManu);
          }
        }}
        className={`relative rounded-[4px] w-full  ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <h2
          className={` border ${
            showDeopDownManu || showData
              ? "rounded-t-[4px] text-gray-900 border-blue-500"
              : "text-gray-600 rounded-[4px] border-gray-300"
          } focus:border-blue-500 block w-full p-3`}
        >
          {showData ? showData : label}
        </h2>
        {!showData && (
          <div
            className={`absolute top-[19px] right-[.5rem] w-[14px] h-[14px] rounded-full text-gray-600 flex items-center justify-center transition-transform duration-300 transform ${
              showDeopDownManu ? "rotate-180" : "rotate-0"
            }`}
          >
            <FaChevronDown />
          </div>
        )}
        {showData && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowData("");
            }}
            className="absolute top-[16px] right-[.5rem] w-[20px] h-[20px] rounded-full bg-blue-500 text-white flex items-center justify-center cursor-pointer"
          >
            <IoMdClose />
          </div>
        )}
        {showDeopDownManu && (
          <div
            id="device-dropdown-menu"
            className="absolute top-full left-0 right-0 bg-white rounded-b-[4px] shadow-md z-10 max-h-[300px] overflow-y-auto"
          >
            {children}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 pt-[1px]">{error}</p>}
    </div>
  );
}

export default SelectDrpodownManu;
