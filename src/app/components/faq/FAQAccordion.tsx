"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0"
        >
          <button
            className="flex justify-between items-center w-full text-left focus:outline-none"
            onClick={() => toggleItem(index)}
          >
            <span className="text-sm sm:text-base font-medium text-white">
              {item.question}
            </span>
            {openIndex === index ? (
              <FaChevronUp className="text-orange-500" />
            ) : (
              <FaChevronDown className="text-orange-500" />
            )}
          </button>
          {openIndex === index && (
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              {item.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
