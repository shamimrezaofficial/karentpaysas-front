import { fetchingDataGet } from "@/app/lib/fetchingDataGet";
import Image from "next/image";

const PaymentGateway = async () => {
  const allPaymentGateways = await fetchingDataGet(
    "/api/front/payment-gateways"
  );
  if (!allPaymentGateways) return;
  return (
    <div className="mt-[70px]">
      <div className="container text-center mx-auto ">
        {Object.entries(allPaymentGateways)?.map(
          ([country, paymentGateways]) => (
            <div key={country} className="mt-20">
              <h2 className="text-xl pl-2 sm:pl-0 md:text-3xl font-bold lg:text-left text-left">
                {country} Payment Gateway Support
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10 px-2 sm:px-0">
                {Array.isArray(paymentGateways) &&
                  paymentGateways?.map((gateway) => (
                    <div
                      key={gateway?.id}
                      className="bg-white w-full h-[150px] flex flex-col items-center justify-center border rounded-sm transition-transform duration-300 hover:scale-110 focus-within:border-4 focus-within:border-blue-500 cursor-pointer hover:bg-gray-50 border-gray-200"
                    >
                      <Image
                        className="h-auto"
                        src={gateway?.logo}
                        height={100}
                        width={100}
                        alt={gateway?.gateway_name}
                        priority
                      />
                      <h3 className="text-xl font-bold mt-2">{gateway?.gateway_name}</h3>
                    </div>
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;
