import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY manquant');
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'École Sully <onboarding@resend.dev>',
        to: ['naharinzu@gmail.com'],
        reply_to: email,
        subject: `[Sully] Nouveau message de ${name}: ${subject}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
            <div style="background: linear-gradient(135deg, #1e3a8a, #1e40af); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">École Collège Sully</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Nouveau message de contact</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px; background: #f3f4f6; border-radius: 8px; width: 30%; font-weight: bold; color: #374151; vertical-align: top;">Nom</td>
                  <td style="padding: 12px; color: #1f2937;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; width: 30%; font-weight: bold; color: #374151; vertical-align: top;">Email</td>
                  <td style="padding: 12px; color: #1f2937;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px; background: #f3f4f6; border-radius: 8px; width: 30%; font-weight: bold; color: #374151; vertical-align: top;">Sujet</td>
                  <td style="padding: 12px; color: #1f2937;">${subject}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 20px; background: #f3f4f6; border-radius: 8px; border-left: 4px solid #f97316;">
                <p style="font-weight: bold; color: #374151; margin: 0 0 8px;">Message :</p>
                <p style="color: #4b5563; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>
              <p style="margin-top: 24px; text-align: center; color: #9ca3af; font-size: 12px;">
                Vous pouvez répondre directement à cet email pour contacter ${name}.
              </p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message" },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: 'Message envoyé avec succès',
        id: data.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
