
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
  
  // Professional color palette inspired by Nexcess design
  const primary = '#2c3e50';       // Dark blue-gray
  const secondary = '#7f8c8d';     // Medium gray
  const accent = '#3498db';        // Professional blue
  const lightGray = '#f8f9fa';     // Very light gray
  const border = '#e9ecef';        // Light border
  const darkText = '#2c3e50';      // Dark text
  
  // A4 dimensions
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
  
  // ===== HEADER WITH BRANDING =====
  // Company logo circle
  doc.setFillColor(hexToRgb(accent).r, hexToRgb(accent).g, hexToRgb(accent).b);
  doc.circle(30, 35, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('HM', 30, 38, { align: 'center' });
  
  // Company name and tagline
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Hire Moeed', 45, 32);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  doc.text('A DIGITAL WEB BRAND', 45, 38);
  
  // Contact information (top right)
  doc.setFontSize(8);
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  doc.text('hello@hiremoeed.me', pageWidth - margin, 25, { align: 'right' });
  doc.text('Available Worldwide', pageWidth - margin, 30, { align: 'right' });
  doc.text('Professional Web Solutions', pageWidth - margin, 35, { align: 'right' });
  
  y = 60;
  
  // ===== BILL TO SECTION =====
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('Bill To', margin, y);
  
  y += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  const clientDisplay = quotation.client_company || quotation.client_name || 'Valued Client';
  doc.text(clientDisplay, margin, y);
  
  if (quotation.client_company && quotation.client_name) {
    y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
    doc.text(quotation.client_name, margin, y);
  }
  
  if (quotation.client_email) {
    y += 5;
    doc.text(quotation.client_email, margin, y);
  }
  
  if (quotation.client_phone) {
    y += 5;
    doc.text(quotation.client_phone, margin, y);
  }
  
  // ===== QUOTE INFO BOX (RIGHT SIDE) =====
  const infoBoxX = pageWidth - margin - 70;
  const infoBoxY = 60;
  const infoBoxWidth = 70;
  const infoBoxHeight = 45;
  
  // Info box background
  doc.setFillColor(hexToRgb(lightGray).r, hexToRgb(lightGray).g, hexToRgb(lightGray).b);
  doc.rect(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight, 'F');
  
  // Account ID label
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  doc.text('Account ID: HM2024', infoBoxX + 5, infoBoxY + 8);
  
  // Quote number
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('Quote #', infoBoxX + 5, infoBoxY + 20);
  doc.setFontSize(18);
  doc.text(quotation.quote_number.replace('Q-', ''), infoBoxX + 5, infoBoxY + 28);
  
  // Date information
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  doc.text('Date Issued: ' + new Date(quotation.created_at).toLocaleDateString('en-US', {
    month: 'short', day: '2-digit', year: 'numeric'
  }), infoBoxX + 5, infoBoxY + 36);
  
  const validUntil = quotation.valid_until 
    ? new Date(quotation.valid_until).toLocaleDateString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric'
      })
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric'
      });
  doc.text('Valid Until: ' + validUntil, infoBoxX + 5, infoBoxY + 42);
  
  y = Math.max(y, infoBoxY + infoBoxHeight) + 20;
  
  // ===== SERVICES TABLE =====
  const tableStartY = y;
  const rowHeight = 8;
  const headerHeight = 12;
  
  // Table headers
  doc.setFillColor(hexToRgb(lightGray).r, hexToRgb(lightGray).g, hexToRgb(lightGray).b);
  doc.rect(margin, tableStartY, contentWidth, headerHeight, 'F');
  
  // Header borders
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.setLineWidth(0.5);
  doc.rect(margin, tableStartY, contentWidth, headerHeight, 'S');
  
  // Column widths
  const descWidth = contentWidth * 0.5;
  const qtyWidth = contentWidth * 0.15;
  const priceWidth = contentWidth * 0.175;
  const amountWidth = contentWidth * 0.175;
  
  // Vertical lines for columns
  doc.line(margin + descWidth, tableStartY, margin + descWidth, tableStartY + headerHeight);
  doc.line(margin + descWidth + qtyWidth, tableStartY, margin + descWidth + qtyWidth, tableStartY + headerHeight);
  doc.line(margin + descWidth + qtyWidth + priceWidth, tableStartY, margin + descWidth + qtyWidth + priceWidth, tableStartY + headerHeight);
  
  // Header text
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('Description', margin + 3, tableStartY + 8);
  doc.text('Quantity', margin + descWidth + 3, tableStartY + 8);
  doc.text('Price', margin + descWidth + qtyWidth + 3, tableStartY + 8);
  doc.text('Amount', margin + descWidth + qtyWidth + priceWidth + 3, tableStartY + 8);
  
  // Service row
  const serviceRowY = tableStartY + headerHeight;
  const serviceRowHeight = 25;
  
  // Service row background
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, serviceRowY, contentWidth, serviceRowHeight, 'F');
  doc.rect(margin, serviceRowY, contentWidth, serviceRowHeight, 'S');
  
  // Vertical lines for service row
  doc.line(margin + descWidth, serviceRowY, margin + descWidth, serviceRowY + serviceRowHeight);
  doc.line(margin + descWidth + qtyWidth, serviceRowY, margin + descWidth + qtyWidth, serviceRowY + serviceRowHeight);
  doc.line(margin + descWidth + qtyWidth + priceWidth, serviceRowY, margin + descWidth + qtyWidth + priceWidth, serviceRowY + serviceRowHeight);
  
  // Service details
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text(quotation.title, margin + 3, serviceRowY + 8);
  
  if (quotation.description) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
    const descLines = doc.splitTextToSize(quotation.description, descWidth - 10);
    doc.text(descLines.slice(0, 2), margin + 3, serviceRowY + 14);
  }
  
  // Timeline if available
  if (quotation.project_timeline) {
    doc.setFontSize(7);
    doc.setTextColor(hexToRgb(accent).r, hexToRgb(accent).g, hexToRgb(accent).b);
    doc.text('Timeline: ' + quotation.project_timeline, margin + 3, serviceRowY + 22);
  }
  
  // Quantity, Price, Amount
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('1', margin + descWidth + 10, serviceRowY + 12, { align: 'center' });
  doc.text(`${quotation.amount.toLocaleString()}.00`, margin + descWidth + qtyWidth + priceWidth - 3, serviceRowY + 12, { align: 'right' });
  doc.text(`${quotation.amount.toLocaleString()}.00`, margin + contentWidth - 3, serviceRowY + 12, { align: 'right' });
  
  y = serviceRowY + serviceRowHeight + 15;
  
  // ===== TOTALS SECTION =====
  const totalsStartX = margin + contentWidth * 0.65;
  const totalsWidth = contentWidth * 0.35;
  
  const subtotal = quotation.amount;
  const taxRate = quotation.tax_rate || 0;
  const discount = quotation.discount_amount || 0;
  const taxAmount = (subtotal - discount) * (taxRate / 100);
  const total = subtotal - discount + taxAmount;
  
  // Totals rows
  const totalsData = [
    { label: 'TAX', value: taxAmount.toFixed(2) },
    { label: 'TOTAL', value: total.toFixed(2), isBold: true },
    { label: 'PAYMENTS/CREDITS', value: '0.00' },
    { label: 'BALANCE DUE / USD', value: total.toFixed(2), isFinal: true }
  ];
  
  totalsData.forEach((item, index) => {
    const rowY = y + (index * 8);
    
    if (item.isFinal) {
      // Final balance due with background
      doc.setFillColor(hexToRgb(lightGray).r, hexToRgb(lightGray).g, hexToRgb(lightGray).b);
      doc.rect(totalsStartX, rowY - 2, totalsWidth, 10, 'F');
    }
    
    doc.setFontSize(9);
    doc.setFont('helvetica', item.isBold || item.isFinal ? 'bold' : 'normal');
    doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
    doc.text(item.label, totalsStartX + 3, rowY + 3);
    doc.text(item.value, totalsStartX + totalsWidth - 3, rowY + 3, { align: 'right' });
    
    if (item.isFinal) {
      doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
      doc.rect(totalsStartX, rowY - 2, totalsWidth, 10, 'S');
    }
  });
  
  y += 50;
  
  // ===== PAYMENTS SECTION =====
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('PAYMENTS', margin, y);
  
  y += 10;
  
  // Payment table header
  doc.setFillColor(hexToRgb(lightGray).r, hexToRgb(lightGray).g, hexToRgb(lightGray).b);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.rect(margin, y, contentWidth, 8, 'S');
  
  // Payment headers
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('Date', margin + 3, y + 5);
  doc.text('Method', margin + 30, y + 5);
  doc.text('Reference', margin + 80, y + 5);
  doc.text('Applied Amount', margin + 120, y + 5);
  doc.text('Total Payment', margin + 150, y + 5);
  
  // Payment row (empty)
  y += 8;
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, y, contentWidth, 10, 'F');
  doc.rect(margin, y, contentWidth, 10, 'S');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  doc.text('None', margin + 3, y + 6);
  
  y += 25;
  
  // ===== PROMOTIONAL MESSAGE =====
  doc.setFillColor(hexToRgb(lightGray).r, hexToRgb(lightGray).g, hexToRgb(lightGray).b);
  doc.rect(margin, y, contentWidth, 12, 'F');
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.rect(margin, y, contentWidth, 12, 'S');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('Get premium web solutions when you work with us! Visit https://hiremoeed.me/ to learn more.', margin + 3, y + 7);
  
  y += 25;
  
  // ===== FOOTER BRANDING =====
  const footerY = pageHeight - 40;
  
  // Brand logos section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  
  // Main brand
  doc.text('Hire Moeed', margin, footerY);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Powering Your Online Potential', margin, footerY + 6);
  
  // Services offered
  doc.text('Web Development', margin + 60, footerY);
  doc.text('Modern solutions optimized for', margin + 60, footerY + 4);
  doc.text('Digital Excellence', margin + 60, footerY + 8);
  
  doc.text('Mobile Apps', margin + 120, footerY);
  doc.text('Premium Mobile Solutions', margin + 120, footerY + 4);
  doc.text('and Software for Business', margin + 120, footerY + 8);
  
  // Payment terms
  y = footerY + 20;
  doc.setFontSize(8);
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  const paymentTerms = quotation.payment_terms || 'Payment due within 15 days of acceptance';
  doc.text(`Payment Terms: ${paymentTerms}`, margin, y);
  doc.text('For questions, contact us at hello@hiremoeed.me', margin, y + 5);
  
  return doc;
};
