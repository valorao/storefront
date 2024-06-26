import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const apikey = request.headers.get('x-api-key');
    const path = searchParams.get('endpoint');

    if (apikey !== process.env.REVALIDATE_API_KEY) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    try {
        const revalidate = revalidatePath(path!);
        return NextResponse.json({ revalidated: true, revalidate });
    } catch (err: any) {
        return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
    }
}
