import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Validate environment variables first
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Missing email configuration');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate required fields
    if (!body.tokenName || !body.tokenSymbol || !body.contractAddress || !body.contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Simplified Gmail configuration
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // This should be an app-specific password
      },
    });

    const mailOptions = {
      from: `"Eliza.Finance Token Request" <${process.env.EMAIL_USER}>`,
      to: 'eliza@eliza.systems',
      subject: `New Token Listing Request: ${body.tokenName} (${body.tokenSymbol})`,
      html: `
        <h2>New Token Listing Request</h2>
        <p><strong>Token Name:</strong> ${body.tokenName}</p>
        <p><strong>Token Symbol:</strong> ${body.tokenSymbol}</p>
        <p><strong>Contract Address:</strong> ${body.contractAddress}</p>
        <p><strong>Description:</strong></p>
        <p>${body.description || 'No description provided'}</p>
        <p><strong>Contact Email:</strong> ${body.contactEmail}</p>
        <hr>
        <p><small>Sent from Eliza.Finance Token Request Form</small></p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 