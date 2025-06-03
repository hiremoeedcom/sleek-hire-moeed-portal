
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
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Professional color palette
  const primary = '#1e293b';     // Slate 800
  const secondary = '#475569';   // Slate 600
  const accent = '#3b82f6';      // Blue 500
  const light = '#f8fafc';       // Slate 50
  const border = '#e2e8f0';      // Slate 200
  const success = '#059669';     // Green 600
  
  // A4 dimensions: 210mm x 297mm
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  
  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };
  
  let y = 25;
  
  // ===== HEADER SECTION =====
  // Company logo placeholder (you can replace with actual logo)
  doc.setFillColor(hexToRgb(accent).r, hexToRgb(accent).g, hexToRgb(accent).b);
  doc.circle(35, 35, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('MS', 35, 38, { align: 'center' });
  
  // Company details
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Your Website', 50, 32);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  doc.text('Professional Web Solutions', 50, 38);
  doc.text('hello@yourwebsite.com', 50, 44);
  doc.text('+1 (555) 123-4567', 50, 50);
  
  // QUOTATION title and details (right side)
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('QUOTATION', pageWidth - margin, 35, { align: 'right' });
  
  // Quote info box
  const infoBoxX = pageWidth - margin - 60;
  const infoBoxY = 45;
  doc.setFillColor(hexToRgb(light).r, hexToRgb(light).g, hexToRgb(light).b);
  doc.roundedRect(infoBoxX, infoBoxY, 60, 35, 2, 2, 'F');
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.roundedRect(infoBoxX, infoBoxY, 60, 35, 2, 2, 'S');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  doc.text('Quote #', infoBoxX + 3, infoBoxY + 8);
  doc.text('Date', infoBoxX + 3, infoBoxY + 18);
  doc.text('Valid Until', infoBoxX + 3, infoBoxY + 28);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text(quotation.quote_number, infoBoxX + 25, infoBoxY + 8);
  doc.text(new Date(quotation.created_at).toLocaleDateString('en-US', {
    month: 'short', day: '2-digit', year: 'numeric'
  }), infoBoxX + 25, infoBoxY + 18);
  
  const validUntil = quotation.valid_until 
    ? new Date(quotation.valid_until).toLocaleDateString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric'
      })
    : 'On request';
  doc.text(validUntil, infoBoxX + 25, infoBoxY + 28);
  
  y = 90;
  
  // ===== CLIENT INFORMATION =====
  // Bill To section
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('BILL TO', margin, y);
  
  y += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  const clientName = quotation.client_company || quotation.client_name || 'Valued Client';
  doc.text(clientName, margin, y);
  
  if (quotation.client_company && quotation.client_name) {
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
    doc.text(quotation.client_name, margin, y);
  }
  
  if (quotation.client_email) {
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(quotation.client_email, margin, y);
  }
  
  if (quotation.client_phone) {
    y += 6;
    doc.text(quotation.client_phone, margin, y);
  }
  
  y = Math.max(y, 125);
  y += 15;
  
  // ===== PROJECT DETAILS =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(accent).r, hexToRgb(accent).g, hexToRgb(accent).b);
  doc.text('PROJECT DETAILS', margin, y);
  
  y += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text(quotation.title, margin, y);
  
  if (quotation.description) {
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
    const descLines = doc.splitTextToSize(quotation.description, contentWidth * 0.7);
    doc.text(descLines, margin, y);
    y += descLines.length * 5;
  }
  
  y += 15;
  
  // ===== SERVICES TABLE =====
  const tableY = y;
  const tableHeight = 40;
  
  // Table header
  doc.setFillColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.rect(margin, tableY, contentWidth, 12, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('DESCRIPTION', margin + 5, tableY + 8);
  doc.text('QTY', margin + contentWidth * 0.65, tableY + 8);
  doc.text('RATE', margin + contentWidth * 0.75, tableY + 8);
  doc.text('AMOUNT', margin + contentWidth * 0.85, tableY + 8);
  
  // Table content
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, tableY + 12, contentWidth, 20, 'F');
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.rect(margin, tableY, contentWidth, 32, 'S');
  
  // Vertical lines
  doc.line(margin + contentWidth * 0.6, tableY, margin + contentWidth * 0.6, tableY + 32);
  doc.line(margin + contentWidth * 0.7, tableY, margin + contentWidth * 0.7, tableY + 32);
  doc.line(margin + contentWidth * 0.8, tableY, margin + contentWidth * 0.8, tableY + 32);
  
  // Horizontal line after header
  doc.line(margin, tableY + 12, margin + contentWidth, tableY + 12);
  
  // Service details
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(quotation.title, margin + 5, tableY + 22);
  doc.text('1', margin + contentWidth * 0.65, tableY + 22);
  doc.text(`${quotation.currency} ${quotation.amount.toLocaleString()}`, margin + contentWidth * 0.75, tableY + 22);
  doc.text(`${quotation.currency} ${quotation.amount.toLocaleString()}`, margin + contentWidth * 0.85, tableY + 22);
  
  y = tableY + 45;
  
  // ===== TOTALS SECTION =====
  const totalsX = margin + contentWidth * 0.6;
  const totalsWidth = contentWidth * 0.4;
  
  const subtotal = quotation.amount;
  const discount = quotation.discount_amount || 0;
  const taxRate = quotation.tax_rate || 0;
  const taxAmount = (subtotal - discount) * (taxRate / 100);
  const total = subtotal - discount + taxAmount;
  
  // Totals background
  doc.setFillColor(hexToRgb(light).r, hexToRgb(light).g, hexToRgb(light).b);
  doc.rect(totalsX, y, totalsWidth, 35, 'F');
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.rect(totalsX, y, totalsWidth, 35, 'S');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  
  let totalsY = y + 8;
  doc.text('Subtotal:', totalsX + 5, totalsY);
  doc.text(`${quotation.currency} ${subtotal.toLocaleString()}`, totalsX + totalsWidth - 5, totalsY, { align: 'right' });
  
  if (discount > 0) {
    totalsY += 6;
    doc.text('Discount:', totalsX + 5, totalsY);
    doc.text(`-${quotation.currency} ${discount.toLocaleString()}`, totalsX + totalsWidth - 5, totalsY, { align: 'right' });
  }
  
  if (taxRate > 0) {
    totalsY += 6;
    doc.text(`Tax (${taxRate}%):`, totalsX + 5, totalsY);
    doc.text(`${quotation.currency} ${taxAmount.toLocaleString()}`, totalsX + totalsWidth - 5, totalsY, { align: 'right' });
  }
  
  // Total line
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.line(totalsX + 5, totalsY + 3, totalsX + totalsWidth - 5, totalsY + 3);
  
  totalsY += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(hexToRgb(success).r, hexToRgb(success).g, hexToRgb(success).b);
  doc.text('TOTAL:', totalsX + 5, totalsY);
  doc.text(`${quotation.currency} ${total.toLocaleString()}`, totalsX + totalsWidth - 5, totalsY, { align: 'right' });
  
  y += 50;
  
  // ===== PAYMENT TERMS =====
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('PAYMENT TERMS', margin, y);
  
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  
  const paymentTerms = quotation.payment_terms || 'Payment due within 15 days of quote acceptance';
  const paymentLines = doc.splitTextToSize(paymentTerms, contentWidth * 0.8);
  doc.text(paymentLines, margin, y);
  y += paymentLines.length * 5 + 5;
  
  doc.text('• Bank Transfer, PayPal, Stripe accepted', margin, y);
  y += 5;
  doc.text('• All amounts in USD unless specified', margin, y);
  
  y += 15;
  
  // ===== FOOTER =====
  const footerY = pageHeight - 30;
  
  // Footer background
  doc.setFillColor(hexToRgb(light).r, hexToRgb(light).g, hexToRgb(light).b);
  doc.rect(0, footerY, pageWidth, 30, 'F');
  
  // Thank you message
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(accent).r, hexToRgb(accent).g, hexToRgb(accent).b);
  doc.text('Thank you for your business!', pageWidth / 2, footerY + 10, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  doc.text('This quotation is valid for 30 days from the date above.', pageWidth / 2, footerY + 18, { align: 'center' });
  doc.text('For questions, contact us at hello@yourwebsite.com', pageWidth / 2, footerY + 24, { align: 'center' });
  
  return doc;
};
