import React from 'react';
import { RecentVisit } from '../types';
import {
    Card, CardContent, Typography, List, ListItem, ListItemAvatar,
    Avatar, ListItemText, Skeleton, Box, Icon
} from '@mui/material';

interface RecentActivityFeedProps {
    visits: RecentVisit[];
    isLoading: boolean;
}

const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "m ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "just now";
}

const FeedSkeleton = () => (
    <List>
        {[...Array(5)].map((_, i) => (
            <ListItem key={i}>
                <ListItemAvatar>
                    <Skeleton variant="circular">
                        <Avatar />
                    </Skeleton>
                </ListItemAvatar>
                <ListItemText
                    primary={<Skeleton variant="text" width="60%" />}
                    secondary={<Skeleton variant="text" width="30%" />}
                />
            </ListItem>
        ))}
    </List>
);


export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ visits, isLoading }) => {
    return (
        <Card sx={{ height: '400px' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h3" mb={1}>
                    Recent Activity
                </Typography>
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {isLoading ? <FeedSkeleton /> : (
                        <List>
                            {visits.length > 0 ? visits.map((visit) => (
                                <ListItem key={visit.id}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                            <Icon>visibility</Icon>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography component="span" variant="body2" color="text.primary">
                                                <Box component="span" fontWeight="bold">{visit.user_name || 'Anonymous'}</Box> visited
                                            </Typography>
                                        }
                                        secondary={timeAgo(visit.visited_at)}
                                    />
                                </ListItem>
                            )) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.secondary' }}>
                                    No recent activity.
                                </Box>
                            )}
                        </List>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};