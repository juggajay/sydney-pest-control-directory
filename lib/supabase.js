import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper functions for common operations

export async function getOperators(filters = {}) {
  let query = supabase
    .from('operators')
    .select('*')
    .eq('status', 'active');

  if (filters.suburb) {
    query = query.contains('service_areas', [filters.suburb]);
  }

  if (filters.service) {
    query = query.contains('services', [filters.service]);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query.order('featured', { ascending: false });

  if (error) {
    console.error('Error fetching operators:', error);
    return [];
  }

  return data || [];
}

export async function getOperatorBySlug(slug) {
  const { data, error } = await supabase
    .from('operators')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching operator:', error);
    return null;
  }

  return data;
}

export async function getAllOperatorSlugs() {
  const { data, error } = await supabase
    .from('operators')
    .select('slug')
    .eq('status', 'active');

  if (error) {
    console.error('Error fetching operator slugs:', error);
    return [];
  }

  return data?.map(op => op.slug) || [];
}

export async function submitLead(leadData) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      suburb: leadData.suburb,
      service: leadData.service,
      message: leadData.message,
      property_type: leadData.propertyType,
      urgency: leadData.urgency,
      source: leadData.source || 'website',
      created_at: new Date().toISOString(),
    }])
    .select();

  if (error) {
    console.error('Error submitting lead:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function submitContact(contactData) {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      message: contactData.message,
      operator_id: contactData.operatorId,
      created_at: new Date().toISOString(),
    }])
    .select();

  if (error) {
    console.error('Error submitting contact:', error);
    return { success: false, error };
  }

  return { success: true, data };
}
