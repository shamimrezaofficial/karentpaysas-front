
import DashboardSideBer from "./(dashboard_Component)/DashboardSideBer";
import { GetCookies } from "@/app/lib/cookiesSetting";
import { redirect } from "next/navigation";

export default async function  LoginLayout({ children }) {
  const token = await GetCookies({ name: "auth_token_font" });

  if (!token) {
    redirect("/");
  }
  
  return (
    <>
      <div className={` flex min-h-[88vh] container mx-auto`}>
        <DashboardSideBer/>

        <section className="w-full mt-5 lg:mt-10 overflow-hidden">
          <div className="px-1">{children}</div>
        </section>
        
      </div>
    </>
  );
}
