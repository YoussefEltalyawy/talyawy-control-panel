import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('domain')
  if (!domain) {
    return NextResponse.json({ error: 'Missing domain' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('projects')
    .select('status')
    .eq('domain', domain)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  return NextResponse.json({ status: data.status })
}
