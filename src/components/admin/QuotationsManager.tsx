import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Download, Send, Trash, Edit } from 'lucide-react';
import { generateProfessionalQuotePDF } from '@/utils/pdfGenerator';

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
  client_name?: string;
  client_email?: string;
  client_phone?: string;
  client_company?: string;
  project_timeline?: string;
  payment_terms?: string;
  notes?: string;
  tax_rate?: number;
  discount_amount?: number;
}

const QuotationsManager = () => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [previewDialog, setPreviewDialog] = useState<{ open: boolean; quotation: Quotation | null }>({
    open: false,
    quotation: null,
  });
  const [emailDialog, setEmailDialog] = useState<{ open: boolean; quotation: Quotation | null }>({
    open: false,
    quotation: null,
  });
  const [emailData, setEmailData] = useState({
    customerEmail: '',
    customerName: '',
  });
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

      if (error) {
        console.error('Error fetching quotations:', error);
        throw error;
      }
      setQuotations(data || []);
    } catch (error) {
      console.error('Exception in fetchQuotations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch quotations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createQuotation = async (formData: any) => {
    try {
      const { data: quoteNumber } = await supabase
        .rpc('generate_quote_number');

      const { error } = await supabase
        .from('quotations')
        .insert({
          quote_number: quoteNumber,
          ...formData,
        });

      if (error) {
        console.error('Error creating quotation:', error);
        throw error;
      }

      toast({
        title: "Success",
        description: "Quotation created successfully",
      });

      setIsCreateDialogOpen(false);
      fetchQuotations();
    } catch (error) {
      console.error('Exception in createQuotation:', error);
      toast({
        title: "Error",
        description: "Failed to create quotation",
        variant: "destructive",
      });
    }
  };

  const deleteQuotation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quotation?')) return;

    try {
      const { error } = await supabase
        .from('quotations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Quotation deleted successfully",
      });

      fetchQuotations();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete quotation",
        variant: "destructive",
      });
    }
  };

  const downloadPDF = (quotation: Quotation) => {
    try {
      const doc = generateProfessionalQuotePDF(quotation);
      doc.save(`quotation-${quotation.quote_number}.pdf`);
      
      toast({
        title: "Success",
        description: "Professional PDF downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    }
  };

  const previewPDF = (quotation: Quotation) => {
    setPreviewDialog({ open: true, quotation });
  };

  const sendEmail = async (quotation: Quotation) => {
    if (!emailData.customerEmail || !emailData.customerName) {
      toast({
        title: "Error",
        description: "Please provide customer email and name",
        variant: "destructive",
      });
      return;
    }

    try {
      const doc = generateProfessionalQuotePDF(quotation);
      const pdfBase64 = doc.output('datauristring').split(',')[1];

      const { data, error } = await supabase.functions.invoke('send-quotation-email', {
        body: {
          to: emailData.customerEmail,
          customerName: emailData.customerName,
          quotationData: quotation,
          pdfBase64: pdfBase64,
        },
      });

      if (error) throw error;

      toast({
        title: "Email Sent Successfully",
        description: `Professional quotation sent to ${emailData.customerEmail}`,
      });

      setEmailDialog({ open: false, quotation: null });
      setEmailData({ customerEmail: '', customerName: '' });
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: "Error",
        description: "Failed to send email. Please check your SMTP configuration.",
        variant: "destructive",
      });
    }
  };

  const openEmailDialog = (quotation: Quotation) => {
    setEmailDialog({ open: true, quotation });
    setEmailData({ 
      customerEmail: quotation.client_email || '', 
      customerName: quotation.client_name || '' 
    });
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
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
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
                  {quotation.client_name && (
                    <p className="text-sm text-muted-foreground">Client: {quotation.client_name}</p>
                  )}
                </div>
                <Badge className={getStatusColor(quotation.status)}>
                  {quotation.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
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
                <div>
                  <span className="text-sm font-medium">Timeline: </span>
                  <span className="text-sm">{quotation.project_timeline || 'Not specified'}</span>
                </div>
              </div>
              
              {quotation.description && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Description:</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded">{quotation.description}</p>
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="outline" onClick={() => previewPDF(quotation)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" variant="outline" onClick={() => downloadPDF(quotation)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button size="sm" variant="outline" onClick={() => openEmailDialog(quotation)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => deleteQuotation(quotation.id)}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewDialog.open} onOpenChange={(open) => setPreviewDialog({ open, quotation: null })}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Quotation Preview</DialogTitle>
          </DialogHeader>
          {previewDialog.quotation && (
            <QuotationPreview quotation={previewDialog.quotation} />
          )}
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={emailDialog.open} onOpenChange={(open) => setEmailDialog({ open, quotation: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Quotation via Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={emailData.customerName}
                onChange={(e) => setEmailData(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="Enter customer name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Customer Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={emailData.customerEmail}
                onChange={(e) => setEmailData(prev => ({ ...prev, customerEmail: e.target.value }))}
                placeholder="Enter customer email"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => emailDialog.quotation && sendEmail(emailDialog.quotation)}>
                Send Email
              </Button>
              <Button variant="outline" onClick={() => setEmailDialog({ open: false, quotation: null })}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Preview component that shows quotation as HTML
const QuotationPreview = ({ quotation }: { quotation: Quotation }) => {
  const subtotal = quotation.amount;
  const taxRate = quotation.tax_rate || 8.5;
  const discount = quotation.discount_amount || 0;
  const taxAmount = (subtotal - discount) * (taxRate / 100);
  const total = subtotal - discount + taxAmount;

  const validUntil = quotation.valid_until 
    ? new Date(quotation.valid_until).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

  const paymentTerms = quotation.payment_terms || '50% payment due upon project commencement, 50% upon final delivery.';
  const timeline = quotation.project_timeline || '4–6 weeks';
  const estimatedHours = Math.ceil(quotation.amount / 75);
  const hourlyRate = Math.round(quotation.amount / estimatedHours);

  return (
    <div className="bg-white p-8 border border-gray-300 shadow-lg max-w-4xl mx-auto text-sm">
      {/* Header */}
      <header className="flex justify-between border-b-2 border-gray-300 pb-4 mb-6">
        <div className="text-sm">
          <h1 className="text-2xl font-bold text-blue-900 mb-1">HireMoeed</h1>
          <div className="mb-1">Professional Development & Tech Solutions</div>
          <div className="mb-1">Website: <a href="https://hiremoeed.me" className="text-blue-900">www.HireMoeed.me</a></div>
          <div className="mb-1">Email: <a href="mailto:hello@hiremoeed.me" className="text-blue-900">hello@hiremoeed.me</a></div>
          <div className="mb-1">Phone: +1 (555) 123-4567</div>
          <div>New York, NY, USA</div>
        </div>
        <div className="text-right text-sm">
          <div><strong>Quotation #: </strong>{quotation.quote_number}</div>
          <div><strong>Date: </strong>{new Date(quotation.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</div>
          <div><strong>Valid Until: </strong>{validUntil}</div>
        </div>
      </header>

      {/* Client Information */}
      <div className="mb-6">
        <h2 className="text-lg mb-2 border-b border-gray-400 pb-1">Client Information</h2>
        <div className="flex justify-between text-sm">
          <address className="not-italic leading-relaxed">
            <strong>Client:</strong><br />
            {quotation.client_name || 'Valued Client'}<br />
            {quotation.client_company && <>{quotation.client_company}<br /></>}
            {quotation.client_email && <>{quotation.client_email}<br /></>}
            {quotation.client_phone && <>{quotation.client_phone}<br /></>}
          </address>
          <address className="not-italic leading-relaxed">
            <strong>Prepared By:</strong><br />
            Moeed from HireMoeed<br />
            hello@hiremoeed.me<br />
            +1 (555) 123-4567
          </address>
        </div>
      </div>

      {/* Quotation Breakdown */}
      <div className="mb-6">
        <h2 className="text-lg mb-2 border-b border-gray-400 pb-1">Quotation Breakdown</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-3 border-b border-gray-400 text-left bg-gray-100 font-semibold">Description</th>
              <th className="p-3 border-b border-gray-400 text-left bg-gray-100 font-semibold">Hours</th>
              <th className="p-3 border-b border-gray-400 text-left bg-gray-100 font-semibold">Rate</th>
              <th className="p-3 border-b border-gray-400 text-left bg-gray-100 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border-b border-gray-400">{quotation.title}</td>
              <td className="p-3 border-b border-gray-400">{estimatedHours}</td>
              <td className="p-3 border-b border-gray-400">${hourlyRate}.00</td>
              <td className="p-3 border-b border-gray-400">${quotation.amount.toLocaleString()}.00</td>
            </tr>
          </tbody>
        </table>

        <div className="float-right mt-4 w-72">
          <table className="w-full text-sm">
            <tr>
              <td className="p-2">Subtotal:</td>
              <td className="p-2 text-right">${subtotal.toLocaleString()}.00</td>
            </tr>
            <tr>
              <td className="p-2">Tax ({taxRate}%):</td>
              <td className="p-2 text-right">${taxAmount.toFixed(2)}</td>
            </tr>
            <tr className="font-bold">
              <td className="p-2"><strong>Total:</strong></td>
              <td className="p-2 text-right"><strong>${total.toFixed(2)}</strong></td>
            </tr>
          </table>
        </div>
      </div>

      <div className="clear-both"></div>

      {/* Notes */}
      <div className="mb-6 text-sm">
        <h2 className="text-lg mb-2 border-b border-gray-400 pb-1">Notes</h2>
        <p className="leading-relaxed text-gray-700">
          {quotation.notes || 'This quotation includes all design, development, testing, and deployment services as outlined above. Any additional changes outside this scope will be quoted separately.'}
        </p>
      </div>

      {/* Terms & Conditions */}
      <div className="mb-6 text-sm">
        <h2 className="text-lg mb-2 border-b border-gray-400 pb-1">Terms & Conditions</h2>
        <ul className="leading-relaxed text-gray-700 list-disc ml-5">
          <li>{paymentTerms}</li>
          <li>Quotation valid for 14 days from the issue date.</li>
          <li>Delivery timeline: {timeline} from project start.</li>
          <li>HireMoeed retains the right to adjust this quote for scope changes.</li>
        </ul>
      </div>

      {/* Signature */}
      <div className="flex justify-between mt-16 mb-6">
        <div className="w-2/5">
          <div className="border-t border-black pt-1 text-center text-sm">Authorized Signature – HireMoeed</div>
        </div>
        <div className="w-2/5">
          <div className="border-t border-black pt-1 text-center text-sm">Client Signature</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs mt-12 text-gray-600">
        This is an official quotation from <strong>HireMoeed</strong>.<br />
        Visit us at <a href="https://hiremoeed.me" className="text-blue-900">www.HireMoeed.me</a> or email us at <a href="mailto:hello@hiremoeed.me" className="text-blue-900">hello@hiremoeed.me</a>
      </footer>
    </div>
  );
};

const CreateQuoteForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: 0,
    currency: 'USD',
    valid_until: '',
    client_name: '',
    client_email: '',
    client_phone: '',
    client_company: '',
    project_timeline: '',
    payment_terms: '50% upfront, 50% on completion',
    notes: '',
    tax_rate: 0,
    discount_amount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="project_timeline">Project Timeline</Label>
          <Input
            id="project_timeline"
            value={formData.project_timeline}
            onChange={(e) => updateField('project_timeline', e.target.value)}
            placeholder="e.g., 4-6 weeks"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={3}
          placeholder="Detailed description of the project scope and deliverables"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_name">Client Name</Label>
          <Input
            id="client_name"
            value={formData.client_name}
            onChange={(e) => updateField('client_name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_email">Client Email</Label>
          <Input
            id="client_email"
            type="email"
            value={formData.client_email}
            onChange={(e) => updateField('client_email', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_phone">Client Phone</Label>
          <Input
            id="client_phone"
            value={formData.client_phone}
            onChange={(e) => updateField('client_phone', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_company">Client Company</Label>
          <Input
            id="client_company"
            value={formData.client_company}
            onChange={(e) => updateField('client_company', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount *</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => updateField('amount', Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select value={formData.currency} onValueChange={(value) => updateField('currency', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
              <SelectItem value="PKR">PKR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="valid_until">Valid Until</Label>
          <Input
            id="valid_until"
            type="date"
            value={formData.valid_until}
            onChange={(e) => updateField('valid_until', e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tax_rate">Tax Rate (%)</Label>
          <Input
            id="tax_rate"
            type="number"
            step="0.01"
            value={formData.tax_rate}
            onChange={(e) => updateField('tax_rate', Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discount_amount">Discount Amount</Label>
          <Input
            id="discount_amount"
            type="number"
            value={formData.discount_amount}
            onChange={(e) => updateField('discount_amount', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="payment_terms">Payment Terms</Label>
        <Textarea
          id="payment_terms"
          value={formData.payment_terms}
          onChange={(e) => updateField('payment_terms', e.target.value)}
          rows={2}
          placeholder="Payment terms and conditions"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          rows={3}
          placeholder="Any additional notes or special requirements"
        />
      </div>

      <Button type="submit" className="w-full">
        Create Quotation
      </Button>
    </form>
  );
};

export default QuotationsManager;
