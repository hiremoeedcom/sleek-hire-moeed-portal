
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  customerName: string;
  quotationData: {
    quote_number: string;
    title: string;
    description?: string;
    amount: number;
    currency: string;
    valid_until?: string;
    created_at: string;
  };
  pdfBase64?: string;
}

const generateQuotationHTML = (customerName: string, quotationData: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Project Quotation</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
          color: white; 
          padding: 30px; 
          text-align: center; 
          border-radius: 10px 10px 0 0; 
        }
        .content { 
          background: #f8f9fa; 
          padding: 30px; 
          border: 1px solid #e9ecef; 
        }
        .quote-box { 
          background: white; 
          padding: 20px; 
          border-radius: 8px; 
          margin: 20px 0; 
          box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
        }
        .price-highlight { 
          background: #e3f2fd; 
          padding: 15px; 
          border-left: 4px solid #2196f3; 
          margin: 20px 0; 
        }
        .footer { 
          background: #333; 
          color: white; 
          padding: 20px; 
          text-align: center; 
          border-radius: 0 0 10px 10px; 
        }
        .btn { 
          display: inline-block; 
          background: #2196f3; 
          color: white; 
          padding: 12px 24px; 
          text-decoration: none; 
          border-radius: 6px; 
          margin: 10px 0; 
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Your Project Quotation</h1>
        <p>Professional web development services</p>
      </div>
      
      <div class="content">
        <h2>Hello ${customerName},</h2>
        
        <p>Thank you for your interest in working with me! I'm excited about the possibility of bringing your project to life.</p>
        
        <div class="quote-box">
          <h3>Quote Details</h3>
          <p><strong>Quote Number:</strong> ${quotationData.quote_number}</p>
          <p><strong>Project:</strong> ${quotationData.title}</p>
          <p><strong>Date:</strong> ${new Date(quotationData.created_at).toLocaleDateString()}</p>
          ${quotationData.valid_until ? `<p><strong>Valid Until:</strong> ${new Date(quotationData.valid_until).toLocaleDateString()}</p>` : ''}
        </div>
        
        ${quotationData.description ? `
        <div class="quote-box">
          <h3>Project Description</h3>
          <p>${quotationData.description}</p>
        </div>
        ` : ''}
        
        <div class="price-highlight">
          <h3 style="margin: 0; color: #2196f3;">Total Investment: ${quotationData.currency} ${quotationData.amount.toLocaleString()}</h3>
        </div>
        
        <div class="quote-box">
          <h3>What's Next?</h3>
          <p>If you'd like to proceed with this project, simply reply to this email or contact me directly. I'm here to answer any questions you might have about the scope, timeline, or technical details.</p>
          
          <p>I look forward to the opportunity to work together and create something amazing!</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:hello@hiremoeed.com" class="btn">Reply to Discuss</a>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>Moeed Shaikh</strong><br>
        Full Stack Developer & Software Engineer</p>
        <p>Email: hello@hiremoeed.com<br>
        Website: www.hiremoeed.com</p>
        <p style="font-size: 12px; margin-top: 20px;">
          This quotation is valid for 30 days. All prices are in USD unless otherwise specified.
        </p>
      </div>
    </body>
    </html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, customerName, quotationData, pdfBase64 }: EmailRequest = await req.json();

    const attachments = [];
    if (pdfBase64) {
      attachments.push({
        filename: `quotation-${quotationData.quote_number}.pdf`,
        content: pdfBase64,
        type: 'application/pdf',
      });
    }

    const emailResponse = await resend.emails.send({
      from: "Moeed Shaikh <hello@hiremoeed.com>",
      to: [to],
      subject: `Your Project Quotation - ${quotationData.quote_number}`,
      html: generateQuotationHTML(customerName, quotationData),
      attachments: attachments,
    });

    console.log("Quotation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending quotation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
