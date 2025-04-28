import DashboardSideBer from "./(dashboard_Component)/DashboardSideBer";

export default function LoginLayout({ children }) {
  return (
    <>
      <div className={` flex min-h-[88vh] container mx-auto`}>
        <DashboardSideBer />

        <section className="w-full mt-5 lg:mt-10 overflow-hidden">
          <div className="px-1">{children}</div>
        </section>
        
      </div>
    </>
  );
}
