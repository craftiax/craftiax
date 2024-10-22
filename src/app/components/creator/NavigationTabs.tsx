import React from "react";

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobile: boolean;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
  isMobile,
}) => {
  const tabs = [
    { id: "gallery", label: "Gallery" },
    { id: "about", label: "About" },
    { id: "collections", label: "Collections" },
    { id: "flareActivity", label: "Flare Activity" },
  ];

  return (
    <div
      className={`flex ${isMobile ? "flex-wrap" : ""} border-b border-gray-700`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${
            activeTab === tab.id
              ? "border-b-2 border-orange-500 text-orange-500"
              : "text-gray-400 hover:text-white"
          } ${
            isMobile ? "flex-grow" : ""
          } px-2 sm:px-4 py-2 font-medium text-xs sm:text-sm focus:outline-none`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
