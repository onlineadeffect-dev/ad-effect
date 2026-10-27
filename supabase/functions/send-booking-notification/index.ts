import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const BREVO_API_KEY = Deno.env.get('BREVO_API_KEY')!
const ADMIN_EMAIL = "onlineadeffect@gmail.com"
const SENDER_EMAIL = "contact@yourdomain.com" // Must be verified in Brevo

serve(async (req) => {
  try {
    const payload = await req.json()

    // Process only INSERT operations
    if (payload.type !== 'INSERT') {
      return new Response(JSON.stringify({ message: 'Ignored non-INSERT event' }), { status: 200 })
    }

    const booking = payload.record
    const userEmail = booking.user_email

    const emailRequests = []

    // 1. Email to the User (Confirmation)
    if (userEmail) {
      emailRequests.push(
        fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "accept": "application/json",
            "api-key": BREVO_API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: { name: "Online Ad Effect", email: SENDER_EMAIL },
            to: [{ email: userEmail }],
            subject: "Your Billboard Booking Request is Confirmed!",
            htmlContent: `
              <h2>Booking Request Received</h2>
              <p>Hi there,</p>
              <p>Your billboard booking request has been submitted successfully. Our team is reviewing the details, and you will receive a formal answer within <strong>48 hours</strong>.</p>
              <hr/>
              <p><strong>Booking Details:</strong></p>
              <pre style="background: #f4f4f4; padding: 12px; border-radius: 6px;">
${JSON.stringify(booking, null, 2)}
              </pre>
              <p>Best regards,<br/><strong>Online Ad Effect Team</strong></p>
            `,
          }),
        })
      )
    }

    // 2. Email to Admin (Notification)
    emailRequests.push(
      fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Ad Effect System", email: SENDER_EMAIL },
          to: [{ email: ADMIN_EMAIL, name: "Admin" }],
          subject: "🚨 New Booking Request Submitted!",
          htmlContent: `
            <h2>New Request in requested_bookings</h2>
            <p>A new billboard booking request was submitted by <strong>${userEmail || 'Anonymous'}</strong>.</p>
            <hr/>
            <pre style="background: #f4f4f4; padding: 12px; border-radius: 6px;">
${JSON.stringify(booking, null, 2)}
            </pre>
          `,
        }),
      })
    )

    // Execute both email requests in parallel
    await Promise.all(emailRequests)

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    // Type-safe handling of unknown error
    const errorMessage = error instanceof Error ? error.message : String(error)
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})