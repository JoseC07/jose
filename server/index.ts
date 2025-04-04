import dotenv from 'dotenv';
dotenv.config(); // Load variables from .env into process.env

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import AWS from 'aws-sdk';
import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html'; // Import sanitize-html

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- Email Transporter Configuration ---
// NOTE: Replace with your actual email service configuration.
// Use environment variables for credentials in production!
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // Read from process.env
  port: parseInt(process.env.EMAIL_PORT || '587', 10), // Read from process.env (with fallback)
  secure: (process.env.EMAIL_PORT === '465'), // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Read from process.env
    pass: process.env.EMAIL_PASS, // Read from process.env
  },
});
// --- End Email Configuration ---

// Use local mocks for development
const isLocal = process.env.NODE_ENV === 'development';
const s3 = isLocal ? {
  putObject: () => ({ promise: () => Promise.resolve() })
} : new AWS.S3();

const dynamoDB = isLocal ? {
  put: () => ({ promise: () => Promise.resolve() })
} : new AWS.DynamoDB.DocumentClient();

// In-memory store (replace with database in production)
// const engagementData: any[] = []; // Remove or comment out in-memory store

app.post('/api/engagement', async (req, res) => {
    const { action, metadata } = req.body;
    const timestamp = new Date();
    const engagementId = `${action}-${timestamp.getTime()}`;

    // Optional: Implement duplicate check logic if needed (e.g., based on recent emails?)
    /*
    if (isDuplicate) {
        // ... handle duplicate ...
    }
    */

    // --- Send Email ---
    const mailOptions = {
        from: process.env.EMAIL_FROM || '"Portfolio Alert" <noreply@example.com>', // Sender address
        to: process.env.EMAIL_TO , // Recipient (use env var!)
        subject: `New Engagement: ${action}`, // Subject line
        text: `Engagement Details:\n\nAction: ${action}\nTimestamp: ${timestamp.toISOString()}\nMetadata: ${JSON.stringify(metadata, null, 2)}\nEngagement ID: ${engagementId}`, // Plain text body
        html: `<p><strong>Engagement Details:</strong></p>
               <ul>
                 <li><strong>Action:</strong> ${action}</li>
                 <li><strong>Timestamp:</strong> ${timestamp.toISOString()}</li>
                 <li><strong>Engagement ID:</strong> ${engagementId}</li>
                 <li><strong>Metadata:</strong> <pre>${JSON.stringify(metadata, null, 2)}</pre></li>
               </ul>`, // HTML body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', { action, id: engagementId, messageId: info.messageId });
        // Log Ethereal URL if using Ethereal for testing
        if ((process.env.EMAIL_HOST || '').includes('ethereal.email')) {
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }

        res.status(200).json({
            success: true,
            message: 'Engagement recorded and notification sent.',
            engagementId: engagementId
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send engagement notification.',
            error: error instanceof Error ? error.message : 'Unknown error',
            engagementId: engagementId
        });
    }
    // --- End Send Email ---

    /* // Removed in-memory storage logic:
    // Store the engagement data
    engagementData.push({ ... });
    console.log('Stored engagement:', { ... });
    res.status(200).json({ ... });
    */
});

// --- NEW: Contact Form Endpoint ---
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const timestamp = new Date();

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Missing required fields (name, email, message).' });
    }

    // Sanitize input to prevent XSS - allow only basic text
    const sanitizedName = sanitizeHtml(name.toString(), { allowedTags: [], allowedAttributes: {} });
    const sanitizedEmail = sanitizeHtml(email.toString(), { allowedTags: [], allowedAttributes: {} });
    const sanitizedMessage = sanitizeHtml(message.toString(), { allowedTags: [], allowedAttributes: {} });


    const mailOptions = {
        from: process.env.EMAIL_FROM || '"Portfolio Contact" <noreply@example.com>',
        to: process.env.EMAIL_TO, // Send to your configured email
        replyTo: sanitizedEmail, // Set Reply-To to the sender's email
        subject: `New Contact Form Message from ${sanitizedName}`,
        text: `You received a new message from your portfolio contact form:\n\n` +
              `Name: ${sanitizedName}\n` +
              `Email: ${sanitizedEmail}\n` +
              `Timestamp: ${timestamp.toISOString()}\n\n` +
              `Message:\n${sanitizedMessage}`,
        html: `<p>You received a new message from your portfolio contact form:</p>
               <ul>
                 <li><strong>Name:</strong> ${sanitizedName}</li>
                 <li><strong>Email:</strong> ${sanitizedEmail}</li>
                 <li><strong>Timestamp:</strong> ${timestamp.toISOString()}</li>
               </ul>
               <p><strong>Message:</strong></p>
               <pre>${sanitizedMessage}</pre>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Contact form email sent successfully:', { name: sanitizedName, email: sanitizedEmail });
        res.status(200).json({ success: true, message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Error sending contact form email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message.',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// --- END: Contact Form Endpoint ---

// --- NEW: Newsletter Subscription Endpoint ---
app.post('/api/newsletter', async (req, res) => {
    const { email } = req.body;
    const timestamp = new Date();

    // Basic validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Invalid email address provided.' });
    }

    // Sanitize email
    const sanitizedEmail = sanitizeHtml(email.toString(), { allowedTags: [], allowedAttributes: {} });


    const mailOptions = {
        from: process.env.EMAIL_FROM || '"Portfolio Newsletter" <noreply@example.com>',
        to: process.env.EMAIL_TO, // Send to your configured email
        subject: `New Newsletter Subscription: ${sanitizedEmail}`,
        text: `New newsletter subscription:\n\n` +
              `Email: ${sanitizedEmail}\n` +
              `Timestamp: ${timestamp.toISOString()}`,
        html: `<p>New newsletter subscription:</p>
               <ul>
                 <li><strong>Email:</strong> ${sanitizedEmail}</li>
                 <li><strong>Timestamp:</strong> ${timestamp.toISOString()}</li>
               </ul>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Newsletter subscription email sent successfully:', { email: sanitizedEmail });
        res.status(200).json({ success: true, message: 'Subscription successful.' });
    } catch (error) {
        console.error('Error sending newsletter subscription email:', error);
        res.status(500).json({
            success: false,
            message: 'Subscription failed.',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
// --- END: Newsletter Subscription Endpoint ---

// Keep this test endpoint
app.get('/api/test', (_req, res) => {
  res.json({
    status: 'OK',
    environment: process.env.NODE_ENV,
    awsConfigured: !isLocal
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 