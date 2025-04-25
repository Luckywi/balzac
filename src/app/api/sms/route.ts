// src/app/api/sms/send-confirmation-sms/route.ts
import { SMSService } from '../../lib/sms/SMSService';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { appointmentId } = await req.json();

    if (!appointmentId) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    await SMSService.sendConfirmationSMS(appointmentId);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erreur SMS :', error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
