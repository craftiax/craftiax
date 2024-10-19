import FAQAccordion from "../components/faq/FAQAccordion";
import ClientLayout from "../ClientLayout";

const FAQPage = () => {
  const faqItems = [
    {
      question: "What is Craftiax?",
      answer:
        "Craftiax is a platform that empowers creators to connect directly with their fans through blockchain technology and NFTs.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, simply connect your wallet using the 'Connect Wallet' button in the top right corner of the page.",
    },
    {
      question: "What are Flares?",
      answer:
        "Flares are a unique feature of Craftiax that allow fans to show appreciation for creators and their work. They're like super-charged likes that have real value.",
    },
    {
      question: "How do I purchase NFTs on Craftiax?",
      answer:
        "To purchase NFTs, browse the marketplace, select the NFT you want, and click 'Buy Now'. You'll need to have your wallet connected and sufficient funds to complete the transaction.",
    },
    {
      question: "What blockchain does Craftiax use?",
      answer:
        "Craftiax operates on the Ethereum blockchain, ensuring security and interoperability with other Ethereum-based platforms.",
    },
  ];

  return (
    <ClientLayout>
      <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center text-white mb-8">
            Frequently Asked Questions
          </h1>
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </ClientLayout>
  );
};

export default FAQPage;
