import { fetchingDataGet } from "@/app/lib/fetchingDataGet";
import TopBar from "./TopBar";
import NavBar from "./NavBar";

const Header = async () => {
  const gradientColors = await fetchingDataGet("/api/front/setting/color-setting");
  const topbarGradientColors = await fetchingDataGet("/api/front/setting/header-setting");

  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar topbarGradientColors={topbarGradientColors?.settings} />
      <NavBar gradientColors={gradientColors?.settings} />
    </header>
  );
};
export default Header;
