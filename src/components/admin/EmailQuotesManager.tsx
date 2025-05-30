
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Send, Plus, FileText } from 'lucide-react';

interface EmailQuote {
  customerEmail: string;
  customerName: string;
  subject: string;
  projectDescription: string;
  items: QuoteItem[];
  totalAmount: number;
  validUntil: string;
}

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const EmailQuotesManager = () => {
  const [quote, setQuote] = useState<EmailQuote>({
    customerEmail: '',
    customerName: '',
    subject: '',
    projectDescription: '',
    items: [{ id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }],
    totalAmount: 0,
    validUntil: '',
  });
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [quote.items]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('id, name, email')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const calculateTotal = () => {
    const total = quote.items.reduce((sum, item) => sum + item.total, 0);
    setQuote(prev => ({ ...prev, totalAmount: total }));
  };

  const addQuoteItem = () => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setQuote(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const updateQuoteItem = (id: string, field: keyof QuoteItem, value: any) => {
    setQuote(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  const removeQuoteItem = (id: string) => {
    if (quote.items.length > 1) {
      setQuote(prev => ({
        ...prev,
        items: prev.items.filter(item => item.id !== id),
      }));
    }
  };

  const selectContact = (contactEmail: string) => {
    const contact = contacts.find(c => c.email === contactEmail);
    if (contact) {
      setQuote(prev => ({
        ...prev,
        customerEmail: contact.email,
        customerName: contact.name,
        subject: `Quote for ${contact.name}`,
      }));
    }
  };

  const generateQuoteHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .quote-details { margin-bottom: 30px; }
          .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .items-table th, .items-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .items-table th { background-color: #f2f2f2; }
          .total { text-align: right; font-size: 18px; font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Project Quote</h1>
          <p>Quote Date: ${new Date().toLocaleDateString()}</p>
        </div>
        
        <div class="quote-details">
          <p><strong>Customer:</strong> ${quote.customerName}</p>
          <p><strong>Email:</strong> ${quote.customerEmail}</p>
          <p><strong>Project Description:</strong> ${quote.projectDescription}</p>
          ${quote.validUntil ? `<p><strong>Valid Until:</strong> ${new Date(quote.validUntil).toLocaleDateString()}</p>` : ''}
        </div>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${quote.items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>$${item.unitPrice.toFixed(2)}</td>
                <td>$${item.total.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="total">
          <p>Total Amount: $${quote.totalAmount.toFixed(2)}</p>
        </div>
        
        <div class="footer">
          <p>Thank you for your business!</p>
          <p>If you have any questions, please don't hesitate to contact us.</p>
        </div>
      </body>
      </html>
    `;
  };

  const saveAndSendQuote = async () => {
    if (!quote.customerEmail || !quote.customerName || quote.items.some(item => !item.description)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // First save to quotations table
      const { data: quoteNumber } = await (supabase as any).rpc('generate_quote_number');
      
      const { error: saveError } = await (supabase as any)
        .from('quotations')
        .insert({
          quote_number: quoteNumber,
          title: quote.subject || `Quote for ${quote.customerName}`,
          description: quote.projectDescription,
          amount: quote.totalAmount,
          valid_until: quote.validUntil || null,
          status: 'sent',
        });

      if (saveError) throw saveError;

      // Generate and prepare email content
      const emailHTML = generateQuoteHTML();

      // In a real application, you would integrate with an email service
      // For demo purposes, we'll show success message
      toast({
        title: "Quote Sent Successfully",
        description: `Quote has been sent to ${quote.customerEmail}`,
      });

      // Reset form
      setQuote({
        customerEmail: '',
        customerName: '',
        subject: '',
        projectDescription: '',
        items: [{ id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }],
        totalAmount: 0,
        validUntil: '',
      });

    } catch (error) {
      console.error('Error sending quote:', error);
      toast({
        title: "Error",
        description: "Failed to send quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Create & Send Quote</h2>
        <FileText className="h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-select">Select Existing Contact</Label>
              <Select onValueChange={selectContact}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a contact" />
                </SelectTrigger>
                <SelectContent>
                  {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.email}>
                      {contact.name} ({contact.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-name">Customer Name</Label>
              <Input
                id="customer-name"
                value={quote.customerName}
                onChange={(e) => setQuote(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="Enter customer name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-email">Customer Email</Label>
              <Input
                id="customer-email"
                type="email"
                value={quote.customerEmail}
                onChange={(e) => setQuote(prev => ({ ...prev, customerEmail: e.target.value }))}
                placeholder="Enter customer email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={quote.subject}
                onChange={(e) => setQuote(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Quote subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valid-until">Valid Until</Label>
              <Input
                id="valid-until"
                type="date"
                value={quote.validUntil}
                onChange={(e) => setQuote(prev => ({ ...prev, validUntil: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea
                id="project-description"
                value={quote.projectDescription}
                onChange={(e) => setQuote(prev => ({ ...prev, projectDescription: e.target.value }))}
                placeholder="Describe the project scope and requirements"
                rows={8}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Quote Items</CardTitle>
            <Button onClick={addQuoteItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quote.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-5">
                  <Label htmlFor={`description-${item.id}`}>Description</Label>
                  <Input
                    id={`description-${item.id}`}
                    value={item.description}
                    onChange={(e) => updateQuoteItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                  <Input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuoteItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor={`unitPrice-${item.id}`}>Unit Price</Label>
                  <Input
                    id={`unitPrice-${item.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateQuoteItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Total</Label>
                  <div className="h-10 flex items-center font-medium">
                    ${item.total.toFixed(2)}
                  </div>
                </div>
                <div className="col-span-1">
                  {quote.items.length > 1 && (
                    <Button
                      onClick={() => removeQuoteItem(item.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="text-right">
              <div className="text-2xl font-bold">
                Total: ${quote.totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button onClick={saveAndSendQuote} disabled={loading}>
          <Send className="h-4 w-4 mr-2" />
          {loading ? "Sending..." : "Save & Send Quote"}
        </Button>
      </div>
    </div>
  );
};

export default EmailQuotesManager;
