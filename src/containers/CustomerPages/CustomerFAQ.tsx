import React, { useState } from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import Footer from "../../shared/Footer/Footer";
import Header3 from "components/Header/Header3";

const faqs = [
  {
    question: "How do I book a service?",
    answer:
      "To book a service, browse the available listings, select your desired service, and follow the booking instructions on the detail page.",
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel or reschedule your booking from your account dashboard under 'My Bookings'. Please check the cancellation policy for each service.",
  },
  {
    question: "How do I contact the service expert?",
    answer:
      "After booking, you can message the expert directly through the platform's messaging system for any queries or coordination.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit/debit cards and secure online payment methods. Your payment information is encrypted and safe.",
  },
  {
    question: "How do I leave a review?",
    answer:
      "After your service is completed, you will receive an email and a dashboard notification to leave a review for your expert.",
  },
];

const CustomerFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-neutral-900 dark:to-neutral-800">
      <Header3 />
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-900 dark:text-white">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-medium text-left text-blue-800 dark:text-blue-200 focus:outline-none focus:bg-blue-100 dark:focus:bg-neutral-800 transition"
                onClick={() => handleToggle(idx)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${openIndex === idx ? "rotate-180" : "rotate-0"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-blue-700 dark:text-blue-100 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerFAQ; 