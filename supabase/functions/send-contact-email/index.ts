
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email notification to site owner
    const emailToOwner = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["geetheerth@gmail.com"],
      subject: `New Contact Form Message: ${subject || "No Subject"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject || "No Subject"}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
    
    // Instead of trying to send directly to the user (which fails due to Resend limitations),
    // send a notification to the site owner with instructions to reply to the user
    const confirmationNotification = await resend.emails.send({
      from: "Geetheerth R <onboarding@resend.dev>",
      to: ["geetheerth@gmail.com"],
      subject: `[ACTION REQUIRED] Contact form submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #4263eb;">Contact Form Notification</h2>
          <p>Hello Geetheerth,</p>
          <p><strong>${name}</strong> with email <strong>${email}</strong> has submitted a contact form message.</p>
          <p>Please send them a confirmation email manually as Resend's free tier only allows sending to verified email addresses.</p>
          <p>Here's a template you can use to reply to ${email}:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #4263eb; margin: 20px 0;">
            <p>Subject: Thank you for your message</p>
            <p>Hello ${name},</p>
            <p>Thank you for reaching out to me. I have received your message regarding "${subject || "your inquiry"}".</p>
            <p>I will review your message and get back to you as soon as possible, typically within 24-48 hours.</p>
            <p>Best regards,<br/>Geetheerth R</p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { ownerEmail: emailToOwner, confirmationEmail: confirmationNotification });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in contact form function:", error);
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
