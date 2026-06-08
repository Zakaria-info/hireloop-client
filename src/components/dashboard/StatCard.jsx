import React from 'react';
import { Card } from "@heroui/react";

// Updated Single StatCard using HeroUI v3+ API Dot Notation
export default function StatCard({ title, value, Icon }) {
  return (
    <Card className="bg-[#121212] border border-[#232323] text-white w-full shadow-md rounded-2xl">
      {/* HeroUI v3 utilizes Card.Content as the flexible inner content wrapper */}
      <Card.Content className="p-6 flex flex-col justify-between min-h-40">
        {/* Icon Container */}
        <div className="w-10 h-10 rounded-lg bg-[#222222] flex items-center justify-center mb-4">
          {Icon && <Icon className="text-gray-400 w-5 h-5" size={20} />}
        </div>

        {/* Content Breakdown */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-400 tracking-wide uppercase">
            {title}
          </p>
          <p className="text-3xl font-semibold tracking-tight text-gray-100">
            {value}
          </p>
        </div>
      </Card.Content>
    </Card>
  );
}

// Master component you'll import to feed different datasets
export function StatsGrid({ statsData }) {
  if (!statsData || statsData.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl">
      {statsData.map((stat, index) => (
        <StatCard
          key={stat.id || index}
          title={stat.title}
          value={stat.value}
          Icon={stat.icon}
        />
      ))}
    </div>
  );
}
