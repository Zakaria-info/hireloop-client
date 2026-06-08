import React from "react";
import StatCard from "./StatCard";

export default function DashboardStats({ statsData = [] }) {
  if (!statsData || statsData.length === 0) return null;

  return (
    <div className="mt-6 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {statsData.map((stat, index) => (
          <StatCard
            key={stat.id || index}
            title={stat.title}
            value={stat.value}
            Icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}
