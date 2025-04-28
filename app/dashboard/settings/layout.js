
import { fetchingDataGet } from "@/app/lib/fetchingDataGet";
import SettingMaun from "./settingManu";

async function Product_Catalog({ children }) {
  const settingColor = await fetchingDataGet(
    "/api/front/setting/color-setting"
  );

  return (
    <div className="z-10 flex flex-col ">
      <div
        className="flex flex-col sm:flex-row lg:gap-4 border rounded-md shadow-md items-center h-fit  text-white p-2 lg:p-4"
        style={{
          background: `linear-gradient(to right, ${settingColor?.settings?.GradientColor1 || '#395BEF'}, ${settingColor?.settings?.GradientColor2 || '#5C28D5'})`,
        }}
      >
        <SettingMaun />
      </div>
      <section className="bg-white shadow-md border border-gray-200 rounded mt-5">
        {children}
      </section>
    </div>
  );
}

export default Product_Catalog;
