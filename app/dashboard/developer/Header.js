"use client";
function HeaderDeveloper({ isOn, setIsOn}) {
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="w-full pt-3 px-2">
      <div className="py-4 pb-6 text-center lg:hidden ">
        <h3 className="text-xl font-semibold">Developer</h3>
      </div>

      <div className="  px-2 lg:px-0  ">
        <div className="flex justify-between items-center gap-3">
          {isOn ? (
            <h3 className="text-2xl font-bold ml-2 lg:ml-8">Test</h3>
          ) : (
            <h3 className="text-2xl font-bold ml-2 lg:ml-8">Developer</h3>
          )}
          <div
            className={`w-60 h-12  flex items-center justify-around   rounded-md cursor-pointer bg-[#111857]`}
            onClick={() => toggleSwitch()}
          >
            <p
              className={`${isOn
                ? "bg-gradient-2"
                : "bg-[#111857]"
                } w-24 h-10 rounded-md text-center flex items-center justify-center text-sm text-white font-bold`}
              onClick={() => toggleSwitch}
            >
              Test mode
            </p>

            <p
              className={`${!isOn
                ? "bg-gradient-2"
                : "bg-[#111857]"
                } w-24 h-10 rounded-md text-center flex items-center justify-center text-sm text-white font-bold`}
              onClick={() => toggleSwitch}
            >
              Dev mode
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDeveloper;
