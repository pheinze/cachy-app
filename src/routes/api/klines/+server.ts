import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
    const symbol = url.searchParams.get('symbol');
    const interval = url.searchParams.get('interval');
    const limit = url.searchParams.get('limit') || '15'; // Default limit

    if (!symbol || !interval) {
        return json({ message: 'Query parameters "symbol" and "interval" are required.' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://fapi.bitunix.com/api/v1/futures/market/kline?symbol=${symbol}&interval=${interval}&limit=${limit}`);

        if (!response.ok) {
            const errorData = await response.text();
            return new Response(errorData, {
                status: response.status,
                statusText: response.statusText
            });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred.';
        return json({ message: `Internal server error: ${message}` }, { status: 500 });
    }
};
