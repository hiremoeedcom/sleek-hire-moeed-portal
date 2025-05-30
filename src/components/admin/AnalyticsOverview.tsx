
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { logger } from '@/utils/logger';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

interface AnalyticsData {
  id: string;
  event_type: string;
  page_url?: string;
  created_at: string;
  data?: any;
}

const AnalyticsOverview = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        logger.error('Error fetching analytics:', error);
        toast({
          title: "Error",
          description: "Failed to load analytics",
          variant: "destructive",
        });
        return;
      }

      setAnalytics(data || []);
    } catch (error) {
      logger.error('Exception fetching analytics:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeStats = () => {
    const stats: { [key: string]: number } = {};
    analytics.forEach(event => {
      stats[event.event_type] = (stats[event.event_type] || 0) + 1;
    });
    return stats;
  };

  const getPageViewStats = () => {
    const stats: { [key: string]: number } = {};
    analytics
      .filter(event => event.event_type === 'page_view')
      .forEach(event => {
        const page = event.page_url || 'Unknown';
        stats[page] = (stats[page] || 0) + 1;
      });
    return stats;
  };

  const eventTypeStats = getEventTypeStats();
  const pageViewStats = getPageViewStats();
  const totalEvents = analytics.length;
  const todayEvents = analytics.filter(event => 
    new Date(event.created_at).toDateString() === new Date().toDateString()
  ).length;

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-lg">Loading analytics...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <p className="text-gray-600">Website traffic and user behavior insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">All time events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayEvents}</div>
            <p className="text-xs text-muted-foreground">Events today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventTypeStats.page_view || 0}</div>
            <p className="text-xs text-muted-foreground">Total page views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Form Submissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventTypeStats.form_submit || 0}</div>
            <p className="text-xs text-muted-foreground">Contact form submissions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
            <CardDescription>Distribution of event types</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(eventTypeStats).length === 0 ? (
              <p className="text-sm text-gray-500">No events recorded yet</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(eventTypeStats).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">
                      {type.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Pages</CardTitle>
            <CardDescription>Most visited pages</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(pageViewStats).length === 0 ? (
              <p className="text-sm text-gray-500">No page views recorded yet</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(pageViewStats)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 10)
                  .map(([page, count]) => (
                    <div key={page} className="flex justify-between items-center">
                      <span className="text-sm font-medium truncate">
                        {page.replace(window.location.origin, '') || '/'}
                      </span>
                      <span className="text-sm text-gray-600">{count}</span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest events from your website</CardDescription>
        </CardHeader>
        <CardContent>
          {analytics.length === 0 ? (
            <p className="text-sm text-gray-500">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {analytics.slice(0, 10).map((event) => (
                <div key={event.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <span className="text-sm font-medium capitalize">
                      {event.event_type.replace('_', ' ')}
                    </span>
                    {event.page_url && (
                      <span className="text-xs text-gray-500 ml-2">
                        {event.page_url.replace(window.location.origin, '') || '/'}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(event.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsOverview;
