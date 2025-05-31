
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PasswordRecoveryRequest {
  email: string;
  resetLink: string;
}

const generateRecoveryHTML = (resetLink: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Recovery</title>
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
        .btn { 
          display: inline-block; 
          background: #2196f3; 
          color: white; 
          padding: 15px 30px; 
          text-decoration: none; 
          border-radius: 6px; 
          margin: 20px 0; 
          font-weight: bold;
        }
        .warning { 
          background: #fff3cd; 
          border: 1px solid #ffeaa7; 
          padding: 15px; 
          border-radius: 6px; 
          margin: 20px 0; 
        }
        .footer { 
          background: #333; 
          color: white; 
          padding: 20px; 
          text-align: center; 
          border-radius: 0 0 10px 10px; 
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Password Recovery</h1>
        <p>Admin Panel Access</p>
      </div>
      
      <div class="content">
        <h2>Password Reset Request</h2>
        
        <p>We received a request to reset your admin panel password. If you didn't make this request, you can safely ignore this email.</p>
        
        <div style="text-align: center;">
          <a href="${resetLink}" class="btn">Reset Your Password</a>
        </div>
        
        <div class="warning">
          <p><strong>Security Notice:</strong></p>
          <p>• This link will expire in 24 hours for security reasons</p>
          <p>• Only use this link if you requested a password reset</p>
          <p>• Never share this link with anyone</p>
        </div>
        
        <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; background: #f1f1f1; padding: 10px; border-radius: 4px;">
          ${resetLink}
        </p>
      </div>
      
      <div class="footer">
        <p><strong>Moeed Shaikh</strong><br>
        Admin Panel Security</p>
        <p>If you have any concerns about this email, please contact support immediately.</p>
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
    const { email, resetLink }: PasswordRecoveryRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Moeed Shaikh <hello@hiremoeed.com>",
      to: [email],
      subject: "Password Recovery - Admin Panel",
      html: generateRecoveryHTML(resetLink),
    });

    console.log("Password recovery email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending password recovery email:", error);
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
