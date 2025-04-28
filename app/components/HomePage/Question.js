import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/ui/accordion";



const Question = async ({ questionsData }) => {
  return (
    <section className="mt-8 md:mt-[90px] container mx-auto w-[92vw] sm:w-[95vw] md:w-[100vw] ">

        <h2 className="text-xl md:text-3xl font-bold text-black text-center">
          Frequently Asked Question
        </h2>
        <div className="mt-16 ">
          {Array.isArray(questionsData) && questionsData?.length > 0 &&
            questionsData?.map((faq, index) => (
              <div
                className=" scale-105 lg:scale-100 md:scale-100 w-full text-white text-left rounded-lg  p-3 sm:p-5 bg-gradient-to-r from-blue-600 to-purple-400 my-4"
                key={index}
              >
                <Accordion
                  type="single"
                  collapsible
                  className="w-full scale-110 lg:scale-100 md:scale-100"
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>{faq?.question}</AccordionTrigger>
                    <AccordionContent>{faq?.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}

      </div>
    </section>
  );
};

export default Question;
