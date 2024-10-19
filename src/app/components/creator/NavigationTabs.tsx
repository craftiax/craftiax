const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["gallery", "about", "collections", "flareActivity"];

  return (
    <div className="flex border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 font-medium ${
            activeTab === tab
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
