
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Download, Send } from 'lucide-react';

interface Quotation {
  id: string;
  quote_number: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  status: string;
  valid_until?: string;
  created_at: string;
}

const QuotationsManager = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuotations();
  }, []);

  const fetchQuotations = async () => {
    try {
      const { data, error } = await supabase
        .from('quotations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotations(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch quotations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createQuotation = async (formData: {
    title: string;
    description: string;
    amount: number;
    valid_until: string;
  }) => {
    try {
      const { data: quoteNumber } = await supabase
        .rpc('generate_quote_number');

      const { error } = await supabase
        .from('quotations')
        .insert({
          quote_number: quoteNumber,
          title: formData.title,
          description: formData.description,
          amount: formData.amount,
          valid_until: formData.valid_until,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Quotation created successfully",
      });

      setIsCreateDialogOpen(false);
      fetchQuotations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create quotation",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div>Loading quotations...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Quotations</h2>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{quotations.length} total</Badge>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Quote
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Quotation</DialogTitle>
              </DialogHeader>
              <CreateQuoteForm onSubmit={createQuotation} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4">
        {quotations.map((quotation) => (
          <Card key={quotation.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{quotation.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">#{quotation.quote_number}</p>
                </div>
                <Badge className={getStatusColor(quotation.status)}>
                  {quotation.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Amount: </span>
                  <span className="text-lg font-bold">
                    {quotation.currency} {quotation.amount.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium">Valid Until: </span>
                  <span className="text-sm">
                    {quotation.valid_until ? new Date(quotation.valid_until).toLocaleDateString() : 'No expiry'}
                  </span>
                </div>
              </div>
              
              {quotation.description && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Description:</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded">{quotation.description}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button size="sm" variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CreateQuoteForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: 0,
    valid_until: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (USD)</Label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="valid_until">Valid Until</Label>
        <Input
          id="valid_until"
          type="date"
          value={formData.valid_until}
          onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
        />
      </div>
      <Button type="submit" className="w-full">
        Create Quotation
      </Button>
    </form>
  );
};

export default QuotationsManager;
