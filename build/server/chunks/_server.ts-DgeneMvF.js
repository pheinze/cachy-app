import { j as json } from './index-DL1kGxeb.js';

const GET = async ({ url, fetch }) => {
  const symbols = url.searchParams.get("symbols");
  if (!symbols) {
    return json({ message: 'Query parameter "symbols" is required.' }, { status: 400 });
  }
  try {
    const response = await fetch(`https://fapi.bitunix.com/api/v1/futures/market/tickers?symbols=${symbols}`);
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
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return json({ message: `Internal server error: ${message}` }, { status: 500 });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-DgeneMvF.js.map
