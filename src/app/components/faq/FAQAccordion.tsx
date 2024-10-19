"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            className="w-full text-left p-4 focus:outline-none bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-white">
                {item.question}
              </span>
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  openIndex === index ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>
          {openIndex === index && (
            <div className="p-4 bg-gray-800">
              <p className="text-gray-300">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
