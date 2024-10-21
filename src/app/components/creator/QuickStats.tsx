import { FaUsers, FaPaintBrush, FaFire, FaCalendarAlt } from "react-icons/fa";

interface Stats {
  followers: number;
  nftsCreated: number;
  totalFlares: number;
  totalUSDCEarned: number;
}

const QuickStats = ({ stats }: { stats: Stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatItem label="Followers" value={stats.followers} />
      <StatItem label="NFTs Created" value={stats.nftsCreated} />
      <StatItem label="Total Flares" value={stats.totalFlares} />
      <StatItem
        label="Total USDC Earned"
        value={`$${stats.totalUSDCEarned.toLocaleString()}`}
      />
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="bg-gray-800 rounded-lg p-4 flex items-center">
    <div className="text-2xl text-orange-500 mr-4">{icon}</div>
    <div>
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => <StatCard icon={<FaUsers />} label={label} value={value} />;

export default QuickStats;
