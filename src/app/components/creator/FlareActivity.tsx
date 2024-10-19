import { FaFire } from "react-icons/fa";

interface FlareActivityProps {
  activities: {
    id: number;
    action: string;
    timestamp: string;
  }[];
}

const FlareActivity: React.FC<FlareActivityProps> = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center">
            <FaFire className="text-orange-500 mr-2" />
            <span className="text-white">{activity.action}</span>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            {new Date(activity.timestamp).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlareActivity;
