import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');
    const token = request.headers.get('authorization');

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_url || '';
    if (!backendUrl) {
      return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = token;
    }

    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();

    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');
    const token = request.headers.get('authorization');

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_url || '';
    if (!backendUrl) {
      return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
    }

    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = token;
    }

    // ตรวจสอบ Content-Type เพื่อจัดการ body ที่เหมาะสม
    const contentType = request.headers.get('content-type');
    let body: FormData | string;

    if (contentType?.includes('application/json')) {
      headers['Content-Type'] = 'application/json';
      body = await request.text();
    } else {
      // สำหรับ FormData
      body = await request.formData();
    }

    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.json();

    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');
    const token = request.headers.get('authorization');

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_url || '';
    if (!backendUrl) {
      return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
    }

    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = token;
    }

    // ตรวจสอบ Content-Type เพื่อจัดการ body ที่เหมาะสม
    const contentType = request.headers.get('content-type');
    let body: FormData | string;

    if (contentType?.includes('application/json')) {
      headers['Content-Type'] = 'application/json';
      body = await request.text();
    } else {
      // สำหรับ FormData
      body = await request.formData();
    }

    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'PUT',
      headers,
      body,
    });

    const data = await response.json();

    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');
    const token = request.headers.get('authorization');

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_url || '';
    if (!backendUrl) {
      return NextResponse.json({ error: 'Backend URL not configured' }, { status: 500 });
    }

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = token;
    }

    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    const data = await response.json();

    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
