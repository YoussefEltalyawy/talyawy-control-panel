import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('domain', domain)
    .single();
  if (error || !data) {
    return new NextResponse(JSON.stringify({ error: 'Project not found' }), {
      status: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  }

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  });
}
