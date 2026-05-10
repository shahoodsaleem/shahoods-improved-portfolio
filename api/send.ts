import { Resend } from 'resend';

const resend = new Resend('re_T6GHRJDe_Prr9rEfjy2mrYW7L23PhBELU');

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, service, message } = req.body;

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['shahoodsaleem123@gmail.com'],
      subject: `New Contact Form Submission: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">New Contact Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Service:</strong> ${service || 'Not specified'}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
