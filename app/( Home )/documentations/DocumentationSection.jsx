"use client";
import { useState, useEffect } from "react";

export default function DocumentationSection({ documentations }) {
  const [activeMenu, setActiveMenu] = useState(null);


  const handleMenuClick = (id) => {
    setActiveMenu(id);
    // Scroll to the corresponding section when a menu item is clicked
    document.querySelector(`#content-${id}`).scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });

    // Cleanup the event listener when component is unmounted
    return () => {
      smoothScrollLinks.forEach((anchor) => {
        anchor.removeEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
          });
        });
      });
    };
  }, []);

  return (
    <section className="mt-[10px] lg:mt-[60px] flex flex-col lg:flex-row  gap-5">
      <div className="w-full lg:w-[350px] border border-gray-300 p-3 rounded h-fit lg:max-h-[700px] sticky top-[65px] lg:top-[190px] left-0 bg-white z-50 ">
        <ul className="mt-3 flex flex-row flex-wrap lg:flex-col gap-1 w-full">
          {documentations?.map((menu, index) => (
            <li key={index} className="relative cursor-pointer w-fit lg:w-full">
              <span
                className={`w-full flex flex-wrap break-words text-black rounded-[4px] transition duration-150 py-2 px-3 hover:bg-gradient-to-r from-[#395BEF] to-[#5C28D5] hover:text-white dark:text-white mb-[1px] ${
                  activeMenu === menu?.id ? "bg-gradient-to-r from-[#395BEF] to-[#5C28D5] text-white" : ""
                }`}
                onClick={() => handleMenuClick(menu?.id)}
              >
                {menu?.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full space-y-5 px-0">
        {documentations?.map((item) => (
          <div
            key={item?.id}
            id={`content-${item?.id}`}
            className="bg-white rounded-md px-5 py-4 lg:px-10 lg:py-5 grid grid-cols-1 border border-gray-200"
          >
            <h2 className="text-2xl my-2 gradient-text">{item?.title}</h2>

            <div className="prose lg:prose-xl prose-gray break-words grid grid-cols-1">
              <div
                dangerouslySetInnerHTML={{
                  __html: String(item?.description || ""),
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
