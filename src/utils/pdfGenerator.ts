
import jsPDF from 'jspdf';

interface QuotationData {
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

export const generateProfessionalQuotePDF = (quotation: QuotationData) => {
  const doc = new jsPDF();
  
  // Professional color scheme
  const primaryColor = [25, 44, 71]; // Navy blue
  const accentColor = [59, 130, 246]; // Blue
  const lightGray = [156, 163, 175];
  const darkGray = [75, 85, 99];
  
  let yPosition = 20;
  
  // 1. Header Section
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Company name and logo area
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('Moeed Shaikh', 20, 25);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Full Stack Developer & Software Engineer', 20, 35);
  
  // QUOTATION title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('QUOTATION', 150, 30);
  
  yPosition = 60;
  
  // Quote details in header
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Quote Number:', 150, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.text(quotation.quote_number, 150, yPosition + 8);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Quote Date:', 150, yPosition + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(quotation.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }), 150, yPosition + 26);
  
  if (quotation.valid_until) {
    doc.setFont('helvetica', 'bold');
    doc.text('Valid Until:', 150, yPosition + 36);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date(quotation.valid_until).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }), 150, yPosition + 44);
  }
  
  yPosition = 90;
  
  // 2. Sender Information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('FROM:', 20, yPosition);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('Moeed Shaikh', 20, yPosition + 10);
  
  doc.setFont('helvetica', 'normal');
  doc.text('Full Stack Developer & Software Engineer', 20, yPosition + 18);
  doc.text('Email: hello@hiremoeed.me', 20, yPosition + 26);
  doc.text('Website: www.hiremoeed.me', 20, yPosition + 34);
  doc.text('Available 24/7 - Response within 2 hours', 20, yPosition + 42);
  
  // 3. Client Information (Billed To)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('TO:', 110, yPosition);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  if (quotation.client_company) {
    doc.text(quotation.client_company, 110, yPosition + 10);
    doc.setFont('helvetica', 'normal');
    doc.text(quotation.client_name || '', 110, yPosition + 18);
  } else {
    doc.text(quotation.client_name || 'Valued Client', 110, yPosition + 10);
  }
  
  doc.setFont('helvetica', 'normal');
  if (quotation.client_email) {
    doc.text(`Email: ${quotation.client_email}`, 110, yPosition + 26);
  }
  if (quotation.client_phone) {
    doc.text(`Phone: ${quotation.client_phone}`, 110, yPosition + 34);
  }
  
  yPosition = 150;
  
  // 4. Project Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('PROJECT: ' + quotation.title.toUpperCase(), 20, yPosition);
  
  yPosition += 15;
  
  // Project Description
  if (quotation.description) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    const splitDescription = doc.splitTextToSize(quotation.description, 170);
    doc.text(splitDescription, 20, yPosition);
    yPosition += splitDescription.length * 5 + 10;
  }
  
  // 5. Itemized Services Table
  yPosition += 5;
  doc.setFillColor(248, 250, 252);
  doc.rect(20, yPosition, 170, 8, 'F');
  
  // Table headers
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('DESCRIPTION', 25, yPosition + 5);
  doc.text('QTY', 120, yPosition + 5);
  doc.text('RATE', 140, yPosition + 5);
  doc.text('TOTAL', 165, yPosition + 5);
  
  yPosition += 8;
  
  // Table border
  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(20, yPosition - 8, 170, 20, 'S');
  doc.line(115, yPosition - 8, 115, yPosition + 12);
  doc.line(135, yPosition - 8, 135, yPosition + 12);
  doc.line(155, yPosition - 8, 155, yPosition + 12);
  
  // Service item
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(quotation.title, 25, yPosition + 5);
  doc.text('1', 125, yPosition + 5);
  doc.text(`${quotation.currency} ${quotation.amount.toLocaleString()}`, 140, yPosition + 5);
  doc.text(`${quotation.currency} ${quotation.amount.toLocaleString()}`, 165, yPosition + 5);
  
  yPosition += 20;
  
  // 6. Subtotal, Taxes, and Discounts
  const subtotal = quotation.amount;
  const discount = quotation.discount_amount || 0;
  const taxRate = quotation.tax_rate || 0;
  const taxAmount = (subtotal - discount) * (taxRate / 100);
  const total = subtotal - discount + taxAmount;
  
  // Calculation section
  doc.setFillColor(248, 250, 252);
  doc.rect(120, yPosition, 70, 40, 'F');
  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(120, yPosition, 70, 40, 'S');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  // Subtotal
  doc.text('Subtotal:', 125, yPosition + 8);
  doc.text(`${quotation.currency} ${subtotal.toLocaleString()}`, 165, yPosition + 8);
  
  // Discount
  if (discount > 0) {
    doc.text('Discount:', 125, yPosition + 16);
    doc.text(`-${quotation.currency} ${discount.toLocaleString()}`, 165, yPosition + 16);
  }
  
  // Tax
  if (taxRate > 0) {
    doc.text(`Tax (${taxRate}%):`, 125, yPosition + 24);
    doc.text(`${quotation.currency} ${taxAmount.toLocaleString()}`, 165, yPosition + 24);
  }
  
  // Total
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('TOTAL:', 125, yPosition + 35);
  doc.text(`${quotation.currency} ${total.toLocaleString()}`, 165, yPosition + 35);
  
  yPosition += 50;
  
  // 7. Payment Instructions
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('PAYMENT INSTRUCTIONS', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  
  const paymentTerms = quotation.payment_terms || '50% payment required to commence work, remaining 50% due upon completion';
  const splitPaymentTerms = doc.splitTextToSize(paymentTerms, 170);
  doc.text(splitPaymentTerms, 20, yPosition);
  yPosition += splitPaymentTerms.length * 5 + 5;
  
  doc.text('• Payment Methods: Bank Transfer, PayPal, Stripe', 20, yPosition);
  doc.text('• Currency: USD (unless otherwise specified)', 20, yPosition + 8);
  doc.text('• Payment Terms: Due within 15 days of acceptance', 20, yPosition + 16);
  
  yPosition += 30;
  
  // 8. Notes and Terms
  if (yPosition > 240) {
    doc.addPage();
    yPosition = 20;
  }
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('TERMS & CONDITIONS', 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  
  const terms = [
    '• This quote is valid for 30 days from the date above',
    '• All prices are in USD unless otherwise specified',
    '• Additional features may incur extra charges and will be quoted separately',
    '• Timeline estimates will be provided upon project approval',
    '• Late payment fee of 2% per month may apply to overdue accounts',
    '• Free initial consultation and project planning included'
  ];
  
  terms.forEach((term, index) => {
    doc.text(term, 20, yPosition + (index * 6));
  });
  
  yPosition += terms.length * 6 + 10;
  
  // Thank you message
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('Thank you for considering our services!', 20, yPosition);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('We look forward to working with you and bringing your vision to life.', 20, yPosition + 8);
  
  // Footer
  const footerY = 280;
  doc.setFillColor(248, 250, 252);
  doc.rect(0, footerY, 210, 20, 'F');
  
  doc.setFontSize(8);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text('Moeed Shaikh | hello@hiremoeed.me | www.hiremoeed.me', 105, footerY + 10, { align: 'center' });
  doc.text('Professional Development Services | Available 24/7', 105, footerY + 16, { align: 'center' });
  
  return doc;
};
