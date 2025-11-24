/**
 * API Route: Contact Form Handler
 * Procesa formularios de contacto y envía emails
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema de validación (debe coincidir con el del formulario)
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
  consent: z.boolean().refine((val) => val === true),
});

/**
 * POST /api/contact
 * Maneja el envío de mensajes del formulario de contacto
 */
export async function POST(request: NextRequest) {
  try {
    // Parsear el body de la petición
    const body = await request.json();

    // Validar datos con Zod
    const validatedData = contactSchema.parse(body);

    // Aquí implementarías el envío de email
    // Opciones:
    // 1. Nodemailer con SMTP
    // 2. SendGrid
    // 3. AWS SES
    // 4. Resend
    // 5. EmailJS (desde el cliente)

    // Ejemplo básico con logging (reemplazar con envío real de email)
    console.log('📧 Nuevo mensaje de contacto:', {
      from: validatedData.email,
      name: validatedData.name,
      subject: validatedData.subject,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
    });

    // Simulación de envío de email
    // En producción, reemplaza esto con tu servicio de email preferido

    /* Ejemplo con Nodemailer:
    
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Nuevo mensaje de ${validatedData.name}: ${validatedData.subject}`,
      text: validatedData.message,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>De:</strong> ${validatedData.name} (${validatedData.email})</p>
        <p><strong>Asunto:</strong> ${validatedData.subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${validatedData.message}</p>
      `,
    });
    */

    // Respuesta exitosa
    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    // Manejo de errores de validación
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    // Error genérico
    console.error('Error processing contact form:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Método OPTIONS para CORS (si es necesario)
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
