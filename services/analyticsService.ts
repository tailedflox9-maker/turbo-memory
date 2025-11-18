
import { mainClient, analyticsClient } from './supabaseClients';
import { AnalyticsSummary, DailyStat, PopularBusiness, RecentVisit, Business } from '../types';

// Helper function to convert DB format to App format
const dbBusinessToBusiness = (db: any): Business => ({
  id: db.id,
  shopName: db.shop_name,
  ownerName: db.owner_name,
});

export const fetchSummary = async (): Promise<AnalyticsSummary> => {
    const { data, error } = await analyticsClient
      .from('analytics_summary')
      .select('total_unique_users, total_visits')
      .eq('id', 1)
      .single();

    if (error) {
        console.error('Error fetching summary:', error);
        throw new Error('Could not fetch analytics summary.');
    }

    return data || { total_unique_users: 0, total_visits: 0 };
};

export const fetchLiveUsersCount = async (): Promise<number> => {
    const ACTIVE_THRESHOLD = 60000; // Active if pinged within last 60 seconds
    const threshold = new Date(Date.now() - ACTIVE_THRESHOLD).toISOString();

    const { count, error } = await analyticsClient
      .from('live_users')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .gte('last_ping', threshold);

    if (error) {
        console.error('Error fetching live users count:', error);
        return 0;
    }
    return count || 0;
};

export const fetchDailyStats = async (days: number = 7): Promise<DailyStat[]> => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (days - 1));
    startDate.setHours(0, 0, 0, 0);

    const { data, error } = await analyticsClient
      .from('visit_logs')
      .select('visited_at')
      .gte('visited_at', startDate.toISOString());

    if (error) {
        console.error('Error fetching daily stats:', error);
        throw new Error('Could not fetch daily stats.');
    }

    const dailyData: Record<string, number> = {};
    for(let i = 0; i < days; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        const dateString = d.toISOString().split('T')[0];
        dailyData[dateString] = 0;
    }

    data?.forEach(log => {
        const date = new Date(log.visited_at).toISOString().split('T')[0];
        if (dailyData[date] !== undefined) {
            dailyData[date]++;
        }
    });

    return Object.entries(dailyData)
      .map(([date, count]) => ({ date, visits: count }))
      .sort((a, b) => a.date.localeCompare(b.date));
};

export const fetchPopularBusinesses = async (limit: number = 5): Promise<PopularBusiness[]> => {
    // 1. Get interaction counts from analytics DB
    const { data: interactions, error: interactionError } = await analyticsClient
        .rpc('get_popular_businesses', { count_limit: limit });

    if (interactionError) {
        console.error('Error fetching popular businesses interactions:', interactionError);
        throw new Error('Could not fetch popular businesses.');
    }

    if (!interactions || interactions.length === 0) {
        return [];
    }

    // 2. Get business IDs
    const businessIds = interactions.map((i: any) => i.business_id);

    // 3. Fetch business details from main DB
    const { data: businesses, error: businessError } = await mainClient
        .from('businesses')
        .select('id, shop_name')
        .in('id', businessIds);
        
    if (businessError) {
        console.error('Error fetching business details:', businessError);
        // Continue with IDs only if names fail
    }

    const businessMap = new Map(businesses?.map(b => [b.id, b.shop_name]));

    // 4. Merge data
    return interactions.map((i: any) => ({
        business_id: i.business_id,
        shopName: businessMap.get(i.business_id) || 'Unknown Business',
        total_interactions: i.total_interactions,
        views: i.views,
        calls: i.calls,
    }));
};

export const fetchRecentVisits = async (limit: number = 10): Promise<RecentVisit[]> => {
    const { data, error } = await analyticsClient
      .from('visit_logs')
      .select('id, user_name, visited_at')
      .order('visited_at', { ascending: false })
      .limit(limit);

    if (error) {
        console.error('Error fetching recent visits:', error);
        throw new Error('Could not fetch recent visits.');
    }
    return data || [];
};
