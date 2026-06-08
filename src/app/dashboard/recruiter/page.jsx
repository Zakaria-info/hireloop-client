'use client';
import { useSession } from '@/lib/auth-client';
import React from 'react';
import { CircleCheck, FileText, Persons, Thunderbolt as Bolt } from '@gravity-ui/icons';
import DashboardStats from '@/components/dashboard/DashboardStats';

const RecruiterDashboardPage = () => {
    const {data: session, isPending} = useSession();
    if (isPending) {
        return <div>Loading...</div>;
    }

    const recruiterStatsData = [
    { title: 'Total Job Posts', value: '48', icon: FileText },
    { title: 'Total Applicants', value: '1,284', icon: Persons },
    { title: 'Active Jobs', value: '18', icon: Bolt },
    { title: 'Jobs Closed', value: '32', icon: CircleCheck },
  ];

    const user = session?.user;
    console.log("session598", session )

    return (
        <div>
            <h1 className='text-2xl ml-47'>Welcome, {user?.name}</h1>
            <DashboardStats statsData={recruiterStatsData} />
        </div>
    );
};

export default RecruiterDashboardPage;
