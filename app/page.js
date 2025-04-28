import Features from "./components/HomePage/Features";
import GetMore from "./components/HomePage/GetMore";
import GlobalAvailability from "./components/HomePage/GlobalAvailability";
import PaymentGatewayComponent from "./components/HomePage/PaymentGatewayComponent";
import Question from "./components/HomePage/Question";
import Reviews from "./components/HomePage/Reviews/Reviews";
import Slider from "./components/HomePage/Slider";
import MerchantLogin from "./components/MerchantLogin";
import { fetchingDataGet } from "./lib/fetchingDataGet";

export default async function Home() {
  const [
    sliderData,
    featuresData,
    // get more section
    articles,
    settingsData,
    //
    reviewsData,
    questionsData,
  ] = await Promise.all([
    fetchingDataGet("/api/front/home-image-sliders"),
    fetchingDataGet("/api/front/payment-feature-showcases"),
    // get more section
    fetchingDataGet("/api/front/news/articles"),
    fetchingDataGet("/api/front/setting/logo-identity"),
    //
    fetchingDataGet("/api/front/reviews"),
    fetchingDataGet("/api/front/faqs"),
  ]);
  let minifiedCountries = [];
  try {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/flag/images',
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const countries = result?.data?.slice(1, 33) || [];
    minifiedCountries = countries;

  } catch (error) {
    // console.error('Error fetching data:', error.message);
  }
  return (
    <section>
      <MerchantLogin />
      <Slider sliderData={sliderData} />
      <Features featuresData={featuresData} />
      <PaymentGatewayComponent />
      <GetMore settingsData={settingsData} articles={articles} />
      <Reviews reviewsData={reviewsData} />
      <Question questionsData={questionsData} />
      {/* <GlobalAvailability countriesData={Array.isArray(minifiedCountries) ? minifiedCountries: []} /> */}

    </section>
  );
}
