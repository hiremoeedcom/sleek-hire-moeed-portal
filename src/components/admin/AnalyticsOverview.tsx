
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Users, FolderOpen, CheckSquare, Calculator, FileText, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalContacts: number;
  totalProjects: number;
  totalTasks: number;
  totalEstimates: number;
  totalQuotations: number;
  pendingTasks: number;
  activeProjects: number;
  recentContacts: number;
}

const AnalyticsOverview = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    totalProjects: 0,
    totalTasks: 0,
    totalEstimates: 0,
    totalQuotations: 0,
    pendingTasks: 0,
    activeProjects: 0,
    recentContacts: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch all counts in parallel
      const [
        contactsResult,
        projectsResult,
        tasksResult,
        estimatesResult,
        quotationsResult,
        pendingTasksResult,
        activeProjectsResult,
        recentContactsResult
      ] = await Promise.all([
        supabase.from('contacts').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('tasks').select('*', { count: 'exact', head: true }),
        (supabase as any).from('estimates').select('*', { count: 'exact', head: true }),
        (supabase as any).from('quotations').select('*', { count: 'exact', head: true }),
        supabase.from('tasks').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('projects').select('*', { count: 'exact', head: true }).in('status', ['active', 'in_progress']),
        supabase.from('contacts').select('*', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
      ]);

      setStats({
        totalContacts: contactsResult.count || 0,
        totalProjects: projectsResult.count || 0,
        totalTasks: tasksResult.count || 0,
        totalEstimates: estimatesResult.count || 0,
        totalQuotations: quotationsResult.count || 0,
        pendingTasks: pendingTasksResult.count || 0,
        activeProjects: activeProjectsResult.count || 0,
        recentContacts: recentContactsResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      icon: Users,
      change: stats.recentContacts > 0 ? `+${stats.recentContacts} this week` : 'No new contacts',
      changeType: stats.recentContacts > 0 ? 'positive' : 'neutral',
    },
    {
      title: "Active Projects",
      value: stats.activeProjects,
      icon: FolderOpen,
      change: `${stats.totalProjects} total projects`,
      changeType: 'neutral',
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      icon: CheckSquare,
      change: `${stats.totalTasks} total tasks`,
      changeType: stats.pendingTasks > 5 ? 'negative' : 'neutral',
    },
    {
      title: "Estimates",
      value: stats.totalEstimates,
      icon: Calculator,
      change: "Project requests",
      changeType: 'neutral',
    },
    {
      title: "Quotations",
      value: stats.totalQuotations,
      icon: FileText,
      change: "Generated quotes",
      changeType: 'neutral',
    },
    {
      title: "Growth",
      value: Math.round((stats.recentContacts / Math.max(stats.totalContacts, 1)) * 100),
      icon: TrendingUp,
      change: "Weekly growth %",
      changeType: stats.recentContacts > 0 ? 'positive' : 'neutral',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-xs ${
                card.changeType === 'positive' ? 'text-green-600' : 
                card.changeType === 'negative' ? 'text-red-600' : 
                'text-muted-foreground'
              }`}>
                {card.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {stats.totalContacts > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Projects</span>
                  <span className="font-medium">{stats.activeProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Projects</span>
                  <span className="font-medium">{stats.totalProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Tasks</span>
                  <span className="font-medium">{stats.pendingTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Tasks</span>
                  <span className="font-medium">{stats.totalTasks}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Contacts</span>
                  <span className="font-medium">{stats.totalContacts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Project Estimates</span>
                  <span className="font-medium">{stats.totalEstimates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Generated Quotes</span>
                  <span className="font-medium">{stats.totalQuotations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Weekly Growth</span>
                  <span className="font-medium">{stats.recentContacts} contacts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {stats.totalContacts === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No Data Yet</h3>
            <p className="text-sm text-muted-foreground text-center">
              Start by adding contacts, projects, and tasks to see analytics here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsOverview;
