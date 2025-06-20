
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  user_email: string;
  user_name: string;
  service_name: string;
  service_price: number;
  booking_date: string;
  booking_time: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      user_email, 
      user_name, 
      service_name, 
      service_price, 
      booking_date, 
      booking_time, 
      notes 
    }: BookingNotificationRequest = await req.json();

    // Basic validation
    if (!user_email || !user_name || !service_name || !booking_date || !booking_time) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const formattedDate = new Date(booking_date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = new Date(`${booking_date}T${booking_time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Send notification email to service provider
    const emailToProvider = await resend.emails.send({
      from: "Service Booking <onboarding@resend.dev>",
      to: ["geetheerth@gmail.com"],
      subject: `New Service Booking: ${service_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #4263eb; border-bottom: 2px solid #4263eb; padding-bottom: 10px;">New Service Booking</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Service Details</h3>
            <p><strong>Service:</strong> ${service_name}</p>
            <p><strong>Price:</strong> $${service_price}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
          </div>

          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${user_name}</p>
            <p><strong>Email:</strong> ${user_email}</p>
          </div>

          ${notes ? `
          <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #f57c00; margin-top: 0;">Additional Notes</h3>
            <p style="white-space: pre-wrap;">${notes}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; color: #2e7d32;"><strong>Next Steps:</strong></p>
            <ul style="color: #2e7d32; margin: 10px 0;">
              <li>Contact the client at ${user_email} to confirm the booking</li>
              <li>Send them any preparation materials or requirements</li>
              <li>Add the appointment to your calendar</li>
            </ul>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>This booking was made through your portfolio website.</p>
          </div>
        </div>
      `,
    });
    
    // Send confirmation email to the client
    const emailToClient = await resend.emails.send({
      from: "Geetheerth R <onboarding@resend.dev>",
      to: [user_email],
      subject: `Booking Confirmation: ${service_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #4263eb;">Booking Confirmation</h2>
          <p>Hello ${user_name},</p>
          <p>Thank you for booking my services! I'm excited to work with you.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #4263eb; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4263eb;">Your Booking Details</h3>
            <p><strong>Service:</strong> ${service_name}</p>
            <p><strong>Price:</strong> $${service_price}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
          </div>

          <p>I will contact you within 24 hours to confirm the details and discuss the project requirements.</p>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2e7d32;"><strong>What happens next?</strong></p>
            <ul style="color: #2e7d32;">
              <li>I'll reach out to you via email to confirm the booking</li>
              <li>We'll discuss project requirements and timeline</li>
              <li>I'll provide any necessary preparation materials</li>
            </ul>
          </div>

          <p>If you have any questions or need to make changes to your booking, please reply to this email.</p>
          
          <p>Best regards,<br/>Geetheerth R</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>This is a confirmation email for your service booking.</p>
          </div>
        </div>
      `,
    });

    console.log("Booking notification emails sent successfully:", { 
      providerEmail: emailToProvider, 
      clientEmail: emailToClient 
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in booking notification function:", error);
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
