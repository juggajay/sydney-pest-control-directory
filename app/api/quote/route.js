import { NextResponse } from 'next/server';
import { submitLead } from '../../../lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, phone, service, suburb, propertyType, urgency, problemDescription } = body;

    if (!name || !email || !phone || !service || !suburb) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Submit to Supabase
    const result = await submitLead({
      name,
      email,
      phone,
      suburb,
      service,
      propertyType,
      urgency,
      message: problemDescription,
      source: 'quote_form',
    });

    if (!result.success) {
      console.error('Supabase error:', result.error);
      return NextResponse.json(
        { success: false, error: 'Failed to submit quote request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      leadId: result.data?.[0]?.id
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
