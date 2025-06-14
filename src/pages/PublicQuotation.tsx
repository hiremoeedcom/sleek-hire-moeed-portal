
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText } from 'lucide-react';
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

const PublicQuotation = () => {
  const { quoteId } = useParams<{ quoteId: string }>();
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (quoteId) {
      fetchQuotation();
    }
  }, [quoteId]);

  const fetchQuotation = async () => {
    try {
      const { data, error } = await supabase
        .from('quotations')
        .select('*')
        .eq('quote_number', quoteId)
        .single();

      if (error) {
        setError('Quotation not found');
        return;
      }

      setQuotation(data);
    } catch (error) {
      console.error('Error fetching quotation:', error);
      setError('Failed to load quotation');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!quotation) return;

    try {
      const doc = generateProfessionalQuotePDF(quotation);
      doc.save(`quotation-${quotation.quote_number}.pdf`);
      
      toast({
        title: "Success",
        description: "PDF downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading quotation...</div>
      </div>
    );
  }

  if (error || !quotation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quotation Not Found</h1>
          <p className="text-gray-600">{error || 'The requested quotation could not be found.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quotation #{quotation.quote_number}</h1>
            <p className="text-gray-600">View and download your project quotation</p>
          </div>
          <Button onClick={downloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <QuotationPreview quotation={quotation} />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>This quotation is valid until {quotation.valid_until ? new Date(quotation.valid_until).toLocaleDateString() : 'further notice'}</p>
          <p className="mt-2">For any questions, please contact us at hello@hiremoeed.me</p>
        </div>
      </div>
    </div>
  );
};

// Reuse the same preview component from QuotationsManager
const QuotationPreview = ({ quotation }: { quotation: Quotation }) => {
  const subtotal = quotation.amount;
  const taxRate = quotation.tax_rate || 0;
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

  return (
    <div className="bg-white p-8 border border-gray-300 shadow-lg w-full mx-auto text-sm text-left">
      {/* Header */}
      <header className="flex justify-between border-b-2 border-gray-300 pb-4 mb-6">
        <div className="text-sm text-left">
          <h1 className="text-2xl font-bold text-blue-900 mb-1 text-left">HireMoeed</h1>
          <div className="mb-1 text-left">Professional Development & Tech Solutions</div>
          <div className="mb-1 text-left">Website: <a href="https://hiremoeed.me" className="text-blue-900">www.HireMoeed.me</a></div>
          <div className="mb-1 text-left">Email: <a href="mailto:hello@hiremoeed.me" className="text-blue-900">hello@hiremoeed.me</a></div>
          <div className="mb-1 text-left">Phone: +1 (555) 123-4567</div>
          <div className="text-left">New York, NY, USA</div>
        </div>
        <div className="text-sm min-w-[200px]">
          <div className="flex justify-between"><strong>Quotation #:</strong><span>{quotation.quote_number}</span></div>
          <div className="flex justify-between"><strong>Date:</strong><span>{new Date(quotation.created_at).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</span></div>
          <div className="flex justify-between"><strong>Valid Until:</strong><span>{validUntil}</span></div>
        </div>
      </header>

      {/* Client Information */}
      <div className="mb-6">
        <h2 className="text-lg mb-2 border-b border-gray-400 pb-1 text-left">Client Information</h2>
        <div className="flex justify-between text-sm">
          <address className="not-italic leading-relaxed text-left">
            <strong>Client:</strong><br />
            {quotation.client_name || 'Valued Client'}<br />
            {quotation.client_company && <>{quotation.client_company}<br /></>}
            {quotation.client_email && <>{quotation.client_email}<br /></>}
            {quotation.client_phone && <>{quotation.client_phone}<br /></>}
          </address>
          <address className="not-italic leading-relaxed text-left">
            <strong>Prepared By:</strong><br />
            Moeed from HireMoeed<br />
            hello@hiremoeed.me<br />
            +1 (555) 123-4567
          </address>
        </div>
      </div>

      {/* Quotation Breakdown */}
      <div className="mb-6">
        <h2 className="text-lg mb-2 border-b border-gray-400 pb-1 text-left">Quotation Breakdown</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-3 border-b border-gray-400 text-left bg-gray-100 font-semibold">Description</th>
              <th className="p-3 border-b border-gray-400 text-left bg-gray-100 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border-b border-gray-400 text-left">{quotation.title}</td>
              <td className="p-3 border-b border-gray-400 text-left">{quotation.currency} {quotation.amount.toLocaleString()}.00</td>
            </tr>
          </tbody>
        </table>

        {(taxRate > 0 || discount > 0) && (
          <div className="float-right mt-4 w-72">
            <table className="w-full text-sm">
              <tr>
                <td className="p-2 text-left">Subtotal:</td>
                <td className="p-2 text-right">{quotation.currency} {subtotal.toLocaleString()}.00</td>
              </tr>
              {discount > 0 && (
                <tr>
                  <td className="p-2 text-left">Discount:</td>
                  <td className="p-2 text-right">-{quotation.currency} {discount.toLocaleString()}.00</td>
                </tr>
              )}
              {taxRate > 0 && (
                <tr>
                  <td className="p-2 text-left">Tax ({taxRate}%):</td>
                  <td className="p-2 text-right">{quotation.currency} {taxAmount.toFixed(2)}</td>
                </tr>
              )}
              <tr className="font-bold">
                <td className="p-2 text-left"><strong>Total:</strong></td>
                <td className="p-2 text-right"><strong>{quotation.currency} {total.toFixed(2)}</strong></td>
              </tr>
            </table>
          </div>
        )}
      </div>

      <div className="clear-both"></div>

      {/* Notes */}
      {(quotation.notes || quotation.description) && (
        <div className="mb-6 text-sm">
          <h2 className="text-lg mb-2 border-b border-gray-400 pb-1 text-left">Notes</h2>
          <p className="leading-relaxed text-gray-700 text-left">
            {quotation.notes || quotation.description || 'This quotation includes all services as outlined above. Any additional changes outside this scope will be quoted separately.'}
          </p>
        </div>
      )}

      {/* Terms & Conditions */}
      <div className="mb-6 text-sm">
        <h2 className="text-lg mb-2 border-b border-gray-400 pb-1 text-left">Terms & Conditions</h2>
        <ul className="leading-relaxed text-gray-700 list-disc ml-5 text-left">
          <li>{paymentTerms}</li>
          <li>Quotation valid for 14 days from the issue date.</li>
          <li>Delivery timeline: {timeline} from project start.</li>
          <li>HireMoeed retains the right to adjust this quote for scope changes.</li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs mt-12 text-gray-600">
        This is an official quotation from <strong>HireMoeed</strong>.<br />
        Visit us at <a href="https://hiremoeed.me" className="text-blue-900">www.HireMoeed.me</a> or email us at <a href="mailto:hello@hiremoeed.me" className="text-blue-900">hello@hiremoeed.me</a>
      </footer>
    </div>
  );
};

export default PublicQuotation;
