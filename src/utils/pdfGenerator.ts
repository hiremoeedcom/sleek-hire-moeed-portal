
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
}

export const generateProfessionalQuotePDF = (quotation: QuotationData) => {
  const doc = new jsPDF();
  
  // Company colors
  const primaryColor = [51, 51, 51]; // Dark gray
  const accentColor = [59, 130, 246]; // Blue
  const lightGray = [156, 163, 175];
  
  // Header with company branding
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Moeed Shaikh', 20, 25);
  
  // Tagline
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Full Stack Developer & Software Engineer', 20, 32);
  
  // Quote title
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('QUOTATION', 20, 60);
  
  // Quote details box
  doc.setFillColor(248, 250, 252);
  doc.rect(20, 70, 170, 30, 'F');
  doc.setDrawColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(20, 70, 170, 30, 'S');
  
  // Quote information
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Quote Number:', 25, 80);
  doc.setFont('helvetica', 'normal');
  doc.text(quotation.quote_number, 70, 80);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Date:', 25, 88);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(quotation.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }), 70, 88);
  
  if (quotation.valid_until) {
    doc.setFont('helvetica', 'bold');
    doc.text('Valid Until:', 25, 96);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date(quotation.valid_until).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }), 70, 96);
  }
  
  // Project title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.text('Project: ' + quotation.title, 20, 120);
  
  // Description section
  if (quotation.description) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Project Description:', 20, 135);
    
    doc.setFont('helvetica', 'normal');
    const splitDescription = doc.splitTextToSize(quotation.description, 170);
    doc.text(splitDescription, 20, 145);
  }
  
  // Price section
  const priceY = quotation.description ? 180 : 145;
  
  // Price box
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.rect(20, priceY, 170, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Investment:', 25, priceY + 10);
  
  doc.setFontSize(20);
  doc.text(`${quotation.currency} ${quotation.amount.toLocaleString()}`, 25, priceY + 20);
  
  // Terms and conditions
  const termsY = priceY + 40;
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Terms & Conditions:', 20, termsY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const terms = [
    '• 50% payment required to commence work',
    '• Remaining 50% due upon completion',
    '• All prices are in USD unless otherwise specified',
    '• This quote is valid for 30 days from the date above',
    '• Additional features may incur extra charges',
    '• Timeline estimates will be provided upon project approval'
  ];
  
  terms.forEach((term, index) => {
    doc.text(term, 20, termsY + 10 + (index * 6));
  });
  
  // Contact information footer
  const footerY = 250;
  doc.setFillColor(248, 250, 252);
  doc.rect(0, footerY, 210, 50, 'F');
  
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Contact Information:', 20, footerY + 15);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Email: hello@hiremoeed.com', 20, footerY + 25);
  doc.text('Website: www.hiremoeed.com', 20, footerY + 32);
  doc.text('Phone: Available upon request', 20, footerY + 39);
  
  // Thank you message
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Thank you for considering our services!', 105, footerY + 25);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('We look forward to working with you.', 105, footerY + 32);
  
  return doc;
};
