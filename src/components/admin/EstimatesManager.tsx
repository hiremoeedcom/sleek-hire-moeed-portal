
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { DollarSign, Clock, Code, Mail } from 'lucide-react';

type EstimateStatus = 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
type ProjectType = 'website' | 'webapp' | 'mobile' | 'fullstack' | 'ecommerce' | 'api';

interface Estimate {
  id: string;
  name: string;
  email: string;
  company?: string;
  project_type: ProjectType;
  budget?: string;
  timeline?: string;
  features: string[];
  description?: string;
  estimated_cost_min: number;
  estimated_cost_max: number;
  status: EstimateStatus;
  created_at: string;
}

const EstimatesManager = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEstimates();
  }, []);

  const fetchEstimates = async () => {
    try {
      const { data, error } = await supabase
        .from('estimates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching estimates:', error);
        throw error;
      }
      
      // Cast the data to match our interface types
      const formattedEstimates = (data || []).map(estimate => ({
        ...estimate,
        project_type: estimate.project_type as ProjectType,
        status: estimate.status as EstimateStatus,
        features: estimate.features || []
      }));
      
      setEstimates(formattedEstimates);
    } catch (error) {
      console.error('Exception in fetchEstimates:', error);
      toast({
        title: "Error",
        description: "Failed to fetch estimates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: EstimateStatus) => {
    try {
      const { error } = await supabase
        .from('estimates')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
        throw error;
      }

      setEstimates(estimates.map(estimate => 
        estimate.id === id ? { ...estimate, status } : estimate
      ));

      toast({
        title: "Success",
        description: "Estimate status updated",
      });
    } catch (error) {
      console.error('Exception in updateStatus:', error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: EstimateStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'quoted': return 'bg-purple-100 text-purple-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div>Loading estimates...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Project Estimates</h2>
        <Badge variant="secondary">{estimates.length} total</Badge>
      </div>

      <div className="grid gap-4">
        {estimates.map((estimate) => (
          <Card key={estimate.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{estimate.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{estimate.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(estimate.status)}>
                    {estimate.status}
                  </Badge>
                  <Select
                    value={estimate.status}
                    onValueChange={(value: EstimateStatus) => updateStatus(estimate.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="quoted">Quoted</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{estimate.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm capitalize">{estimate.project_type}</span>
                  </div>
                  {estimate.timeline && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{estimate.timeline}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      ${estimate.estimated_cost_min.toLocaleString()} - ${estimate.estimated_cost_max.toLocaleString()}
                    </span>
                  </div>
                  {estimate.budget && (
                    <div>
                      <span className="text-sm font-medium">Client Budget: </span>
                      <span className="text-sm">{estimate.budget}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {estimate.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {estimate.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {estimate.description && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Description:</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded">{estimate.description}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm">
                  Create Quote
                </Button>
                <Button size="sm" variant="outline" onClick={() => window.open(`mailto:${estimate.email}`)}>
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EstimatesManager;
