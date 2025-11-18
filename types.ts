
export interface Business {
  id: string;
  shopName: string;
  ownerName: string;
}

export interface AnalyticsSummary {
  total_unique_users: number;
  total_visits: number;
}

export interface DailyStat {
  date: string;
  visits: number;
}

export interface PopularBusiness {
  business_id: string;
  shopName: string;
  total_interactions: number;
  views: number;
  calls: number;
}

export interface RecentVisit {
  id: string;
  user_name: string;
  visited_at: string;
}
