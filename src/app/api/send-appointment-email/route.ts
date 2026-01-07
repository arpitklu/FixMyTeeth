export const runtime = "nodejs";


import AppointmentConfirmationEmail from "@/components/email/AppointmentConfirmationEmail";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
// import { renderToString } from "react-dom/server";
import { render } from "@react-email/render";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
    } = body;

    // validate required fields
    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Set up Nodemailer transporter (replace with your SMTP config)
    // const transporter = nodemailer.createTransporter({
    //   service: "gmail", // or your SMTP service
    //   auth: {
    //     user: process.env.EMAIL_USER, // e.g., your Gmail address
    //     pass: process.env.EMAIL_PASS, // e.g., app password for Gmail
    //   },
    // });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // e.g., your Gmail address
        pass: process.env.EMAIL_PASS, // e.g., app password for Gmail
      },
    });

    // Render the React email component to HTML
    const emailHtml = await render(
      AppointmentConfirmationEmail({
        doctorName,
        appointmentDate,
        appointmentTime,
        appointmentType,
        duration,
        price,
      })
    );

    // Send the email
    const info = await transporter.sendMail({
      from: "fixmyteeth.dental@gmail.com", // replace with your from address
      to: userEmail,
      subject: "Appointment Confirmation - FixMyTeeth",
      html: emailHtml,
    });
    console.log("Reached");

    if (!info.messageId) {
      console.log("Failed to send email:", info);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Email sent successfully", emailId: info.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}