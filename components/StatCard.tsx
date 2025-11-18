import React from 'react';
import { Card, CardContent, Typography, Box, Icon, Skeleton } from '@mui/material';

interface StatCardProps {
    title: string;
    value?: number;
    icon: string;
    isLoading: boolean;
    isLive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, isLoading, isLive = false }) => {
    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent>
                    {isLoading ? (
                        <>
                            <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                            <Skeleton variant="text" width="40%" height={40} />
                        </>
                    ) : (
                        <>
                            <Typography color="text.secondary" gutterBottom>
                                {title}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h4" component="div" fontWeight="bold">
                                    {value !== undefined ? value.toLocaleString() : '-'}
                                </Typography>
                                {isLive && (
                                    <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                                      <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                      </span>
                                    </Box>
                                )}
                            </Box>
                        </>
                    )}
                </CardContent>
            </Box>
            <Box sx={{ 
                width: 64, 
                height: 64, 
                borderRadius: '50%', 
                bgcolor: 'primary.main',
                opacity: 0.2,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 2
            }}>
                <Icon sx={{ color: 'primary.light', fontSize: '2rem' }}>{icon}</Icon>
            </Box>
        </Card>
    );
};