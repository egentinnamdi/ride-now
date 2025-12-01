import { TrendingDown, TrendingUp } from "lucide-react";

export default function Trend({
  isUp,
  value,
}: {
  isUp: boolean;
  value: number;
}) {
  return (
    <div
      className={`${isUp ? "text-green-700" : "text-red-500"} pr-3 font-medium`}
    >
      {isUp ? <TrendingUp /> : <TrendingDown />}
      <span>{value}%</span>
    </div>
  );
}
