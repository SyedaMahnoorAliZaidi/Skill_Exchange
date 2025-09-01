import React, { useState } from "react";
import AdminHeader from "../../components/Header/AdminHeader";
import Footer from "../../shared/Footer/Footer";

const faqs = [
  {
    question: "How do I list my services?",
    answer:
      "To list your services, go to your expert dashboard and click on 'Add New Service'. Fill in the required details and submit for approval.",
  },
  {
    question: "How do I manage my bookings?",
    answer:
      "You can view and manage all your bookings from the 'My Bookings' section in your expert dashboard. Here you can accept, reschedule, or cancel bookings.",
  },
  {
    question: "How do I get paid?",
    answer:
      "Payments are processed securely and transferred to your linked bank account after the service is completed and reviewed by the customer.",
  },
  {
    question: "Can I set my own availability?",
    answer:
      "Yes, you can set your available dates and times in your profile settings to ensure you only receive bookings when you are available.",
  },
  {
    question: "How do I respond to customer reviews?",
    answer:
      "You can respond to customer reviews directly from the 'Reviews' section in your dashboard to maintain good communication and reputation.",
  },
];

const ExpertFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-neutral-900 dark:to-neutral-800">
      <AdminHeader />
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-900 dark:text-white">Expert Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-medium text-left text-purple-800 dark:text-purple-200 focus:outline-none focus:bg-purple-100 dark:focus:bg-neutral-800 transition"
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
                <div className="px-6 pb-4 text-purple-700 dark:text-purple-100 animate-fade-in">
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

export default ExpertFAQ; 