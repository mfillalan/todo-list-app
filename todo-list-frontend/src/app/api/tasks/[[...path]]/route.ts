import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const path = req.nextUrl.pathname.replace('/api/tasks', '') || '';
    const response = await fetch(`${backendUrl}/api/tasks${path}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}

export async function POST(req: NextRequest) {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const body = await req.json();
    const response = await fetch(`${backendUrl}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}