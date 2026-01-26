// src/app/api/mango-phone/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getMangoPhone } from '@/lib/api/get_mango';

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const r_num_string = url.searchParams.get('r_num_string');
        const user_id = url.searchParams.get('user_id');

        if (!r_num_string || !user_id) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const res = await getMangoPhone(r_num_string, user_id);

        return NextResponse.json(res);
    } catch (e) {
        console.error('Route /api/mango-phone error:', e);
        return NextResponse.json({ error: 'Failed to fetch phone' }, { status: 500 });
    }
}
