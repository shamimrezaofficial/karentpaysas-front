export const dynamic = "force-dynamic";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileMenu from "./components/MobileMenu/MobileMenu";
import LiveChart from "./LiveChart/LiveChart";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  let backgroundImageStyle = {
    backgroundColor: "#ffffff",
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/front/setting/header-setting`,
      {
        cache: "no-store",
      }
    );

    if (!response?.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response?.json();

    if (data?.settings?.HeaderBackground) {
      backgroundImageStyle = {
        backgroundImage: `url(${data?.settings?.HeaderBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      };
    }
  } catch (error) {
    // console.error("Failed to fetch header setting:", error);
  }

  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
        style={backgroundImageStyle}
        cz-shortcut-listen="true"
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
        <MobileMenu />
        <LiveChart />
      </body>
    </html>
  );
}

export async function generateMetadata() {
  let metadata = {
    title: "Next.js Starter",
    description: "Next.js Starter Description",
    keywords: "nextjs, starter, template",
    icons: {
      icon: "/public/favicon.ico",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/front/setting/logo-identity`,
      {
        cache: "no-store",
      }
    );

    if (!response?.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response?.json();

    if (data?.success && data?.settings) {
      const keywordsString =
        data?.settings?.siteKeyword || "nextjs, starter, template";
      const keywordsArray =
        typeof keywordsString === "string"
          ? keywordsString.split(",").map((keyword) => keyword.trim())
          : [];

      metadata = {
        title: {
          template: `${data?.settings?.siteName} | %s`,
          default: data?.settings?.siteName,
        },
        description: data?.settings?.siteDescription,
        keywords: keywordsArray,
        icons: {
          icon: data?.settings?.faviconImage,
        },
      };
    }
  } catch (error) {
    // console.error("Failed to fetch metadata:", error);
  }

  return metadata;
}