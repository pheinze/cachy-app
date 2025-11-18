import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, fetch }) => {
    const symbols = url.searchParams.get('symbols');
    if (!symbols) {
        return json({ message: 'Query parameter "symbols" is required.' }, { status: 400 });
    }

    try {
        const response = await fetch(`https://fapi.bitunix.com/api/v1/futures/market/tickers?symbols=${symbols}`);

        if (!response.ok) {
            // Forward the status and error message from the external API if possible
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
