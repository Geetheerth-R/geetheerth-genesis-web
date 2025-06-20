
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

    console.log("Received booking notification request:", {
      user_email,
      user_name,
      service_name,
      service_price,
      booking_date,
      booking_time,
      notes
    });

    // Basic validation
    if (!user_email || !user_name || !service_name || !booking_date || !booking_time) {
      console.error("Missing required fields:", { user_email, user_name, service_name, booking_date, booking_time });
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Convert USD to INR for display
    const priceInINR = Math.round(service_price * 83);

    const formattedDate = new Date(booking_date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let formattedTime;
    if (service_name === "Technical Consulting") {
      formattedTime = new Date(`${booking_date}T${booking_time}`).toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
      // For other services, booking_time is expected delivery date
      formattedTime = new Date(booking_time).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }

    // Send notification email to service provider (you)
    const emailToProvider = await resend.emails.send({
      from: "Service Booking <onboarding@resend.dev>",
      to: ["geetheerth@gmail.com"],
      subject: `New Service Booking: ${service_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #4263eb; border-bottom: 2px solid #4263eb; padding-bottom: 10px;">New Service Booking Received</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Service Details</h3>
            <p><strong>Service:</strong> ${service_name}</p>
            <p><strong>Investment:</strong> ₹${priceInINR} (${service_price} USD)</p>
            <p><strong>${service_name === "Technical Consulting" ? "Consultation Date" : "Project Start Date"}:</strong> ${formattedDate}</p>
            <p><strong>${service_name === "Technical Consulting" ? "Consultation Time" : "Expected Delivery"}:</strong> ${formattedTime}</p>
          </div>

          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1976d2; margin-top: 0;">Client Information</h3>
            <p><strong>Name:</strong> ${user_name}</p>
            <p><strong>Email:</strong> ${user_email}</p>
          </div>

          ${notes ? `
          <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #f57c00; margin-top: 0;">Project Requirements & Specifications</h3>
            <p style="white-space: pre-wrap;">${notes}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background-color: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0; color: #2e7d32;"><strong>Next Steps:</strong></p>
            <ul style="color: #2e7d32; margin: 10px 0;">
              <li>Contact the client at ${user_email} to confirm the booking</li>
              <li>Discuss project requirements and deliverables</li>
              <li>Send project proposal and timeline</li>
              <li>Schedule the work in your calendar</li>
            </ul>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>This booking was made through your portfolio website service booking system.</p>
          </div>
        </div>
      `,
    });
    
    // Send confirmation email to the client
    const emailToClient = await resend.emails.send({
      from: "Geetheerth R <onboarding@resend.dev>",
      to: [user_email],
      subject: `Service Booking Confirmation: ${service_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #4263eb;">Service Booking Confirmation</h2>
          <p>Dear ${user_name},</p>
          <p>Thank you for choosing my professional services! I'm excited to work with you on your project.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-left: 4px solid #4263eb; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #4263eb;">Your Booking Details</h3>
            <p><strong>Service:</strong> ${service_name}</p>
            <p><strong>Investment:</strong> ₹${priceInINR}</p>
            <p><strong>${service_name === "Technical Consulting" ? "Consultation Date" : "Project Start Date"}:</strong> ${formattedDate}</p>
            <p><strong>${service_name === "Technical Consulting" ? "Consultation Time" : "Expected Delivery"}:</strong> ${formattedTime}</p>
            ${notes ? `<p><strong>Requirements:</strong> ${notes}</p>` : ''}
          </div>

          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2e7d32;"><strong>What happens next?</strong></p>
            <ul style="color: #2e7d32;">
              <li>I'll reach out to you within 24 hours to confirm the booking</li>
              <li>We'll discuss your project requirements in detail</li>
              <li>I'll provide a comprehensive project proposal and timeline</li>
              <li>We'll schedule the work according to your preferred timeline</li>
            </ul>
          </div>

          <p>If you have any questions or need to make changes to your booking, please reply to this email or contact me directly.</p>
          
          <p>Looking forward to working with you!</p>
          
          <p>Best regards,<br/>
          <strong>Geetheerth R</strong><br/>
          Professional Technical Services</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>This is an automated confirmation email for your service booking request.</p>
          </div>
        </div>
      `,
    });

    console.log("Booking notification emails sent successfully:", { 
      providerEmailId: emailToProvider.data?.id, 
      clientEmailId: emailToClient.data?.id 
    });

    return new Response(JSON.stringify({ 
      success: true, 
      providerEmailId: emailToProvider.data?.id,
      clientEmailId: emailToClient.data?.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in booking notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send booking notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
