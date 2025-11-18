import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DailyStat } from '../types';
import { Card, CardContent, Typography, Skeleton } from '@mui/material';

interface VisitsChartProps {
    data: DailyStat[];
    isLoading: boolean;
}

export const VisitsChart: React.FC<VisitsChartProps> = ({ data, isLoading }) => {
    const formattedData = data.map(item => ({
        ...item,
        name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
    }));
    
    return (
        <Card sx={{ height: '400px' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h3" mb={2}>
                    Visits (Last 7 Days)
                </Typography>
                {isLoading ? (
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke="#d1d5db" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#d1d5db" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1f2937',
                                    border: '1px solid #4b5563',
                                    color: '#f9fafb',
                                }}
                                labelStyle={{ color: '#d1d5db' }}
                            />
                            <Line type="monotone" dataKey="visits" stroke="#97BC62" strokeWidth={2} dot={{ r: 4, fill: '#97BC62' }} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
};