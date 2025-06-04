
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
  const primary = '#0a3d62';
  const secondary = '#777777';
  const lightGray = '#f7f7f7';
  const border = '#cccccc';
  const darkText = '#222222';
  
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
  
  let y = 30;
  
  // ===== HEADER SECTION =====
  // Company name and details (left side)
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('HireMoeed', margin, y);
  
  y += 6;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Professional Development & Tech Solutions', margin, y);
  
  y += 4;
  doc.setFontSize(10);
  doc.setTextColor(hexToRgb(primary).r, hexToRgb(primary).g, hexToRgb(primary).b);
  doc.text('Website: www.HireMoeed.me', margin, y);
  
  y += 4;
  doc.text('Email: hello@hiremoeed.me', margin, y);
  
  y += 4;
  doc.text('Phone: +1 (555) 123-4567', margin, y);
  
  y += 4;
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('New York, NY, USA', margin, y);
  
  // Quote details (right side)
  const rightColumnX = pageWidth - 70;
  let rightY = 30;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Quotation #: ', rightColumnX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(quotation.quote_number, rightColumnX + 28, rightY);
  
  rightY += 5;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Date: ', rightColumnX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(new Date(quotation.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }), rightColumnX + 15, rightY);
  
  rightY += 5;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Valid Until: ', rightColumnX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const validUntil = quotation.valid_until 
    ? new Date(quotation.valid_until).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
  doc.text(validUntil, rightColumnX + 25, rightY);
  
  // Header border line
  y = Math.max(y, rightY) + 10;
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.setLineWidth(1.5);
  doc.line(margin, y, pageWidth - margin, y);
  
  y += 15;
  
  // ===== CLIENT INFORMATION SECTION =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Client Information', margin, y);
  
  // Section underline
  y += 2;
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 40, y);
  
  y += 10;
  
  // Client details (left column)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Client:', margin, y);
  
  y += 4;
  doc.setFont('helvetica', 'normal');
  const clientName = quotation.client_name || 'Valued Client';
  doc.text(clientName, margin, y);
  
  if (quotation.client_company) {
    y += 4;
    doc.text(quotation.client_company, margin, y);
  }
  
  if (quotation.client_email) {
    y += 4;
    doc.text(quotation.client_email, margin, y);
  }
  
  if (quotation.client_phone) {
    y += 4;
    doc.text(quotation.client_phone, margin, y);
  }
  
  // Prepared by (right column)
  const preparedByX = pageWidth - 80;
  let preparedY = y - (quotation.client_phone ? 16 : 12);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Prepared By:', preparedByX, preparedY);
  
  preparedY += 4;
  doc.setFont('helvetica', 'normal');
  doc.text('Moeed from HireMoeed', preparedByX, preparedY);
  
  preparedY += 4;
  doc.text('hello@hiremoeed.me', preparedByX, preparedY);
  
  preparedY += 4;
  doc.text('+1 (555) 123-4567', preparedByX, preparedY);
  
  y = Math.max(y, preparedY) + 15;
  
  // ===== QUOTATION BREAKDOWN SECTION =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Quotation Breakdown', margin, y);
  
  // Section underline
  y += 2;
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 50, y);
  
  y += 10;
  
  // Services table
  const tableStartY = y;
  const rowHeight = 10;
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
  const hoursWidth = contentWidth * 0.15;
  const rateWidth = contentWidth * 0.175;
  const amountWidth = contentWidth * 0.175;
  
  // Vertical lines for columns
  doc.line(margin + descWidth, tableStartY, margin + descWidth, tableStartY + headerHeight);
  doc.line(margin + descWidth + hoursWidth, tableStartY, margin + descWidth + hoursWidth, tableStartY + headerHeight);
  doc.line(margin + descWidth + hoursWidth + rateWidth, tableStartY, margin + descWidth + hoursWidth + rateWidth, tableStartY + headerHeight);
  
  // Header text
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Description', margin + 3, tableStartY + 8);
  doc.text('Hours', margin + descWidth + 3, tableStartY + 8);
  doc.text('Rate', margin + descWidth + hoursWidth + 3, tableStartY + 8);
  doc.text('Amount', margin + descWidth + hoursWidth + rateWidth + 3, tableStartY + 8);
  
  // Service row
  const serviceRowY = tableStartY + headerHeight;
  const serviceRowHeight = 15;
  
  // Service row background and border
  doc.setFillColor(255, 255, 255);
  doc.rect(margin, serviceRowY, contentWidth, serviceRowHeight, 'F');
  doc.rect(margin, serviceRowY, contentWidth, serviceRowHeight, 'S');
  
  // Vertical lines for service row
  doc.line(margin + descWidth, serviceRowY, margin + descWidth, serviceRowY + serviceRowHeight);
  doc.line(margin + descWidth + hoursWidth, serviceRowY, margin + descWidth + hoursWidth, serviceRowY + serviceRowHeight);
  doc.line(margin + descWidth + hoursWidth + rateWidth, serviceRowY, margin + descWidth + hoursWidth + rateWidth, serviceRowY + serviceRowHeight);
  
  // Service details
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  
  // Split long title into multiple lines if needed
  const titleLines = doc.splitTextToSize(quotation.title, descWidth - 6);
  doc.text(titleLines.slice(0, 2), margin + 3, serviceRowY + 6);
  
  if (quotation.description && titleLines.length === 1) {
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
    const descLines = doc.splitTextToSize(quotation.description, descWidth - 6);
    doc.text(descLines.slice(0, 1), margin + 3, serviceRowY + 10);
  }
  
  // Hours, Rate, Amount
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  
  // Calculate estimated hours (assuming $75/hour rate)
  const estimatedHours = Math.ceil(quotation.amount / 75);
  const hourlyRate = Math.round(quotation.amount / estimatedHours);
  
  doc.text(estimatedHours.toString(), margin + descWidth + 10, serviceRowY + 8, { align: 'center' });
  doc.text(`$${hourlyRate}.00`, margin + descWidth + hoursWidth + 10, serviceRowY + 8, { align: 'center' });
  doc.text(`$${quotation.amount.toLocaleString()}.00`, margin + descWidth + hoursWidth + rateWidth + amountWidth - 3, serviceRowY + 8, { align: 'right' });
  
  y = serviceRowY + serviceRowHeight + 10;
  
  // ===== TOTALS SECTION =====
  const totalsStartX = margin + contentWidth - 80;
  const totalsWidth = 80;
  
  const subtotal = quotation.amount;
  const taxRate = quotation.tax_rate || 8.5;
  const discount = quotation.discount_amount || 0;
  const taxAmount = (subtotal - discount) * (taxRate / 100);
  const total = subtotal - discount + taxAmount;
  
  // Totals table
  const totalsData = [
    { label: 'Subtotal:', value: `$${subtotal.toLocaleString()}.00` },
    { label: `Tax (${taxRate}%):`, value: `$${taxAmount.toFixed(2)}` },
    { label: 'Total:', value: `$${total.toFixed(2)}`, isBold: true }
  ];
  
  totalsData.forEach((item, index) => {
    const rowY = y + (index * 6);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', item.isBold ? 'bold' : 'normal');
    doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
    doc.text(item.label, totalsStartX, rowY);
    doc.text(item.value, totalsStartX + totalsWidth - 3, rowY, { align: 'right' });
    
    // Add border for total row
    if (item.isBold) {
      doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
      doc.line(totalsStartX, rowY + 1, totalsStartX + totalsWidth, rowY + 1);
    }
  });
  
  y += 30;
  
  // ===== NOTES SECTION =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Notes', margin, y);
  
  y += 2;
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 20, y);
  
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const notesText = quotation.notes || 
    'This quotation includes all design, development, testing, and deployment services as outlined above. Any additional changes outside this scope will be quoted separately.';
  
  const notesLines = doc.splitTextToSize(notesText, contentWidth);
  doc.text(notesLines, margin, y);
  
  y += (notesLines.length * 4) + 10;
  
  // ===== TERMS & CONDITIONS SECTION =====
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Terms & Conditions', margin, y);
  
  y += 2;
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 50, y);
  
  y += 8;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const paymentTerms = quotation.payment_terms || '50% payment due upon project commencement, 50% upon final delivery.';
  const timeline = quotation.project_timeline || '4–6 weeks';
  
  const terms = [
    paymentTerms,
    'Quotation valid for 14 days from the issue date.',
    `Delivery timeline: ${timeline} from project start.`,
    'HireMoeed retains the right to adjust this quote for scope changes.'
  ];
  
  terms.forEach((term, index) => {
    doc.text(`• ${term}`, margin, y);
    y += 5;
  });
  
  y += 15;
  
  // ===== SIGNATURE SECTION =====
  const sigStartY = Math.min(y, pageHeight - 60);
  
  // Signature lines
  const sig1X = margin;
  const sig2X = pageWidth - margin - 60;
  const sigWidth = 60;
  
  doc.setDrawColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.setLineWidth(0.5);
  doc.line(sig1X, sigStartY, sig1X + sigWidth, sigStartY);
  doc.line(sig2X, sigStartY, sig2X + sigWidth, sigStartY);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Authorized Signature – HireMoeed', sig1X + (sigWidth / 2), sigStartY + 6, { align: 'center' });
  doc.text('Client Signature', sig2X + (sigWidth / 2), sigStartY + 6, { align: 'center' });
  
  // ===== FOOTER =====
  const footerY = pageHeight - 25;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  
  const footerText1 = 'This is an official quotation from HireMoeed.';
  const footerText2 = 'Visit us at www.HireMoeed.me or email us at hello@hiremoeed.me';
  
  doc.text(footerText1, pageWidth / 2, footerY, { align: 'center' });
  doc.text(footerText2, pageWidth / 2, footerY + 4, { align: 'center' });
  
  return doc;
};
