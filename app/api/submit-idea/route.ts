import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getResend } from "@/lib/resend";

const submitIdeaSchema = z.object({
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validationResult = submitIdeaSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request data",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, message } = validationResult.data;

    // Check if required environment variables are set
    if (!process.env.YOUR_EMAIL) {
      console.error("YOUR_EMAIL environment variable is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Send email via Resend
    try {
      const resend = getResend();

      // Use RESEND_FROM_EMAIL if set, otherwise use default
      // Note: For production, verify your domain with Resend and update this
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

      await resend.emails.send({
        from: fromEmail,
        to: process.env.YOUR_EMAIL,
        replyTo: email,
        subject: "New Idea Submission",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
                  border-radius: 8px 8px 0 0;
                }
                .content {
                  background: #f9fafb;
                  padding: 30px;
                  border-radius: 0 0 8px 8px;
                }
                .info-box {
                  background: white;
                  padding: 20px;
                  border-radius: 6px;
                  margin: 20px 0;
                  border-left: 4px solid #667eea;
                }
                .label {
                  font-weight: 600;
                  color: #667eea;
                  display: block;
                  margin-bottom: 5px;
                }
                .message {
                  background: white;
                  padding: 20px;
                  border-radius: 6px;
                  margin-top: 20px;
                  white-space: pre-wrap;
                  word-wrap: break-word;
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>🚀 New Idea Submission</h1>
              </div>
              <div class="content">
                <div class="info-box">
                  <span class="label">From:</span>
                  <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                </div>
                <div class="message">
                  <span class="label">Idea Description:</span>
                  <p style="margin-top: 10px;">${message.replace(/\n/g, "<br>")}</p>
                </div>
                <p style="margin-top: 30px; font-size: 14px; color: #666;">
                  You can reply directly to this email to respond to ${email}
                </p>
              </div>
            </body>
          </html>
        `,
        text: `
New Idea Submission

From: ${email}

Idea Description:
${message}

---
You can reply to this email to respond to ${email}
        `,
      });

      return NextResponse.json(
        { message: "Idea submitted successfully" },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
