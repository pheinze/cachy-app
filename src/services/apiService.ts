import { Decimal } from 'decimal.js';

// Define a type for the kline data object for clarity
export interface Kline {
    high: Decimal;
    low: Decimal;
    close: Decimal;
}

export const apiService = {
    async fetchBitunixPrice(symbol: string): Promise<Decimal> {
        try {
            const response = await fetch(`/api/tickers?symbols=${symbol}`);
            if (!response.ok) throw new Error('apiErrors.symbolNotFound');
            const res = await response.json();
            if (res.code !== 0 || !res.data || res.data.length === 0) {
                throw new Error('apiErrors.invalidResponse');
            }
            const data = res.data[0];
            return new Decimal(data.lastPrice);
        } catch (e) {
            // Re-throw custom error messages or a generic one
            if (e instanceof Error && (e.message === 'apiErrors.symbolNotFound' || e.message === 'apiErrors.invalidResponse')) {
                throw e;
            }
            throw new Error('apiErrors.generic');
        }
    },

    async fetchBitunixKlines(symbol: string, interval: string, limit: number = 15): Promise<Kline[]> {
        try {
            const response = await fetch(`/api/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
            if (!response.ok) throw new Error('apiErrors.klineError');
            const res = await response.json();
            if (res.code !== 0 || !res.data) {
                throw new Error('apiErrors.invalidResponse');
            }

            // Map the response data to the required Kline interface
            return res.data.map((kline: { high: string, low: string, close: string }) => ({
                high: new Decimal(kline.high),
                low: new Decimal(kline.low),
                close: new Decimal(kline.close),
            }));
        } catch (e) {
            if (e instanceof Error && (e.message === 'apiErrors.klineError' || e.message === 'apiErrors.invalidResponse')) {
                throw e;
            }
            throw new Error('apiErrors.generic');
        }
    }
};