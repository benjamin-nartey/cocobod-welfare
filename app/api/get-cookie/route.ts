import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');
  
  if (!name) {
    return NextResponse.json({ error: 'Cookie name is required' }, { status: 400 });
  }
  
  // Get the cookie from the request
  const cookieValue = request.cookies.get(name)?.value;
  
  return NextResponse.json({ 
    name,
    value: cookieValue || null 
  });
}