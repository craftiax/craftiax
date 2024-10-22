import { useState, useEffect } from "react";
import { FaFire } from "react-icons/fa";

interface FlareActivityItem {
  id: number;
  action: string;
  timestamp: string;
}

const FlareActivity = ({ activities }: { activities: FlareActivityItem[] }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};

const ActivityItem = ({
  activity,
  isMobile,
}: {
  activity: FlareActivityItem;
  isMobile: boolean;
}) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg p-3 sm:p-4 flex items-center ${isMobile ? "text-xs" : "text-sm"}`}
    >
      <div
        className={`bg-orange-500 rounded-full p-2 mr-3 sm:mr-4 ${isMobile ? "text-sm" : "text-base"}`}
      >
        <FaFire />
      </div>
      <div className="flex-grow">
        <p className={isMobile ? "text-xs" : "text-sm"}>{activity.action}</p>
        <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-sm"} mt-1`}>
          {new Date(activity.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default FlareActivity;
