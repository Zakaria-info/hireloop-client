import React from 'react';
// HeroUI v3 parent component
import { Card } from '@heroui/react'; 
// Gravity UI Icons 
import { Briefcase, NodesDown, Magnifier, Star } from '@gravity-ui/icons';

// Reusable Stat Card Component
const StatCard = ({ icon, value, label }) => {
  return (
    <Card 
      className="border border-zinc-800/50 bg-zinc-950/40 backdrop-blur-md rounded-2xl w-full"
      variant="transparent"
    >
      {/* Fixed: In HeroUI v3, the main wrapper is Card.Content instead of Card.Body */}
      <Card.Content className="p-6 flex flex-col justify-between min-h-[180px] text-left">
        {/* Icon wrapper */}
        <div className="text-zinc-400">
          {icon}
        </div>
        
        {/* Metric and Label */}
        <div className="mt-6 space-y-1">
          <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-white font-sans">
            {value}
          </h3>
          <p className="text-xs text-zinc-400 font-medium">
            {label}
          </p>
        </div>
      </Card.Content>
    </Card>
  );
};

export default function MetricsSection() {
  const stats = [
    {
      icon: <Briefcase width={20} height={20} />,
      value: "50K",
      label: "Active Jobs"
    },
    {
      icon: <NodesDown width={20} height={20} />, 
      value: "12K",
      label: "Companies"
    },
    {
      icon: <Magnifier width={20} height={20} />,
      value: "2M",
      label: "Job Seekers"
    },
    {
      icon: <Star width={20} height={20} />,
      value: "97%",
      label: "Satisfaction Rate"
    }
  ];

  return (
    <section className="relative w-full min-h-150 bg-black text-white flex flex-col items-center justify-center overflow-hidden px-4 py-16">
      
      {/* Background Globe Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-80"
        style={{ 
          backgroundImage: "url('/images/globe.png')",
        }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10 max-w-6xl w-full text-center space-y-12">
        
        {/* Heading Section */}
        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-zinc-300 leading-snug">
            Assisting over <span className="text-white font-semibold">15,000 job seekers</span> <br />
            find their dream positions.
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full pt-4">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
        
      </div>
    </section>
  );
}