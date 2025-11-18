import React, { useState, useEffect, useCallback } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material/styles';
import { DashboardLayout } from './components/DashboardLayout';
import { StatCard } from './components/StatCard';
import { VisitsChart } from './components/VisitsChart';
import { PopularBusinessesTable } from './components/PopularBusinessesTable';
import { RecentActivityFeed } from './components/RecentActivityFeed';
import { Login } from './components/Login';
import * as analyticsService from './services/analyticsService';
import { AnalyticsSummary, DailyStat, PopularBusiness, RecentVisit } from './types';
import { Alert, Grid } from '@mui/material';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#97BC62',
        },
        secondary: {
            main: '#2C5F2D',
        },
        background: {
            default: '#111827',
            paper: '#1f2937',
        },
        text: {
            primary: '#f9fafb',
            secondary: '#d1d5db',
        },
    },
});

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
    const [liveUsers, setLiveUsers] = useState<number>(0);
    const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
    const [popularBusinesses, setPopularBusinesses] = useState<PopularBusiness[]>([]);
    const [recentVisits, setRecentVisits] = useState<RecentVisit[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [summaryData, dailyStatsData, popularBusinessesData, recentVisitsData, liveUsersData] = await Promise.all([
                analyticsService.fetchSummary(),
                analyticsService.fetchDailyStats(7),
                analyticsService.fetchPopularBusinesses(5),
                analyticsService.fetchRecentVisits(10),
                analyticsService.fetchLiveUsersCount()
            ]);

            setSummary(summaryData);
            setDailyStats(dailyStatsData);
            setPopularBusinesses(popularBusinessesData);
            setRecentVisits(recentVisitsData);
            setLiveUsers(liveUsersData);
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
            setError("Failed to load dashboard data. Please check the connection and API keys.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated, fetchData]);

    useEffect(() => {
        if (!isAuthenticated) return;
        
        const interval = setInterval(async () => {
            try {
                const liveCount = await analyticsService.fetchLiveUsersCount();
                setLiveUsers(liveCount);
            } catch (err) {
                console.error("Failed to fetch live users count:", err);
            }
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, [isAuthenticated]);
    
    if (!isAuthenticated) {
        return (
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Login onLoginSuccess={() => setIsAuthenticated(true)} />
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <DashboardLayout>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <StatCard title="Total Users" value={summary?.total_unique_users} icon="group" isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <StatCard title="Total Visits" value={summary?.total_visits} icon="trending_up" isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={4}>
                        <StatCard title="Live Users" value={liveUsers} icon="sensors" isLoading={false} isLive={true} />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <VisitsChart data={dailyStats} isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <RecentActivityFeed visits={recentVisits} isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12}>
                        <PopularBusinessesTable businesses={popularBusinesses} isLoading={isLoading} />
                    </Grid>
                </Grid>
            </DashboardLayout>
        </ThemeProvider>
    );
};

export default App;