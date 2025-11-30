import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create client if we have the required values
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

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
  if (!supabase) {
    console.error('Supabase client not initialized');
    return { success: false, error: { message: 'Database not configured' } };
  }

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

// Blog Post Functions

export async function getBlogPosts(filters = {}) {
  if (!supabase) return [];

  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published');

  if (filters.category) {
    query = query.eq('category', filters.category);
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query.order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export async function getBlogPostBySlug(slug) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }

  return data;
}

export async function getAllBlogSlugs() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }

  return data?.map(post => post.slug) || [];
}

export async function getRelatedPosts(currentSlug, tags = [], limit = 3) {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, featured_image, category, published_at, reading_time_minutes')
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .limit(limit)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  return data || [];
}
