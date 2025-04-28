import { fetchingDataGet } from "@/app/lib/fetchingDataGet";
import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
  const gradientColors = await fetchingDataGet(
    "/api/front/setting/color-setting"
  );

  const title = await fetchingDataGet("/api/front/setting/logo-identity");
  const footerData = await fetchingDataGet("/api/front/setting/footer-setting");
  const page = await fetchingDataGet("/api/front/pages");

  const footerSettings = footerData?.settings;

  const about = page?.data?.find((item) => item?.slug.includes("about"));
  return (
    <>
      <section
        className={`mt-[70px] ${
          gradientColors?.settings && gradientColors?.settings
            ? "text-white"
            : "text-gray-800"
        } px-2 sm:px-0 mb-12 md:mb-0`}
        style={{
          background:
            gradientColors?.settings?.GradientColor2 &&
            gradientColors?.settings?.GradientColor1
              ? `linear-gradient(to right, ${gradientColors?.settings?.GradientColor1}, ${gradientColors?.settings?.GradientColor2})`
              : "#ffffff",
        }}
      >
        <footer className="w-full container mx-auto  pt-10">
          <div className="grid  grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 ">
            <div className="col-span-full mb-10 lg:col-span-2 lg:mb-3">
              <Link
                href="/"
                className="flex justify-center lg:justify-start"
                prefetch={false}
              >
                {footerSettings?.FooterLogo && (
                  <Image
                    src={footerSettings?.FooterLogo}
                    alt="logo"
                    className=" py-2 px-5 rounded-md bg-white"
                    loading="lazy"
                    width={200}
                    height={50}
                  />
                )}
              </Link>
              <p className="py-8 text-sm lg:max-w-xs text-center lg:text-left">
                {footerSettings?.Description ? (
                  footerSettings?.Description
                ) : (
                  <span>
                    We Make Banking Easy For You <br />
                    Always easy to pay <br />
                    The future of Money is here
                  </span>
                )}
              </p>
              <Link
                href="/contact"
                prefetch={false}
                className="py-2.5 px-5 block w-fit bg-gradient-2 rounded shadow-sm text-sm text-white mx-auto hover:bg-blue-700 lg:mx-0"
              >
                Contact us
              </Link>
            </div>
            <div className="lg:mx-auto text-left ">
              <h4 className="text-lg font-bold mb-7">
                {title?.settings?.siteName}
              </h4>
              <ul className="text-sm  transition-all duration-500">
                <li className="mb-6">
                  <Link
                    href="/"
                    className="hover:text-gray-200"
                    prefetch={false}
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    href="/contact"
                    className=" hover:text-gray-200"
                    prefetch={false}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:mx-auto text-left ">
              <h4 className="text-lg font-bold mb-7">Products</h4>
              <ul className="text-sm  transition-all duration-500">
                <li className="mb-6">
                  <Link
                    href="/pricing"
                    className="hover:text-gray-200"
                    prefetch={false}
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    href="/payment-gateway"
                    className=" hover:text-gray-200"
                    prefetch={false}
                  >
                    Payment Gateway
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:mx-auto text-left">
              <h4 className="text-lg font-bold mb-7">Resources</h4>
              <ul className="text-sm  transition-all duration-500">
                <li className="mb-6">
                  <Link
                    href="/documentations"
                    className="hover:text-gray-200"
                    prefetch={false}
                  >
                    Documentation
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    href={"/" + about?.slug}
                    className="hover:text-gray-200"
                    prefetch={false}
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:mx-auto text-left">
              <h4 className="text-lg font-bold mb-7">Blogs</h4>
              <ul className="text-sm  transition-all duration-500">
                <li className="mb-6">
                  <Link
                    href="/news"
                    className="hover:text-gray-200"
                    prefetch={false}
                  >
                    News
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    href="/customer-reviews"
                    className="hover:text-gray-200"
                    prefetch={false}
                  >
                    Customer Review
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-10 border-t border-gray-200 mb-10 lg:mb-0">
            <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row">
              <span className="text-sm">
                {footerSettings?.Copyright ||
                  `© ${new Date().getFullYear()} karentpay. All rights reserved.`}
              </span>
              <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                <Link
                  href={
                    footerSettings?.FacebookUrl
                      ? `${footerSettings?.FacebookUrl}`
                      : "https://www.facebook.com/karentpay"
                  }
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-blue-600 flex justify-center items-center hover:bg-blue-700"
                  prefetch={false}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="facebook"
                    className="svg-inline--fa fa-facebook "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href={
                    footerSettings?.TelegramUrl
                      ? `${footerSettings?.TelegramUrl}`
                      : "https://www.facebook.com/karentpay"
                  }
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-[#229ED9] flex justify-center items-center hover:bg-[#1A81B5]"
                  prefetch={false}
                  aria-label="Telegram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill="white"
                      d="M12 0C18.627 0 24 5.373 24 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0Zm5.601 7.563L4.947 11.8c-.723.266-.718.634-.132.828l3.525 1.097 8.1-5.078c.385-.242.735-.09.447.145l-6.572 5.91h-.002l-.005.004-.046.04a.798.798 0 0 0-.246.54l-.242 2.599c.356 0 .511-.155.702-.339l1.68-1.615 3.516 2.586c.644.355 1.104.171 1.265-.594l1.532-7.194c.235-1.017-.388-1.477-1.428-1.015Z"
                    />
                  </svg>
                </Link>
                <Link
                  href={
                    footerSettings?.YoutubeUrl
                      ? `${footerSettings?.YoutubeUrl}`
                      : "https://www.youtube.com/@karentpay"
                  }
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-red-600 flex justify-center items-center hover:bg-red-700"
                  prefetch={false}
                >
                  <svg
                    className="w-[1.25rem] h-[0.875rem] text-white"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.9346 1.13529C14.5684 1.30645 15.0665 1.80588 15.2349 2.43896C15.5413 3.58788 15.5413 5.98654 15.5413 5.98654C15.5413 5.98654 15.5413 8.3852 15.2349 9.53412C15.0642 10.1695 14.5661 10.669 13.9346 10.8378C12.7886 11.1449 8.19058 11.1449 8.19058 11.1449C8.19058 11.1449 3.59491 11.1449 2.44657 10.8378C1.81277 10.6666 1.31461 10.1672 1.14622 9.53412C0.839844 8.3852 0.839844 5.98654 0.839844 5.98654C0.839844 5.98654 0.839844 3.58788 1.14622 2.43896C1.31695 1.80353 1.81511 1.30411 2.44657 1.13529C3.59491 0.828125 8.19058 0.828125 8.19058 0.828125C8.19058 0.828125 12.7886 0.828125 13.9346 1.13529ZM10.541 5.98654L6.72178 8.19762V3.77545L10.541 5.98654Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};
export default Footer;
