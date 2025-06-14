
import jsPDF from 'jspdf';

interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

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
  items?: QuotationItem[];
}

export const generateProfessionalQuotePDF = (quotation: QuotationData) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Professional color palette to match HTML
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
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('HireMoeed', margin, y);
  
  y += 5;
  doc.setFontSize(10);
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
  
  // Quote details (right side) - with right alignment for values
  const rightColumnX = pageWidth - 80;
  let rightY = 30;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Quotation #:', rightColumnX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(quotation.quote_number, pageWidth - margin, rightY, { align: 'right' });
  
  rightY += 4;
  doc.setFont('helvetica', 'bold');
  doc.text('Date:', rightColumnX, rightY);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(quotation.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }), pageWidth - margin, rightY, { align: 'right' });
  
  rightY += 4;
  doc.setFont('helvetica', 'bold');
  doc.text('Valid Until:', rightColumnX, rightY);
  doc.setFont('helvetica', 'normal');
  const validUntil = quotation.valid_until 
    ? new Date(quotation.valid_until).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
  doc.text(validUntil, pageWidth - margin, rightY, { align: 'right' });
  
  // Header border line
  y = Math.max(y, rightY) + 8;
  doc.setDrawColor(hexToRgb('#e0e0e0').r, hexToRgb('#e0e0e0').g, hexToRgb('#e0e0e0').b);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  
  y += 12;
  
  // ===== CLIENT INFORMATION SECTION =====
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Client Information', margin, y);
  
  // Section underline
  y += 2;
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 35, y);
  
  y += 8;
  
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
  const preparedByX = pageWidth - 65;
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
  
  y = Math.max(y, preparedY) + 12;
  
  // ===== QUOTATION BREAKDOWN SECTION =====
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Quotation Breakdown', margin, y);
  
  // Section underline
  y += 2;
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 42, y);
  
  y += 8;
  
  // Table setup for items
  const tableStartY = y;
  const headerHeight = 10;
  const rowHeight = 8;
  
  // Table headers
  doc.setFillColor(hexToRgb(lightGray).r, hexToRgb(lightGray).g, hexToRgb(lightGray).b);
  doc.rect(margin, tableStartY, contentWidth, headerHeight, 'F');
  
  // Header borders
  doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
  doc.setLineWidth(0.5);
  doc.rect(margin, tableStartY, contentWidth, headerHeight, 'S');
  
  // Column widths for multiple items
  const descWidth = contentWidth * 0.4;
  const qtyWidth = contentWidth * 0.15;
  const priceWidth = contentWidth * 0.2;
  const totalWidth = contentWidth * 0.25;
  
  // Vertical lines for columns
  doc.line(margin + descWidth, tableStartY, margin + descWidth, tableStartY + headerHeight);
  doc.line(margin + descWidth + qtyWidth, tableStartY, margin + descWidth + qtyWidth, tableStartY + headerHeight);
  doc.line(margin + descWidth + qtyWidth + priceWidth, tableStartY, margin + descWidth + qtyWidth + priceWidth, tableStartY + headerHeight);
  
  // Header text
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Description', margin + 2, tableStartY + 7);
  doc.text('Qty', margin + descWidth + 2, tableStartY + 7);
  doc.text('Unit Price', margin + descWidth + qtyWidth + 2, tableStartY + 7);
  doc.text('Total', margin + descWidth + qtyWidth + priceWidth + 2, tableStartY + 7);
  
  let currentY = tableStartY + headerHeight;
  
  // Display items - either from items array or fallback to single item
  const itemsToDisplay = quotation.items && quotation.items.length > 0 
    ? quotation.items 
    : [{
        id: '1',
        description: quotation.title,
        quantity: 1,
        unit_price: quotation.amount,
        total: quotation.amount
      }];
  
  itemsToDisplay.forEach((item, index) => {
    // Item row background and border
    doc.setFillColor(255, 255, 255);
    doc.rect(margin, currentY, contentWidth, rowHeight, 'F');
    doc.rect(margin, currentY, contentWidth, rowHeight, 'S');
    
    // Vertical lines for item row
    doc.line(margin + descWidth, currentY, margin + descWidth, currentY + rowHeight);
    doc.line(margin + descWidth + qtyWidth, currentY, margin + descWidth + qtyWidth, currentY + rowHeight);
    doc.line(margin + descWidth + qtyWidth + priceWidth, currentY, margin + descWidth + qtyWidth + priceWidth, currentY + rowHeight);
    
    // Item details
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
    
    // Description (truncated if too long)
    const descLines = doc.splitTextToSize(item.description, descWidth - 4);
    doc.text(descLines[0], margin + 2, currentY + 5.5);
    
    // Quantity (centered)
    doc.text(item.quantity.toString(), margin + descWidth + qtyWidth/2, currentY + 5.5, { align: 'center' });
    
    // Unit Price (right aligned)
    doc.text(`${quotation.currency} ${item.unit_price.toFixed(2)}`, margin + descWidth + qtyWidth + priceWidth - 2, currentY + 5.5, { align: 'right' });
    
    // Total (right aligned)
    doc.text(`${quotation.currency} ${item.total.toFixed(2)}`, margin + descWidth + qtyWidth + priceWidth + totalWidth - 2, currentY + 5.5, { align: 'right' });
    
    currentY += rowHeight;
  });
  
  y = currentY + 8;
  
  // ===== TOTALS SECTION =====
  const totalsStartX = margin + contentWidth - 70;
  const totalsWidth = 70;
  
  const subtotal = quotation.items && quotation.items.length > 0 
    ? quotation.items.reduce((sum, item) => sum + item.total, 0)
    : quotation.amount;
  const taxRate = quotation.tax_rate || 0;
  const discount = quotation.discount_amount || 0;
  const taxAmount = (subtotal - discount) * (taxRate / 100);
  const total = subtotal - discount + taxAmount;
  
  // Only show totals if there's tax or discount
  if (taxRate > 0 || discount > 0) {
    const totalsData = [
      { label: 'Subtotal:', value: `${quotation.currency} ${subtotal.toFixed(2)}` },
      ...(discount > 0 ? [{ label: 'Discount:', value: `-${quotation.currency} ${discount.toFixed(2)}` }] : []),
      ...(taxRate > 0 ? [{ label: `Tax (${taxRate}%):`, value: `${quotation.currency} ${taxAmount.toFixed(2)}` }] : []),
      { label: 'Total:', value: `${quotation.currency} ${total.toFixed(2)}`, isBold: true }
    ];
    
    totalsData.forEach((item, index) => {
      const rowY = y + (index * 5);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', item.isBold ? 'bold' : 'normal');
      doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
      doc.text(item.label, totalsStartX, rowY);
      doc.text(item.value, totalsStartX + totalsWidth - 2, rowY, { align: 'right' });
      
      // Add border for total row
      if (item.isBold) {
        doc.setDrawColor(hexToRgb(border).r, hexToRgb(border).g, hexToRgb(border).b);
        doc.line(totalsStartX, rowY + 1, totalsStartX + totalsWidth, rowY + 1);
      }
    });
    
    y += (totalsData.length * 5) + 10;
  }
  
  // ===== NOTES SECTION =====
  if (quotation.notes || quotation.description) {
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
    doc.text('Notes', margin, y);
    
    y += 2;
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin + 18, y);
    
    y += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(hexToRgb('#444444').r, hexToRgb('#444444').g, hexToRgb('#444444').b);
    
    const notesText = quotation.notes || quotation.description || 
      'This quotation includes all services as outlined above. Any additional changes outside this scope will be quoted separately.';
    
    const notesLines = doc.splitTextToSize(notesText, contentWidth);
    doc.text(notesLines, margin, y);
    
    y += (notesLines.length * 4) + 10;
  }
  
  // ===== TERMS & CONDITIONS SECTION =====
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(hexToRgb(darkText).r, hexToRgb(darkText).g, hexToRgb(darkText).b);
  doc.text('Terms & Conditions', margin, y);
  
  y += 2;
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 42, y);
  
  y += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb('#444444').r, hexToRgb('#444444').g, hexToRgb('#444444').b);
  
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
    y += 4;
  });
  
  y += 15;
  
  // ===== FOOTER =====
  const footerY = pageHeight - 20;
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(hexToRgb(secondary).r, hexToRgb(secondary).g, hexToRgb(secondary).b);
  
  const footerText1 = 'This is an official quotation from HireMoeed.';
  const footerText2 = 'Visit us at www.HireMoeed.me or email us at hello@hiremoeed.me';
  
  doc.text(footerText1, pageWidth / 2, footerY, { align: 'center' });
  doc.text(footerText2, pageWidth / 2, footerY + 4, { align: 'center' });
  
  return doc;
};
